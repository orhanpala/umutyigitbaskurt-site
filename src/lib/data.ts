import { createClient } from "@/lib/supabase/server";
import type { AboutRow, BlogPostRow, CertificateRow, MessageRow, ProjectRow } from "@/lib/types";

const FALLBACK_ABOUT: AboutRow = {
  id: 1,
  eyebrow_tr: "Uluslararası Ticaret Öğrencisi",
  eyebrow_en: "International Trade Student",
  headline_tr: "Ticareti ve lojistiği sahada öğreniyorum.",
  headline_en: "Learning trade and logistics in the field.",
  lead_tr:
    "İstanbul'da uluslararası ticaret okuyorum; tedarik zincirleri, gümrük süreçleri ve ihracat operasyonları üzerine projeler üretiyor, edindiğim deneyimleri burada paylaşıyorum.",
  lead_en:
    "I study international trade in Istanbul; I work on projects about supply chains, customs processes and export operations, and share what I learn here.",
  bio_tr: "Bu metin admin panelden düzenlenebilir.",
  bio_en: "This text can be edited from the admin panel.",
  photo_url: null,
  cv_url: null,
  contact_email: null,
  linkedin_url: null,
  phone: null,
  instagram_url: null,
  stat_projects: 0,
  stat_certificates: 0,
  stat_internships: 0,
  stat_languages: 2,
  timeline: [],
  skills: [],
  updated_at: new Date(0).toISOString(),
};

export async function getAbout(): Promise<AboutRow> {
  const supabase = createClient();
  const { data } = await supabase.from("about").select("*").eq("id", 1).maybeSingle();
  return (data as AboutRow | null) ?? FALLBACK_ABOUT;
}

export async function getProjects(opts: { onlyPublished?: boolean } = {}): Promise<ProjectRow[]> {
  const supabase = createClient();
  let query = supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (opts.onlyPublished !== false) query = query.eq("published", true);
  const { data } = await query;
  return (data as ProjectRow[] | null) ?? [];
}

export async function getProjectBySlug(slug: string): Promise<ProjectRow | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as ProjectRow | null) ?? null;
}

export async function getBlogPosts(opts: { onlyPublished?: boolean } = {}): Promise<BlogPostRow[]> {
  const supabase = createClient();
  let query = supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false, nullsFirst: false });
  if (opts.onlyPublished !== false) query = query.eq("published", true);
  const { data } = await query;
  return (data as BlogPostRow[] | null) ?? [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostRow | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as BlogPostRow | null) ?? null;
}

export async function getCertificates(): Promise<CertificateRow[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("certificates")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  return (data as CertificateRow[] | null) ?? [];
}

export async function getProjectById(id: string): Promise<ProjectRow | null> {
  const supabase = createClient();
  const { data } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  return (data as ProjectRow | null) ?? null;
}

export async function getBlogPostById(id: string): Promise<BlogPostRow | null> {
  const supabase = createClient();
  const { data } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
  return (data as BlogPostRow | null) ?? null;
}

export async function getCertificateById(id: string): Promise<CertificateRow | null> {
  const supabase = createClient();
  const { data } = await supabase.from("certificates").select("*").eq("id", id).maybeSingle();
  return (data as CertificateRow | null) ?? null;
}

export async function getMessages(): Promise<MessageRow[]> {
  const supabase = createClient();
  const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
  return (data as MessageRow[] | null) ?? [];
}
