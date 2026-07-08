import React, {useEffect, useState} from "react";
import {ArrowUp} from "lucide-react";

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
            behavior: "smooth"
        });
    };

    return (
        <>
            {shouldRender && (
                <button
                    onClick={scrollToTop}
                    onAnimationEnd={handleAnimationEnd}
                    className={`
                        fixed bottom-6 right-4 md:bottom-8 md:right-8 xl:right-[max(2rem,calc(50%-640px))]
                        flex items-center justify-center size-12
                        rounded-full border border-border/60 bg-background/80 backdrop-blur-sm
                        text-muted-foreground shadow-lg
                        hover:text-foreground hover:shadow-xl active:scale-95
                        transition-all duration-300 ease-in-out
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-ring z-40
                        ${isVisible
                        ? "animate-fade-in-slide-up opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
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