import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { getProjects, getBlogPosts } from "@/lib/data";

export const dynamic = "force-dynamic";

const STATIC_PATHS = ["", "/hakkimda", "/projeler", "/blog", "/sertifikalar", "/iletisim"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://umutyigitbaskurt.com").replace(/\/$/, "");
  const [projects, posts] = await Promise.all([getProjects(), getBlogPosts()]);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of STATIC_PATHS) {
      entries.push({ url: `${siteUrl}/${locale}${path}` });
    }

    for (const project of projects) {
      entries.push({
        url: `${siteUrl}/${locale}/projeler/${project.slug}`,
        lastModified: project.created_at,
      });
    }

    for (const post of posts) {
      entries.push({
        url: `${siteUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.published_at ?? post.created_at,
      });
    }
  }

  return entries;
}
