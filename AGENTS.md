# Flow - 个人博客项目

## 项目概述
Flow 是一个基于 Astro.js 构建的现代化个人博客项目,专注于内容展示和阅读体验。纯静态构建(SSG),生产站点为 https://rockycheong.com。

## 技术栈

### 核心框架
| 技术 | 版本 | 用途 |
|------|------|------|
| Astro | ^7.0 | 静态站点生成框架,islands 架构 |
| React | ^19.2 | 交互组件(仅需要交互的岛屿) |
| TypeScript | ^5.9 | 类型安全 |

### 样式与UI
| 技术 | 版本 | 用途 |
|------|------|------|
| TailwindCSS | ^4.3 | 原子化CSS(v4,通过 @tailwindcss/vite 接入,配置在 globals.css 的 @theme 中,没有 tailwind.config 文件) |
| tailwindcss-animate | ^1.0 | 动画扩展 |
| @tailwindcss/typography | ^0.5 | 排版插件(文章 prose 样式) |
| Radix UI | - | 无头UI组件(Dialog, Dropdown, Tooltip等) |
| shadcn/ui | - | 基于Radix的样式化组件(src/components/ui) |
| Lucide React | - | 图标库 |

### 内容处理
| 技术 | 版本 | 用途 |
|------|------|------|
| @astrojs/mdx | ^7.0 | MDX支持 |
| @astrojs/rss | ^4.0 | RSS订阅生成(/rss.xml) |
| @astrojs/sitemap | - | 站点地图(/sitemap-index.xml) |
| remark-toc + remark-collapse | - | 文内目录(通过 astro.config 的 markdown.processor 配置,MDX 自动继承) |
| Fuse.js | ^7 | 模糊搜索(索引由 /search.json 端点按需提供) |
| dayjs | ^1.11 | 日期处理(格式统一 YYYY-MM-DD) |
| react-photo-view | - | 图片灯箱 |

### 字体(双轨制)
- UI(`--font-sans`):系统黑体栈(system-ui → PingFang SC / Microsoft YaHei),不自托管
- 文章正文(`--font-reading`):Source Serif 4(拉丁)+ LXGW WenKai(中文,400/700 真字重,lxgw-wenkai-webfont 本地托管,按 unicode-range 分片按需加载),仅用于文章 prose 与文章标题
- Maple Mono(等宽,用于代码/日期,`--font-mono`,@fontsource 本地托管)
- 字体栈定义在 `src/styles/globals.css` 的 `@theme` 中;文章正文基线 18px(md-prose.astro)

## 项目结构

```
flow/
├── public/                 # 静态资源(favicon、图片、robots.txt)
├── src/
│   ├── components/
│   │   ├── cards/          # 列表项卡片(文章/分类/标签/项目/想法)
│   │   ├── common/         # 公共组件(Header, Footer, BackToTop, GlobalSearch, ModeToggle, ThoughtComposer等)
│   │   ├── home/           # 首页组件(个人介绍、文章/想法/项目列表)
│   │   ├── icons/          # 图标组件
│   │   ├── markdown/       # 文章渲染相关(Prose, TOC, 代码复制, 文章头)
│   │   └── ui/             # shadcn/ui 组件
│   ├── constant/           # 常量(DATE_FORMAT, SITE 站点信息, THOUGHTS_GITHUB 仓库信息)
│   ├── content/
│   │   ├── articles/       # 博客文章(MDX)
│   │   └── thoughts.json   # 想法数据(JSON 数组,新条目追加末尾)
│   ├── content.config.ts   # 内容集合 Schema(glob/file loader + zod)
│   ├── data/               # 静态数据配置(菜单、项目、媒体链接、changelog)
│   ├── layouts/
│   │   └── RootLayout.astro # 全站布局(SEO head、主题脚本、ViewTransitions)
│   ├── lib/                # 工具库(articles.ts 文章读取、thoughts.ts 想法读取、generateSearchData、utils)
│   ├── pages/              # 页面路由
│   │   ├── index.astro     # 首页
│   │   ├── about.astro     # 关于页
│   │   ├── archive.astro   # 归档页
│   │   ├── thoughts.astro  # 想法时间线
│   │   ├── say.astro       # 想法隐藏发布页(不进导航/sitemap,noindex)
│   │   ├── category.astro / categories/[category].astro
│   │   ├── tag.astro / tags/[tag].astro
│   │   ├── changelog.astro
│   │   ├── articles/[...slug].astro  # 文章详情
│   │   ├── rss.xml.js      # RSS订阅
│   │   └── search.json.js  # 搜索索引端点
│   ├── styles/globals.css  # 全局样式 + Tailwind v4 主题定义
│   └── type/               # 类型定义
├── scripts/
│   └── new-thought.mjs     # 本地发布想法 CLI(npm run say)
├── astro.config.mjs
├── components.json         # shadcn/ui配置
└── tsconfig.json           # 路径别名 @/ → src/
```

## 项目约定

- **文章读取一律走 `src/lib/articles.ts`** 的 `getPublishedArticles()`(过滤草稿)+ `sortByDateDesc()`,不要在页面里直接 `getCollection` 后手写过滤/排序。
- 草稿(`draft: true`)在开发模式可预览详情页,生产构建不生成页面、不进 RSS/搜索/列表。
- tags 在 schema 层自动 trim(content.config.ts 的 transform)。
- 日期展示格式统一 `YYYY-MM-DD`(常量 `DATE_FORMAT`)。
- 页面元信息通过 `RootLayout` 的 props 传入:`title`(自动追加站点后缀)、`description`、`ogImage`。
- 搜索索引不要作为 props 内联进页面,由 `/search.json` 端点提供,GlobalSearch 打开时懒加载。
- React 组件只在需要交互时使用 `client:load`,纯展示组件用 Astro 组件或不加 client 指令。
- 主题:localStorage 只存用户手动选择;无选择时跟随系统(含系统切换监听)。逻辑在 RootLayout 内联脚本 + ModeToggle。
- **想法读取一律走 `src/lib/thoughts.ts`** 的 `getRenderedThoughts()`(已含倒序排序与 markdown → HTML 渲染),不要在页面里直接 `getCollection("thoughts")`。
- 想法数据存 `src/content/thoughts.json`,新条目只追加在数组末尾;`created_at` 为 `YYYY-MM-DD HH:mm:ss` 纯字符串(常量 `DATETIME_FORMAT`,展示截取前 16 位),不要引入 Date/时区转换。
- 想法序列化格式契约:`JSON.stringify(arr, null, 2) + "\n"`。两条写入路径(线上 `/say` 的 GitHub Contents API 写回、本地 `npm run say`)必须保持该格式一致,否则会产生整文件无意义 diff。
- `/say` 是隐藏发布页:不进导航菜单、sitemap 已在 astro.config 里排除、页面传 `noindex` 给 RootLayout;发布凭证是 fine-grained PAT(仅授权本仓库 Contents 读写),只存在用户浏览器 localStorage,不进代码与环境变量。
- 线上 `/say` 发布会直接产生远端 commit:本地改动/发布前先 `git pull --rebase`。

## 主要功能

- **文章管理**: 基于MDX,Frontmatter 由 zod schema 校验
- **想法(微博客)**: `/thoughts` 时间线 + 首页最新 3 条;线上 `/say` 隐藏页(GitHub API 直发)或本地 `npm run say` 发布,数据以 JSON 跟随仓库
- **归档/分类/标签**: 时间线归档、分类与标签筛选页
- **全站搜索**: ⌘K / Ctrl+K 唤起,Fuse.js 模糊匹配,支持 ↑↓/Enter 键盘导航
- **暗色模式**: 亮/暗切换,默认跟随系统
- **页面过渡**: Astro ClientRouter (View Transitions)
- **RSS / Sitemap / robots.txt**: 自动生成
- **代码高亮**: Shiki(github-light / github-dark 双主题)
- **代码复制按钮**: code-copy.astro 通过 MutationObserver 注入

## 开发命令

```bash
npm run dev       # 开发模式
npm run build     # astro check + astro build
npm run preview   # 预览生产构建
npm run say       # 本地发布一条想法(交互式;或 npm run say -- "内容")
```

## 主题配置

CSS 变量定义在 `src/styles/globals.css`(hsl 分量形式),通过 Tailwind v4 `@theme` 映射为 `--color-*`,亮/暗两套(`.dark` 类切换):
`--background` / `--foreground`、`--primary` / `--secondary`、`--muted` / `--accent`、`--card` / `--popover`、`--destructive`、`--border` / `--input` / `--ring`

## 文章编写规范

文章使用MDX格式,放置于 `src/content/articles/` 目录,需要包含以下Frontmatter:

```yaml
---
author: "作者名"
category: "分类名"
cover_url: "封面图URL(可选)"
description: "文章描述"
draft: false
publish_date: 2024-01-01
tags: ["标签1", "标签2"]
title: "文章标题"
---
```
