import { getMessages } from "@/lib/data";
import MessageRow from "@/components/admin/MessageRow";

export const dynamic = "force-dynamic";
export const metadata = { title: "Mesajlar" };

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <div>
      <h1 className="mb-6 font-slab text-2xl font-bold">Mesajlar</h1>

      {messages.length === 0 ? (
        <p className="text-ink-soft">Henüz mesaj yok.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageRow key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  );
}
