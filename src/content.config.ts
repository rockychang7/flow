import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
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

export const collections = { articles: blogCollection };
