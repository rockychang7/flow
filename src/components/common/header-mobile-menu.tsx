import { Button } from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mediaLinkInfo } from "@/data/media-link-info";
import { menuInfo } from "@/data/menu-info";
import { Archive, FolderOpen, Github, Menu, Tags, Twitter, User } from "lucide-react";
import React, { useState } from "react";

// 图标映射
const iconMap: Record<string, React.ElementType> = {
    Archive: Archive,
    FolderOpen: FolderOpen,
    Tags: Tags,
    User: User,
};

export function HeaderMobileMenu() {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden relative outline-none ring-0 focus-visible:ring-0">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" sideOffset={8} className="w-64 rounded-xl bg-background/90 backdrop-blur-xl border-border/40 shadow-xl p-2">
                {menuInfo.map((item, index) => {
                    const IconComponent = iconMap[item.menuIcon];
                    return (
                        <DropdownMenuItem key={index} asChild className="rounded-lg py-3 focus:bg-muted/70 cursor-pointer">
                            <a href={item.menuLink} className="flex items-center gap-3 w-full">
                                {IconComponent && <IconComponent className="h-4 w-4 opacity-70" />}
                                <span className="text-base font-medium">{item.menuName}</span>
                            </a>
                        </DropdownMenuItem>
                    );
                })}

                <DropdownMenuSeparator className="bg-border/40 my-2" />

                <div className="flex items-center justify-start gap-4 py-2 px-2">
                    <a
                        target="_blank"
                        href={mediaLinkInfo.Github}
                        className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted/50 rounded-full"
                    >
                        <Github className="h-5 w-5" />
                    </a>
                    <a
                        target="_blank"
                        href={mediaLinkInfo.Twitter}
                        className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted/50 rounded-full"
                    >
                        <Twitter className="h-5 w-5" />
                    </a>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
