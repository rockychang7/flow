import {Button} from "@/components/ui/button";
import React from "react";
import {Menu} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {ModeToggle} from "@/components/common/mode-toggle.tsx";

export function MobileMenu() {
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
        <>
            <Button ref={buttonRef} variant="ghost" onClick={() => setIsOpen(!isOpen)}><Menu/></Button>
            <div
                ref={menuRef}
                className={`absolute w-[200px] p-4 top-[64px] right-[10px] w-[200px] bg-background rounded-md shadow-2xl transition-all duration-300 ${
                    isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
                <div className="flex flex-col gap-x-2">
                    <a href="/archive">
                        <Button variant="menu" size="menu">归档</Button>
                    </a>
                    <a href="/essay">
                        <Button variant="menu" size="menu">随笔</Button>
                    </a>
                    <a href="/category">
                        <Button variant="menu" size="menu">分类</Button>
                    </a>
                    <a href="/tag">
                        <Button variant="menu" size="menu">标签</Button>
                    </a>
                    <a href="/src/pages/about">
                        <Button variant="menu" size="menu">关于</Button>
                    </a>
                    <Separator/>
                    <div className="flex gap-x-2 w-full pt-2 ">
                        <div>Github</div>
                        <div>Twitter</div>
                        <ModeToggle/>
                    </div>
                </div>
            </div>
        </>

    );
}
