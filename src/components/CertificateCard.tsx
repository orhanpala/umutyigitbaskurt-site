import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { CertificateRow } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function CertificateCard({
  certificate,
  locale,
  index,
  variant = "dark",
}: {
  certificate: CertificateRow;
  locale: Locale;
  index: number;
  variant?: "dark" | "light";
}) {
  const dict = getDictionary(locale);
  const title = locale === "tr" ? certificate.title_tr : certificate.title_en;
  const number = String(index + 1).padStart(2, "0");
  const isDark = variant === "dark";

  return (
    <div
      className={
        isDark
          ? "overflow-hidden rounded-xl border border-white/15 bg-white/5"
          : "overflow-hidden rounded-xl border border-border bg-white"
      }
    >
      {certificate.image_url && (
        <div className="relative aspect-[4/3] bg-surface">
          <Image src={certificate.image_url} alt={title} fill className="object-cover" />
        </div>
      )}
      <div className="p-6">
        {!certificate.image_url && (
          <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-amber font-slab text-sm font-bold text-white">
            {number}
          </div>
        )}
        <h3 className={isDark ? "mb-1 text-base font-semibold text-white" : "mb-1 text-base font-semibold text-ink"}>
          {title}
        </h3>
        <p className={isDark ? "font-mono text-[12.5px] text-[#B7C2D6]" : "font-mono text-[12.5px] text-ink-soft"}>
          {certificate.issuer}
          {certificate.issue_date ? ` — ${formatDate(certificate.issue_date, locale)}` : ""}
        </p>
        {certificate.document_url && (
          <a
            href={certificate.document_url}
            target="_blank"
            rel="noreferrer"
            className={
              isDark
                ? "mt-4 inline-block text-[12.5px] font-semibold text-white hover:underline"
                : "mt-4 inline-block text-[12.5px] font-semibold text-navy hover:underline"
            }
          >
            {dict.certificates.viewDocument}
          </a>
        )}
      </div>
    </div>
  );
}
