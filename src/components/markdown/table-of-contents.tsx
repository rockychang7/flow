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
        const ids = filteredHeadings.map((h) => h.slug);
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        // 标题进入视口顶部判定区,设为当前项
                        setActiveId(entry.target.id);
                    } else {
                        // 向上回滚、标题从判定区下方离开时,回退到上一个标题
                        const zoneBottom = entry.rootBounds?.bottom ?? window.innerHeight * 0.2;
                        if (entry.boundingClientRect.top >= zoneBottom) {
                            const idx = ids.indexOf(entry.target.id);
                            if (idx > 0) setActiveId(ids[idx - 1]);
                        }
                    }
                }
            },
            {rootMargin: "0px 0px -80% 0px"}
        );

        for (const id of ids) {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        }

        return () => observer.disconnect();
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
