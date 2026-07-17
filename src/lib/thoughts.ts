import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import { getCollection, type CollectionEntry } from "astro:content";

export type Thought = CollectionEntry<"thoughts">;

export interface RenderedThought {
    id: number;
    createdAt: string;
    html: string;
}

// processor 单例;数据不缓存,dev 下 thoughts.json 变化由 content layer 重载
let processorPromise: ReturnType<typeof createMarkdownProcessor> | undefined;

function getProcessor() {
    processorPromise ??= createMarkdownProcessor({
        shikiConfig: {
            themes: {
                light: "github-light",
                dark: "github-dark",
            },
        },
    });
    return processorPromise;
}

/** 所有想法,按发布时间倒序(同秒按 id 倒序),content 已渲染为 HTML */
export async function getRenderedThoughts(): Promise<RenderedThought[]> {
    const entries = await getCollection("thoughts");
    const sorted = [...entries].sort(
        (a, b) =>
            b.data.created_at.localeCompare(a.data.created_at) ||
            b.data.id - a.data.id
    );
    const processor = await getProcessor();
    return Promise.all(
        sorted.map(async (entry) => ({
            id: entry.data.id,
            createdAt: entry.data.created_at,
            html: (await processor.render(entry.data.content)).code,
        }))
    );
}
