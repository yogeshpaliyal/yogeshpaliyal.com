import { slugifyStr } from "@/utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import ProjectStats from "./ProjectStats";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"projects">["data"];
  secHeading?: boolean;
  hideDateTime?: boolean;
}

export default function ProjectCard({
  href,
  frontmatter,
  secHeading = true,
  hideDateTime = false,
}: Props) {
  const { title, pubDatetime, modDatetime, description, repoName, username } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <ProjectStats repoName={repoName} username={username} />
      <p>{description}</p>
    </li>
  );
}
