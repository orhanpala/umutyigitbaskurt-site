"use client";

import { useState } from "react";
import { updateAbout } from "@/lib/actions/admin";
import type { AboutRow, TimelineEntry } from "@/lib/types";
import ImageUploader from "./ImageUploader";
import FileUploader from "./FileUploader";
import SubmitButton from "./SubmitButton";
import { Field, TextArea } from "./FormFields";

const emptyEntry: TimelineEntry = {
  year: "",
  title_tr: "",
  title_en: "",
  description_tr: "",
  description_en: "",
};

export default function AboutForm({ about }: { about: AboutRow }) {
  const [timeline, setTimeline] = useState<TimelineEntry[]>(about.timeline ?? []);

  function updateEntry(index: number, patch: Partial<TimelineEntry>) {
    setTimeline((prev) => prev.map((entry, i) => (i === index ? { ...entry, ...patch } : entry)));
  }

  function removeEntry(index: number) {
    setTimeline((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <form action={updateAbout} className="max-w-3xl space-y-8">
      <section className="space-y-5">
        <h2 className="text-lg font-semibold">Anasayfa hero</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Üst etiket (TR)" name="eyebrow_tr" defaultValue={about.eyebrow_tr} />
          <Field label="Üst etiket (EN)" name="eyebrow_en" defaultValue={about.eyebrow_en} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextArea label="Başlık — h1 (TR)" name="headline_tr" defaultValue={about.headline_tr} rows={2} />
          <TextArea label="Başlık — h1 (EN)" name="headline_en" defaultValue={about.headline_en} rows={2} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextArea label="Giriş paragrafı (TR)" name="lead_tr" defaultValue={about.lead_tr} rows={4} />
          <TextArea label="Giriş paragrafı (EN)" name="lead_en" defaultValue={about.lead_en} rows={4} />
        </div>
        <ImageUploader name="photo_url" label="Profil fotoğrafı" folder="about" defaultValue={about.photo_url} />
        <FileUploader
          name="cv_url"
          label="CV (PDF)"
          folder="cv"
          accept=".pdf,.doc,.docx"
          defaultValue={about.cv_url}
        />
      </section>

      <section className="space-y-5 border-t border-border pt-8">
        <h2 className="text-lg font-semibold">Hakkımda metni</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextArea label="Biyografi — Markdown (TR)" name="bio_tr" defaultValue={about.bio_tr} rows={10} />
          <TextArea label="Biyografi — Markdown (EN)" name="bio_en" defaultValue={about.bio_en} rows={10} />
        </div>
      </section>

      <section className="space-y-4 border-t border-border pt-8">
        <h2 className="text-lg font-semibold">Eğitim & deneyim zaman çizelgesi</h2>
        <input type="hidden" name="timeline" value={JSON.stringify(timeline)} />

        <div className="space-y-4">
          {timeline.map((entry, index) => (
            <div key={index} className="space-y-3 rounded-lg border border-border p-4">
              <div className="grid gap-3 sm:grid-cols-[120px_1fr_1fr]">
                <input
                  value={entry.year}
                  onChange={(e) => updateEntry(index, { year: e.target.value })}
                  placeholder="Yıl"
                  className="rounded-md border border-border px-3 py-2 text-sm outline-none focus:border-navy"
                />
                <input
                  value={entry.title_tr}
                  onChange={(e) => updateEntry(index, { title_tr: e.target.value })}
                  placeholder="Başlık (TR)"
                  className="rounded-md border border-border px-3 py-2 text-sm outline-none focus:border-navy"
                />
                <input
                  value={entry.title_en}
                  onChange={(e) => updateEntry(index, { title_en: e.target.value })}
                  placeholder="Başlık (EN)"
                  className="rounded-md border border-border px-3 py-2 text-sm outline-none focus:border-navy"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <textarea
                  value={entry.description_tr}
                  onChange={(e) => updateEntry(index, { description_tr: e.target.value })}
                  placeholder="Açıklama (TR)"
                  rows={2}
                  className="rounded-md border border-border px-3 py-2 text-sm outline-none focus:border-navy"
                />
                <textarea
                  value={entry.description_en}
                  onChange={(e) => updateEntry(index, { description_en: e.target.value })}
                  placeholder="Açıklama (EN)"
                  rows={2}
                  className="rounded-md border border-border px-3 py-2 text-sm outline-none focus:border-navy"
                />
              </div>
              <button
                type="button"
                onClick={() => removeEntry(index)}
                className="text-[13px] font-semibold text-red-600"
              >
                Bu satırı kaldır
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setTimeline((prev) => [...prev, { ...emptyEntry }])}
          className="btn-outline"
        >
          Satır ekle
        </button>
      </section>

      <section className="space-y-5 border-t border-border pt-8">
        <h2 className="text-lg font-semibold">İstatistikler</h2>
        <div className="grid gap-5 sm:grid-cols-4">
          <Field label="Proje sayısı" name="stat_projects" type="number" defaultValue={about.stat_projects} />
          <Field label="Sertifika sayısı" name="stat_certificates" type="number" defaultValue={about.stat_certificates} />
          <Field label="Staj sayısı" name="stat_internships" type="number" defaultValue={about.stat_internships} />
          <Field label="Dil sayısı" name="stat_languages" type="number" defaultValue={about.stat_languages} />
        </div>
      </section>

      <section className="space-y-5 border-t border-border pt-8">
        <h2 className="text-lg font-semibold">İletişim bilgileri</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="E-posta" name="contact_email" defaultValue={about.contact_email} />
          <Field label="LinkedIn linki" name="linkedin_url" defaultValue={about.linkedin_url} />
        </div>
      </section>

      <SubmitButton>Kaydet</SubmitButton>
    </form>
  );
}
