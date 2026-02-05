import type { LogItem } from "@/type/changelog";

export const changelogs: LogItem[] = [
  {
    version: "v2.0.1",
    date: "2026-02-05",
    description: "进一步打磨用户体验，新增实用功能。",
    features: [
      "新增代码块一键复制功能",
      "新增网站变更历史页 (Changelog)",
      "修复移动端浏览器回退导航问题 (iOS Chrome Polyfill)",
      "优化文章详情页标题排版与移动端适配",
    ],
  },
  {
    version: "v2.0.0",
    date: "2026-02-04",
    description: "全新的 Minimal 极简设计风格，重构核心架构。",
    features: [
      "全新 UI 设计，采用 shadcn/ui 组件库",
      "升级技术栈至 Astro 5 + React 19 + TailwindCSS 4",
      "新增文章目录 (Table of Contents)",
      "新增图片点击放大预览 (Lightbox)",
      "优化移动端交互体验与暗色模式支持",
    ],
    isMajor: true,
  },
  {
    version: "v1.0.0",
    date: "2024-12-01",
    description: "项目初次发布，奠定基础。",
    features: [
      "基于 Astro 4 + React 18 构建",
      "实现基础博客功能（文章列表、详情、标签、分类）",
      "集成 Markdown/MDX 渲染支持",
      "基础的响应式布局",
    ],
    isMajor: true,
  },
];
