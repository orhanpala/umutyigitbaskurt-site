"use client";

export default function DeleteButton({
  action,
  id,
  confirmText = "Bu kaydı silmek istediğinizden emin misiniz?",
}: {
  action: (formData: FormData) => void;
  id: string;
  confirmText?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-[13px] font-semibold text-red-600 hover:underline">
        Sil
      </button>
    </form>
  );
}
