"use server";

import { createClient } from "@/lib/supabase/server";

export interface ContactFormState {
  status: "idle" | "success" | "error";
}

export async function submitContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error" };
  }

  const supabase = createClient();
  const { error } = await supabase.from("messages").insert({
    name,
    email,
    subject: subject || null,
    message,
  });

  if (error) {
    return { status: "error" };
  }

  return { status: "success" };
}
