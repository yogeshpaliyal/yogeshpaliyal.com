import { BLOG_PATH, PROJECTS_PATH, QUICK_TIPS_PATH } from "@/content.config";
import { slugifyStr } from "./slugify";

/**
 * Get full path of a blog post
 * @param id - id of the blog post (aka slug)
 * @param filePath - the blog post full file location
 * @param includeBase - whether to include `/posts` in return value
 * @returns blog post path
 */
export function getPath(
  id: string,
  filePath: string | undefined,
  includeBase = true,
  url?: string
) {
  if (url) {
    console.log("getPath", url);
    return url;
  }
  const pathSegments = filePath
    ?.replace(BLOG_PATH, "")
    ?.replace(PROJECTS_PATH, "")
    ?.replace(QUICK_TIPS_PATH, "")
    .split("/")
    .filter(path => path !== "") // remove empty string in the segments ["", "other-path"] <- empty string will be removed
    .filter(path => !path.startsWith("_")) // exclude directories start with underscore "_"
    .slice(0, -1) // remove the last segment_ file name_ since it's unnecessary
    .map(segment => slugifyStr(segment)); // slugify each segment path

  let basePath = ""
  if (includeBase) {
    if (!filePath || filePath.includes(BLOG_PATH)) {
      basePath = "/posts";
    } else if (filePath.includes(PROJECTS_PATH)) {
      basePath = "/projects";
    } else if (filePath.includes(QUICK_TIPS_PATH)) {
      basePath = "/quick-tips";
    }
  }

  // Making sure `id` does not contain the directory
  const blogId = id.split("/");
  const slug = blogId.length > 0 ? blogId.slice(-1) : blogId;

  // If not inside the sub-dir, simply return the file path
  if (!pathSegments || pathSegments.length < 1) {
    return [basePath, slug].join("/");
  }

  const res = [basePath, ...pathSegments, slug].join("/");
  console.log("getPath", url, res);
}
