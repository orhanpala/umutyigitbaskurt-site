"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function InlineImageUploader({
  value,
  onChange,
  folder,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
  folder: string;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const supabase = createClient();
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const path = `${folder}/${Date.now()}-${safeName}`;

    const { error } = await supabase.storage.from("media").upload(path, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onChange(data.publicUrl);
    }

    setUploading(false);
    event.target.value = "";
  }

  return (
    <div className="flex items-center gap-2">
      {value && (
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md border border-border bg-surface">
          <Image src={value} alt="" fill className="object-cover" />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="max-w-[160px] text-xs text-ink-soft file:mr-2 file:rounded-md file:border-0 file:bg-surface file:px-2 file:py-1.5 file:text-xs file:font-medium file:text-ink"
      />
      {uploading && <span className="shrink-0 text-xs text-ink-soft">Yükleniyor…</span>}
      {value && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="shrink-0 text-xs font-semibold text-red-600"
        >
          Kaldır
        </button>
      )}
    </div>
  );
}
