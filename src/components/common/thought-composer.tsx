import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DATETIME_FORMAT, THOUGHTS_GITHUB } from "@/constant/constants";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const TOKEN_KEY = "flow_gh_token";
const REPO_URL = `https://api.github.com/repos/${THOUGHTS_GITHUB.owner}/${THOUGHTS_GITHUB.repo}`;
const API_URL = `${REPO_URL}/contents/${THOUGHTS_GITHUB.path}`;

interface ThoughtEntry {
    id: number;
    content: string;
    created_at: string;
}

interface ContentsResponse {
    content: string;
    sha: string;
    encoding: string;
}

type Phase = "init" | "need_token" | "ready" | "publishing" | "success";

class GithubError extends Error {
    status: number;

    constructor(status: number) {
        super(`GitHub API ${status}`);
        this.status = status;
    }
}

// UTF-8 安全 base64:中文内容不能裸用 atob/btoa
function utf8ToBase64(str: string): string {
    const bytes = new TextEncoder().encode(str);
    let binary = "";
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
    }
    return btoa(binary);
}

function base64ToUtf8(b64: string): string {
    // GitHub 返回的 base64 每 60 字符带换行,必须先去掉
    const binary = atob(b64.replace(/\s/g, ""));
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
}

function githubHeaders(token: string): HeadersInit {
    return {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    };
}

// token 有效性校验走仓库级接口,与数据文件是否已存在解耦
async function verifyRepoAccess(token: string): Promise<void> {
    const res = await fetch(REPO_URL, {
        headers: githubHeaders(token),
        cache: "no-store",
    });
    if (!res.ok) throw new GithubError(res.status);
}

async function fetchThoughtsFile(
    token: string
): Promise<{ thoughts: ThoughtEntry[]; sha: string | null }> {
    const res = await fetch(`${API_URL}?ref=${THOUGHTS_GITHUB.branch}`, {
        headers: githubHeaders(token),
        cache: "no-store",
    });
    // 文件尚未推送到仓库:视为空列表,首次发布会直接创建该文件
    if (res.status === 404) return { thoughts: [], sha: null };
    if (!res.ok) throw new GithubError(res.status);
    const data = (await res.json()) as ContentsResponse;
    if (data.content === "" && data.encoding === "none") {
        throw new Error("thoughts.json 已超过 GitHub API 1MB 限制,需按年分片后才能继续在此发布");
    }
    return {
        thoughts: JSON.parse(base64ToUtf8(data.content)) as ThoughtEntry[],
        sha: data.sha,
    };
}

async function publishThought(token: string, content: string): Promise<string> {
    // sha 过期(409/422)时整体重试一次
    for (let attempt = 0; ; attempt++) {
        const { thoughts, sha } = await fetchThoughtsFile(token);
        const nextId = thoughts.length ? Math.max(...thoughts.map((t) => t.id)) + 1 : 1;
        const created_at = dayjs().format(DATETIME_FORMAT);
        // 格式契约:与 scripts/new-thought.mjs 及初始文件一致(2 空格缩进 + 末尾换行)
        const body = JSON.stringify([...thoughts, { id: nextId, content, created_at }], null, 2) + "\n";
        // 文件已存在必须带 sha;不存在时不带 sha 即为创建
        const payload: Record<string, string> = {
            message: `thought: ${created_at}`,
            content: utf8ToBase64(body),
            branch: THOUGHTS_GITHUB.branch,
        };
        if (sha) payload.sha = sha;
        const res = await fetch(API_URL, {
            method: "PUT",
            headers: githubHeaders(token),
            body: JSON.stringify(payload),
        });
        if (res.ok) return created_at;
        if ((res.status === 409 || res.status === 422) && attempt === 0) continue;
        throw new GithubError(res.status);
    }
}

function toErrorInfo(err: unknown): { message: string; reauth: boolean } {
    if (err instanceof GithubError) {
        if (err.status === 401) return { message: "Token 无效或已过期。", reauth: true };
        if (err.status === 404)
            return {
                message: `无法访问仓库:请确认 token 勾选了 ${THOUGHTS_GITHUB.owner}/${THOUGHTS_GITHUB.repo} 且 Contents 权限为 Read and write。`,
                reauth: true,
            };
        if (err.status === 403) return { message: "请求被 GitHub 限流,请稍后再试。", reauth: false };
        return { message: `GitHub API 错误(${err.status}),请稍后再试。`, reauth: false };
    }
    return {
        message: err instanceof Error ? err.message : "网络异常,请重试。",
        reauth: false,
    };
}

const TEXTAREA_CLASS =
    "flex min-h-[160px] w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

export function ThoughtComposer() {
    const [phase, setPhase] = useState<Phase>("init");
    const [tokenDraft, setTokenDraft] = useState("");
    const [tokenError, setTokenError] = useState("");
    const [validating, setValidating] = useState(false);
    const [text, setText] = useState("");
    const [error, setError] = useState<{ message: string; reauth: boolean } | null>(null);
    const [publishedAt, setPublishedAt] = useState("");
    const [recent, setRecent] = useState<ThoughtEntry[]>([]);

    // localStorage 只能在挂载后读(SSR/hydration 一致性)
    useEffect(() => {
        setPhase(localStorage.getItem(TOKEN_KEY) ? "ready" : "need_token");
    }, []);

    // 进入就绪态时拉取最近几条作为上下文(失败静默,不影响发布)
    useEffect(() => {
        if (phase !== "ready") return;
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return;
        fetchThoughtsFile(token)
            .then(({ thoughts }) => setRecent(thoughts.slice(-3).reverse()))
            .catch(() => {});
    }, [phase]);

    const saveToken = async () => {
        const token = tokenDraft.trim();
        if (!token) return;
        setValidating(true);
        setTokenError("");
        try {
            // 保存前先验证仓库访问权限(不依赖数据文件是否已存在)
            await verifyRepoAccess(token);
            localStorage.setItem(TOKEN_KEY, token);
            setTokenDraft("");
            setPhase("ready");
        } catch (err) {
            setTokenError(toErrorInfo(err).message);
        } finally {
            setValidating(false);
        }
    };

    const resetToken = () => {
        localStorage.removeItem(TOKEN_KEY);
        setError(null);
        setTokenError("");
        setPhase("need_token");
    };

    const publish = async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            setPhase("need_token");
            return;
        }
        const content = text.trim();
        if (!content) return;
        setPhase("publishing");
        setError(null);
        try {
            const createdAt = await publishThought(token, content);
            setPublishedAt(createdAt);
            setText("");
            setPhase("success");
        } catch (err) {
            // 失败保留正文,回到可编辑状态
            setError(toErrorInfo(err));
            setPhase("ready");
        }
    };

    if (phase === "init") return null;

    if (phase === "need_token") {
        return (
            <div className="flex flex-col gap-4">
                <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                    <p>首次使用需要一个 GitHub Fine-grained Token(仅保存在当前浏览器):</p>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>
                            <a
                                href="https://github.com/settings/personal-access-tokens/new"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-4 decoration-border hover:decoration-foreground"
                            >
                                创建 Token
                            </a>
                            ,Repository access 选 Only select repositories → {THOUGHTS_GITHUB.owner}/{THOUGHTS_GITHUB.repo}
                        </li>
                        <li>Permissions → Contents 选 Read and write</li>
                        <li>建议设置较短的过期时间,过期后重新生成即可</li>
                    </ol>
                </div>
                <div className="flex gap-2">
                    <Input
                        type="password"
                        placeholder="github_pat_..."
                        value={tokenDraft}
                        onChange={(e) => setTokenDraft(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") void saveToken();
                        }}
                        disabled={validating}
                    />
                    <Button
                        size="sm"
                        className="h-10"
                        onClick={() => void saveToken()}
                        disabled={validating || !tokenDraft.trim()}
                    >
                        {validating ? "验证中…" : "保存"}
                    </Button>
                </div>
                {tokenError && <p className="text-sm text-destructive">{tokenError}</p>}
            </div>
        );
    }

    const publishing = phase === "publishing";

    return (
        <div className="flex flex-col gap-3">
            {phase === "success" ? (
                <div className="flex flex-col gap-3 py-2">
                    <p className="text-sm text-foreground">
                        已发布({publishedAt})。Cloudflare Pages 构建中,约 1 分钟后生效。
                    </p>
                    <div className="flex items-center gap-4">
                        <Button size="sm" onClick={() => setPhase("ready")}>
                            再写一条
                        </Button>
                        <a href="/thoughts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            查看想法
                        </a>
                    </div>
                </div>
            ) : (
                <>
                    <textarea
                        className={TEXTAREA_CLASS}
                        placeholder="随时记录你的想法,支持 Markdown…"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                                e.preventDefault();
                                void publish();
                            }
                        }}
                        disabled={publishing}
                    />
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-mono">
                            {text.length > 0 ? `${text.length} 字` : ""}
                        </span>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground"
                                onClick={resetToken}
                                disabled={publishing}
                            >
                                重设 Token
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => void publish()}
                                disabled={publishing || !text.trim()}
                            >
                                {publishing ? "发布中…" : "发布"}
                            </Button>
                        </div>
                    </div>
                    {error && (
                        <div className="flex items-center gap-3 text-sm text-destructive">
                            <span>{error.message}</span>
                            {error.reauth && (
                                <Button variant="outline" size="sm" onClick={resetToken}>
                                    重新输入 Token
                                </Button>
                            )}
                        </div>
                    )}
                </>
            )}

            {recent.length > 0 && (
                <div className="mt-6 flex flex-col gap-y-3">
                    <h2 className="text-caption font-semibold text-muted-foreground">
                        最近发布
                    </h2>
                    {recent.map((thought) => (
                        <div key={thought.id} className="text-sm">
                            <time className="font-mono text-xs text-faint">
                                {thought.created_at.slice(0, 16)}
                            </time>
                            <p className="mt-1 whitespace-pre-wrap text-foreground line-clamp-3">
                                {thought.content}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
