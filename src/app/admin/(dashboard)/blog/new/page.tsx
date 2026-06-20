import BlogForm from "@/components/admin/BlogForm";

export const metadata = { title: "Yeni yazı" };

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="mb-6 font-slab text-2xl font-bold">Yeni yazı</h1>
      <BlogForm />
    </div>
  );
}
