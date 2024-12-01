import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import rehypeMermaid from "rehype-mermaid";
import rehypeShikiji from "rehype-shikiji";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    rehypePlugins: [
      [
        rehypeMermaid,
        { colorScheme: "light", dark: true, strategy: "img-svg" },
      ],
      [rehypeShikiji, { themes: { light: "min-light", dark: "night-owl" } }],
    ],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
    syntaxHighlight: false,
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
  experimental: {
    contentLayer: true,
  },
  redirects: {
    "/how-i-became-a-software-engineer-without-a-degree":
      "/posts/how-i-became-a-software-engineer-without-a-degree?utm_source=yogeshpaliyal-old&utm_medium=redirect_url&utm_campaign=redirect_url",
    "/automating-indus-app-store-uploads-with-github-actions":
      "/posts/automating-indus-app-store-uploads-with-github-actions?utm_source=yogeshpaliyal-old&utm_medium=redirect_url&utm_campaign=redirect_url",
    "/cracking-the-code-a-journey-through-keypass-app-crashes-and-solutions":
      "https://yogeshpaliyal.hashnode.dev/cracking-the-code-a-journey-through-keypass-app-crashes-and-solutions",
    "/scope-storage-in-android-a-guide-to-securing-your-app-and-supporting-all-api-versions":
      "https://yogeshpaliyal.hashnode.dev/scope-storage-in-android-a-guide-to-securing-your-app-and-supporting-all-api-versions",
    "/types-of-recursion":
      "https://yogeshpaliyal.hashnode.dev/types-of-recursion",
    "/guide-to-android-data-binding":
      "/posts/guide-to-android-data-binding?utm_source=yogeshpaliyal-old&utm_medium=redirect_url&utm_campaign=redirect_url",
    "/universal-recycler-adapter-for-90-of-your-needs":
      "https://yogeshpaliyal.hashnode.dev/universal-recycler-adapter-for-90-of-your-needs",
    "/android-spannable-textview":
      "https://yogeshpaliyal.hashnode.dev/android-spannable-textview",
    "/getting-started-with-android-navigation-component":
      "https://yogeshpaliyal.hashnode.dev/getting-started-with-android-navigation-component",
    "/kotlin-coroutines-or-qa":
      "https://yogeshpaliyal.hashnode.dev/kotlin-coroutines-or-qa",
    "/how-to-create-android-universal-recycler-view-adapter-with-mvvm-and-data-binding":
      "https://yogeshpaliyal.hashnode.dev/how-to-create-android-universal-recycler-view-adapter-with-mvvm-and-data-binding",
    "/android-material-design-tabs-tab-layout-with-swipe-or-basic":
      "https://yogeshpaliyal.hashnode.dev/android-material-design-tabs-tab-layout-with-swipe-or-basic",
    "/android-bottom-navigation-with-cut-out-design":
      "https://yogeshpaliyal.hashnode.dev/android-bottom-navigation-with-cut-out-design",
    "/firebase-messaging-with-image-in-android-or-android-kotlin-push-notification":
      "/posts/firebase-messaging-with-image-in-android-or-android-kotlin-push-notification",
    "/keypass-password-manager":
      "https://yogeshpaliyal.hashnode.dev/keypass-password-manager",
    "/keypass-privacy-policy":
      "https://yogeshpaliyal.hashnode.dev/keypass-privacy-policy",
    "/archive":
      "/archives?utm_source=yogeshpaliyal-old&utm_medium=redirect_url&utm_campaign=redirect_url",
    "https://yogeshpaliyal.hashnode.dev/tag/android-app-development":
      "https://yogeshpaliyal.hashnode.dev/tag/android-app-development",
    "https://yogeshpaliyal.hashnode.dev/tag/android-development":
      "https://yogeshpaliyal.hashnode.dev/tag/android-development",
    "https://yogeshpaliyal.hashnode.dev/tag/data-structures":
      "https://yogeshpaliyal.hashnode.dev/tag/data-structures",
    "https://yogeshpaliyal.hashnode.dev/tag/debugging":
      "https://yogeshpaliyal.hashnode.dev/tag/debugging",
    "https://yogeshpaliyal.hashnode.dev/tag/android":
      "/tags/android?utm_source=yogeshpaliyal-old&utm_medium=redirect_url&utm_campaign=redirect_url",
    "https://yogeshpaliyal.hashnode.dev/tag/beginners":
      "https://yogeshpaliyal.hashnode.dev/tag/beginners",
    "https://yogeshpaliyal.hashnode.dev/tag/recursion":
      "https://yogeshpaliyal.hashnode.dev/tag/recursion",
    "https://yogeshpaliyal.hashnode.dev/tag/opensource-inactive":
      "https://yogeshpaliyal.hashnode.dev/tag/opensource-inactive",
    "https://yogeshpaliyal.hashnode.dev/tag/basics":
      "https://yogeshpaliyal.hashnode.dev/tag/basics",
    "https://yogeshpaliyal.hashnode.dev/tag/software-engineer":
      "/tags/software-engineer?utm_source=yogeshpaliyal-old&utm_medium=redirect_url&utm_campaign=redirect_url",
    "https://yogeshpaliyal.hashnode.dev/tag/keypass":
      "https://yogeshpaliyal.hashnode.dev/tag/keypass",
  },
});
