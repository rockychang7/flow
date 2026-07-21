import React, {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import type {Heading} from "@/type/markdown";

interface TableOfContentsProps {
    headings: Heading[];
    className?: string;
    onItemClick?: () => void;
    hideTitle?: boolean;
}

export function TableOfContents({headings, className, onItemClick, hideTitle}: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    // Only show h1, h2, h3
    const filteredHeadings = headings.filter((h) => h.depth <= 3);

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
        <nav className={cn("flex flex-col gap-2 text-sm", className)}>
            {!hideTitle && <p className="font-semibold text-foreground mb-2">目录</p>}
            <ul className="flex flex-col gap-2.5 border-l border-border pl-4">
                {filteredHeadings.map((heading) => (
                    <li key={heading.slug} style={{paddingLeft: `${(heading.depth - 1) * 8}px`}}>
                        <a
                            href={`#${heading.slug}`}
                            onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById(heading.slug);
                                if (element) {
                                    element.scrollIntoView({behavior: "smooth"});
                                    onItemClick?.();
                                }
                            }}
                            className={cn(
                                "block transition-colors duration-200 hover:text-foreground line-clamp-1",
                                activeId === heading.slug
                                    ? "text-foreground font-medium"
                                    : "text-muted-foreground"
                            )}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
