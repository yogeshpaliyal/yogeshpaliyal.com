// Temporary: screenshots of key pages from `astro preview`, for review.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = "http://localhost:4321";
const pages = [
  ["home", "/"],
  ["posts", "/posts/"],
  ["post-mermaid", "/posts/deploy-android-app-on-play-store-using-github-action/"],
  ["post-images", "/posts/adb-manage-deeplinks/"],
  ["projects", "/projects/"],
  ["halo", "/projects/halo/"],
  ["sendahead", "/projects/sendahead/"],
  ["privacy", "/projects/gapwise/privacy/"],
  ["about", "/about/"],
];
mkdirSync(".upgrade/screens", { recursive: true });
const browser = await chromium.launch();
for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({
    viewport: { width: 412, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: theme,
  });
  const page = await ctx.newPage();
  for (const [name, path] of pages) {
    if (theme === "dark" && !["home", "halo", "post-mermaid"].includes(name)) continue;
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.screenshot({
      path: `.upgrade/screens/${name}-${theme}.jpg`,
      fullPage: true,
      type: "jpeg",
      quality: 55,
    });
  }
  await ctx.close();
}
await browser.close();
