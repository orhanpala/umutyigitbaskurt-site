import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="font-mono text-xs uppercase tracking-[.08em] text-amber">404</span>
      <h1 className="font-slab text-3xl font-bold text-ink">Sayfa bulunamadı</h1>
      <p className="text-ink-soft">Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.</p>
      <Link href="/tr" className="btn-primary mt-2">
        Anasayfaya dön
      </Link>
    </div>
  );
}
