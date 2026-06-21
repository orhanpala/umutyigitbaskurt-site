import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { BlogPostRow } from "@/lib/types";
import { estimateReadingMinutes, formatDate } from "@/lib/utils";

export default function BlogCard({ post, locale }: { post: BlogPostRow; locale: Locale }) {
  const dict = getDictionary(locale);
  const title = locale === "tr" ? post.title_tr : post.title_en;
  const excerpt = locale === "tr" ? post.excerpt_tr : post.excerpt_en;
  const content = locale === "tr" ? post.content_tr : post.content_en;
  const category = locale === "tr" ? post.category_tr : post.category_en;
  const readingMinutes = estimateReadingMinutes(content);

  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group overflow-hidden rounded-[14px] border border-border bg-white transition-transform hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/10] bg-gradient-to-br from-surface-deep to-surface">
        {post.cover_image_url ? (
          <Image src={post.cover_image_url} alt={title} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-[11px] text-ink-soft">
            Görsel
          </div>
        )}
      </div>
      <div className="p-5 pb-6">
        {category && <span className="pill mb-3">{category}</span>}
        <span className="mb-3 block font-mono text-[11px] text-ink-soft">
          {post.published_at && `${formatDate(post.published_at, locale)} · `}
          {readingMinutes} {dict.blog.readingTimeSuffix}
        </span>
        <h3 className="mb-2 font-slab text-[19px] font-semibold leading-tight">{title}</h3>
        <p className="mb-3 text-sm leading-relaxed text-ink-soft">{excerpt}</p>
        <span className="text-[13.5px] font-semibold text-navy">{dict.blog.readMore}</span>
      </div>
    </Link>
  );
}
