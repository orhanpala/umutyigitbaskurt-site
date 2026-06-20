import type { Locale } from "./config";

export const dictionary = {
  tr: {
    nav: {
      home: "Anasayfa",
      about: "Hakkımda",
      projects: "Projeler",
      blog: "Blog",
      certificates: "Sertifikalar",
      contact: "İletişim",
      contactCta: "İletişime geç",
    },
    hero: {
      ctaProjects: "Projeleri gör",
      ctaCV: "CV indir",
    },
    stats: {
      projects: "Devam eden proje",
      certificates: "Sertifika",
      internships: "Yurt dışı staj",
      languages: "Dil — TR / EN",
    },
    home: {
      projectsTag: "Seçili çalışmalar",
      projectsTitle: "Projeler",
      certificatesTag: "Belgelenmiş yetkinlikler",
      certificatesTitle: "Sertifikalar",
      viewAll: "Tümünü gör →",
    },
    projects: {
      title: "Projeler",
      eyebrow: "Çalışmalar",
      empty: "Henüz proje eklenmedi.",
      back: "← Tüm projeler",
    },
    blog: {
      title: "Blog",
      eyebrow: "Yazılar",
      empty: "Henüz yazı eklenmedi.",
      back: "← Tüm yazılar",
      readMore: "Devamını oku →",
    },
    certificates: {
      title: "Sertifikalar",
      eyebrow: "Belgelenmiş yetkinlikler",
      empty: "Henüz sertifika eklenmedi.",
      viewDocument: "Belgeyi görüntüle →",
    },
    about: {
      eyebrow: "Hakkımda",
      title: "Hakkımda",
      timelineTitle: "Eğitim & Deneyim",
    },
    contact: {
      eyebrow: "İletişim",
      title: "İletişime geçin",
      lead: "Sorularınız, iş birliği teklifleriniz veya staj görüşmeleri için aşağıdaki formu doldurabilir ya da doğrudan e-posta gönderebilirsiniz.",
      name: "Ad Soyad",
      email: "E-posta",
      subject: "Konu",
      message: "Mesajınız",
      send: "Gönder",
      sending: "Gönderiliyor…",
      success: "Mesajınız iletildi, teşekkürler.",
      error: "Mesaj gönderilemedi, lütfen tekrar deneyin.",
      directEmail: "Doğrudan e-posta",
    },
    footer: {
      rights: "Tüm hakları saklıdır.",
      tagline:
        "Uluslararası ticaret, lojistik ve gümrük süreçleri üzerine projeler üretiyor, öğrendiklerimi burada paylaşıyorum.",
      pagesTitle: "Sayfalar",
      contactTitle: "İletişim",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      blog: "Blog",
      certificates: "Certificates",
      contact: "Contact",
      contactCta: "Get in touch",
    },
    hero: {
      ctaProjects: "View projects",
      ctaCV: "Download CV",
    },
    stats: {
      projects: "Ongoing projects",
      certificates: "Certificates",
      internships: "International internship",
      languages: "Languages — TR / EN",
    },
    home: {
      projectsTag: "Selected work",
      projectsTitle: "Projects",
      certificatesTag: "Documented skills",
      certificatesTitle: "Certificates",
      viewAll: "View all →",
    },
    projects: {
      title: "Projects",
      eyebrow: "Work",
      empty: "No projects yet.",
      back: "← All projects",
    },
    blog: {
      title: "Blog",
      eyebrow: "Posts",
      empty: "No posts yet.",
      back: "← All posts",
      readMore: "Read more →",
    },
    certificates: {
      title: "Certificates",
      eyebrow: "Documented skills",
      empty: "No certificates yet.",
      viewDocument: "View document →",
    },
    about: {
      eyebrow: "About",
      title: "About me",
      timelineTitle: "Education & Experience",
    },
    contact: {
      eyebrow: "Contact",
      title: "Get in touch",
      lead: "For questions, collaboration proposals, or internship discussions, fill out the form below or email me directly.",
      name: "Full name",
      email: "Email",
      subject: "Subject",
      message: "Your message",
      send: "Send",
      sending: "Sending…",
      success: "Your message has been sent, thank you.",
      error: "Could not send the message, please try again.",
      directEmail: "Direct email",
    },
    footer: {
      rights: "All rights reserved.",
      tagline:
        "I work on projects about international trade, logistics and customs processes, and share what I learn here.",
      pagesTitle: "Pages",
      contactTitle: "Contact",
    },
  },
} as const satisfies Record<Locale, unknown>;

export type Dictionary = (typeof dictionary)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionary[locale];
}
