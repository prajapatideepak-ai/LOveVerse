import { createFileRoute } from "@tanstack/react-router";
import { DatePage } from "@/components/love/pages-a";
import { resolveData, searchSchema } from "@/lib/love";

export const Route = createFileRoute("/date")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Will You Go on a Date With Me? — LoveVerse" },
      { name: "description", content: "An animated invitation to a romantic evening." },
      { property: "og:title", content: "Will You Go on a Date With Me? 💌" },
      { property: "og:description", content: "Someone made something special for you. An animated invitation to a romantic evening." },
    ],
  }),
  component: Page,
});

function Page() {
  const { d } = Route.useSearch();
  return <DatePage data={resolveData("date", d)} />;
}
