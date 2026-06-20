import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/data";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Projeyi düzenle" };

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);
  if (!project) notFound();

  return (
    <div>
      <h1 className="mb-6 font-slab text-2xl font-bold">Projeyi düzenle</h1>
      <ProjectForm project={project} />
    </div>
  );
}
