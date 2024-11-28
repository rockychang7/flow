import {ArrowRight} from "lucide-react";
import dayjs from "dayjs";
import {DATE_FORMAT} from "@/constant/constants.ts";

export default function ArticleCard({post}: { post: any }) {
    return (
        <div
            className="group relative bg-card text-card-foreground rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div
                className="absolute top-0 left-0 w-2 h-full bg-primary transform origin-left scale-y-100 md:scale-y-0 md:group-hover:scale-y-100 transition-transform duration-400"></div>
            <div className="p-6">
                <a href={`/articles/${post.slug}`} className="block">
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{post.data.title}</h2>
                </a>
                <p className="text-muted-foreground mb-4">{post.data.description}</p>
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
          <span className="font-medium bg-primary/10 text-primary px-2 py-1 rounded">
            {post.data.category}
          </span>
                    <time dateTime={post.data.publish_date}>
                        {dayjs(post.data.publish_date).format(DATE_FORMAT)}
                    </time>
                </div>
                <a
                    href={`/articles/${post.slug}`}
                    className="inline-flex items-center text-primary hover:underline"
                >
                    阅读全文 <ArrowRight className="ml-2 h-4 w-4"/>
                </a>
            </div>
        </div>
    );
}