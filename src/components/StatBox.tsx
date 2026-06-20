export default function StatBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl bg-surface p-5">
      <div className="font-slab text-[32px] font-bold text-navy">{String(value).padStart(2, "0")}</div>
      <div className="mt-1 text-[13px] text-ink-soft">{label}</div>
    </div>
  );
}
