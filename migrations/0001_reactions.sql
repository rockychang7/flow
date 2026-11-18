-- 想法表情回应(Cloudflare D1,binding 名 DB)
-- 应用:npx wrangler d1 execute flow-reactions --remote --file=migrations/0001_reactions.sql

-- 一行 = 某访客对某条想法点了某个表情;主键保证同一访客同一表情只算一次
CREATE TABLE IF NOT EXISTS reactions (
    thought_id INTEGER NOT NULL,
    emoji      TEXT    NOT NULL,
    visitor_id TEXT    NOT NULL,
    created_at TEXT    NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (thought_id, emoji, visitor_id)
);

CREATE INDEX IF NOT EXISTS idx_reactions_visitor ON reactions (visitor_id);

-- 写接口按 IP 限流:ip_hash 是加盐哈希,不存原始 IP;minute 为分钟级时间片
CREATE TABLE IF NOT EXISTS reaction_rate (
    ip_hash TEXT    NOT NULL,
    minute  INTEGER NOT NULL,
    hits    INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (ip_hash, minute)
);
