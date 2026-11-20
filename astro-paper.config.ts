import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://yogeshpaliyal.com/",
    title: "Yogesh Paliyal",
    description:
      "Exploring the world of technology without a degree and spreading the love for open-source development.",
    author: "Yogesh Paliyal",
    profile: "https://yogeshpaliyal.com/",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Africa/Abidjan",
    dir: "ltr",
  },
  posts: {
    perPage: 5,
    perIndex: 4,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: false },
    search: "pagefind",
    toc: true,
  },
  socials: [
    { name: "github", url: "https://github.com/yogeshpaliyal" },
    { name: "x", url: "https://x.com/yogeshpaliyal" },
    { name: "linkedin", url: "https://www.linkedin.com/in/yogeshpaliyal/" },
    { name: "mail", url: "mailto:yogeshpaliyal.foss+blog@gmail.com" },
    {
      name: "bluesky",
      url: "https://bsky.app/profile/yogeshpaliyal.com",
      linkTitle: "Connect on BlueSky",
    },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    {
      name: "bluesky",
      url: "https://bsky.app/intent/compose?text=",
      linkTitle: "Share this post on BlueSky",
    },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
