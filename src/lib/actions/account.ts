"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface PasswordState {
  status: "idle" | "success" | "error";
  message: string | null;
}

export async function updatePassword(
  _prevState: PasswordState,
  formData: FormData
): Promise<PasswordState> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (password.length < 8) {
    return { status: "error", message: "Şifre en az 8 karakter olmalı." };
  }

  if (password !== confirmPassword) {
    return { status: "error", message: "Şifreler eşleşmiyor." };
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { status: "error", message: `Şifre güncellenemedi: ${error.message}` };
  }

  return { status: "success", message: "Şifre başarıyla güncellendi." };
}
