"use client";

import { saveBlogPost } from "@/lib/actions/admin";
import type { BlogPostRow } from "@/lib/types";
import ImageUploader from "./ImageUploader";
import SubmitButton from "./SubmitButton";
import { Field, TextArea } from "./FormFields";

export default function BlogForm({ post }: { post?: BlogPostRow }) {
  return (
    <form action={saveBlogPost} className="max-w-3xl space-y-6">
      <input type="hidden" name="id" defaultValue={post?.id} />
      <input type="hidden" name="published_at" defaultValue={post?.published_at ?? ""} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Başlık (TR)" name="title_tr" defaultValue={post?.title_tr} required />
        <Field label="Başlık (EN)" name="title_en" defaultValue={post?.title_en} required />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Kategori (TR) — örn. Lojistik" name="category_tr" defaultValue={post?.category_tr} />
        <Field label="Kategori (EN)" name="category_en" defaultValue={post?.category_en} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextArea label="Özet (TR)" name="excerpt_tr" defaultValue={post?.excerpt_tr} rows={3} />
        <TextArea label="Özet (EN)" name="excerpt_en" defaultValue={post?.excerpt_en} rows={3} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextArea label="İçerik — Markdown (TR)" name="content_tr" defaultValue={post?.content_tr} rows={12} />
        <TextArea label="İçerik — Markdown (EN)" name="content_en" defaultValue={post?.content_en} rows={12} />
      </div>

      <ImageUploader name="cover_image_url" label="Kapak görseli" folder="blog" defaultValue={post?.cover_image_url} />

      <Field label="Slug (boş bırakılırsa başlıktan üretilir)" name="slug" defaultValue={post?.slug} />

      <label className="flex items-center gap-2 text-sm font-medium text-ink">
        <input type="checkbox" name="published" defaultChecked={post?.published ?? true} />
        Yayında
      </label>

      <SubmitButton>{post ? "Kaydet" : "Yazıyı ekle"}</SubmitButton>
    </form>
  );
}
