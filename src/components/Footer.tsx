import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { AboutRow } from "@/lib/types";

export default function Footer({ locale, about }: { locale: Locale; about: AboutRow }) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();
  const base = `/${locale}`;

  const links = [
    { href: base, label: dict.nav.home },
    { href: `${base}/hakkimda`, label: dict.nav.about },
    { href: `${base}/projeler`, label: dict.nav.projects },
    { href: `${base}/blog`, label: dict.nav.blog },
    { href: `${base}/sertifikalar`, label: dict.nav.certificates },
    { href: `${base}/iletisim`, label: dict.nav.contact },
  ];

  return (
    <footer className="px-6 pb-10 pt-16 sm:px-10">
      <div className="wrap">
        <div className="grid gap-10 border-b border-border pb-12 sm:grid-cols-[1.3fr_0.8fr_1fr]">
          <div>
            <span className="text-base font-semibold">Umut Yiğit Başkurt</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">{dict.footer.tagline}</p>
          </div>

          <div>
            <span className="eyebrow mb-4 block">{dict.footer.pagesTitle}</span>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-soft hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="eyebrow mb-4 block">{dict.footer.contactTitle}</span>
            <ul className="space-y-2.5 text-sm">
              {about.contact_email && (
                <li>
                  <a href={`mailto:${about.contact_email}`} className="text-ink-soft hover:text-ink">
                    {about.contact_email}
                  </a>
                </li>
              )}
              {about.linkedin_url && (
                <li>
                  <a
                    href={about.linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink-soft hover:text-ink"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              {about.cv_url && (
                <li>
                  <a href={about.cv_url} target="_blank" rel="noreferrer" className="text-ink-soft hover:text-ink">
                    {dict.hero.ctaCV}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <p className="pt-6 text-[13px] text-ink-soft">
          © {year} Umut Yiğit Başkurt — {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
