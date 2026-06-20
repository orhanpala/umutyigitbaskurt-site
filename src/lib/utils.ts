import slugifyLib from "slugify";
import type { Locale } from "@/lib/i18n/config";

export function formatDate(value: string | null, locale: Locale): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(input: string): string {
  return slugifyLib(input, { lower: true, strict: true, locale: "tr" });
}

