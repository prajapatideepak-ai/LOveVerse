import { createFileRoute } from "@tanstack/react-router";
import { MissYouPage } from "@/components/love/pages-b";
import { resolveData, searchSchema } from "@/lib/love";

export const Route = createFileRoute("/miss-you")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "I Miss You — LoveVerse" },
      { name: "description", content: "Moonlight, stars and a virtual hug." },
      { property: "og:title", content: "I Miss You 💌" },
      { property: "og:description", content: "Someone made something special for you. Moonlight, stars and a virtual hug." },
    ],
  }),
  component: Page,
});

function Page() {
  const { d } = Route.useSearch();
  return <MissYouPage data={resolveData("miss-you", d)} />;
}
