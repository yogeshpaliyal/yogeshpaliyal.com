import type { CollectionEntry } from "astro:content";

/** Published projects, lowest `priority` first. */
export function getSortedProjects(projects: CollectionEntry<"projects">[]) {
  return projects
    .filter(({ data }) => !data.draft)
    .sort((a, b) => (a.data.priority ?? 0) - (b.data.priority ?? 0));
}
