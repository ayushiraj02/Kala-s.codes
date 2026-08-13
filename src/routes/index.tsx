import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { CursorGlow, useSmoothScroll } from "@/lib/motion";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Why } from "@/components/site/Why";
import { Templates } from "@/components/site/Templates";
import { Comparison } from "@/components/site/Comparison";
import { QuoteBuilder } from "@/components/site/QuoteBuilder";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { MobileShowcase } from "@/components/site/MobileShowcase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kala's.codes — Luxury Web Design & Development Studio" },
      {
        name: "description",
        content:
          "Premium websites for salons, clinics, hotels, restaurants and growing brands. Fast, accessible, SEO-ready builds with live template demos and instant quotes.",
      },
      { property: "og:title", content: "Kala's.codes — Luxury Web Design Studio" },
      {
        property: "og:description",
        content:
          "Premium business websites engineered for speed, search and conversion. Explore live templates and build an instant quote.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useSmoothScroll();

  return (
    <>
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <Why />
        <Templates />
        <MobileShowcase />
        <Comparison />
        <QuoteBuilder />
        <BeforeAfter />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
