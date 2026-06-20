import { notFound } from "next/navigation";
import { getBlogPostById } from "@/lib/data";
import BlogForm from "@/components/admin/BlogForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Yazıyı düzenle" };

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const post = await getBlogPostById(params.id);
  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-6 font-slab text-2xl font-bold">Yazıyı düzenle</h1>
      <BlogForm post={post} />
    </div>
  );
}
