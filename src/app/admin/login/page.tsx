import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Admin girişi" };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6">
      <LoginForm />
    </div>
  );
}
