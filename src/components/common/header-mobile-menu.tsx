import {Button} from "@/components/ui/button.tsx";
import React from "react";
import {Menu, Github, Twitter} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {ModeToggle} from "@/components/common/mode-toggle.tsx";
import {menuInfo} from "@/data/menu-info";
import {mediaLinkInfo} from "@/data/media-link-info";

export function HeaderMobileMenu() {
    const [isOpen, setIsOpen] = React.useState(false);
    const menuRef = React.useRef(null);
    const buttonRef = React.useRef(null);

    React.useEffect(() => {
        // @ts-ignore
        function handleClickOutside(event) {
            // @ts-ignore
            if (isOpen && menuRef.current && !menuRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
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
            <Button ref={buttonRef} variant="ghost" onClick={() => setIsOpen(!isOpen)}><Menu/></Button>
            <div
                ref={menuRef}
                className={`absolute z-40 w-[200px] border p-4 top-[60px] right-4 w-[200px] bg-background rounded-md shadow-xl transition-all duration-300 ${
                    isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
                <div className="flex flex-col gap-y-1">
                    {menuInfo.map((item, index) => (
                        <a href={item.menuLink}>
                            <Button className="hover:underline" variant="menu" size="menu">{item.menuName}</Button>
                        </a>
                    ))}
                    <Separator/>
                    <div className="flex gap-x-2 w-full pt-2 ">
                        <a target="_blank" href={mediaLinkInfo.Github}>
                            <Github className="text-primary"/>
                        </a>
                        <a target="_blank" href={mediaLinkInfo.Twitter}>
                            <Twitter className="text-primary"/>
                        </a>
                        <ModeToggle/>
                    </div>
                </div>
            </div>
        </div>

    );
}
