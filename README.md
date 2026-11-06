# Flow

English | [简体中文](./README.zh-CN.md)

The source code of my personal blog, [rockycheong.com](https://rockycheong.com). It is a fully static site built with Astro, designed around reading: articles, short thoughts, and study notes.

## Features

- **Articles**: written in MDX, with a table of contents, syntax highlighting (light and dark), copy buttons on code blocks, and click-to-zoom images.
- **Thoughts**: a short-form timeline. Post from the terminal with `npm run say`, or from a hidden page on the live site that commits through the GitHub API.
- **Notes**: public notes synced from a local Obsidian vault and grouped by topic. They have their own RSS feed.
- **Browsing**: archive, categories, and tags.
- **Search**: press `Ctrl+K` (or `⌘K` on macOS) for fuzzy search across articles and notes. The search index is only loaded when you open the search.
- **Theme**: light, dark, or follow the system.
- **Feeds and SEO**: RSS (`/rss.xml`, `/notes/rss.xml`), sitemap, and `robots.txt` are generated at build time.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Astro 7 (static output), React 19 for interactive parts only |
| Styling | Tailwind CSS 4, shadcn/ui on Radix UI |
| Content | MDX, content collections with typed frontmatter, remark plugins |
| Search | Fuse.js |
| Language | TypeScript |

## Getting started

You need **Node.js 22.23.4 or later**. That is the minimum version Astro supports.

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:4321.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check the project, then build the site into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run say` | Add a thought from the terminal (interactive, or `npm run say -- "text"`) |
| `npm run notes:sync` | Sync public notes from the Obsidian vault |

## Writing content

### Articles

Create an `.mdx` file in `src/content/articles/`:

```yaml
---
title: "Article title"
description: "One-line summary"
author: "Rocky Chang"
category: "Category"
tags: ["tag-1", "tag-2"]
publish_date: 2026-01-01
draft: false
cover_url: "https://example.com/cover.png" # optional
---
```

- Start headings at `##`. The title from the frontmatter is the only `h1` on the page.
- Drafts (`draft: true`) can be previewed in dev, but they are left out of production builds, lists, RSS, and search.

### Thoughts

Thoughts are stored in `src/content/thoughts.json`. New entries are added to the end of the array. Use `npm run say` locally, or the hidden publishing page on the live site. Both write the file in the same format, so a new thought does not reformat the whole file.

### Notes

Do not write notes in this repo by hand. They come from a local Obsidian vault. Run `npm run notes:sync` to copy them over. A note is published only when it is in an allowed folder and its frontmatter has `publish: true`. To change a published note, edit it in the vault and sync again. Set `NOTES_VAULT_PATH` to use a different vault location.

## Project structure

```
src/
├── components/   UI components (cards, header, search, article rendering)
├── content/      Articles, notes, and thoughts.json
├── data/         Menus, projects, changelog, note topics
├── layouts/      Site layout (SEO tags, theme script, page transitions)
├── lib/          Content loading and search helpers
├── pages/        Routes
└── styles/       Global styles and theme tokens
scripts/          CLI tools for thoughts and note syncing
```

## Deployment

`npm run build` produces a plain static site in `dist/`. Any static host can serve it.

## License

[MIT](./LICENSE)
