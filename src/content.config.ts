import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";
export const PROJECTS_PATH = "src/data/projects";
export const QUICK_TIPS_PATH = "src/data/quick-tips";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      contentType: z.string().default("posts"),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.literal("unlisted").or(z.boolean()).optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const projects = defineCollection({
  loader: file("src/data/projects.json", {
    parser: (fileContent) => {console.log("@@@@FileContent",fileContent); return JSON.parse(fileContent);},
  }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      contentType: z.string().default("projects"),
      pubDatetime: z.coerce.date().optional().nullable(),
      modDatetime: z.coerce.date().optional().nullable(),
      title: z.string(),
      url: z.string(),
      featured: z.boolean().optional(),
      draft: z.literal("unlisted").or(z.boolean()).optional(),
      projectType: z.literal("github").default("github"),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      priority: z.number().default(999).optional(),
      timezone: z.string().optional(),
    }),
});

const quickTips = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${QUICK_TIPS_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      contentType: z.string().default("quick-tips"),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.literal("unlisted").or(z.boolean()).optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

export const collections = { blog, projects, quickTips };
