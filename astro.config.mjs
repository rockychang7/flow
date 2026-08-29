import {defineConfig} from "astro/config";
import {unified} from "@astrojs/markdown-remark";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import remarkCallouts from "./src/lib/remark-callouts.mjs";

// https://astro.build/config
export default defineConfig({
    site: "https://rockycheong.com",
    // 关于页已并入首页,旧地址静态重定向,不让外部既有链接落到 404
    redirects: {
        "/about": "/",
    },
    integrations: [react(),
        mdx({
            syntaxHighlight: "shiki",
            shikiConfig: {
                themes: {
                    light: "github-light",
                    dark: "github-dark",
                },
                // Prevent inline styles from being added (we use classes? no, Astro 4 adds styles by default, which is fine if we have dual themes)
                // Actually, wrap in class for dual themes usually requires distinct classes or css variables.
                // Astro's default behavior with `themes` is to generate TWO properties like color/background-color for light/dark media queries or classes?
                // Documentation says: "If you provide multiple themes, Astro will add CSS variables to your HTML..."
                // Let's try standard `themes` config.
            }
        }),
        sitemap({
            // 隐藏发布页与重定向壳页不进站点地图(/say 本身另有 noindex meta)
            filter: (page) => !["/say/", "/about/"].includes(new URL(page).pathname),
        }),
    ],
    vite: {
        plugins: [tailwindcss()],
    },
    markdown: {
        processor: unified({
            remarkPlugins: [remarkCallouts,
                [remarkToc, {heading: "目录", maxDepth: 3}],
                [remarkCollapse, {test: "目录", summary: "open table of contents"}]],
        }),
    }
});
