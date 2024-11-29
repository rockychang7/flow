import {defineCollection, z} from "astro:content";

// 定义blog schema校验规则
const blogCollection = defineCollection({
    type: "content",
    schema: z.object({
        author: z.string(),
        category: z.string(),
        cover_url: z.string(),
        description: z.string(),
        draft: z.boolean(),
        publish_date: z.date(),
        tags: z.array(z.string()),
        title: z.string(),
    }),
});
export const collections = {"articles": blogCollection};