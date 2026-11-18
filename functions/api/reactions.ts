/**
 * 想法表情回应接口(Cloudflare Pages Functions,与站点一起部署,不经过 Astro 构建)。
 *
 * GET  /api/reactions?ids=6,5,4&v=<visitorId>  → ReactionsPayload
 * POST /api/reactions  { id, key, on, v }        → { count }
 *
 * 依赖 D1 binding `DB`(Pages 项目 Settings → Bindings 里绑定),表结构见 migrations/。
 */
import thoughts from "../../src/content/thoughts.json";
import { REACTION_KEYS, VISITOR_ID_RE, type ReactionsPayload } from "../../src/lib/reactions";

// 不引 @cloudflare/workers-types,只声明用到的那一小块 D1 接口
interface D1Result<T> {
    results: T[];
}
interface D1PreparedStatement {
    bind(...values: unknown[]): D1PreparedStatement;
    first<T>(): Promise<T | null>;
    all<T>(): Promise<D1Result<T>>;
    run(): Promise<unknown>;
}
interface D1Database {
    prepare(query: string): D1PreparedStatement;
    batch(statements: D1PreparedStatement[]): Promise<unknown[]>;
}
interface Env {
    DB: D1Database;
}
interface Context {
    request: Request;
    env: Env;
}

const THOUGHT_IDS = new Set<number>((thoughts as { id: number }[]).map((t) => t.id));
const MAX_IDS = 100;
const RATE_LIMIT_PER_MINUTE = 30;

function json(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-store",
        },
    });
}

function validVisitor(v: unknown): v is string {
    return typeof v === "string" && VISITOR_ID_RE.test(v);
}

export async function onRequestGet({ request, env }: Context): Promise<Response> {
    const url = new URL(request.url);
    const ids = (url.searchParams.get("ids") ?? "")
        .split(",")
        .map(Number)
        .filter((n) => THOUGHT_IDS.has(n))
        .slice(0, MAX_IDS);
    const payload: ReactionsPayload = { counts: {}, mine: {} };
    if (ids.length === 0) return json(payload);

    const marks = ids.map(() => "?").join(",");
    const { results } = await env.DB.prepare(
        `SELECT thought_id, emoji, COUNT(*) AS n FROM reactions WHERE thought_id IN (${marks}) GROUP BY thought_id, emoji`
    )
        .bind(...ids)
        .all<{ thought_id: number; emoji: string; n: number }>();
    for (const row of results) {
        (payload.counts[row.thought_id] ??= {})[row.emoji] = row.n;
    }

    const v = url.searchParams.get("v");
    if (validVisitor(v)) {
        const mine = await env.DB.prepare(
            `SELECT thought_id, emoji FROM reactions WHERE visitor_id = ? AND thought_id IN (${marks})`
        )
            .bind(v, ...ids)
            .all<{ thought_id: number; emoji: string }>();
        for (const row of mine.results) {
            (payload.mine[row.thought_id] ??= []).push(row.emoji);
        }
    }
    return json(payload);
}

async function hashIp(ip: string): Promise<string> {
    // 按天加盐:同一天内可用于限流,跨天无法关联,也不落原始 IP
    const day = new Date().toISOString().slice(0, 10);
    const data = new TextEncoder().encode(`${day}:${ip}`);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function onRequestPost({ request, env }: Context): Promise<Response> {
    let body: { id?: unknown; key?: unknown; on?: unknown; v?: unknown };
    try {
        body = await request.json();
    } catch {
        return json({ error: "invalid json" }, 400);
    }
    const { id, key, on, v } = body;
    if (typeof id !== "number" || !THOUGHT_IDS.has(id)) return json({ error: "unknown thought" }, 400);
    if (typeof key !== "string" || !REACTION_KEYS.includes(key)) return json({ error: "unknown reaction" }, 400);
    if (typeof on !== "boolean" || !validVisitor(v)) return json({ error: "bad request" }, 400);

    const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
    const ipHash = await hashIp(ip);
    const minute = Math.floor(Date.now() / 60000);
    const rate = await env.DB.prepare(
        `INSERT INTO reaction_rate (ip_hash, minute, hits) VALUES (?, ?, 1)
         ON CONFLICT (ip_hash, minute) DO UPDATE SET hits = hits + 1
         RETURNING hits`
    )
        .bind(ipHash, minute)
        .first<{ hits: number }>();
    if ((rate?.hits ?? 0) > RATE_LIMIT_PER_MINUTE) return json({ error: "too many requests" }, 429);

    const write = on
        ? env.DB.prepare(
              "INSERT OR IGNORE INTO reactions (thought_id, emoji, visitor_id) VALUES (?, ?, ?)"
          ).bind(id, key, v)
        : env.DB.prepare(
              "DELETE FROM reactions WHERE thought_id = ? AND emoji = ? AND visitor_id = ?"
          ).bind(id, key, v);
    const count = env.DB.prepare(
        "SELECT COUNT(*) AS n FROM reactions WHERE thought_id = ? AND emoji = ?"
    ).bind(id, key);
    // 顺手清掉 10 分钟前的限流计数,表不会无限长
    const cleanup = env.DB.prepare("DELETE FROM reaction_rate WHERE minute < ?").bind(minute - 10);
    const results = (await env.DB.batch([write, count, cleanup])) as D1Result<{ n: number }>[];
    return json({ count: results[1].results[0]?.n ?? 0 });
}
