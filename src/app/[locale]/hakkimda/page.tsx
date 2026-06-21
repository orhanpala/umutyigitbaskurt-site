import Image from "next/image";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getAbout } from "@/lib/data";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const dict = getDictionary(params.locale);
  return { title: dict.about.title };
}

export default async function AboutPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const about = await getAbout();
  const bio = locale === "tr" ? about.bio_tr : about.bio_en;

  return (
    <div className="wrap py-16">
      <span className="eyebrow mb-3 block">{dict.about.eyebrow}</span>
      <h1 className="mb-10 text-[36px] font-bold">{dict.about.title}</h1>

      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-surface">
          {about.photo_url ? (
            <Image src={about.photo_url} alt="Umut Yiğit Başkurt" fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-[12.5px] text-ink-soft">
              Profil fotoğrafı
            </div>
          )}
        </div>

        <div>
          <article className="max-w-none space-y-4 text-[15.5px] leading-[1.8] text-ink-soft [&_a]:text-navy [&_a]:underline [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-5">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{bio}</ReactMarkdown>
          </article>

          {about.skills.length > 0 && (
            <div className="mt-10">
              <h2 className="mb-4 text-xl font-semibold">{dict.about.skillsTitle}</h2>
              <div className="flex flex-wrap gap-2">
                {about.skills.map((skill, index) => (
                  <span key={index} className="pill">
                    {locale === "tr" ? skill.label_tr : skill.label_en}
                  </span>
                ))}
              </div>
            </div>
          )}

          {about.timeline.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-xl font-semibold">{dict.about.timelineTitle}</h2>
              <ol className="space-y-6 border-l border-border pl-6">
                {about.timeline.map((entry, index) => (
                  <li key={index} className="relative">
                    <span className="absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full bg-navy" />
                    <div className="flex items-center gap-2.5">
                      {entry.icon_url && (
                        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md border border-border bg-surface">
                          <Image src={entry.icon_url} alt="" fill className="object-cover" />
                        </div>
                      )}
                      <span className="font-mono text-xs font-medium text-amber">{entry.year}</span>
                    </div>
                    <h3 className="mt-1 font-slab text-base font-semibold">
                      {locale === "tr" ? entry.title_tr : entry.title_en}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {locale === "tr" ? entry.description_tr : entry.description_en}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
