"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";
import LangSwitcher from "./LangSwitcher";

interface NavLink {
  href: string;
  label: string;
}

export default function MobileNav({
  locale,
  links,
  contactLabel,
}: {
  locale: Locale;
  links: NavLink[];
  contactLabel: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const base = `/${locale}`;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={isOpen}
        className="relative z-50 h-6 w-6 md:hidden"
      >
        <motion.span
          className="absolute left-0 top-1/2 -mt-px h-[2px] w-6 bg-ink"
          animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -7 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        <motion.span
          className="absolute left-0 top-1/2 -mt-px h-[2px] w-6 bg-ink"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="absolute left-0 top-1/2 -mt-px h-[2px] w-6 bg-ink"
          animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 7 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-white px-6 pb-10 pt-28"
          >
            <nav className="flex flex-1 flex-col">
              {links.map((link, index) => {
                const isCurrent = link.href === base ? pathname === base : pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
                    className="border-b border-border"
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      className={`block py-4 font-slab text-[32px] font-semibold ${
                        isCurrent ? "text-navy" : "text-ink"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="flex flex-col items-start gap-6 pt-8">
              <LangSwitcher locale={locale} />
              <Link href={`${base}/iletisim`} onClick={close} className="btn-primary w-full justify-center">
                {contactLabel}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
