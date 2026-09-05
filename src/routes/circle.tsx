import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, UserPlus, Send } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalState, newId, type Contact } from "@/lib/storage";

export const Route = createFileRoute("/circle")({
  head: () => ({
    meta: [
      { title: "Trusted Circle — Saheli" },
      {
        name: "description",
        content:
          "Save the people who should be told if something feels wrong, and send them a discreet check-in in one tap.",
      },
      { property: "og:title", content: "Trusted Circle — Saheli" },
      {
        property: "og:description",
        content: "The people who should know if something feels wrong.",
      },
    ],
  }),
  component: Circle,
});

function Circle() {
  const [contacts, setContacts] = useLocalState<Contact[]>("saheli.contacts", []);
  const [form, setForm] = useState({ name: "", phone: "", relation: "" });

  const add = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    setContacts((prev) => [
      ...prev,
      { id: newId(), name: form.name.trim(), phone: form.phone.trim(), relation: form.relation.trim() },
    ]);
    setForm({ name: "", phone: "", relation: "" });
    toast.success("Added to your trusted circle");
  };

  const remove = (id: string) => setContacts((prev) => prev.filter((c) => c.id !== id));

  const discreetMessage = encodeURIComponent(
    "Hi — just checking in with you. I'm keeping you as one of my trusted contacts. If I message you the word 'coffee', please call me straight away.",
  );

  return (
    <div>
      <PageHeader
        eyebrow="Stay connected"
        title="Trusted Circle"
        description="Two or three people is enough. Choose people who will pick up the phone and who are not close to the person you're worried about. Contacts are stored only on this device."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="panel h-fit space-y-3 p-5">
          <h2 className="font-semibold">Add a contact</h2>
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Phone number with country code"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            placeholder="Relationship (optional)"
            value={form.relation}
            onChange={(e) => setForm({ ...form, relation: e.target.value })}
          />
          <Button className="w-full gap-2" onClick={add}>
            <UserPlus className="size-4" /> Add to circle
          </Button>
        </div>

        <div className="space-y-3">
          {contacts.length === 0 ? (
            <div className="panel p-6 text-sm text-muted-foreground">
              No contacts yet. The HELP button works better once someone is here.
            </div>
          ) : (
            contacts.map((c) => (
              <div key={c.id} className="panel flex flex-wrap items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {c.phone}
                    {c.relation ? ` · ${c.relation}` : ""}
                  </p>
                </div>
                <a href={`sms:${c.phone}?body=${discreetMessage}`}>
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Send className="size-3.5" /> Discreet check-in
                  </Button>
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove ${c.name}`}
                  onClick={() => remove(c.id)}
                >
                  <Trash2 className="size-4 text-signal" />
                </Button>
              </div>
            ))
          )}

          <div className="panel p-5 text-sm leading-relaxed text-muted-foreground">
            <p className="font-medium text-foreground">Agree on a code word</p>
            <p className="mt-1">
              Pick an ordinary word — "coffee", "chai" — that means "call me now, don't ask why".
              The discreet check-in message above sets this up for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
