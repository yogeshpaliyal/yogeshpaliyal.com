import type { GiscusProps } from "@giscus/react";

export const SITE = {
  website: "https://yogeshpaliyal.com/", // replace this with your deployed domain
  author: "Yogesh Paliyal",
  profile: "https://yogeshpaliyal.com/",
  desc: "Exploring the world of technology without a degree and spreading the love for open-source development.",
  title: "Yogesh Paliyal",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  showProjects: true,
  editPost: {
    enabled: false,
    text: "Suggest Changes",
    url: "https://github.com/yogeshpaliyal/yogeshpaliyal.com/edit/main/",
  },
  dynamicOgImage: true,
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Africa/Abidjan", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;

export const GISCUS: GiscusProps = {
  repo: "yogeshpaliyal/yogeshpaliyal.com",
  repoId: "R_kgDONQlO3w",
  category: "Comments",
  categoryId: "DIC_kwDONQlO384CkWBb",
  mapping: "pathname",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "en",
  loading: "lazy",
};
