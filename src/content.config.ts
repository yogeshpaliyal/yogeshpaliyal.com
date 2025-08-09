import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";
export const PROJECTS_PATH = "src/data/projects";

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
  loader: file("src/data/projects.json"),
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

export const collections = { blog, projects };
