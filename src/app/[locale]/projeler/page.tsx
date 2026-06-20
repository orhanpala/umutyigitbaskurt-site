import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getProjects } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const dict = getDictionary(params.locale);
  return { title: dict.projects.title };
}

export default async function ProjectsPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const projects = await getProjects();

  return (
    <div className="wrap py-16">
      <span className="eyebrow mb-3 block">{dict.projects.eyebrow}</span>
      <h1 className="mb-10 text-[36px] font-bold">{dict.projects.title}</h1>

      {projects.length === 0 ? (
        <p className="text-ink-soft">{dict.projects.empty}</p>
      ) : (
        <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
