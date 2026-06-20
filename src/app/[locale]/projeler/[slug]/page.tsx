import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getProjectBySlug } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};
  return { title: params.locale === "tr" ? project.title_tr : project.title_en };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const dict = getDictionary(locale);
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const title = locale === "tr" ? project.title_tr : project.title_en;
  const category = locale === "tr" ? project.category_tr : project.category_en;
  const content = locale === "tr" ? project.content_tr : project.content_en;

  return (
    <div className="wrap py-16">
      <Link href={`/${locale}/projeler`} className="mb-8 inline-block text-[13.5px] font-semibold text-navy">
        {dict.projects.back}
      </Link>

      {category && <span className="pill mb-4">{category}</span>}
      <h1 className="mb-8 text-[36px] font-bold leading-tight">{title}</h1>

      {project.image_url && (
        <div className="relative mx-auto mb-10 aspect-[16/9] max-w-[760px] overflow-hidden rounded-2xl border border-border bg-surface">
          <Image src={project.image_url} alt={title} fill className="object-cover" />
        </div>
      )}

      <article className="max-w-[760px] space-y-4 text-[15.5px] leading-[1.8] text-ink-soft [&_a]:text-navy [&_a]:underline [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-5">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>

      {project.gallery_urls.length > 0 && (
        <div className="mx-auto mt-12 max-w-[760px]">
          <h2 className="mb-4 text-xl font-semibold text-ink">{dict.projects.galleryTitle}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {project.gallery_urls.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="relative aspect-square overflow-hidden rounded-xl border border-border bg-surface"
              >
                <Image src={url} alt={`${title} — ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
