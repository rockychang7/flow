import { getCollection, type CollectionEntry } from "astro:content";

export type Article = CollectionEntry<"articles">;

/** 所有已发布文章(过滤草稿) */
export async function getPublishedArticles(): Promise<Article[]> {
    return getCollection("articles", ({ data }) => data.draft !== true);
}

/** 按发布日期倒序排列 */
export function sortByDateDesc(articles: Article[]): Article[] {
    return [...articles].sort(
        (a, b) => b.data.publish_date.getTime() - a.data.publish_date.getTime()
    );
}
