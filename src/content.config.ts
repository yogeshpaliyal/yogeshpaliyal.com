import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob, file } from "astro/loaders";
import config from "@/config";

export const BLOG_PATH = "src/content/posts";

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.site.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      // "unlisted": page is built and reachable by link, but left out of lists
      draft: z.literal("unlisted").or(z.boolean()).optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      hideToc: z.boolean().optional(),
      // An empty value means "not set", so the site timezone applies.
      timezone: z
        .string()
        .optional()
        .transform(tz => tz || undefined),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: file("src/data/projects.json"),
  schema: z.object({
    pubDatetime: z.coerce.date().optional().nullable(),
    modDatetime: z.coerce.date().optional().nullable(),
    title: z.string(),
    description: z.string(),
    url: z.string(),
    icon: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    priority: z.number().optional(),
    tags: z.array(z.string()).default([]),
    projectType: z.string().optional(),
    username: z.string().optional(),
    repoName: z.string().optional(),
  }),
});

// Landing pages for apps, served at /projects/<id> (id = file name).
const apps = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/apps" }),
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
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        })
      )
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
      .array(
        z.object({ icon: z.string(), title: z.string(), text: z.string() })
      )
      .default([]),
    disclaimer: z.string().optional(),
    pubDatetime: z.coerce.date(),
    modDatetime: z.coerce.date().optional(),
  }),
});

// Privacy policy per app, served at /projects/<id>/privacy
const appPrivacy = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/app-privacy" }),
  schema: z.object({
    effectiveDate: z.coerce.date(),
  }),
});

export const collections = { posts, pages, projects, apps, appPrivacy };
