"use client";

import { useFormState } from "react-dom";
import { updatePassword, type PasswordState } from "@/lib/actions/account";
import SubmitButton from "./SubmitButton";

const initialState: PasswordState = { status: "idle", message: null };

export default function PasswordForm() {
  const [state, formAction] = useFormState(updatePassword, initialState);

  return (
    <form action={formAction} className="max-w-sm space-y-5">
      <div>
        <label htmlFor="password" className="mb-2 block text-[13px] font-medium text-ink">
          Yeni şifre
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="w-full rounded-md border border-border px-3.5 py-2.5 text-sm outline-none focus:border-navy"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="mb-2 block text-[13px] font-medium text-ink">
          Yeni şifre (tekrar)
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="w-full rounded-md border border-border px-3.5 py-2.5 text-sm outline-none focus:border-navy"
        />
      </div>

      {state.status === "error" && <p className="text-sm font-medium text-red-600">{state.message}</p>}
      {state.status === "success" && <p className="text-sm font-medium text-navy">{state.message}</p>}

      <SubmitButton>Şifreyi güncelle</SubmitButton>
    </form>
  );
}
