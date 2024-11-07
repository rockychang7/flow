import {Badge} from "@/components/ui/badge";
import {Tag} from "lucide-react";

// @ts-ignore
function BadgeTag({categoryName, url}) {
    return (
        <a href={url}>
            <Badge variant="default" className="text-sm rounded-sm shadow-md">
                <Tag size={18} className="text-sm"/> <span>{categoryName}</span>
            </Badge>
        </a>
    );
}

export default BadgeTag;