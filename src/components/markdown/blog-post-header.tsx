import {CalendarIcon, TagIcon} from "lucide-react";
import dayjs from "dayjs";
import {DATETIME_FORMAT} from "@/constant/constants.ts";
import ImageModal from "@/components/common/image-modal";
import {Separator} from "@/components/ui/separator";

interface BlogPostHeaderProps {
    title: string;
    publishDate: Date;
    coverImage: string | null | undefined;
    tags: string[];
}

export default function BlogPostHeader({title, publishDate, coverImage, tags}: BlogPostHeaderProps) {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold pb-4">{title}</h1>
            <div className="flex items-center justify-start  gap-x-2 mb-4">
                <div className="flex items-center space-x-1">
                    <TagIcon className="w-4 h-4 bg-secondary text-secondary-foreground"/>
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-gray-200 bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
                        >
              {tag}
            </span>
                    ))}
                </div>
                <Separator orientation="vertical" className="h-4 bg-primary"/>
                <div className="flex items-center pl-1 text-muted-foreground">
                    <CalendarIcon className="w-4 h-4  mr-2"/>
                    <time>
                        {dayjs(publishDate).format(DATETIME_FORMAT)}
                    </time>
                </div>

            </div>

            {coverImage && <div className="relative w-full border rounded-sm h-96 rounded-lg">
                <ImageModal src={coverImage} alt={`Cover image for ${title}`}/>
            </div>}

        </div>
    );
}

