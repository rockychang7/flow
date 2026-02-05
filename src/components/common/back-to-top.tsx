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
                        fixed bottom-6 right-4 md:bottom-12 md:right-8 xl:right-[max(2rem,calc(50%-640px))]
                        p-3 bg-primary text-primary-foreground
                        rounded-full shadow-lg hover:bg-primary/90 hover:scale-110 active:scale-95
                        transition-all duration-300 ease-in-out
                        focus:outline-none focus:ring-2 focus:ring-primary/50 z-50
                        ${isVisible
                        ? "animate-fade-in-slide-up opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                    }
                    `}
                    aria-label=" Back to top"
                >
                    <ArrowUp className="w-6 h-6 text-primary-foreground"/>
                </button>
            )}
        </>
    );
};

export default BackToTop;