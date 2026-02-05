import ImageModal from "@/components/common/image-modal";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import { BookOpen, CalendarIcon, Clock } from "lucide-react";

interface BlogPostHeaderProps {
    title: string;
    publishDate: Date;
    coverImage: string | null | undefined;
    tags: string[];
    wordCount?: number;
    readingTime?: number;
}

export default function BlogPostHeader({title, publishDate, coverImage, tags, wordCount, readingTime}: BlogPostHeaderProps) {
    return (
        <div className="mb-8 lg:mb-10">
            {/* Tags (Eyebrow layout) */}
            <div className="flex gap-2 flex-wrap mb-4">
                {tags.map(tag => (
                    <Badge
                        key={tag}
                        variant="outline"
                        className="rounded-full px-2.5 py-0 text-[10px] font-medium uppercase tracking-wider border-border/60 bg-background/50 hover:bg-muted transition-colors text-muted-foreground"
                    >
                        {tag}
                    </Badge>
                ))}
            </div>

            <div className="border-l-4 border-primary pl-3 mb-4">
                <h1 className="font-serif italic font-bold text-3xl sm:text-4xl tracking-tight text-foreground leading-tight">
                    {title}
                </h1>
            </div>

            {/* Meta Info Row */}
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-6">
                {/* Date */}
                <div className="flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-primary/70" />
                    <time className="font-medium">{dayjs(publishDate).format("MMM D, YYYY")}</time>
                </div>

                {/* Separator */}
                <div className="hidden sm:block h-3 w-px bg-border/60" />

                {/* Word Count & Reading Time */}
                {(wordCount || readingTime) && (
                    <>
                        <div className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-primary/70" />
                            <span>{wordCount} words</span>
                        </div>
                        <div className="hidden sm:block h-3 w-px bg-border/60" />
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-primary/70" />
                            <span>{readingTime} min read</span>
                        </div>
                    </>
                )}
            </div>

            {coverImage && (
                <div className="relative w-full h-auto rounded-xl overflow-hidden shadow-lg border border-border/40 mb-6">
                    <ImageModal src={coverImage} alt={`Cover image for ${title}`}/>
                </div>
            )}
        </div>
    );
}
