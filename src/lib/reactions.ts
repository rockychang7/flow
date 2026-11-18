/**
 * 想法表情回应的表情清单 —— 前端组件与 functions/api/reactions.ts 共用,改这里两边同步。
 * key 是接口与数据库里存的值(不存 emoji 字符本身,避免变体选择符等编码差异);
 * 素材为 Google Noto Animated Emoji(CC BY 4.0),放在 public/reactions/{key}.svg|webp(静态图标 | 动图特效)。
 */
export const REACTIONS = [
    { key: "like", label: "赞" },
    { key: "heart", label: "喜欢" },
    { key: "fire", label: "太火了" },
    { key: "joy", label: "笑死" },
    { key: "think", label: "有想法" },
    { key: "mindblown", label: "震撼" },
    { key: "party", label: "庆祝" },
    { key: "eyes", label: "围观" },
] as const;

export type ReactionKey = (typeof REACTIONS)[number]["key"];

export const REACTION_KEYS: readonly string[] = REACTIONS.map((r) => r.key);

/** GET 返回体:counts 只含计数 > 0 的项;mine 是当前访客点过的 key */
export interface ReactionsPayload {
    counts: Record<string, Record<string, number>>;
    mine: Record<string, string[]>;
}

/** 访客匿名编号格式(浏览器 crypto.randomUUID 生成) */
export const VISITOR_ID_RE = /^[0-9a-f-]{36}$/;
