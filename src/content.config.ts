import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const blogCollection = defineCollection({
  loader: glob({ base: "./src/content/articles", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    author: z.string(),
    category: z.string(),
    cover_url: z.string().nullable().optional(),
    description: z.string(),
    draft: z.boolean(),
    publish_date: z.date(),
    tags: z.array(z.string().transform((tag) => tag.trim())),
    title: z.string(),
  }),
});

const notesCollection = defineCollection({
  loader: glob({ base: "./src/content/notes", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    // 专题 slug,对应 src/data/notes-topics.json;缺省进「散篇」
    topic: z.string().nullable().optional(),
    created: z.date(),
    updated: z.date(),
    // 同日创建的排序权重(升序),如全书总览排在分章之前;缺省按 0
    order: z.number().optional(),
    // 笔记来源(阅读笔记的原文链接)
    source_url: z.string().url().nullable().optional(),
    draft: z.boolean(),
    // 由 notes:sync 同步脚本生成的标记;脚本的镜像删除只碰带此标记的文件
    synced: z.boolean().optional(),
  }),
});

const thoughtsCollection = defineCollection({
  loader: file("src/content/thoughts.json"),
  schema: z.object({
    id: z.number().int().positive(),
    content: z.string().min(1),
    // 纯字符串存储,零补齐后字典序即时间序;不用 Date 以规避构建机时区问题
    created_at: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
  }),
});

export const collections = {
  articles: blogCollection,
  notes: notesCollection,
  thoughts: thoughtsCollection,
};
