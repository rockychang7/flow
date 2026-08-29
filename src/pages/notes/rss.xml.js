import rss from "@astrojs/rss";
import { getPublishedNotes, sortByCreatedDesc } from "@/lib/notes";

// 笔记独立 feed:按首次发布(created)出条目,日常修订不打扰订阅者
export async function GET(context) {
    const notes = sortByCreatedDesc(await getPublishedNotes());
    return rss({
        title: "rockychang's blog · 笔记",
        description: "公开的专题学习笔记,持续修订",
        site: context.site,
        items: notes.map((note) => ({
            title: note.data.title,
            pubDate: note.data.created,
            link: `/notes/${note.id}/`,
        })),
    });
}
