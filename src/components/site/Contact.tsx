import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { Reveal, Magnetic } from "@/lib/motion";

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    setTimeout(() => {
      setSending(false);
      form.reset();
      toast.success("Enquiry received", {
        description: "We reply within one working day — usually much sooner.",
      });
    }, 700);
  };

  return (
    <section id="contact" className="border-t border-border py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-8">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.06]">
            Let&apos;s design the first room.
          </h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            Book a free 20-minute consultation. We&apos;ll review your current site, name the three
            things costing you enquiries, and tell you honestly whether you need us.
          </p>

          <ul className="mt-10 space-y-3">
            {[
              { icon: MessageCircle, label: "WhatsApp", value: "+91 98765 43210", href: "https://wa.me/919876543210" },
              { icon: Mail, label: "Email", value: "studio@kalas.codes", href: "mailto:studio@kalas.codes" },
              { icon: Phone, label: "Call", value: "+91 98765 43210", href: "tel:+919876543210" },
            ].map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
                >
                  <c.icon className="h-5 w-5 shrink-0 text-royal" aria-hidden />
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {c.label}
                    </span>
                    <span className="block truncate text-sm">{c.value}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            onSubmit={onSubmit}
            className="rounded-xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] lg:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Name" />
              <Field id="business" label="Business" />
              <Field id="email" label="Email" type="email" />
              <Field id="phone" label="Phone / WhatsApp" type="tel" required={false} />
            </div>

            <div className="mt-5">
              <label htmlFor="brief" className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                What are you building?
              </label>
              <textarea
                id="brief"
                name="brief"
                rows={5}
                required
                className="mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-royal focus:ring-2 focus:ring-ring/25"
                placeholder="A new site for our salon, with online booking…"
              />
            </div>

            <Magnetic strength={0.18}>
              <button
                type="submit"
                disabled={sending}
                className="mt-7 inline-flex items-center gap-2 rounded-sm px-7 py-3.5 text-sm text-primary-foreground shadow-[var(--shadow-soft)] transition-opacity hover:opacity-95 disabled:opacity-60"
                style={{ background: "var(--gradient-royal)" }}
              >
                {sending ? "Sending…" : "Request consultation"}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </button>
            </Magnetic>
            <p className="mt-4 text-xs text-muted-foreground">
              No mailing list, no follow-up spam. One reply, from a person.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  required = true,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-royal focus:ring-2 focus:ring-ring/25"
      />
    </div>
  );
}