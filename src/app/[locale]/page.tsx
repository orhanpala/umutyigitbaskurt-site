import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getAbout, getBlogPosts, getCertificates, getProjects } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import CertificateCard from "@/components/CertificateCard";
import StatBox from "@/components/StatBox";

export const dynamic = "force-dynamic";

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const [about, projects, posts, certificates] = await Promise.all([
    getAbout(),
    getProjects(),
    getBlogPosts(),
    getCertificates(),
  ]);

  const eyebrow = locale === "tr" ? about.eyebrow_tr : about.eyebrow_en;
  const headline = locale === "tr" ? about.headline_tr : about.headline_en;
  const lead = locale === "tr" ? about.lead_tr : about.lead_en;
  const manifesto = locale === "tr" ? about.manifesto_tr : about.manifesto_en;

  return (
    <>
      <section className="wrap grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
          <h1 className="text-[clamp(36px,4.6vw,54px)] font-bold leading-[1.08] tracking-tight">
            {headline}
          </h1>
          {lead && <p className="my-5 max-w-[480px] text-[17px] leading-[1.7] text-ink-soft">{lead}</p>}
          <div className="flex flex-wrap gap-3.5">
            <Link href={`/${locale}/projeler`} className="btn-primary">
              {dict.hero.ctaProjects}
            </Link>
            {about.cv_url && (
              <a href={about.cv_url} target="_blank" rel="noreferrer" className="btn-outline">
                {dict.hero.ctaCV}
              </a>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-[18px_-18px_-18px_18px] rounded-2xl bg-surface-deep" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-dashed border-border bg-surface">
            {about.photo_url ? (
              <Image src={about.photo_url} alt="Umut Yiğit Başkurt" fill className="object-cover" />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2.5 text-ink-soft">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B6478" strokeWidth="1.6">
                    <circle cx="12" cy="8" r="3.4" />
                    <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" />
                  </svg>
                </div>
                <span className="font-mono text-[12.5px]">Profil fotoğrafı</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {manifesto && (
        <div className="bg-navy-deep py-20">
          <div className="wrap text-center">
            <p className="mx-auto max-w-[760px] font-slab text-[26px] italic leading-snug text-white sm:text-[34px]">
              “{manifesto}”
            </p>
            <span className="mt-6 block font-mono text-xs text-[#9FC0E8]">— Umut Yiğit Başkurt</span>
          </div>
        </div>
      )}

      <div className="wrap grid grid-cols-2 gap-4 pb-20 sm:grid-cols-4">
        <StatBox value={about.stat_projects} label={dict.stats.projects} />
        <StatBox value={about.stat_certificates} label={dict.stats.certificates} />
        <StatBox value={about.stat_internships} label={dict.stats.internships} />
        <StatBox value={about.stat_languages} label={dict.stats.languages} />
      </div>

      {projects.length > 0 && (
        <div className="wrap">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <span className="eyebrow mb-2 block">{dict.home.projectsTag}</span>
              <h2 className="text-[28px] font-semibold">{dict.home.projectsTitle}</h2>
            </div>
            <Link href={`/${locale}/projeler`} className="text-[13.5px] font-semibold text-navy">
              {dict.home.viewAll}
            </Link>
          </div>
          <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} locale={locale} />
            ))}
          </div>
        </div>
      )}

      {posts.length > 0 && (
        <div className="wrap mt-20">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <span className="eyebrow mb-2 block">{dict.home.postsTag}</span>
              <h2 className="text-[28px] font-semibold">{dict.home.postsTitle}</h2>
            </div>
            <Link href={`/${locale}/blog`} className="text-[13.5px] font-semibold text-navy">
              {dict.home.viewAll}
            </Link>
          </div>
          <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} locale={locale} />
            ))}
          </div>
        </div>
      )}

      {certificates.length > 0 && (
        <div className="mt-[90px] bg-navy-deep py-[70px]">
          <div className="wrap">
            <div className="mb-7 flex items-end justify-between">
              <div>
                <span className="mb-2 block font-mono text-xs font-medium uppercase tracking-[.08em] text-[#9FC0E8]">
                  {dict.home.certificatesTag}
                </span>
                <h2 className="text-[28px] font-semibold text-white">{dict.home.certificatesTitle}</h2>
              </div>
              <Link href={`/${locale}/sertifikalar`} className="text-[13.5px] font-semibold text-white">
                {dict.home.viewAll}
              </Link>
            </div>
            <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
              {certificates.slice(0, 3).map((certificate, index) => (
                <CertificateCard key={certificate.id} certificate={certificate} locale={locale} index={index} variant="dark" />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-[90px] bg-surface py-20">
        <div className="wrap text-center">
          <h2 className="font-slab text-[32px] font-bold text-ink sm:text-[40px]">{dict.home.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-[480px] text-[15.5px] leading-relaxed text-ink-soft">
            {dict.home.ctaLead}
          </p>
          <Link href={`/${locale}/iletisim`} className="btn-primary mt-8 inline-flex">
            {dict.nav.contactCta}
          </Link>
        </div>
      </div>
    </>
  );
}
