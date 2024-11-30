import {TagIcon} from "lucide-react";

interface TagBadgeProps {
    name: string
    count: number
    slug: string
}

export default function TagBadge({name, count, slug}: TagBadgeProps) {
    return (
        <a
            href={slug}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
            <TagIcon className="w-4 h-4 mr-2"/>
            {name}
            <span className="ml-2 bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs">
        {count}
      </span>
        </a>
    )
}

