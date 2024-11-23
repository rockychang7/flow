export interface SearchItem {
    title: string;
    content: string;
    url: string;
    tags?: string[];
}

export async function generateSearchData() {
    // 这里是获取所有可搜索内容的逻辑
    // 可以从 Markdown、collections 或其他数据源获取
    const posts = await import.meta.glob("../content/articles/*.mdx");

    const searchData: SearchItem[] = [];

    for (const path in posts) {
        const post = await posts[path]();
        searchData.push({
            title: post.frontmatter.title,
            content: post.frontmatter.description || post.body.slice(0, 200),
            url: path.replace("../content/articles/", "/articles/").replace(".mdx", ""),
            tags: post.frontmatter.tags || []
        });
    }

    return searchData;
}