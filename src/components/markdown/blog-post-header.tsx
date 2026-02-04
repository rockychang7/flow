import dayjs from "dayjs";
import {DATETIME_FORMAT} from "@/constant/constants.ts";
import ImageModal from "@/components/common/image-modal";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, TagIcon } from "lucide-react";

interface BlogPostHeaderProps {
    title: string;
    publishDate: Date;
    coverImage: string | null | undefined;
    tags: string[];
}

export default function BlogPostHeader({title, publishDate, coverImage, tags}: BlogPostHeaderProps) {
    return (
        <div className="mb-10 lg:mb-14">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-foreground leading-tight">
                {title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground mb-8">
                <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="w-4 h-4 text-primary/70" />
                    <time className="font-medium">{dayjs(publishDate).format(DATETIME_FORMAT)}</time>
                </div>

                <div className="hidden sm:block h-3 w-px bg-border/60" />

                <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5 text-sm">
                        <TagIcon className="w-4 h-4 text-primary/70" />
                        <span className="sr-only">Tags:</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {tags.map(tag => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="hover:bg-secondary/80 px-2 py-0.5 text-xs font-normal transition-colors"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            {coverImage && (
                <div className="relative w-full h-auto rounded-xl overflow-hidden shadow-lg border border-border/40 mb-10">
                    <ImageModal src={coverImage} alt={`Cover image for ${title}`}/>
                </div>
            )}
        </div>
    );
}
