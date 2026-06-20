"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function FileUploader({
  name,
  label,
  folder,
  accept = "*/*",
  defaultValue,
}: {
  name: string;
  label: string;
  folder: string;
  accept?: string;
  defaultValue?: string | null;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    const supabase = createClient();
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const path = `${folder}/${Date.now()}-${safeName}`;

    const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
      upsert: true,
    });

    if (uploadError) {
      setError(`Yükleme başarısız: ${uploadError.message}`);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setUrl(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <label className="mb-2 block text-[13px] font-medium text-ink">{label}</label>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mb-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-navy hover:underline"
        >
          Mevcut dosyayı görüntüle →
        </a>
      )}
      <input type="hidden" name={name} value={url} />
      <input
        type="file"
        accept={accept}
        onChange={handleFile}
        className="block text-sm text-ink-soft file:mr-3 file:rounded-md file:border-0 file:bg-surface file:px-3 file:py-2 file:text-sm file:font-medium file:text-ink"
      />
      {uploading && <p className="mt-1 text-xs text-ink-soft">Yükleniyor…</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
