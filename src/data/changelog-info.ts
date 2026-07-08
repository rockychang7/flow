import type { LogItem } from "@/type/changelog";

export const changelogs: LogItem[] = [
  {
    version: "v2.1.1",
    date: "2026-07-08",
    description: "排版重构:双轨字体方案,修复中文伪粗体与中英混排观感。",
    features: [
      "文章正文换用真字重霞鹜文楷(400/700),标题与加粗不再是浏览器合成的伪粗体",
      "正文拉丁字符改用 Source Serif 4 衬线体,与楷体混排灰度统一",
      "字体双轨制:界面走系统黑体栈,仅文章阅读区使用阅读向字体",
      "正文基线 16px → 18px,拉开标题层级,移除中文标题负字距",
      "字体自带 font-display: swap 消除首屏闪白,新增 text-autospace 中英自动间隙",
    ],
  },
  {
    version: "v2.1.0",
    date: "2026-07-08",
    description: "全站质量重构:修复生产环境问题,补齐 SEO,优化搜索与阅读体验。",
    features: [
      "升级 Astro 7,修复 RSS 链接、日期与草稿泄露等生产环境问题",
      "补齐全站 SEO(Open Graph、canonical、sitemap、robots.txt)",
      "搜索重构:索引按需加载,支持 ↑↓/Enter 键盘导航",
      "正文改用本地托管的霞鹜文楷,代码保留等宽字体",
      "暗色模式真正跟随系统偏好,提升键盘可访问性",
      "清理死代码与冗余依赖,统一文章读取与日期格式",
    ],
  },
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
