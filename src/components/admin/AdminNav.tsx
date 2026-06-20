"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/actions/admin";

const links = [
  { href: "/admin", label: "Genel bakış", exact: true },
  { href: "/admin/projects", label: "Projeler" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/certificates", label: "Sertifikalar" },
  { href: "/admin/about", label: "Hakkımda & istatistikler" },
  { href: "/admin/messages", label: "Mesajlar" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-white p-5">
      <div className="mb-8 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy font-slab text-xs font-bold text-white">
          UYB
        </span>
        <span className="text-sm font-semibold">Admin panel</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map((link) => {
          const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                isActive ? "bg-amber-soft text-amber" : "text-ink-soft hover:bg-surface hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <form action={signOut}>
        <button type="submit" className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-ink-soft hover:bg-surface hover:text-ink">
          Çıkış yap
        </button>
      </form>
    </aside>
  );
}
