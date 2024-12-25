import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedPosts = (
  posts: CollectionEntry<"blog" | "projects" | "quick-tips">[]
) => {
  return posts
    .filter(postFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
};

export const getSortedProjects = (
  projects: CollectionEntry<"projects">[]
) => {
  return projects
    .filter(postFilter)
    .sort(
      (a, b) =>
        (a.data.priority ?? 0) - (b.data.priority ?? 0)
    );
};

export default getSortedPosts;
