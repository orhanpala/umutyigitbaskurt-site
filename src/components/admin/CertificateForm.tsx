"use client";

import { saveCertificate } from "@/lib/actions/admin";
import type { CertificateRow } from "@/lib/types";
import ImageUploader from "./ImageUploader";
import SubmitButton from "./SubmitButton";
import { Field } from "./FormFields";

export default function CertificateForm({ certificate }: { certificate?: CertificateRow }) {
  return (
    <form action={saveCertificate} className="max-w-2xl space-y-6">
      <input type="hidden" name="id" defaultValue={certificate?.id} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Başlık (TR)" name="title_tr" defaultValue={certificate?.title_tr} required />
        <Field label="Başlık (EN)" name="title_en" defaultValue={certificate?.title_en} required />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Veren kurum" name="issuer" defaultValue={certificate?.issuer} required />
        <Field label="Tarih" name="issue_date" type="date" defaultValue={certificate?.issue_date ?? undefined} />
      </div>

      <ImageUploader name="image_url" label="Görsel" folder="certificates" defaultValue={certificate?.image_url} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Belge linki (opsiyonel)" name="document_url" defaultValue={certificate?.document_url} />
        <Field label="Sıra" name="sort_order" type="number" defaultValue={certificate?.sort_order ?? 0} />
      </div>

      <SubmitButton>{certificate ? "Kaydet" : "Sertifikayı ekle"}</SubmitButton>
    </form>
  );
}
