import {defineConfig} from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";

// https://astro.build/config
export default defineConfig({
    site: "http://localhost:4321",
    integrations: [react(),
        tailwind({
            applyBaseStyles: false,
        }),
        mdx({
                syntaxHighlight: "shiki",
                shikiConfig: {theme: "github-light"}
            }
        ),],
    markdown: {
        remarkPlugins: [[remarkToc, {heading: "目录", maxDepth: 3}],
            [remarkCollapse, {test: "目录", summary: "open table of contents"}]],
    }
});