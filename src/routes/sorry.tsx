import { createFileRoute } from "@tanstack/react-router";
import { SorryPage } from "@/components/love/pages-b";
import { resolveData, searchSchema } from "@/lib/love";

export const Route = createFileRoute("/sorry")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sorry, Please Forgive Me — LoveVerse" },
      { name: "description", content: "A teddy bear apology with a heart." },
      { property: "og:title", content: "Sorry, Please Forgive Me 💌" },
      { property: "og:description", content: "Someone made something special for you. A teddy bear apology with a heart." },
    ],
  }),
  component: Page,
});

function Page() {
  const { d } = Route.useSearch();
  return <SorryPage data={resolveData("sorry", d)} />;
}
