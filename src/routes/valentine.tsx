import { createFileRoute } from "@tanstack/react-router";
import { ValentinePage } from "@/components/love/pages-b";
import { resolveData, searchSchema } from "@/lib/love";

export const Route = createFileRoute("/valentine")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Be My Valentine? — LoveVerse" },
      { name: "description", content: "Hearts, roses and a very important question." },
      { property: "og:title", content: "Be My Valentine? 💌" },
      { property: "og:description", content: "Someone made something special for you. Hearts, roses and a very important question." },
    ],
  }),
  component: Page,
});

function Page() {
  const { d } = Route.useSearch();
  return <ValentinePage data={resolveData("valentine", d)} />;
}
