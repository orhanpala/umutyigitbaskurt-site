import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getCertificates } from "@/lib/data";
import CertificateCard from "@/components/CertificateCard";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const dict = getDictionary(params.locale);
  return { title: dict.certificates.title };
}

export default async function CertificatesPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const certificates = await getCertificates();

  return (
    <div className="wrap py-16">
      <span className="eyebrow mb-3 block">{dict.certificates.eyebrow}</span>
      <h1 className="mb-10 text-[36px] font-bold">{dict.certificates.title}</h1>

      {certificates.length === 0 ? (
        <p className="text-ink-soft">{dict.certificates.empty}</p>
      ) : (
        <StaggerGrid className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate, index) => (
            <StaggerItem key={certificate.id}>
              <CertificateCard certificate={certificate} locale={locale} index={index} variant="light" />
            </StaggerItem>
          ))}
        </StaggerGrid>
      )}
    </div>
  );
}
