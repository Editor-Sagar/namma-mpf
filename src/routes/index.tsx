import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Features } from "@/components/Features";
import { UploadCTA } from "@/components/UploadCTA";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Namma MPF, Our Memories, Preserved Forever" },
      {
        name: "description",
        content:
          "A premium, cinematic platform for delivering wedding photographs, films and guest memories, wrapped in an experience as elegant as the day itself.",
      },
      { property: "og:title", content: "Namma MPF, Our Memories, Preserved Forever" },
      {
        property: "og:description",
        content:
          "Luxury wedding memory platform: galleries, cinematic films, album selection and guest contributions.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Features />
        <UploadCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
