import React, {useEffect, useState} from "react";
import {cn, scrollBehavior} from "@/lib/utils";
import type {Heading} from "@/type/markdown";

interface TableOfContentsProps {
    headings: Heading[];
    className?: string;
    onItemClick?: () => void;
    hideTitle?: boolean;
}

/**
 * 目录:每条一根 12×4 小色条 + 13px 标题,两者常驻显示。
 * 当前所在段落的色条与文字同时转为 foreground,其余保持 border / muted。
 */
export function TableOfContents({headings, className, onItemClick, hideTitle}: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    // Only show h1, h2, h3
    const filteredHeadings = headings.filter((h) => h.depth <= 3);
    // 缩进按相对层级算:有的文章从 # 起,有的从 ## 起,都要能看出层次
    const topDepth = Math.min(...filteredHeadings.map((h) => h.depth), 6);
    const indentClass = ["", "pl-4", "pl-8"];

    useEffect(() => {
        const ids = headings.filter((h) => h.depth <= 3).map((h) => h.slug);
        if (ids.length === 0) return;

        let frame = 0;

        // 当前项一律由滚动位置直接算出,不靠 IntersectionObserver 的进出事件推断:
        // 观察器在挂载时会把每个标题的初始状态各报一次,按事件推断会被最后一条覆盖,
        // 结果刚进页面就点亮了倒数第二个标题。
        const update = () => {
            frame = 0;
            // 判定线:视口顶部往下 20%,越过它的最后一个标题即当前所在段落
            const line = window.innerHeight * 0.2;
            let current = ids[0];
            for (const id of ids) {
                const element = document.getElementById(id);
                if (!element) continue;
                if (element.getBoundingClientRect().top > line) break;
                current = id;
            }
            // 触底时末节可能整段都在判定线下方,永远轮不到它,单独兜一下
            const atBottom =
                window.scrollY + window.innerHeight >=
                document.documentElement.scrollHeight - 2;
            setActiveId(atBottom ? ids[ids.length - 1] : current);
        };

        const schedule = () => {
            if (frame) return;
            frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", schedule, {passive: true});
        window.addEventListener("resize", schedule);

        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
        };
    }, [headings]);

    if (filteredHeadings.length === 0) return null;

    return (
        <nav className={cn("flex flex-col", className)} aria-label="目录">
            {!hideTitle && <p className="mb-2 text-sm font-medium text-muted-foreground">目录</p>}
            {filteredHeadings.map((heading) => {
                const active = activeId === heading.slug;
                return (
                    <a
                        key={heading.slug}
                        href={`#${heading.slug}`}
                        aria-current={active ? "location" : undefined}
                        onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById(heading.slug);
                            if (element) {
                                element.scrollIntoView({behavior: scrollBehavior()});
                                onItemClick?.();
                            }
                        }}
                        className={cn(
                            "group flex items-center gap-2 py-1",
                            indentClass[Math.min(heading.depth - topDepth, 2)]
                        )}
                    >
                        <span
                            aria-hidden="true"
                            className={cn(
                                "h-1 w-3 shrink-0 rounded-sm transition-colors",
                                active ? "bg-foreground" : "bg-border group-hover:bg-muted-foreground"
                            )}
                        />
                        <span
                            className={cn(
                                "line-clamp-1 text-caption font-medium leading-tight transition-colors",
                                active
                                    ? "text-foreground"
                                    : "text-muted-foreground group-hover:text-foreground"
                            )}
                        >
                            {heading.text}
                        </span>
                    </a>
                );
            })}
        </nav>
    );
}
