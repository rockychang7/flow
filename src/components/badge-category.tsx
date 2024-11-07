import {Badge} from "@/components/ui/badge";
import {CategoryIcon} from "@/components/icons/category-icons";

// @ts-ignore
function BadgeCategory({categoryName, url}) {
    return (
        <a href={url}>
            <Badge variant="default" className="text-sm rounded-sm shadow-md">
                <CategoryIcon className="text-xl"/> <span>{categoryName}</span>
            </Badge>
        </a>
    );
}

export default BadgeCategory;