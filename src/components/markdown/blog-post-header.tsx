import {CalendarIcon, TagIcon} from "lucide-react";
import dayjs from "dayjs";
import {DATE_FORMAT} from "@/constant/constants.ts";
import ImageModal from "@/components/common/image-modal";

interface BlogPostHeaderProps {
    title: string;
    publishDate: Date;
    coverImage: string;
    tags: string[];
}

export default function BlogPostHeader({title, publishDate, coverImage, tags}: BlogPostHeaderProps) {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold pb-4">{title}</h1>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-gray-600">
                    <CalendarIcon className="w-4 h-4 mr-2"/>
                    <time>
                        {dayjs(publishDate).format(DATE_FORMAT)}
                    </time>
                </div>
                <div className="flex items-center space-x-2">
                    <TagIcon className="w-4 h-4 text-gray-600"/>
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
                        >
              {tag}
            </span>
                    ))}
                </div>
            </div>

            <div className="relative w-full border rounded-sm h-96 rounded-lg">
                <ImageModal src={coverImage} alt={`Cover image for ${title}`}/>
            </div>
        </div>
    );
}

