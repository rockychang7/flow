import React, {useEffect, useState} from "react";
import {ArrowUp} from "lucide-react";
import {scrollBehavior} from "@/lib/utils";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    // 监听滚动事件
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
                setShouldRender(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    // 动画结束后移除DOM
    const handleAnimationEnd = () => {
        if (!isVisible) {
            setShouldRender(false);
        }
    };

    // 滚动到顶部的函数
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: scrollBehavior()
        });
    };

    return (
        <>
            {shouldRender && (
                <button
                    onClick={scrollToTop}
                    onAnimationEnd={handleAnimationEnd}
                    className={`
                        fixed bottom-6 right-6 md:bottom-8 md:right-8
                        flex items-center justify-center size-12
                        rounded-full border border-border bg-background/50 backdrop-blur-[16px]
                        text-muted-foreground cursor-pointer
                        hover:text-foreground
                        transition-[color,opacity] duration-150
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-ring z-40
                        ${isVisible
                        ? "animate-fade-in opacity-100"
                        : "opacity-0 pointer-events-none"
                    }
                    `}
                    aria-label="Back to top"
                >
                    <ArrowUp className="size-5"/>
                </button>
            )}
        </>
    );
};

export default BackToTop;