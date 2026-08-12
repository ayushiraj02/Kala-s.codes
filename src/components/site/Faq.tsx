import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/lib/motion";

const faqs = [
  {
    q: "How long does a premium website take?",
    a: "Most business sites launch in 10–15 working days. Larger builds with e-commerce, listings or custom booking flows run 3–5 weeks. You get a dated schedule before we start.",
  },
  {
    q: "Do I own the website and the code?",
    a: "Completely. You own the domain, the hosting account and the source. Nothing is locked behind a proprietary builder, and we hand over documentation at launch.",
  },
  {
    q: "Can I edit content myself later?",
    a: "Yes. We structure content so it can move to a CMS whenever you want it, and we record a short walkthrough of every editable area at handover.",
  },
  {
    q: "What does the price actually include?",
    a: "Design, development, responsive QA, technical SEO, analytics, launch and 90 days of support. Hosting, domain, photography and paid integrations are quoted separately and transparently.",
  },
  {
    q: "Will it really score above 95 on Lighthouse?",
    a: "That's the target we build and test against on every project: optimised media, minimal JavaScript on first paint and GPU-accelerated motion. We share the report before launch.",
  },
  {
    q: "Can the site grow into a dashboard, blog or store?",
    a: "It's designed to. The component architecture supports blogs, client dashboards, authentication, payments and a template marketplace as later phases without a rebuild.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-5 py-28 lg:px-8 lg:py-36">
      <Reveal>
        <p className="eyebrow">Questions</p>
        <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.06]">
          Answered plainly.
        </h2>
      </Reveal>

      <Reveal delay={0.08}>
        <Accordion type="single" collapsible className="mt-12 w-full">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-border">
              <AccordionTrigger className="py-6 text-left text-base hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-7 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}