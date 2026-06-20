import CertificateForm from "@/components/admin/CertificateForm";

export const metadata = { title: "Yeni sertifika" };

export default function NewCertificatePage() {
  return (
    <div>
      <h1 className="mb-6 font-slab text-2xl font-bold">Yeni sertifika</h1>
      <CertificateForm />
    </div>
  );
}
