import Link from "next/link";
import { getProjects } from "@/lib/data";
import { deleteProject } from "@/lib/actions/admin";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Projeler" };

export default async function AdminProjectsPage() {
  const projects = await getProjects({ onlyPublished: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-slab text-2xl font-bold">Projeler</h1>
        <Link href="/admin/projects/new" className="btn-primary">
          Yeni proje
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface text-[12px] uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3">Başlık</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">Sıra</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium">{project.title_tr}</td>
                <td className="px-4 py-3 text-ink-soft">{project.published ? "Yayında" : "Taslak"}</td>
                <td className="px-4 py-3 text-ink-soft">{project.sort_order}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-4">
                    <Link href={`/admin/projects/${project.id}`} className="text-[13px] font-semibold text-navy">
                      Düzenle
                    </Link>
                    <DeleteButton action={deleteProject} id={project.id} />
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-ink-soft" colSpan={4}>
                  Henüz proje eklenmedi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
