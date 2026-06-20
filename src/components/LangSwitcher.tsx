"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";

function withLocale(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  segments[1] = target;
  return segments.join("/") || "/";
}

export default function LangSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 font-mono text-[11px] text-ink-soft">
      {locales.map((target, index) => (
        <span key={target} className="flex items-center gap-2">
          <Link
            href={withLocale(pathname, target)}
            className={target === locale ? "font-medium text-ink" : "hover:text-ink"}
          >
            {target.toUpperCase()}
          </Link>
          {index < locales.length - 1 && <span className="text-border">/</span>}
        </span>
      ))}
    </div>
  );
}
