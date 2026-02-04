import React, {useEffect, useMemo, useState} from "react";
import {Search, X} from "lucide-react";
import Fuse from "fuse.js";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import type {SearchItem} from '@/type/search';

interface GlobalSearchProps {
    searchData: SearchItem[];
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({searchData}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

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

    // 配置 Fuse.js 选项
    const fuseOptions = {
        keys: ["title", "content", "tags"],
        threshold: 0.3, // 更低的阈值意味着更严格的匹配
        includeMatches: true, // 包含匹配信息以便高亮
        useExtendedSearch: true, // 启用扩展搜索
    };

    // 创建 Fuse 实例
    const fuse = useMemo(() => new Fuse(searchData, fuseOptions), [searchData]);

    // 使用 Fuse.js 进行搜索
    const searchResults = useMemo(() => {
        if (!searchTerm) return [];
        return fuse.search(searchTerm).slice(0, 5);
    }, [searchTerm, fuse]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const clearSearch = () => {
        setSearchTerm("");
    };

    // 高亮匹配文本
    // @ts-ignore
    const highlightMatch = (text: string, matches: Fuse.FuseResultMatch[]): React.ReactNode => {
        if (!matches || !text) return text;

        let highlightedText = text;
        const indices = matches
            .sort((a, b) => b.indices[0][0] - a.indices[0][0]); // 从后向前处理，避免位置偏移

        indices.forEach((match) => {
            // @ts-ignore
            match.indices.forEach(([start, end]) => {
                highlightedText =
                    highlightedText.substring(0, start) +
                    `<mark class="bg-yellow-500 rounded-sm">${highlightedText.substring(start, end + 1)}</mark>` +
                    highlightedText.substring(end + 1);
            });
        });

        return <span dangerouslySetInnerHTML={{__html: highlightedText}}/>;
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-full hover:bg-muted transition-colors duration-200 cursor-pointer"
                aria-label="Open search"
            >
                <Search className="w-5 h-5 text-primary"/>
            </button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {/* @ts-ignore */}
                <DialogContent container={portalContainer} className="sm:max-w-2xl w-[90vw] top-[15%] translate-y-0 sm:top-[50%] sm:translate-y-[-50%] bg-popover/95 backdrop-blur-md border-border/40 shadow-2xl p-0 gap-0 overflow-hidden rounded-xl [&>button:last-child]:hidden">
                    <DialogHeader className="sr-only">
                        <DialogTitle>全局搜索</DialogTitle>
                    </DialogHeader>

                    <div className="relative">
                        <div className="flex items-center border-b border-border/40 px-4 py-3">
                            <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0"/>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder="搜索文章、标签..."
                                className="flex-1 bg-transparent text-lg placeholder:text-muted-foreground focus:outline-none h-10"
                                autoFocus
                            />
                            {searchTerm && (
                                <button
                                    onClick={clearSearch}
                                    className="text-muted-foreground hover:text-foreground transition-colors p-1"
                                >
                                    <X className="w-4 h-4"/>
                                </button>
                            )}
                        </div>

                        {searchResults.length > 0 ? (
                            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-hide">
                                {searchResults.map((result, index) => {
                                    const item = result.item;
                                    const matches = result.matches;

                                    const titleMatch = matches?.find((m) => m.key === "title");
                                    const contentMatch = matches?.find((m) => m.key === "content");
                                    const tagMatches = matches?.filter((m) => m.key === "tags");

                                    return (
                                        <div
                                            key={index}
                                            className="group flex flex-col p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors duration-200"
                                            onClick={() => {
                                                window.location.href = item.url;
                                                setIsOpen(false);
                                            }}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-medium text-base text-foreground group-hover:text-primary transition-colors">
                                                    {titleMatch ? highlightMatch(item.title, [titleMatch]) : item.title}
                                                </h3>
                                                {item.tags && item.tags.length > 0 && (
                                                    <div className="flex gap-1">
                                                        {item.tags.slice(0, 2).map((tag, tagIndex) => (
                                                            <span key={tagIndex} className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {item.content && (
                                                <p className="text-muted-foreground text-sm line-clamp-1">
                                                    {contentMatch ? highlightMatch(item.content, [contentMatch]) : item.content}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : searchTerm ? (
                            <div className="py-12 text-center text-muted-foreground text-sm">
                                未找到相关结果
                            </div>
                        ) : (
                            <div className="py-12 text-center text-muted-foreground/50 text-sm">
                                输入关键词开始搜索...
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GlobalSearch;
