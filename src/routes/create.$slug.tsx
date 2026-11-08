import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Copy, Check, Share2, ImagePlus, ExternalLink, X } from "lucide-react";
import { useState } from "react";
import { encodeData, getCategory, THEMES, type Anim, type LoveData, type Music, type Slug } from "@/lib/love";
import { PAGES } from "@/components/love/registry";

export const Route = createFileRoute("/create/$slug")({
  loader: ({ params }) => {
    const c = getCategory(params.slug);
    if (!c) throw notFound();
    return { title: c.title };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Personalise: ${loaderData?.title ?? "Moment"} — LoveVerse` },
      { name: "description", content: "Add names, a photo, your message and music, then share a unique link or QR code." },
      { property: "og:title", content: `Create "${loaderData?.title ?? "a moment"}" on LoveVerse` },
      { property: "og:description", content: "Personalise a romantic interactive page and share it." },
    ],
  }),
  component: Create,
});

async function shrinkPhoto(file: File): Promise<string> {
  const img = new Image();
  img.src = URL.createObjectURL(file);
  await img.decode();
  const s = 160, c = document.createElement("canvas");
  c.width = c.height = s;
  const side = Math.min(img.width, img.height);
  c.getContext("2d")!.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, s, s);
  return c.toDataURL("image/jpeg", 0.6);
}

function Create() {
  const { slug } = Route.useParams();
  const cat = getCategory(slug)!;
  const [data, setData] = useState<LoveData>({ ...cat.defaults });
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const Page = PAGES[slug as Slug];
  const set = (p: Partial<LoveData>) => { setData((d) => ({ ...d, ...p })); setLink(""); };

  const generate = () => {
    const diff: Partial<LoveData> = {};
    for (const k of Object.keys(data) as (keyof LoveData)[]) if (data[k] && data[k] !== cat.defaults[k]) (diff as Record<string, unknown>)[k] = data[k];
    setLink(`${window.location.origin}/${slug}?d=${encodeData(diff)}`);
  };
  const shareText = `${data.to ? `${data.to}, ` : ""}I made something just for you 💌`;
  const copy = async () => { await navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  const nativeShare = () => navigator.share?.({ title: "LoveVerse 💌", text: shareText, url: link }).catch(() => {});

  return (
    <div className="scene min-h-screen">
      <div className="mx-auto max-w-6xl px-5 py-6">
        <Link to="/" className="btn-soft inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm"><ArrowLeft className="h-4 w-4" />All moments</Link>
        <h1 className="mt-6 text-4xl font-bold md:text-5xl">{cat.emoji} {cat.title}</h1>
        <p className="mt-1 text-muted-foreground">Make it yours, preview it, then share the magic.</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="glass space-y-4 rounded-3xl p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-semibold">Your name<input className="field mt-1" value={data.from} onChange={(e) => set({ from: e.target.value })} placeholder="Arjun" maxLength={40} /></label>
              <label className="text-sm font-semibold">Their name<input className="field mt-1" value={data.to} onChange={(e) => set({ to: e.target.value })} placeholder="Priya" maxLength={40} /></label>
            </div>
            {cat.defaults.q && (
              <label className="block text-sm font-semibold">The question<input className="field mt-1" value={data.q} onChange={(e) => set({ q: e.target.value })} maxLength={80} /></label>
            )}
            <label className="block text-sm font-semibold">Your message<textarea className="field mt-1 min-h-24" value={data.msg} onChange={(e) => set({ msg: e.target.value })} maxLength={400} /></label>

            <div>
              <p className="text-sm font-semibold">Couple photo</p>
              <div className="mt-1 flex items-center gap-3">
                {data.photo && <img src={data.photo} alt="" className="h-14 w-14 rounded-2xl object-cover" />}
                <label className="btn-soft inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm">
                  <ImagePlus className="h-4 w-4" />{data.photo ? "Change" : "Upload"}
                  <input type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) set({ photo: await shrinkPhoto(f) }); }} />
                </label>
                {data.photo && <button onClick={() => set({ photo: undefined })} className="btn-soft rounded-full p-2" aria-label="Remove photo"><X className="h-4 w-4" /></button>}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold">Theme</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {THEMES.map((t) => (
                  <button key={t.key} onClick={() => set({ theme: t.key })} className={`theme-${t.key} scene rounded-full border-2 px-3 py-1.5 text-xs font-semibold ${data.theme === t.key ? "border-primary" : "border-transparent"}`}>{t.label}</button>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-semibold">Background music
                <select className="field mt-1" value={data.music} onChange={(e) => set({ music: e.target.value as Music })}>
                  <option value="none">No music</option><option value="musicbox">Music box lullaby</option><option value="piano">Soft piano</option>
                </select>
              </label>
              <label className="text-sm font-semibold">Animation style
                <select className="field mt-1" value={data.anim} onChange={(e) => set({ anim: e.target.value as Anim })}>
                  <option value="hearts">Floating hearts</option><option value="petals">Rose petals</option><option value="sparkles">Sparkles</option><option value="stars">Stars</option>
                </select>
              </label>
            </div>

            <button onClick={generate} className="btn-glow w-full rounded-full py-3 text-lg font-bold">Generate my link 💌</button>

            {link && (
              <div className="space-y-4 rounded-2xl bg-background/60 p-4">
                <div className="flex gap-2">
                  <input readOnly value={link} className="field text-xs" onFocus={(e) => e.target.select()} />
                  <button onClick={copy} className="btn-glow rounded-xl px-3" aria-label="Copy link">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${link}`)}`} target="_blank" rel="noreferrer" className="btn-glow rounded-full px-4 py-2 text-sm font-semibold">WhatsApp</a>
                  <button onClick={async () => { await copy(); window.open("https://instagram.com/direct/inbox/", "_blank"); }} className="btn-soft rounded-full px-4 py-2 text-sm font-semibold">Instagram (copies link)</button>
                  <button onClick={nativeShare} className="btn-soft inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold"><Share2 className="h-4 w-4" />More</button>
                  <a href={link} target="_blank" rel="noreferrer" className="btn-soft inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold"><ExternalLink className="h-4 w-4" />Open</a>
                </div>
                {link.length < 2300 ? (
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl bg-popover p-3"><QRCodeSVG value={link} size={140} /></div>
                    <p className="text-sm text-muted-foreground">Scan to open. Print it on a card or slip it into a gift 🎁</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">With a photo the link is too long for a QR code — remove the photo to get one.</p>
                )}
              </div>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold">Live preview</p>
              <button onClick={() => setPreviewKey((k) => k + 1)} className="btn-soft rounded-full px-3 py-1 text-xs">Restart preview</button>
            </div>
            <div className="glass overflow-hidden rounded-3xl"><Page key={previewKey} data={data} embedded /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
