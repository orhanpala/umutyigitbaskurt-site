import PasswordForm from "@/components/admin/PasswordForm";

export const metadata = { title: "Hesap ayarları" };

export default function AdminAccountPage() {
  return (
    <div>
      <h1 className="mb-2 font-slab text-2xl font-bold">Hesap ayarları</h1>
      <p className="mb-6 text-sm text-ink-soft">Admin girişinde kullanılan şifrenizi buradan değiştirebilirsiniz.</p>
      <PasswordForm />
    </div>
  );
}
