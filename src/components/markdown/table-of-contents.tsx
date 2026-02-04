import React, {useEffect, useState} from "react";
import {cn} from "@/lib/utils";

interface Heading {
    depth: number;
    slug: string;
    text: string;
}

interface TableOfContentsProps {
    headings: Heading[];
    className?: string;
    onItemClick?: () => void;
}

export function TableOfContents({headings, className, onItemClick}: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {rootMargin: "0px 0px -80% 0px"}
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.slug);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            headings.forEach((heading) => {
                const element = document.getElementById(heading.slug);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [headings]);

    // Only show h1, h2, h3
    const filteredHeadings = headings.filter((h) => h.depth <= 3);

    if (filteredHeadings.length === 0) return null;

    return (
        <nav className={cn("flex flex-col gap-2 text-sm", className)}>
            <p className="font-semibold text-foreground mb-2 tracking-tight">目录</p>
            <ul className="flex flex-col gap-2.5 border-l border-border/60 pl-4">
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
                                    : "text-muted-foreground/80"
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
