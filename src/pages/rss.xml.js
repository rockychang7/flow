import rss from "@astrojs/rss";
import { getPublishedArticles, sortByDateDesc } from "@/lib/articles";

export async function GET(context) {
    const articles = sortByDateDesc(await getPublishedArticles());
    return rss({
        title: "rockychang's blog",
        description: "an indie hacker writing about AI, Programming and stuff",
        site: context.site,
        items: articles.map((post) => ({
            title: post.data.title,
            pubDate: post.data.publish_date,
            description: post.data.description,
            link: `/articles/${post.id}/`,
        })),
    });
}
