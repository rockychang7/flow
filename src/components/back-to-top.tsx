import React, {useEffect, useState} from "react";
import {ArrowUp} from "lucide-react";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    // 监听滚动事件
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    // 滚动到顶部的函数
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 p-3 bg-primary/80 text-white rounded-full shadow-lg hover:bg-primary transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 z-50"
                    aria-label="Back to top"
                >
                    <ArrowUp className="w-6 h-6"/>
                </button>
            )}
        </>
    );
};

export default BackToTop;