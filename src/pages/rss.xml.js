import rss from "@astrojs/rss";
import {getCollection} from "astro:content";

export async function GET(context) {
    const blog = await getCollection("articles");
    return rss({
        title: "rockychang's blog",
        description: "an indie hacker writing about AI, Programming and stuff",
        site: context.site,
        items: blog.map((post) => ({
            title: post.data.title,
            publish_date: post.data.publish_date,
            description: post.data.description,
            link: `/articles/${post.slug}/`,
        })),
    });
}