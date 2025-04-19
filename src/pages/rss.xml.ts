import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";

export async function GET() {
  const posts = await getCollection("blog");
  const quickTips = await getCollection("quickTips");
  const projects = await getCollection("projects");
  const sortedPosts = getSortedPosts([...posts, ...quickTips, ...projects]);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(({ data, id, filePath }) => ({
      link: data.url ?? getPath(id, filePath),
      title: data.title,
      description: data.description,
      categories: data.tags,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
