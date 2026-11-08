import { createFileRoute } from "@tanstack/react-router";
import { OneMoreChancePage } from "@/components/love/pages-b";
import { resolveData, searchSchema } from "@/lib/love";

export const Route = createFileRoute("/one-more-chance")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "One More Chance? — LoveVerse" },
      { name: "description", content: "A gentle message and a new sunrise." },
      { property: "og:title", content: "One More Chance? 💌" },
      { property: "og:description", content: "Someone made something special for you. A gentle message and a new sunrise." },
    ],
  }),
  component: Page,
});

function Page() {
  const { d } = Route.useSearch();
  return <OneMoreChancePage data={resolveData("one-more-chance", d)} />;
}
