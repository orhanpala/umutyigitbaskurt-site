"use client";

import { saveProject } from "@/lib/actions/admin";
import type { ProjectRow } from "@/lib/types";
import ImageUploader from "./ImageUploader";
import GalleryUploader from "./GalleryUploader";
import SubmitButton from "./SubmitButton";
import { Field, TextArea } from "./FormFields";

export default function ProjectForm({ project }: { project?: ProjectRow }) {
  return (
    <form action={saveProject} className="max-w-3xl space-y-6">
      <input type="hidden" name="id" defaultValue={project?.id} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Başlık (TR)" name="title_tr" defaultValue={project?.title_tr} required />
        <Field label="Başlık (EN)" name="title_en" defaultValue={project?.title_en} required />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Etiket (TR) — örn. Araştırma" name="category_tr" defaultValue={project?.category_tr} />
        <Field label="Etiket (EN)" name="category_en" defaultValue={project?.category_en} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextArea label="Kısa açıklama (TR)" name="summary_tr" defaultValue={project?.summary_tr} rows={3} />
        <TextArea label="Kısa açıklama (EN)" name="summary_en" defaultValue={project?.summary_en} rows={3} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextArea
          label="Detay içeriği — Markdown (TR)"
          name="content_tr"
          defaultValue={project?.content_tr}
          rows={10}
        />
        <TextArea
          label="Detay içeriği — Markdown (EN)"
          name="content_en"
          defaultValue={project?.content_en}
          rows={10}
        />
      </div>

      <ImageUploader name="image_url" label="Kapak görseli" folder="projects" defaultValue={project?.image_url} />

      <GalleryUploader
        name="gallery_urls"
        label="Galeri görselleri (opsiyonel, birden fazla seçebilirsiniz)"
        folder="projects/gallery"
        defaultValue={project?.gallery_urls}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Slug (boş bırakılırsa başlıktan üretilir)"
          name="slug"
          defaultValue={project?.slug}
        />
        <Field label="Sıra" name="sort_order" type="number" defaultValue={project?.sort_order ?? 0} />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-ink">
        <input type="checkbox" name="published" defaultChecked={project?.published ?? true} />
        Yayında
      </label>

      <SubmitButton>{project ? "Kaydet" : "Projeyi ekle"}</SubmitButton>
    </form>
  );
}
