export type Slug =
  | "girlfriend" | "date" | "marry" | "crush" | "valentine" | "miss-you" | "sorry" | "one-more-chance";
export type Anim = "hearts" | "petals" | "sparkles" | "stars";
export type Music = "none" | "musicbox" | "piano";
export type ThemeKey = "blush" | "peach" | "gold" | "lavender" | "valentine" | "night" | "cocoa" | "sky";

export interface LoveData {
  from: string;
  to: string;
  msg: string;
  q: string;
  photo?: string | undefined;
  theme: ThemeKey;
  music: Music;
  anim: Anim;
}

export interface Category {
  slug: Slug;
  title: string;
  emoji: string;
  blurb: string;
  defaults: LoveData;
}

const base = { from: "", to: "", music: "none" as Music };

export const CATEGORIES: Category[] = [
  { slug: "girlfriend", title: "Will You Be My Girlfriend?", emoji: "💗", blurb: "The big question, with playful buttons and confetti.",
    defaults: { ...base, theme: "blush", anim: "hearts", q: "Will you be my girlfriend?", msg: "Every day with you feels like my favourite song on repeat." } },
  { slug: "date", title: "Will You Go on a Date?", emoji: "🌹", blurb: "An invitation card, a date, a time and a place.",
    defaults: { ...base, theme: "peach", anim: "petals", q: "Would you like to go on a date with me?", msg: "I've been saving a perfect evening, just for you." } },
  { slug: "marry", title: "Will You Marry Me?", emoji: "💍", blurb: "A cinematic proposal with rose petals and a ring.",
    defaults: { ...base, theme: "gold", anim: "petals", music: "piano", q: "Will you marry me?", msg: "I don't want a perfect life, I just want a life with you." } },
  { slug: "crush", title: "I Have a Crush on You", emoji: "🥺", blurb: "A shy little letter sealed in an envelope.",
    defaults: { ...base, theme: "lavender", anim: "sparkles", q: "So... do you maybe like me too?", msg: "I've rewritten this a hundred times. The truth is simple: every time you smile, my whole day gets softer. I have a crush on you." } },
  { slug: "valentine", title: "Be My Valentine?", emoji: "💘", blurb: "Roses, hearts and a very important question.",
    defaults: { ...base, theme: "valentine", anim: "hearts", q: "Will you be my Valentine?", msg: "Roses are red, my heart is too, and it only beats this fast for you." } },
  { slug: "miss-you", title: "I Miss You", emoji: "🥹", blurb: "Moonlight, stars and a virtual hug.",
    defaults: { ...base, theme: "night", anim: "stars", music: "musicbox", q: "", msg: "Same moon, same stars, different places. I miss you more than words can carry." } },
  { slug: "sorry", title: "Sorry, Please Forgive Me", emoji: "🧸", blurb: "A teddy bear with a heart and a heartfelt apology.",
    defaults: { ...base, theme: "cocoa", anim: "hearts", q: "Will you forgive me?", msg: "I was wrong, and I'm truly sorry. You mean the world to me, and I never want to be the reason you're sad." } },
  { slug: "one-more-chance", title: "One More Chance?", emoji: "🌅", blurb: "A gentle message and a new sunrise.",
    defaults: { ...base, theme: "sky", anim: "sparkles", q: "Will you give us one more chance?", msg: "I've learned, I've grown, and I still choose you. Every sunrise reminds me that new beginnings are possible." } },
];

export const THEMES: { key: ThemeKey; label: string }[] = [
  { key: "blush", label: "Blush Pink" }, { key: "peach", label: "Peach Dinner" }, { key: "gold", label: "Royal Gold" },
  { key: "lavender", label: "Lavender Dream" }, { key: "valentine", label: "Valentine Red" }, { key: "night", label: "Moonlit Night" },
  { key: "cocoa", label: "Teddy Cocoa" }, { key: "sky", label: "Sunrise Sky" },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

export function encodeData(d: Partial<LoveData>): string {
  const bytes = new TextEncoder().encode(JSON.stringify(d));
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeData(s: string | undefined): Partial<LoveData> {
  if (!s) return {};
  try {
    const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    const v = JSON.parse(new TextDecoder().decode(bytes));
    return v && typeof v === "object" ? v : {};
  } catch {
    return {};
  }
}

export function resolveData(slug: Slug, d?: string): LoveData {
  const cat = getCategory(slug)!;
  const custom = decodeData(d);
  const out = { ...cat.defaults };
  for (const [k, v] of Object.entries(custom)) if (v) (out as Record<string, unknown>)[k] = v;
  return out;
}

export const searchSchema = (s: Record<string, unknown>): { d?: string | undefined } => ({
  d: typeof s["d"] === "string" ? s["d"] : undefined,
});
