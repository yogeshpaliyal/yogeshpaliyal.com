import { SITE } from "@config";
import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      contentType: z.string().default("posts"),
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.literal("unlisted").or(z.boolean()).optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      editPost: z
        .object({
          disabled: z.boolean().optional(),
          url: z.string().optional(),
          text: z.string().optional(),
          appendFilePath: z.boolean().optional(),
        })
        .optional(),
    }),
});

const projects = defineCollection({
  loader: file("./src/content/projects/"),
  schema: ({ image }) =>
      z.object({
        contentType: z.string().default("projects"),
        author: z.string().default(SITE.author),
        pubDatetime: z.date().optional().nullable(),
        modDatetime: z.date().optional().nullable(),
        title: z.string(),
        url: z.string(),
        featured: z.boolean().optional(),
        priority: z.number().default(999).optional(),
        projectType: z.literal("github").default("github"),
        username: z.string().optional(),
        repoName: z.string().optional(),
        draft: z.literal("unlisted").or(z.boolean()).optional(),
        tags: z.array(z.string()).default(["others"]),
        ogImage: image()
          .refine(img => img.width >= 1200 && img.height >= 630, {
            message: "OpenGraph image must be at least 1200 X 630 pixels!",
          })
          .or(z.string())
          .optional(),
        description: z.string(),
        canonicalURL: z.string().optional(),
        editPost: z
          .object({
            disabled: z.boolean().optional(),
            url: z.string().optional(),
            text: z.string().optional(),
            appendFilePath: z.boolean().optional(),
          })
          .optional(),
      }),
});

const quickTips = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.md", base: "./src/content/quick-tips" }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      contentType: z.string().default("quick-tips"),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.literal("unlisted").or(z.boolean()).optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      editPost: z
        .object({
          disabled: z.boolean().optional(),
          url: z.string().optional(),
          text: z.string().optional(),
          appendFilePath: z.boolean().optional(),
        })
        .optional(),
    }),
});

export const collections = { blog, projects, quickTips };
