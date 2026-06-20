import { getAbout } from "@/lib/data";
import AboutForm from "@/components/admin/AboutForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Hakkımda & istatistikler" };

export default async function AdminAboutPage() {
  const about = await getAbout();

  return (
    <div>
      <h1 className="mb-6 font-slab text-2xl font-bold">Hakkımda & istatistikler</h1>
      <AboutForm about={about} />
    </div>
  );
}
