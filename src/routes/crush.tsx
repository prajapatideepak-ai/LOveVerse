import { createFileRoute } from "@tanstack/react-router";
import { CrushPage } from "@/components/love/pages-a";
import { resolveData, searchSchema } from "@/lib/love";

export const Route = createFileRoute("/crush")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "I Have a Crush on You — LoveVerse" },
      { name: "description", content: "A shy confession sealed in an animated envelope." },
      { property: "og:title", content: "I Have a Crush on You 💌" },
      { property: "og:description", content: "Someone made something special for you. A shy confession sealed in an animated envelope." },
    ],
  }),
  component: Page,
});

function Page() {
  const { d } = Route.useSearch();
  return <CrushPage data={resolveData("crush", d)} />;
}
