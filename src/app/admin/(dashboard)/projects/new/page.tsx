import ProjectForm from "@/components/admin/ProjectForm";

export const metadata = { title: "Yeni proje" };

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="mb-6 font-slab text-2xl font-bold">Yeni proje</h1>
      <ProjectForm />
    </div>
  );
}
