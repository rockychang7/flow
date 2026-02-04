import {Button} from "@/components/ui/button.tsx";
import React from "react";
import {Menu, Github, Twitter, Archive, FolderOpen, Tags, User, X} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {menuInfo} from "@/data/menu-info";
import {mediaLinkInfo} from "@/data/media-link-info";

// 图标映射
const iconMap: Record<string, React.ElementType> = {
    Archive: Archive,
    FolderOpen: FolderOpen,
    Tags: Tags,
    User: User,
};

export function HeaderMobileMenu() {
    const [isOpen, setIsOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="md:hidden">
            <Button
                ref={buttonRef}
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="relative"
            >
                <Menu className={`h-5 w-5 transition-all duration-200 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}/>
                <X className={`absolute h-5 w-5 transition-all duration-200 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}/>
            </Button>
            <div
                ref={menuRef}
                className={`absolute z-40 border p-4 top-15 right-4 w-55 bg-background/95 backdrop-blur-sm rounded-xl shadow-xl transition-all duration-300 ${
                    isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
            >
                <div className="flex flex-col gap-y-1">
                    {menuInfo.map((item, index) => {
                        const IconComponent = iconMap[item.menuIcon];
                        return (
                            <a key={index} href={item.menuLink} onClick={() => setIsOpen(false)}>
                                <Button
                                    className="w-full justify-start gap-x-3 hover:bg-muted"
                                    variant="ghost"
                                >
                                    {IconComponent && <IconComponent className="h-4 w-4 text-primary"/>}
                                    <span>{item.menuName}</span>
                                </Button>
                            </a>
                        );
                    })}
                    <Separator className="my-2"/>
                    <div className="flex gap-x-3 w-full pt-1 px-2">
                        <a
                            target="_blank"
                            href={mediaLinkInfo.Github}
                            className="p-2 rounded-full hover:bg-muted transition-colors"
                        >
                            <Github className="h-5 w-5 text-primary"/>
                        </a>
                        <a
                            target="_blank"
                            href={mediaLinkInfo.Twitter}
                            className="p-2 rounded-full hover:bg-muted transition-colors"
                        >
                            <Twitter className="h-5 w-5 text-primary"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
