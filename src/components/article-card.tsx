import dayjs from "dayjs";
import {DATE_FORMAT} from "@/constant/constants.ts";

// @ts-ignore
export default function ArticleCard({post}) {
    return (
        <article className="group relative overflow-hidden rounded-lg">
            <a href={`/articles/${post.slug}`} className="absolute inset-0 z-10">
                <span className="sr-only">{post.data.title}</span>
            </a>
            <div className="bg-background dark:border-stone-800 rounded-lg border border-t-8 border-t-primary p-2 md:p-2 h-full">
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-foreground group-hover:text-primary">
                    {post.data.title}
                </h3>
                <div
                    className="mb-2 text-sm text-muted-foreground">{dayjs(post.data.publish_date).format(DATE_FORMAT)}</div>

                <p className="hidden md:block text-xs text-muted-foreground">
                    {post.data.description}
                </p>
            </div>
        </article>
    )
}

