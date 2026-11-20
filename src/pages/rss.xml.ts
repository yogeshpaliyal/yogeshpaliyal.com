import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { getPostUrl } from "@/utils/getPostPaths";
import config from "@/config";

export async function GET() {
  const posts = await getCollection("posts");
  const sortedPosts = getSortedPosts(posts);
  const projects = (await getCollection("projects")).filter(
    ({ data }) => !data.draft && data.pubDatetime
  );

  return rss({
    title: config.site.title,
    description: config.site.description,
    site: config.site.url,
    items: [
      ...sortedPosts.map(({ data, id, filePath }) => ({
        link: getPostUrl(id, filePath, config.site.lang),
        title: data.title,
        description: data.description,
        categories: data.tags,
        pubDate: new Date(data.modDatetime ?? data.pubDatetime),
      })),
      ...projects.map(({ data }) => ({
        link: data.url,
        title: data.title,
        description: data.description,
        categories: data.tags,
        pubDate: new Date((data.modDatetime ?? data.pubDatetime) as Date),
      })),
    ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime()),
  });
}
