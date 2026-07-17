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

const thoughtsCollection = defineCollection({
  loader: file("src/content/thoughts.json"),
  schema: z.object({
    id: z.number().int().positive(),
    content: z.string().min(1),
    // 纯字符串存储,零补齐后字典序即时间序;不用 Date 以规避构建机时区问题
    created_at: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
  }),
});

export const collections = { articles: blogCollection, thoughts: thoughtsCollection };
