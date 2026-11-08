import { createFileRoute } from "@tanstack/react-router";
import { GirlfriendPage } from "@/components/love/pages-a";
import { resolveData, searchSchema } from "@/lib/love";

export const Route = createFileRoute("/girlfriend")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Will You Be My Girlfriend? — LoveVerse" },
      { name: "description", content: "A playful, heart-filled question just for you." },
      { property: "og:title", content: "Will You Be My Girlfriend? 💌" },
      { property: "og:description", content: "Someone made something special for you. A playful, heart-filled question just for you." },
    ],
  }),
  component: Page,
});

function Page() {
  const { d } = Route.useSearch();
  return <GirlfriendPage data={resolveData("girlfriend", d)} />;
}
