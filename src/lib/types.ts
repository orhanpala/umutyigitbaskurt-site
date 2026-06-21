export interface TimelineEntry {
  year: string;
  title_tr: string;
  title_en: string;
  description_tr: string;
  description_en: string;
  icon_url: string | null;
}

export interface SkillEntry {
  label_tr: string;
  label_en: string;
}

export interface AboutRow {
  id: number;
  eyebrow_tr: string;
  eyebrow_en: string;
  headline_tr: string;
  headline_en: string;
  lead_tr: string;
  lead_en: string;
  bio_tr: string;
  bio_en: string;
  photo_url: string | null;
  cv_url: string | null;
  contact_email: string | null;
  linkedin_url: string | null;
  phone: string | null;
  instagram_url: string | null;
  stat_projects: number;
  stat_certificates: number;
  stat_internships: number;
  stat_languages: number;
  timeline: TimelineEntry[];
  skills: SkillEntry[];
  updated_at: string;
}

export interface ProjectRow {
  id: string;
  slug: string;
  category_tr: string;
  category_en: string;
  title_tr: string;
  title_en: string;
  summary_tr: string;
  summary_en: string;
  content_tr: string;
  content_en: string;
  image_url: string | null;
  gallery_urls: string[];
  published: boolean;
  sort_order: number;
  created_at: string;
}

export interface BlogPostRow {
  id: string;
  slug: string;
  category_tr: string;
  category_en: string;
  title_tr: string;
  title_en: string;
  excerpt_tr: string;
  excerpt_en: string;
  content_tr: string;
  content_en: string;
  cover_image_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

export interface CertificateRow {
  id: string;
  title_tr: string;
  title_en: string;
  issuer: string;
  issue_date: string | null;
  image_url: string | null;
  document_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface MessageRow {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}
