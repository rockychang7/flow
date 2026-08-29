import topics from "@/data/notes-topics.json";
import { getCollection, type CollectionEntry } from "astro:content";

export type Note = CollectionEntry<"notes">;

export interface NoteTopic {
    slug: string;
    name: string;
    description: string;
}

export interface TopicGroup {
    topic: NoteTopic;
    /** 专题内按创建日期升序 = 学习顺序 */
    notes: Note[];
}

/** 专题元数据,顺序即 /notes 页的展示顺序 */
export const noteTopics: NoteTopic[] = topics;

/** 所有已发布笔记(过滤草稿);RSS 与搜索索引只认它 */
export async function getPublishedNotes(): Promise<Note[]> {
    return getCollection("notes", ({ data }) => data.draft !== true);
}

/** 列表与详情页用:生产等同已发布,开发模式含草稿(样例笔记可预览整套页面) */
export async function getVisibleNotes(): Promise<Note[]> {
    return getCollection(
        "notes",
        ({ data }) => import.meta.env.DEV || data.draft !== true
    );
}

/** 同日创建时按 order 升序、再按 id 兜底,排序结果稳定 */
function compareCreatedAsc(a: Note, b: Note): number {
    return (
        a.data.created.getTime() - b.data.created.getTime() ||
        (a.data.order ?? 0) - (b.data.order ?? 0) ||
        a.id.localeCompare(b.id)
    );
}

/** 按创建日期升序(专题页的学习顺序) */
export function sortByCreatedAsc(notes: Note[]): Note[] {
    return [...notes].sort(compareCreatedAsc);
}

/** 按创建日期倒序(散篇与 RSS) */
export function sortByCreatedDesc(notes: Note[]): Note[] {
    return [...notes].sort((a, b) => compareCreatedAsc(b, a));
}

/**
 * /notes 页的数据:有笔记的专题(按 notes-topics.json 顺序)+ 无专题的散篇。
 * 空专题不展示,笔记全下线后页面自然回到只剩页题的空态。
 */
export function groupNotes(notes: Note[]): { groups: TopicGroup[]; misc: Note[] } {
    const topicSlugs = new Set(noteTopics.map((t) => t.slug));
    const groups = noteTopics
        .map((topic) => ({
            topic,
            notes: sortByCreatedAsc(notes.filter((n) => n.data.topic === topic.slug)),
        }))
        .filter((group) => group.notes.length > 0);
    // topic 未在 notes-topics.json 登记的笔记落进散篇兜底,不允许悄悄失联
    const misc = sortByCreatedDesc(
        notes.filter((n) => !n.data.topic || !topicSlugs.has(n.data.topic))
    );
    return { groups, misc };
}

export function getTopic(slug: string): NoteTopic | undefined {
    return noteTopics.find((topic) => topic.slug === slug);
}
