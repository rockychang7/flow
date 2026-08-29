import { getPublishedArticles } from "@/lib/articles";
import { getPublishedNotes, getTopic } from "@/lib/notes";
import type { SearchItem } from "@/type/search";

export async function generateSearchData(): Promise<SearchItem[]> {
    const posts = await getPublishedArticles();
    const notes = await getPublishedNotes();
    return [
        ...posts.map((post) => ({
            title: post.data.title,
            content: post.data.description,
            url: `/articles/${post.id}`,
            tags: post.data.tags,
        })),
        ...notes.map((note) => ({
            title: note.data.title,
            content: (note.data.topic && getTopic(note.data.topic)?.name) || "笔记",
            url: `/notes/${note.id}`,
            tags: [],
        })),
    ];
}
