import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getBlogPostBySlug } from "@/lib/data";
import { estimateReadingMinutes, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};
  return { title: params.locale === "tr" ? post.title_tr : post.title_en };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const dict = getDictionary(locale);
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const title = locale === "tr" ? post.title_tr : post.title_en;
  const content = locale === "tr" ? post.content_tr : post.content_en;
  const readingMinutes = estimateReadingMinutes(content);

  return (
    <div className="wrap py-16">
      <Link href={`/${locale}/blog`} className="mb-8 inline-block text-[13.5px] font-semibold text-navy">
        {dict.blog.back}
      </Link>

      <span className="mb-4 block font-mono text-xs text-ink-soft">
        {post.published_at && `${formatDate(post.published_at, locale)} · `}
        {readingMinutes} {dict.blog.readingTimeSuffix}
      </span>
      <h1 className="mb-8 text-[36px] font-bold leading-tight">{title}</h1>

      {post.cover_image_url && (
        <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-surface">
          <Image src={post.cover_image_url} alt={title} fill className="object-cover" />
        </div>
      )}

      <article className="max-w-[760px] space-y-4 text-[15.5px] leading-[1.8] text-ink-soft [&_a]:text-navy [&_a]:underline [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-5">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>
    </div>
  );
}
