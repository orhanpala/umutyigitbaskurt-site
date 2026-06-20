import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getAbout } from "@/lib/data";
import ContactForm from "@/components/ContactForm";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const dict = getDictionary(params.locale);
  return { title: dict.contact.title };
}

export default async function ContactPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const about = await getAbout();

  return (
    <div className="wrap py-16">
      <span className="eyebrow mb-3 block">{dict.contact.eyebrow}</span>
      <h1 className="mb-4 text-[36px] font-bold">{dict.contact.title}</h1>
      <p className="mb-12 max-w-[560px] text-[15.5px] leading-relaxed text-ink-soft">{dict.contact.lead}</p>

      <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr]">
        <ContactForm dict={dict} />

        {(about.contact_email || about.phone || about.linkedin_url || about.instagram_url) && (
          <div className="h-fit space-y-5 rounded-xl border border-border bg-surface p-6">
            {about.contact_email && (
              <div>
                <span className="mb-2 block font-mono text-xs text-ink-soft">{dict.contact.directEmail}</span>
                <a href={`mailto:${about.contact_email}`} className="text-base font-semibold text-navy">
                  {about.contact_email}
                </a>
              </div>
            )}
            {about.phone && (
              <div>
                <span className="mb-2 block font-mono text-xs text-ink-soft">{dict.contact.phone}</span>
                <a href={`tel:${about.phone}`} className="text-base font-semibold text-navy">
                  {about.phone}
                </a>
              </div>
            )}
            {(about.linkedin_url || about.instagram_url) && (
              <div className="flex gap-5">
                {about.linkedin_url && (
                  <a
                    href={about.linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-navy"
                  >
                    LinkedIn →
                  </a>
                )}
                {about.instagram_url && (
                  <a
                    href={about.instagram_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-navy"
                  >
                    Instagram →
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
