import Link from "next/link";
import { getCertificates } from "@/lib/data";
import { deleteCertificate } from "@/lib/actions/admin";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sertifikalar" };

export default async function AdminCertificatesPage() {
  const certificates = await getCertificates();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-slab text-2xl font-bold">Sertifikalar</h1>
        <Link href="/admin/certificates/new" className="btn-primary">
          Yeni sertifika
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface text-[12px] uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3">Başlık</th>
              <th className="px-4 py-3">Veren kurum</th>
              <th className="px-4 py-3">Sıra</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {certificates.map((certificate) => (
              <tr key={certificate.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium">{certificate.title_tr}</td>
                <td className="px-4 py-3 text-ink-soft">{certificate.issuer}</td>
                <td className="px-4 py-3 text-ink-soft">{certificate.sort_order}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-4">
                    <Link href={`/admin/certificates/${certificate.id}`} className="text-[13px] font-semibold text-navy">
                      Düzenle
                    </Link>
                    <DeleteButton action={deleteCertificate} id={certificate.id} />
                  </div>
                </td>
              </tr>
            ))}
            {certificates.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-ink-soft" colSpan={4}>
                  Henüz sertifika eklenmedi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
