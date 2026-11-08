import type { ComponentType } from "react";
import type { LoveData, Slug } from "@/lib/love";
import { CrushPage, DatePage, GirlfriendPage, MarryPage } from "./pages-a";
import { MissYouPage, OneMoreChancePage, SorryPage, ValentinePage } from "./pages-b";

export const PAGES: Record<Slug, ComponentType<{ data: LoveData; embedded?: boolean | undefined }>> = {
  girlfriend: GirlfriendPage, date: DatePage, marry: MarryPage, crush: CrushPage,
  valentine: ValentinePage, "miss-you": MissYouPage, sorry: SorryPage, "one-more-chance": OneMoreChancePage,
};
