import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";
import { SITE } from "@config";
import getRelativePath from "@utils/getPath";
import { slugifyStr } from "@utils/slugify";

export async function GET() {
  const posts = await getCollection("blog");
  const quickTips = await getCollection("quick-tips");
  const projects = await getCollection("projects");
  const sortedPosts = getSortedPosts([...posts, ...quickTips, ...projects]);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(({ data, slug }) => {
      return ({
      link: getRelativePath(data, slug),
      title: data.title,
      description: data.description,
      categories: data.tags,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })}),
  });
}
