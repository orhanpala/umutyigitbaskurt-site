"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { BlogPostRow } from "@/lib/types";
import BlogCard from "./BlogCard";
import { StaggerGrid, StaggerItem } from "./motion/StaggerGrid";

export default function BlogListClient({
  posts,
  locale,
  searchPlaceholder,
  noResultsLabel,
  allCategoriesLabel,
}: {
  posts: BlogPostRow[];
  locale: Locale;
  searchPlaceholder: string;
  noResultsLabel: string;
  allCategoriesLabel: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((post) => {
      const value = locale === "tr" ? post.category_tr : post.category_en;
      if (value) set.add(value);
    });
    return Array.from(set);
  }, [posts, locale]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const title = (locale === "tr" ? post.title_tr : post.title_en).toLowerCase();
      const excerpt = (locale === "tr" ? post.excerpt_tr : post.excerpt_en).toLowerCase();
      const postCategory = locale === "tr" ? post.category_tr : post.category_en;
      const matchesQuery = !q || title.includes(q) || excerpt.includes(q);
      const matchesCategory = category === "all" || postCategory === category;
      return matchesQuery && matchesCategory;
    });
  }, [posts, query, category, locale]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchPlaceholder}
          className="w-full max-w-sm rounded-md border border-border px-4 py-2.5 text-sm outline-none focus:border-navy"
        />

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                category === "all" ? "bg-navy text-white" : "bg-surface text-ink-soft hover:text-ink"
              }`}
            >
              {allCategoriesLabel}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                  category === cat ? "bg-navy text-white" : "bg-surface text-ink-soft hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink-soft">{noResultsLabel}</p>
      ) : (
        <StaggerGrid className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <StaggerItem key={post.id}>
              <BlogCard post={post} locale={locale} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      )}
    </div>
  );
}
