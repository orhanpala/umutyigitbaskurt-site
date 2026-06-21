import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getBlogPosts } from "@/lib/data";
import BlogListClient from "@/components/BlogListClient";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const dict = getDictionary(params.locale);
  return { title: dict.blog.title };
}

export default async function BlogPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const posts = await getBlogPosts();

  return (
    <div className="wrap py-16">
      <span className="eyebrow mb-3 block">{dict.blog.eyebrow}</span>
      <h1 className="mb-10 text-[36px] font-bold">{dict.blog.title}</h1>

      {posts.length === 0 ? (
        <p className="text-ink-soft">{dict.blog.empty}</p>
      ) : (
        <BlogListClient
          posts={posts}
          locale={locale}
          searchPlaceholder={dict.blog.searchPlaceholder}
          noResultsLabel={dict.blog.noResults}
          allCategoriesLabel={dict.blog.allCategories}
        />
      )}
    </div>
  );
}
