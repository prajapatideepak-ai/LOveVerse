import { createFileRoute } from "@tanstack/react-router";
import { MarryPage } from "@/components/love/pages-a";
import { resolveData, searchSchema } from "@/lib/love";

export const Route = createFileRoute("/marry")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Will You Marry Me? — LoveVerse" },
      { name: "description", content: "A cinematic proposal with rose petals and a ring." },
      { property: "og:title", content: "Will You Marry Me? 💌" },
      { property: "og:description", content: "Someone made something special for you. A cinematic proposal with rose petals and a ring." },
    ],
  }),
  component: Page,
});

function Page() {
  const { d } = Route.useSearch();
  return <MarryPage data={resolveData("marry", d)} />;
}
