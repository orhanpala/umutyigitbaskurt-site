import Link from "next/link";
import { getBlogPosts } from "@/lib/data";
import { deleteBlogPost } from "@/lib/actions/admin";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Blog" };

export default async function AdminBlogPage() {
  const posts = await getBlogPosts({ onlyPublished: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-slab text-2xl font-bold">Blog</h1>
        <Link href="/admin/blog/new" className="btn-primary">
          Yeni yazı
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface text-[12px] uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3">Başlık</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium">{post.title_tr}</td>
                <td className="px-4 py-3 text-ink-soft">{post.published ? "Yayında" : "Taslak"}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-4">
                    <Link href={`/admin/blog/${post.id}`} className="text-[13px] font-semibold text-navy">
                      Düzenle
                    </Link>
                    <DeleteButton action={deleteBlogPost} id={post.id} />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-ink-soft" colSpan={3}>
                  Henüz yazı eklenmedi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
