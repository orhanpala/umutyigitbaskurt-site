"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

export default function LocaleNotFound() {
  const params = useParams();
  const rawLocale = typeof params?.locale === "string" ? params.locale : defaultLocale;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="wrap flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <span className="eyebrow">404</span>
      <h1 className="font-slab text-3xl font-bold text-ink sm:text-4xl">{dict.notFound.title}</h1>
      <p className="max-w-md text-ink-soft">{dict.notFound.description}</p>
      <Link href={`/${locale}`} className="btn-primary mt-2">
        {dict.notFound.cta}
      </Link>
    </div>
  );
}
