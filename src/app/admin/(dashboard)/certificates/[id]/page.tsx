import { notFound } from "next/navigation";
import { getCertificateById } from "@/lib/data";
import CertificateForm from "@/components/admin/CertificateForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sertifikayı düzenle" };

export default async function EditCertificatePage({ params }: { params: { id: string } }) {
  const certificate = await getCertificateById(params.id);
  if (!certificate) notFound();

  return (
    <div>
      <h1 className="mb-6 font-slab text-2xl font-bold">Sertifikayı düzenle</h1>
      <CertificateForm certificate={certificate} />
    </div>
  );
}
