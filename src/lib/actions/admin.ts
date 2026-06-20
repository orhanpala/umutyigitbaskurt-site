"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import type { TimelineEntry } from "@/lib/types";

async function requireUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ---------- Projects ----------

export async function saveProject(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  const title_tr = String(formData.get("title_tr") ?? "");
  const slugInput = String(formData.get("slug") ?? "");

  const payload = {
    title_tr,
    title_en: String(formData.get("title_en") ?? ""),
    category_tr: String(formData.get("category_tr") ?? ""),
    category_en: String(formData.get("category_en") ?? ""),
    summary_tr: String(formData.get("summary_tr") ?? ""),
    summary_en: String(formData.get("summary_en") ?? ""),
    content_tr: String(formData.get("content_tr") ?? ""),
    content_en: String(formData.get("content_en") ?? ""),
    image_url: String(formData.get("image_url") ?? "") || null,
    published: formData.get("published") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
    slug: slugify(slugInput || title_tr),
  };

  if (id) {
    await supabase.from("projects").update(payload).eq("id", id);
  } else {
    await supabase.from("projects").insert(payload);
  }

  revalidatePath("/", "layout");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/", "layout");
}

// ---------- Blog posts ----------

export async function saveBlogPost(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  const title_tr = String(formData.get("title_tr") ?? "");
  const slugInput = String(formData.get("slug") ?? "");
  const isPublished = formData.get("published") === "on";
  const existingPublishedAt = String(formData.get("published_at") ?? "") || null;

  const payload = {
    title_tr,
    title_en: String(formData.get("title_en") ?? ""),
    excerpt_tr: String(formData.get("excerpt_tr") ?? ""),
    excerpt_en: String(formData.get("excerpt_en") ?? ""),
    content_tr: String(formData.get("content_tr") ?? ""),
    content_en: String(formData.get("content_en") ?? ""),
    cover_image_url: String(formData.get("cover_image_url") ?? "") || null,
    published: isPublished,
    published_at: isPublished ? existingPublishedAt ?? new Date().toISOString() : null,
    slug: slugify(slugInput || title_tr),
  };

  if (id) {
    await supabase.from("blog_posts").update(payload).eq("id", id);
  } else {
    await supabase.from("blog_posts").insert(payload);
  }

  revalidatePath("/", "layout");
  redirect("/admin/blog");
}

export async function deleteBlogPost(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  await supabase.from("blog_posts").delete().eq("id", id);
  revalidatePath("/", "layout");
}

// ---------- Certificates ----------

export async function saveCertificate(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");

  const payload = {
    title_tr: String(formData.get("title_tr") ?? ""),
    title_en: String(formData.get("title_en") ?? ""),
    issuer: String(formData.get("issuer") ?? ""),
    issue_date: String(formData.get("issue_date") ?? "") || null,
    image_url: String(formData.get("image_url") ?? "") || null,
    document_url: String(formData.get("document_url") ?? "") || null,
    sort_order: Number(formData.get("sort_order") ?? 0),
  };

  if (id) {
    await supabase.from("certificates").update(payload).eq("id", id);
  } else {
    await supabase.from("certificates").insert(payload);
  }

  revalidatePath("/", "layout");
  redirect("/admin/certificates");
}

export async function deleteCertificate(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  await supabase.from("certificates").delete().eq("id", id);
  revalidatePath("/", "layout");
}

// ---------- About / homepage stats ----------

export async function updateAbout(formData: FormData) {
  const supabase = await requireUser();

  let timeline: TimelineEntry[] = [];
  try {
    timeline = JSON.parse(String(formData.get("timeline") ?? "[]"));
  } catch {
    timeline = [];
  }

  const payload = {
    eyebrow_tr: String(formData.get("eyebrow_tr") ?? ""),
    eyebrow_en: String(formData.get("eyebrow_en") ?? ""),
    headline_tr: String(formData.get("headline_tr") ?? ""),
    headline_en: String(formData.get("headline_en") ?? ""),
    lead_tr: String(formData.get("lead_tr") ?? ""),
    lead_en: String(formData.get("lead_en") ?? ""),
    bio_tr: String(formData.get("bio_tr") ?? ""),
    bio_en: String(formData.get("bio_en") ?? ""),
    photo_url: String(formData.get("photo_url") ?? "") || null,
    cv_url: String(formData.get("cv_url") ?? "") || null,
    contact_email: String(formData.get("contact_email") ?? "") || null,
    linkedin_url: String(formData.get("linkedin_url") ?? "") || null,
    stat_projects: Number(formData.get("stat_projects") ?? 0),
    stat_certificates: Number(formData.get("stat_certificates") ?? 0),
    stat_internships: Number(formData.get("stat_internships") ?? 0),
    stat_languages: Number(formData.get("stat_languages") ?? 0),
    timeline,
    updated_at: new Date().toISOString(),
  };

  await supabase.from("about").update(payload).eq("id", 1);

  revalidatePath("/", "layout");
  redirect("/admin/about");
}

// ---------- Messages ----------

export async function markMessageRead(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  await supabase.from("messages").update({ is_read: true }).eq("id", id);
  revalidatePath("/admin/messages");
}

export async function deleteMessage(formData: FormData) {
  const supabase = await requireUser();
  const id = String(formData.get("id") ?? "");
  await supabase.from("messages").delete().eq("id", id);
  revalidatePath("/admin/messages");
}
