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
      icon: z.string().optional(),
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

// Landing pages for apps, served at /projects/<id> (id = file name).
export const APPS_PATH = "src/data/apps";

const apps = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${APPS_PATH}` }),
  schema: z.object({
    name: z.string(),
    // SEO <title> / H1 — lead with the problem people search for
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    ogImage: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    category: z.string().default("UtilitiesApplication"),
    playStoreId: z.string().optional(),
    downloadUrl: z.string().optional(),
    downloadLabel: z.string().default("Download APK"),
    githubUrl: z.string(),
    screenshots: z
      .array(z.object({ src: z.string(), alt: z.string(), caption: z.string().optional() }))
      .default([]),
    // false for designed store graphics that already include a device frame
    screenshotFrame: z.boolean().default(true),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    // Branding: accent for light theme, accentDark for dark theme, heroBg for the hero panel
    accent: z.string().optional(),
    accentDark: z.string().optional(),
    heroBg: z.string().default("#1c1c1c"),
    heroImage: z.string().optional(),
    features: z
      .array(z.object({ icon: z.string(), title: z.string(), text: z.string() }))
      .default([]),
    disclaimer: z.string().optional(),
    // Markdown body of the privacy policy lives in src/data/app-privacy/<id>.md
    privacyUpdated: z.coerce.date().optional(),
    pubDatetime: z.coerce.date(),
    modDatetime: z.coerce.date().optional(),
  }),
});

const appPrivacy = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/app-privacy" }),
  schema: z.object({
    effectiveDate: z.coerce.date(),
  }),
});

export const collections = { blog, projects, apps, appPrivacy };
