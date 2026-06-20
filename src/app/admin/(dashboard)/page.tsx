import Link from "next/link";
import { getProjects, getBlogPosts, getCertificates, getMessages } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Genel bakış" };

export default async function AdminDashboardPage() {
  const [projects, posts, certificates, messages] = await Promise.all([
    getProjects({ onlyPublished: false }),
    getBlogPosts({ onlyPublished: false }),
    getCertificates(),
    getMessages(),
  ]);

  const unread = messages.filter((m) => !m.is_read).length;

  const cards = [
    { label: "Projeler", count: projects.length, href: "/admin/projects" },
    { label: "Blog yazıları", count: posts.length, href: "/admin/blog" },
    { label: "Sertifikalar", count: certificates.length, href: "/admin/certificates" },
    { label: "Okunmamış mesaj", count: unread, href: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="mb-8 font-slab text-2xl font-bold">Genel bakış</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-border bg-white p-5 hover:border-navy"
          >
            <div className="font-slab text-3xl font-bold text-navy">{card.count}</div>
            <div className="mt-1 text-[13px] text-ink-soft">{card.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
