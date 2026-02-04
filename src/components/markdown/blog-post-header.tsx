import dayjs from "dayjs";
import {DATETIME_FORMAT} from "@/constant/constants.ts";
import ImageModal from "@/components/common/image-modal";

interface BlogPostHeaderProps {
    title: string;
    publishDate: Date;
    coverImage: string | null | undefined;
    tags: string[];
}

export default function BlogPostHeader({title, publishDate, coverImage, tags}: BlogPostHeaderProps) {
    return (
        <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-foreground">{title}</h1>

            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <time>{dayjs(publishDate).format(DATETIME_FORMAT)}</time>
                <span className="text-muted-foreground/40">•</span>
                <div className="flex items-center gap-2">
                    {tags.map((tag, index) => (
                        <div key={tag} className="flex items-center gap-2">
                            {index > 0 && <span className="text-muted-foreground/40">/</span>}
                            <span>{tag}</span>
                        </div>
                    ))}
                </div>
            </div>

            {coverImage && (
                <div className="relative w-full h-auto mt-8 rounded-sm overflow-hidden">
                    <ImageModal src={coverImage} alt={`Cover image for ${title}`}/>
                </div>
            )}
        </div>
    );
}
