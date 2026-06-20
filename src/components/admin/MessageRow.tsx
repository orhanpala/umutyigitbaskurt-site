"use client";

import { markMessageRead, deleteMessage } from "@/lib/actions/admin";
import type { MessageRow as MessageRowType } from "@/lib/types";

export default function MessageRow({ message }: { message: MessageRowType }) {
  return (
    <div className={`rounded-xl border p-5 ${message.is_read ? "border-border bg-white" : "border-amber bg-amber-soft/40"}`}>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="font-semibold text-ink">{message.name}</span>
          <span className="ml-2 text-[13px] text-ink-soft">{message.email}</span>
        </div>
        <span className="font-mono text-[11px] text-ink-soft">
          {new Date(message.created_at).toLocaleString("tr-TR")}
        </span>
      </div>
      {message.subject && <p className="mb-1 text-sm font-medium text-ink">{message.subject}</p>}
      <p className="whitespace-pre-wrap text-sm text-ink-soft">{message.message}</p>

      <div className="mt-4 flex gap-4">
        {!message.is_read && (
          <form action={markMessageRead}>
            <input type="hidden" name="id" value={message.id} />
            <button type="submit" className="text-[13px] font-semibold text-navy">
              Okundu işaretle
            </button>
          </form>
        )}
        <form
          action={deleteMessage}
          onSubmit={(e) => {
            if (!confirm("Mesajı silmek istediğinizden emin misiniz?")) e.preventDefault();
          }}
        >
          <input type="hidden" name="id" value={message.id} />
          <button type="submit" className="text-[13px] font-semibold text-red-600">
            Sil
          </button>
        </form>
      </div>
    </div>
  );
}
