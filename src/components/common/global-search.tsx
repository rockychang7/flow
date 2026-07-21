import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import type {SearchItem} from '@/type/search';
import {navigate} from "astro:transitions/client";
import Fuse, {type FuseResultMatch} from "fuse.js";
import {Search, X} from "lucide-react";
import React, {useEffect, useMemo, useRef, useState} from "react";

const GlobalSearch: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState<SearchItem[] | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setPortalContainer(document.getElementById("dialog-portal"));
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    // 首次打开时才拉取搜索索引,避免把索引内联进每个页面的 HTML
    useEffect(() => {
        if (!isOpen || searchData !== null) return;
        fetch("/search.json")
            .then((res) => res.json())
            .then((data: SearchItem[]) => setSearchData(data))
            .catch((err) => console.error("Failed to load search index:", err));
    }, [isOpen, searchData]);

    const fuse = useMemo(() => {
        if (!searchData) return null;
        return new Fuse(searchData, {
            keys: ["title", "content", "tags"],
            threshold: 0.3,
            includeMatches: true,
            useExtendedSearch: true,
        });
    }, [searchData]);

    const searchResults = useMemo(() => {
        if (!searchTerm || !fuse) return [];
        return fuse.search(searchTerm).slice(0, 5);
    }, [searchTerm, fuse]);

    // 搜索词变化时重置选中项
    useEffect(() => {
        setSelectedIndex(0);
    }, [searchTerm]);

    const openResult = (url: string) => {
        setIsOpen(false);
        setSearchTerm("");
        navigate(url);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (searchResults.length === 0) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((i) => (i + 1) % searchResults.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((i) => (i - 1 + searchResults.length) % searchResults.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            const selected = searchResults[selectedIndex];
            if (selected) openResult(selected.item.url);
        }
    };

    // 保持选中项在可视区域内
    useEffect(() => {
        resultsRef.current
            ?.querySelector(`[data-index="${selectedIndex}"]`)
            ?.scrollIntoView({block: "nearest"});
    }, [selectedIndex]);

    // 按命中区间把文本拆成普通片段和 <mark> 片段,避免拼接 HTML 带来的偏移错乱和注入问题
    const highlightMatch = (text: string, match?: FuseResultMatch): React.ReactNode => {
        if (!match || !text) return text;

        const nodes: React.ReactNode[] = [];
        let cursor = 0;
        const sortedIndices = [...match.indices].sort((a, b) => a[0] - b[0]);

        sortedIndices.forEach(([start, end], i) => {
            if (start < cursor) return; // 跳过重叠区间
            if (start > cursor) nodes.push(text.slice(cursor, start));
            nodes.push(
                <mark key={i} className="bg-transparent text-foreground font-semibold">
                    {text.slice(start, end + 1)}
                </mark>
            );
            cursor = end + 1;
        });
        if (cursor < text.length) nodes.push(text.slice(cursor));

        return <>{nodes}</>;
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 -m-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                aria-label="打开搜索"
                title="搜索 (⌘K)"
            >
                <Search className="size-4"/>
            </button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {/* @ts-ignore */}
                <DialogContent container={portalContainer} className="sm:max-w-2xl w-[90vw] top-[15%] translate-y-0 sm:top-[50%] sm:translate-y-[-50%] bg-popover border-border shadow-lg p-0 gap-0 overflow-hidden rounded-xl [&>button:last-child]:hidden">
                    <DialogHeader className="sr-only">
                        <DialogTitle>全局搜索</DialogTitle>
                    </DialogHeader>

                    <div className="relative">
                        <div className="flex items-center border-b border-border px-4 py-3">
                            <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0"/>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleInputKeyDown}
                                placeholder="搜索文章、标签..."
                                className="flex-1 bg-transparent text-lg placeholder:text-muted-foreground focus:outline-none h-10"
                                autoFocus
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="text-muted-foreground hover:text-foreground transition-colors p-1"
                                    aria-label="Clear search"
                                >
                                    <X className="w-4 h-4"/>
                                </button>
                            )}
                        </div>

                        {searchResults.length > 0 ? (
                            <div ref={resultsRef} className="max-h-[60vh] overflow-y-auto p-2 scrollbar-hide">
                                {searchResults.map((result, index) => {
                                    const item = result.item;
                                    const matches = result.matches;

                                    const titleMatch = matches?.find((m) => m.key === "title");
                                    const contentMatch = matches?.find((m) => m.key === "content");

                                    return (
                                        <div
                                            key={item.url}
                                            data-index={index}
                                            className={`group flex flex-col p-3 rounded-md cursor-pointer transition-colors duration-200 ${
                                                index === selectedIndex ? "bg-muted" : ""
                                            }`}
                                            onClick={() => openResult(item.url)}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-medium text-base text-foreground">
                                                    {highlightMatch(item.title, titleMatch)}
                                                </h3>
                                                {item.tags && item.tags.length > 0 && (
                                                    <div className="flex gap-2">
                                                        {item.tags.slice(0, 2).map((tag) => (
                                                            <span key={tag} className="text-xs text-muted-foreground">
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {item.content && (
                                                <p className="text-muted-foreground text-sm line-clamp-1">
                                                    {highlightMatch(item.content, contentMatch)}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : searchTerm ? (
                            <div className="py-12 text-center text-muted-foreground text-sm">
                                {searchData === null ? "正在加载搜索索引..." : "未找到相关结果"}
                            </div>
                        ) : (
                            <div className="py-12 text-center text-faint text-sm">
                                输入关键词开始搜索...
                            </div>
                        )}

                        <div className="flex items-center justify-end gap-3 border-t border-border px-4 py-2 text-xs text-faint">
                            <span><kbd className="px-1 py-0.5 rounded border border-border bg-muted">↑↓</kbd> 选择</span>
                            <span><kbd className="px-1 py-0.5 rounded border border-border bg-muted">↵</kbd> 打开</span>
                            <span><kbd className="px-1 py-0.5 rounded border border-border bg-muted">esc</kbd> 关闭</span>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GlobalSearch;
