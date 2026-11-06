# Flow

[English](./README.md) | 简体中文

我的个人博客 [rockycheong.com](https://rockycheong.com) 的源码。用 Astro 构建的纯静态站点，围绕阅读体验来设计，内容分三类：文章、想法和笔记。

## 功能

- **文章**：用 MDX 写，自带目录、代码高亮（亮暗两套）、代码一键复制、点击放大图片。
- **想法**：短内容时间线。可以在本地用 `npm run say` 发，也可以在线上的隐藏页面发（通过 GitHub API 直接提交到仓库）。
- **笔记**：从本地 Obsidian 仓库同步过来的公开笔记，按专题分组，有单独的 RSS。
- **浏览**：归档、分类、标签。
- **搜索**：按 `Ctrl+K`（macOS 上是 `⌘K`）模糊搜索文章和笔记。打开搜索框时才加载索引。
- **主题**：浅色、深色、跟随系统。
- **订阅与 SEO**：构建时自动生成 RSS（`/rss.xml`、`/notes/rss.xml`）、站点地图和 `robots.txt`。

## 技术栈

| 方面 | 用到的工具 |
| --- | --- |
| 框架 | Astro 7（静态输出），React 19 只用在需要交互的地方 |
| 样式 | Tailwind CSS 4，基于 Radix UI 的 shadcn/ui |
| 内容 | MDX，带类型校验的内容集合，remark 插件 |
| 搜索 | Fuse.js |
| 语言 | TypeScript |

## 本地运行

需要 **Node.js 22.23.4 或更高版本**，这是 Astro 要求的最低版本。

```bash
npm install
npm run dev
```

开发服务器地址是 http://localhost:4321。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 先做类型检查，再把站点构建到 `dist/` |
| `npm run preview` | 在本地预览构建好的站点 |
| `npm run say` | 在终端发一条想法（交互输入，或 `npm run say -- "内容"`） |
| `npm run notes:sync` | 从 Obsidian 仓库同步公开笔记 |

## 写内容

### 文章

在 `src/content/articles/` 下新建一个 `.mdx` 文件：

```yaml
---
title: "文章标题"
description: "一句话简介"
author: "Rocky Chang"
category: "分类"
tags: ["标签1", "标签2"]
publish_date: 2026-01-01
draft: false
cover_url: "https://example.com/cover.png" # 可选
---
```

- 正文标题从 `##` 开始。页面上唯一的一级标题是 frontmatter 里的 `title`。
- 草稿（`draft: true`）在开发模式下能预览，但不会出现在正式构建、列表、RSS 和搜索里。

### 想法

想法存在 `src/content/thoughts.json` 里，新的一条追加在数组末尾。本地用 `npm run say` 发，或者用线上的隐藏发布页。两种方式写出来的文件格式一致，发一条想法不会让整个文件产生无意义的改动。

### 笔记

笔记不要在这个仓库里手写，它们来自本地的 Obsidian 仓库，用 `npm run notes:sync` 同步过来。只有放在允许的目录里、并且 frontmatter 写了 `publish: true` 的笔记才会被公开。要改已发布的笔记，去 Obsidian 里改，然后重新同步。笔记仓库的位置可以用环境变量 `NOTES_VAULT_PATH` 修改。

## 目录结构

```
src/
├── components/   界面组件（卡片、顶栏、搜索、文章渲染）
├── content/      文章、笔记和 thoughts.json
├── data/         菜单、项目、更新日志、笔记专题
├── layouts/      全站布局（SEO 标签、主题脚本、页面过渡）
├── lib/          内容读取和搜索相关的工具函数
├── pages/        页面路由
└── styles/       全局样式和主题变量
scripts/          发想法、同步笔记的命令行脚本
```

## 部署

`npm run build` 会在 `dist/` 里生成一个纯静态站点，放到任何静态托管服务上都能用。

## 许可证

[MIT](./LICENSE)
