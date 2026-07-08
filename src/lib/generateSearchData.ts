import { getPublishedArticles } from "@/lib/articles";
import type { SearchItem } from "@/type/search";

export async function generateSearchData(): Promise<SearchItem[]> {
    const posts = await getPublishedArticles();
    return posts.map((post) => ({
        title: post.data.title,
        content: post.data.description,
        url: `/articles/${post.id}`,
        tags: post.data.tags,
    }));
}
