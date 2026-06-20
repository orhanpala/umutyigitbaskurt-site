"use client";

import { useFormState, useFormStatus } from "react-dom";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { submitContactMessage, type ContactFormState } from "@/app/[locale]/iletisim/actions";

const initialState: ContactFormState = { status: "idle" };

function SubmitButton({ dict }: { dict: Dictionary }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
      {pending ? dict.contact.sending : dict.contact.send}
    </button>
  );
}

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const [state, formAction] = useFormState(submitContactMessage, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-[13px] font-medium text-ink">
            {dict.contact.name}
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-md border border-border px-3.5 py-2.5 text-sm outline-none focus:border-navy"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-[13px] font-medium text-ink">
            {dict.contact.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-border px-3.5 py-2.5 text-sm outline-none focus:border-navy"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mb-2 block text-[13px] font-medium text-ink">
          {dict.contact.subject}
        </label>
        <input
          id="subject"
          name="subject"
          className="w-full rounded-md border border-border px-3.5 py-2.5 text-sm outline-none focus:border-navy"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-[13px] font-medium text-ink">
          {dict.contact.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full rounded-md border border-border px-3.5 py-2.5 text-sm outline-none focus:border-navy"
        />
      </div>

      <SubmitButton dict={dict} />

      {state.status === "success" && <p className="text-sm font-medium text-navy">{dict.contact.success}</p>}
      {state.status === "error" && <p className="text-sm font-medium text-red-600">{dict.contact.error}</p>}
    </form>
  );
}
