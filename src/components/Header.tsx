"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import LangSwitcher from "./LangSwitcher";

export default function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
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
    <header className="sticky top-0 z-10 border-b border-border bg-white/95 backdrop-blur">
      <div className="wrap flex items-center justify-between py-5">
        <Link href={base} className="flex items-center gap-2.5">
          <span className="text-sm font-semibold">Umut Yiğit Başkurt</span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          {links.map((link) => {
            const isCurrent = link.href === pathname || (link.href !== base && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium ${isCurrent ? "text-ink" : "text-ink-soft hover:text-ink"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <LangSwitcher locale={locale} />
          <Link href={`${base}/iletisim`} className="btn-primary hidden sm:inline-flex">
            {dict.nav.contactCta}
          </Link>
        </div>
      </div>
    </header>
  );
}
