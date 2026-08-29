#!/usr/bin/env node
/**
 * 笔记同步(npm run notes:sync):
 * 从本地 Obsidian 仓库筛选 frontmatter 带 publish: true 的笔记,
 * 校验 + 转换后镜像写入 src/content/notes/,push 前用 git diff 人工复核。
 *
 * 防线(全部白名单式,默认一律不公开):
 *   1. 只扫目录白名单,004-projects 等私人目录连读都不读
 *   2. 只认显式 publish: true
 *   3. 个人事务 tag(工作/面试/简历)黑名单兜底
 *   4. 本机路径/内部协议泄露检测,命中即拒绝
 * 任何一篇校验失败则整体不写入(all-or-nothing),修完再跑。
 *
 * 转换(AST 级,不碰代码块里的 [[Prototype]] 这类字面量):
 *   - 去掉开头与文题重复的一级标题(正文从 ## 起)
 *   - wikilink:目标也在本次公开集内 → 站内链接;否则降级为纯文本
 *   - callout(> [!tip])原样保留,由站点构建期的 remark-callouts 渲染
 *   - 旧式 ad-* 围栏 / MDX / 本地图片或嵌入 / mermaid / 数学公式:拒绝导出,提示手动处理
 *
 * 镜像语义:源头去掉 publish 标记后重跑,flow 侧文件会被删除;
 * 只删带 synced: true 标记的文件,手写样例(草稿)不受影响。
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import remarkParse from "remark-parse";
import { unified } from "unified";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "src", "content", "notes");
const TOPICS_FILE = path.join(ROOT, "src", "data", "notes-topics.json");
const VAULT = process.env.NOTES_VAULT_PATH ?? "E:/personal/004-resource-project/notes";

const ALLOWED_DIRS = ["001-reading", "002-knowledge", "003-reference", "005-blog"];
const TAG_BLACKLIST = ["工作", "面试", "简历"];
// 正反斜杠都拦:Windows 工具输出反斜杠,Obsidian/终端常见正斜杠
const LEAK_PATTERNS = [
    { re: /[A-Za-z]:[\\/]Users[\\/]/, label: "本机用户路径" },
    { re: /[A-Za-z]:[\\/]personal[\\/]/i, label: "本机盘符路径" },
    { re: /\bcci:/, label: "cci: 内部协议" },
    { re: /\bfile:\/\/\//, label: "file:/// 本地协议" },
];
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const parser = unified().use(remarkParse);

main();

function main() {
    if (!fs.existsSync(VAULT)) {
        console.error(`笔记仓库不存在: ${VAULT}(可用环境变量 NOTES_VAULT_PATH 覆盖)`);
        process.exit(1);
    }
    const topics = JSON.parse(fs.readFileSync(TOPICS_FILE, "utf8"));
    const topicSlugs = new Set(topics.map((t) => t.slug));
    const reservedSlugs = new Set([...topicSlugs, "index", "rss"]);

    // 路径配错防线:一个白名单目录都找不到时拒绝执行,
    // 否则"零候选"会触发镜像删除,把已同步笔记一次删光
    const existingDirs = ALLOWED_DIRS.filter((d) => fs.existsSync(path.join(VAULT, d)));
    if (existingDirs.length === 0) {
        console.error(
            `${VAULT} 下找不到任何白名单目录(${ALLOWED_DIRS.join(" / ")}),` +
            "像是路径配错了,拒绝执行以免误删已同步笔记。"
        );
        process.exit(1);
    }

    // 1. 白名单目录里收集打了 publish: true 的笔记
    const candidates = [];
    for (const dir of existingDirs) {
        const abs = path.join(VAULT, dir);
        for (const file of collectMarkdownFiles(abs)) {
            const raw = fs.readFileSync(file, "utf8");
            let parsed;
            try {
                parsed = matter(raw);
            } catch (e) {
                // frontmatter 都解析不了的笔记必然没有合法的 publish 标记,跳过
                continue;
            }
            if (parsed.data?.publish !== true) continue;
            // rel 统一正斜杠:git pathspec 里反斜杠是转义字符,Windows 下会匹配不到提交
            const rel = path.relative(VAULT, file).split(path.sep).join("/");
            candidates.push({ file, rel, data: parsed.data, content: parsed.content });
        }
    }

    if (candidates.length === 0) {
        const removed = mirrorDelete(new Set());
        console.log(`没有找到 publish: true 的笔记(扫描范围: ${VAULT} 下的 ${ALLOWED_DIRS.join(" / ")})。`);
        if (removed.length > 0) {
            console.log(`镜像删除 ${removed.length} 篇已取消标记的笔记:`);
            for (const s of removed) console.log(`  - ${s}`);
            console.log("\n提交前请过一遍 git diff。");
        }
        return;
    }

    // 2. 校验
    const errors = [];
    const slugSeen = new Map();
    for (const note of candidates) {
        const errs = validate(note, topicSlugs, reservedSlugs);
        const slug = note.data.slug;
        if (typeof slug === "string" && SLUG_RE.test(slug)) {
            if (slugSeen.has(slug)) {
                errs.push(`slug "${slug}" 与 ${slugSeen.get(slug)} 重复`);
            } else {
                slugSeen.set(slug, note.rel);
            }
        }
        if (errs.length > 0) errors.push({ rel: note.rel, errs });
    }
    if (errors.length > 0) {
        console.error("以下笔记未通过校验,本次未写入任何文件:\n");
        for (const { rel, errs } of errors) {
            console.error(`  ${rel}`);
            for (const e of errs) console.error(`    - ${e}`);
        }
        process.exit(1);
    }

    // 3. 建索引(文件名主干 + 标题 → slug,以及 slug → 标题),供 wikilink 解析
    const index = new Map();
    const titleBySlug = new Map();
    for (const note of candidates) {
        const stem = path.basename(note.file, path.extname(note.file));
        index.set(stem.toLowerCase(), note.data.slug);
        if (note.data.title) {
            index.set(String(note.data.title).toLowerCase(), note.data.slug);
            titleBySlug.set(note.data.slug, String(note.data.title));
        }
    }
    index.titleBySlug = titleBySlug;

    // 4. 转换并写入
    const results = { added: [], updated: [], unchanged: [] };
    fs.mkdirSync(OUT_DIR, { recursive: true });
    const outputs = candidates.map((note) => buildOutput(note, index));

    // 转换后兜底:不允许任何 [[ 残留在正文文本里(跨节点的复杂写法要求手动改)
    for (const out of outputs) {
        if (hasWikilinkResidue(out.body)) {
            console.error(`  ${out.rel}\n    - 存在无法自动转换的 [[wikilink]] 写法,请手动改写后再跑`);
            process.exit(1);
        }
    }

    for (const out of outputs) {
        const target = path.join(OUT_DIR, `${out.slug}.md`);
        if (!fs.existsSync(target)) {
            fs.writeFileSync(target, out.text);
            results.added.push(out.slug);
        } else if (fs.readFileSync(target, "utf8") !== out.text) {
            fs.writeFileSync(target, out.text);
            results.updated.push(out.slug);
        } else {
            results.unchanged.push(out.slug);
        }
    }

    // 5. 镜像删除:源头取消标记的笔记从 flow 侧移除
    const removed = mirrorDelete(new Set(outputs.map((o) => o.slug)));

    console.log(
        `同步完成:新增 ${results.added.length} / 更新 ${results.updated.length}` +
        ` / 不变 ${results.unchanged.length} / 删除 ${removed.length}`
    );
    for (const s of results.added) console.log(`  + ${s}`);
    for (const s of results.updated) console.log(`  ~ ${s}`);
    for (const s of removed) console.log(`  - ${s}`);
    if (results.added.length + results.updated.length + removed.length > 0) {
        console.log("\n提交前请过一遍 git diff,确认要公开的就是这些内容。");
    }
}

function collectMarkdownFiles(dir) {
    const files = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name.startsWith(".")) continue;
        const abs = path.join(dir, entry.name);
        if (entry.isDirectory()) files.push(...collectMarkdownFiles(abs));
        else if (entry.isFile() && entry.name.endsWith(".md")) files.push(abs);
    }
    return files;
}

function validate(note, topicSlugs, reservedSlugs) {
    const errs = [];
    const { data, content } = note;

    if (!data.title || typeof data.title !== "string") errs.push("缺少 title");
    if (typeof data.slug !== "string" || !SLUG_RE.test(data.slug)) {
        errs.push('缺少合法 slug(小写英文/数字/短横线,如 slug: agent-memory)');
    } else if (reservedSlugs.has(data.slug)) {
        errs.push(`slug "${data.slug}" 与专题或保留路径冲突,换一个`);
    }
    if (data.topic != null && !topicSlugs.has(data.topic)) {
        errs.push(`topic "${data.topic}" 不在 src/data/notes-topics.json 里,先登记专题`);
    }
    const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
    for (const tag of tags) {
        if (TAG_BLACKLIST.some((b) => tag === b || tag.startsWith(`${b}/`))) {
            errs.push(`带个人事务 tag "${tag}",拒绝公开`);
        }
    }

    // 代码围栏配平(未闭合会让后文整段变成代码,渲染必然出错)
    const fenceCount = (content.match(/^ {0,3}(```|~~~)/gm) ?? []).length;
    if (fenceCount % 2 !== 0) errs.push("代码围栏(``` 或 ~~~)未闭合");

    for (const { re, label } of LEAK_PATTERNS) {
        const m = re.exec(content);
        if (m) errs.push(`正文含${label}(${m[0]}…),清理后再公开`);
    }

    let h1Count = 0;
    let h6Count = 0;
    const tree = parser.parse(content);
    walk(tree, (node) => {
        if (node.type === "code") {
            if (node.lang === "mermaid") errs.push("含 mermaid 图,站点暂不渲染,先移除或转成图片外链");
            if (node.lang?.startsWith("ad-")) errs.push(`含旧式 ${"```"}${node.lang} 围栏,请改成 > [!type] 写法`);
        }
        if (node.type === "text") {
            if (node.value.includes("![[")) errs.push("含 ![[…]] 本地嵌入,请改成图床外链或删除");
            if (node.value.includes("$$")) errs.push("含 $$ 数学公式,站点暂不渲染");
        }
        if (node.type === "image" && !/^https?:\/\//.test(node.url)) {
            errs.push(`含非外链图片(${node.url}),只允许 https 图床外链`);
        }
        if (node.type === "definition" && !/^https?:\/\/|^#|^\//.test(node.url)) {
            errs.push(`含本地引用定义(${node.url})`);
        }
        if (node.type === "html" && /<script|<[A-Z][A-Za-z]*/.test(node.value)) {
            errs.push("含 script 或 MDX 组件写法,请手动处理");
        }
        if (node.type === "paragraph") {
            const first = node.children?.[0];
            if (first?.type === "text" && /^import .+ from /.test(first.value)) {
                errs.push("含 MDX import,请手动处理");
            }
        }
        if (node.type === "heading") {
            if (content[node.position?.start?.offset] !== "#") {
                errs.push("使用了下划线式(setext)标题,无法机械降级,请改成 # 风格");
            }
            if (node.depth === 1) h1Count += 1;
            if (node.depth === 6) h6Count += 1;
        }
    });
    // 正文有 H1 时整体降一级(见 buildOutput),已有 H6 会被挤出字阶
    if (h1Count > 0 && h6Count > 0) {
        errs.push("同时存在一级与六级标题,整体降级会溢出,请手动调整层级");
    }

    return errs;
}

function buildOutput(note, index) {
    const { data, content } = note;
    const tree = parser.parse(content);
    const edits = [];

    // 标题策略:开头与文题重复的 H1 直接删掉(页面唯一 h1 来自 frontmatter title);
    // 正文若还有 H1(笔记里常用 # 当章节),全部标题整体降一级,对齐"正文从 ## 起"
    const headings = [];
    walk(tree, (node) => {
        if (node.type === "heading") headings.push(node);
    });
    const first = tree.children[0];
    const firstIsDupTitle =
        first?.type === "heading" &&
        first.depth === 1 &&
        nodeText(first).trim() === String(data.title).trim();
    if (firstIsDupTitle) {
        edits.push({ start: first.position.start.offset, end: first.position.end.offset, text: "" });
    }
    const needDemote = headings.some((h) => h.depth === 1 && !(firstIsDupTitle && h === first));
    if (needDemote) {
        for (const h of headings) {
            if (firstIsDupTitle && h === first) continue;
            edits.push({ start: h.position.start.offset, end: h.position.start.offset, text: "#" });
        }
    }

    // wikilink:文本节点内按位置精确替换,代码块天然不受影响
    walk(tree, (node) => {
        if (node.type !== "text" || node.position?.start?.offset == null) return;
        const base = node.position.start.offset;
        const re = /\[\[([^\[\]]+)\]\]/g;
        let m;
        while ((m = re.exec(node.value)) !== null) {
            const start = base + m.index;
            const end = start + m[0].length;
            // 转义等场景下 AST 值与源文偏移不一致时跳过,交给残留检查兜底
            if (content.slice(start, end) !== m[0]) continue;
            edits.push({ start, end, text: renderWikilink(m[1], index) });
        }
    });

    let body = applyEdits(content, edits).replace(/^\s+/, "");
    if (!body.endsWith("\n")) body += "\n";

    const rel = note.rel;
    const created = resolveCreated(note);
    const updated = resolveUpdated(note);
    const sourceUrl =
        typeof data["文章来源"] === "string" && /^https?:\/\//.test(data["文章来源"])
            ? data["文章来源"]
            : null;

    const fmLines = [
        "---",
        `title: ${JSON.stringify(data.title)}`,
        ...(data.topic ? [`topic: ${JSON.stringify(data.topic)}`] : []),
        `created: ${created}`,
        `updated: ${updated}`,
        // 可选排序权重:同日创建的笔记按 order 升序排(如全书总览排在分章之前)
        ...(typeof data.order === "number" ? [`order: ${data.order}`] : []),
        ...(sourceUrl ? [`source_url: ${JSON.stringify(sourceUrl)}`] : []),
        "draft: false",
        "synced: true",
        "---",
        "",
    ];
    return { slug: data.slug, rel, body, text: fmLines.join("\n") + body };
}

function renderWikilink(inner, index) {
    const pipe = inner.indexOf("|");
    const targetPart = (pipe >= 0 ? inner.slice(0, pipe) : inner).trim();
    const alias = pipe >= 0 ? inner.slice(pipe + 1).trim() : "";
    const target = targetPart.split("#")[0].trim();
    const slug = index.get(path.basename(target).toLowerCase());
    // 目标未公开 → 优雅降级为纯文本
    if (!slug) return alias || target;
    // 目标也公开 → 站内链接;没写别名时链接文字用目标笔记的标题,不用带日期的文件名
    const label = alias || index.titleBySlug.get(slug) || target;
    return `[${label}](/notes/${slug})`;
}

function hasWikilinkResidue(body) {
    let residue = false;
    walk(parser.parse(body), (node) => {
        if (node.type === "text" && node.value.includes("[[")) residue = true;
    });
    return residue;
}

function applyEdits(text, edits) {
    let result = text;
    for (const { start, end, text: replacement } of [...edits].sort((a, b) => b.start - a.start)) {
        result = result.slice(0, start) + replacement + result.slice(end);
    }
    return result;
}

function resolveCreated(note) {
    const stem = path.basename(note.file, path.extname(note.file));
    const fromName = /^(\d{4}-\d{2}-\d{2})/.exec(stem);
    if (fromName) return fromName[1];
    const fromGit = git(["log", "--diff-filter=A", "--follow", "--format=%ad", "--date=short", "--", note.rel]);
    const firstCommit = fromGit.split("\n").filter(Boolean).at(-1);
    return firstCommit ?? resolveUpdated(note);
}

function resolveUpdated(note) {
    const fromGit = git(["log", "-1", "--format=%ad", "--date=short", "--", note.rel]);
    if (fromGit) return fromGit.split("\n")[0];
    return new Date(fs.statSync(note.file).mtime).toISOString().slice(0, 10);
}

function git(args) {
    try {
        return execFileSync("git", args, { cwd: VAULT, encoding: "utf8" }).trim();
    } catch {
        return "";
    }
}

function mirrorDelete(keepSlugs) {
    if (!fs.existsSync(OUT_DIR)) return [];
    const removed = [];
    for (const name of fs.readdirSync(OUT_DIR)) {
        if (!name.endsWith(".md")) continue;
        const abs = path.join(OUT_DIR, name);
        const slug = name.slice(0, -3);
        if (keepSlugs.has(slug)) continue;
        let parsed;
        try {
            parsed = matter(fs.readFileSync(abs, "utf8"));
        } catch {
            continue;
        }
        // 只镜像删除同步脚本自己生成的文件,手写样例不受影响
        if (parsed.data?.synced === true) {
            fs.unlinkSync(abs);
            removed.push(slug);
        }
    }
    return removed;
}

function walk(node, fn) {
    fn(node);
    if (node.children) for (const child of node.children) walk(child, fn);
}

function nodeText(node) {
    let text = "";
    walk(node, (n) => {
        if (n.type === "text" || n.type === "inlineCode") text += n.value;
    });
    return text;
}
