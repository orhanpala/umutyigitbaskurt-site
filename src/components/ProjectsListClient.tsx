"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { ProjectRow } from "@/lib/types";
import ProjectCard from "./ProjectCard";

export default function ProjectsListClient({
  projects,
  locale,
  searchPlaceholder,
  noResultsLabel,
}: {
  projects: ProjectRow[];
  locale: Locale;
  searchPlaceholder: string;
  noResultsLabel: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((project) => {
      const title = (locale === "tr" ? project.title_tr : project.title_en).toLowerCase();
      const summary = (locale === "tr" ? project.summary_tr : project.summary_en).toLowerCase();
      return title.includes(q) || summary.includes(q);
    });
  }, [projects, query, locale]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={searchPlaceholder}
        className="mb-8 w-full max-w-sm rounded-md border border-border px-4 py-2.5 text-sm outline-none focus:border-navy"
      />

      {filtered.length === 0 ? (
        <p className="text-ink-soft">{noResultsLabel}</p>
      ) : (
        <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
