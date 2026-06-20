import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { ProjectRow } from "@/lib/types";

export default function ProjectCard({ project, locale }: { project: ProjectRow; locale: Locale }) {
  const title = locale === "tr" ? project.title_tr : project.title_en;
  const summary = locale === "tr" ? project.summary_tr : project.summary_en;
  const category = locale === "tr" ? project.category_tr : project.category_en;

  return (
    <Link
      href={`/${locale}/projeler/${project.slug}`}
      className="group overflow-hidden rounded-[14px] border border-border bg-white transition-transform hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/10] bg-gradient-to-br from-surface-deep to-surface">
        {project.image_url ? (
          <Image src={project.image_url} alt={title} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-[11px] text-ink-soft">
            Görsel
          </div>
        )}
      </div>
      <div className="p-5 pb-6">
        {category && <span className="pill mb-3">{category}</span>}
        <h3 className="mb-2 font-slab text-[19px] font-semibold leading-tight">{title}</h3>
        <p className="text-sm leading-relaxed text-ink-soft">{summary}</p>
      </div>
    </Link>
  );
}
