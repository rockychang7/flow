import React from "react";
import {Archive, FolderOpen, Tags, User} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// 图标映射
const iconMap: Record<string, React.ElementType> = {
    Archive: Archive,
    FolderOpen: FolderOpen,
    Tags: Tags,
    User: User,
};

interface HeaderNavItemProps {
    menuName: string;
    menuLink: string;
    menuIcon: string;
}

export function HeaderNavItem({menuName, menuLink, menuIcon}: HeaderNavItemProps) {
    const IconComponent = iconMap[menuIcon];

    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <a
                        href={menuLink}
                        className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
                        aria-label={menuName}
                    >
                        <IconComponent className="w-5 h-5 text-primary"/>
                    </a>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                    {menuName}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
