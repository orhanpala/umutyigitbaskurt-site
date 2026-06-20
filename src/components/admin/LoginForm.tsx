"use client";

import { useFormState } from "react-dom";
import { signIn, type LoginState } from "@/app/admin/login/actions";
import SubmitButton from "./SubmitButton";

const initialState: LoginState = { error: null };

export default function LoginForm() {
  const [state, formAction] = useFormState(signIn, initialState);

  return (
    <form action={formAction} className="w-full max-w-sm space-y-5 rounded-2xl border border-border bg-white p-8">
      <div>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy font-slab text-sm font-bold text-white">
          UYB
        </span>
        <h1 className="mt-4 font-slab text-xl font-bold">Admin girişi</h1>
        <p className="mt-1 text-sm text-ink-soft">Yalnızca yetkili kullanıcı giriş yapabilir.</p>
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-[13px] font-medium text-ink">
          E-posta
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-border px-3.5 py-2.5 text-sm outline-none focus:border-navy"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-[13px] font-medium text-ink">
          Şifre
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-md border border-border px-3.5 py-2.5 text-sm outline-none focus:border-navy"
        />
      </div>

      {state.error && <p className="text-sm font-medium text-red-600">{state.error}</p>}

      <SubmitButton>Giriş yap</SubmitButton>
    </form>
  );
}
