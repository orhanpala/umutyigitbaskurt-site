export default function MoveButtons({
  action,
  id,
  disableUp,
  disableDown,
}: {
  action: (formData: FormData) => void;
  id: string;
  disableUp?: boolean;
  disableDown?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <form action={action}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="direction" value="up" />
        <button
          type="submit"
          disabled={disableUp}
          aria-label="Yukarı taşı"
          className="flex h-5 w-5 items-center justify-center text-ink-soft hover:text-ink disabled:opacity-25"
        >
          ▲
        </button>
      </form>
      <form action={action}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="direction" value="down" />
        <button
          type="submit"
          disabled={disableDown}
          aria-label="Aşağı taşı"
          className="flex h-5 w-5 items-center justify-center text-ink-soft hover:text-ink disabled:opacity-25"
        >
          ▼
        </button>
      </form>
    </div>
  );
}
