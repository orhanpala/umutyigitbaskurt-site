import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { AboutRow } from "@/lib/types";

export default function Footer({ locale, about }: { locale: Locale; about: AboutRow }) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 py-12 sm:px-10">
      <div className="wrap flex flex-col items-start gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-ink-soft">
          © {year} Umut Yiğit Başkurt — {dict.footer.rights}
        </p>
        <div className="flex gap-6">
          {about.contact_email && (
            <a href={`mailto:${about.contact_email}`} className="text-[13px] text-ink-soft hover:text-ink">
              {about.contact_email}
            </a>
          )}
          {about.linkedin_url && (
            <a
              href={about.linkedin_url}
              target="_blank"
              rel="noreferrer"
              className="text-[13px] text-ink-soft hover:text-ink"
            >
              LinkedIn
            </a>
          )}
          <Link href={`/${locale}/iletisim`} className="text-[13px] text-ink-soft hover:text-ink">
            {dict.nav.contact}
          </Link>
        </div>
      </div>
    </footer>
  );
}
