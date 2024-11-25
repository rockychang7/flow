import React, {useEffect, useMemo, useState} from "react";
import {Search, X} from "lucide-react";
import Fuse from "fuse.js";
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog.tsx";

// @ts-ignore
const GlobalSearch = ({searchData}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setPortalContainer(document.getElementById("dialog-portal"));
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

    const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(event.target.value);
    };

    const clearSearch = () => {
        setSearchTerm("");
    };

    // 高亮匹配文本
    const highlightMatch = (text: any, matches: any[]) => {
        if (!matches || !text) return text;

        let highlightedText = text;
        const indices = matches
            .sort((a, b) => b.indices[0][0] - a.indices[0][0]); // 从后向前处理，避免位置偏移

        indices.forEach(match => {
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
                className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
                aria-label="Open search"
            >
                <Search className="w-5 h-5"/>
            </button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                {/* @ts-ignore */}
                <DialogContent container={portalContainer} className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>全局搜索</DialogTitle>
                    </DialogHeader>

                    <div className="relative">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder="搜索内容..."
                                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-background focus:ring-secondary"
                                autoFocus
                            />
                            {searchTerm && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-4 h-4"/>
                                </button>
                            )}
                        </div>

                        {searchResults.length > 0 ? (
                            <div className="mt-4 max-h-[60vh] overflow-y-auto">
                                {searchResults.map((result, index) => {
                                    const item = result.item;
                                    const matches = result.matches;

                                    const titleMatch = matches?.find(m => m.key === "title");
                                    const contentMatch = matches?.find(m => m.key === "content");
                                    const tagMatches = matches?.filter(m => m.key === "tags");

                                    return (
                                        <div
                                            key={index}
                                            className="p-4 hover:bg-muted cursor-pointer rounded-lg transition-colors duration-200"
                                            onClick={() => {
                                                // @ts-ignore
                                                window.location.href = item.url;
                                                setIsOpen(false);
                                            }}
                                        >
                                            <h3 className="font-semibold text-lg">
                                                {titleMatch ? highlightMatch(item.title, [titleMatch]) : item.title}
                                            </h3>
                                            {item.content && (
                                                <p className="text-secondary-foreground mt-1 text-sm line-clamp-2">
                                                    {contentMatch
                                                        ? highlightMatch(item.content, [contentMatch])
                                                        : item.content}
                                                </p>
                                            )}
                                            {item.tags && item.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {item.tags.map((tag, tagIndex) => (
                                                        <span
                                                            key={tagIndex}
                                                            className="px-2 py-1 bg-secondary text-primary text-xs rounded-xl"
                                                        >
                              {tagMatches.some(m => m.value === tag)
                                  ? highlightMatch(tag, [tagMatches.find(m => m.value === tag)])
                                  : tag}
                            </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : searchTerm ? (
                            <div className="mt-4 text-center text-gray-500">
                                未找到相关结果
                            </div>
                        ) : null}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GlobalSearch;