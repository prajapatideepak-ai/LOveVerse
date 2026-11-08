import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Music2, VolumeX, Pencil } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Anim, LoveData, Music, Slug } from "@/lib/love";

const GLYPHS: Record<Anim, string[]> = {
  hearts: ["💗", "💕", "💖", "❤️", "🩷"],
  petals: ["🌸", "🌹", "🥀", "🌷"],
  sparkles: ["✨", "💫", "⭐", "🫧"],
  stars: ["✦", "✧", "⭐", "🌟", "💫"],
};

function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export function FloatingLayer({ anim, count = 18, fall = false }: { anim: Anim; count?: number; fall?: boolean | undefined }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const items = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      left: rand(i + 1) * 100, size: 14 + rand(i + 7) * 22, dur: 9 + rand(i + 3) * 10,
      delay: rand(i + 11) * -18, g: GLYPHS[anim][i % GLYPHS[anim].length], drift: (rand(i + 5) - 0.5) * 80,
    })),
    [anim, count],
  );
  if (!mounted) return null;
  const down = fall || anim === "petals";
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((it, i) => (
        <motion.span
          key={i}
          className="absolute select-none"
          style={{ left: `${it.left}%`, fontSize: it.size, top: down ? "-8%" : "105%", opacity: 0.75 }}
          animate={{ y: down ? ["0vh", "115vh"] : ["0vh", "-115vh"], x: [0, it.drift, 0], rotate: [0, down ? 360 : 20, 0] }}
          transition={{ duration: it.dur, delay: it.delay, repeat: Infinity, ease: "linear" }}
        >
          {it.g}
        </motion.span>
      ))}
    </div>
  );
}

export function Burst({ show, glyphs = ["💖", "🎉", "💕", "✨", "🌹", "💗", "🎊"] }: { show: boolean; glyphs?: string[] }) {
  const parts = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    x: (rand(i + 2) - 0.5) * 900, y: (rand(i + 9) - 0.7) * 800, r: rand(i) * 720, g: glyphs[i % glyphs.length], s: 16 + rand(i + 4) * 26,
  })), [glyphs]);
  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center overflow-hidden">
          {parts.map((p, i) => (
            <motion.span key={i} className="absolute" style={{ fontSize: p.s }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{ x: p.x, y: [0, p.y, p.y + 400], rotate: p.r, scale: 1, opacity: [1, 1, 0] }}
              transition={{ duration: 3.2, ease: "easeOut" }}>{p.g}</motion.span>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

const SONGS: Record<Exclude<Music, "none">, { notes: number[]; wave: OscillatorType; step: number }> = {
  musicbox: { notes: [784, 659, 523, 659, 784, 1047, 988, 784, 698, 587, 494, 587, 698, 880, 784, 0], wave: "triangle", step: 0.38 },
  piano: { notes: [262, 330, 392, 523, 220, 262, 330, 440, 175, 220, 262, 349, 196, 247, 294, 392], wave: "sine", step: 0.42 },
};

export function useMusic(music: Music) {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  useEffect(() => {
    if (!on || music === "none") return;
    const ctx = new AudioContext();
    ctxRef.current = ctx;
    const song = SONGS[music];
    let i = 0;
    const tick = () => {
      const f = song.notes[i++ % song.notes.length];
      if (!f) return;
      const t = ctx.currentTime;
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type = song.wave; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.12, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
      o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + 1.5);
    };
    tick();
    const id = setInterval(tick, song.step * 1000);
    return () => { clearInterval(id); ctx.close(); };
  }, [on, music]);
  return { on, toggle: () => setOn((v) => !v), available: music !== "none" };
}

export function PageShell({ data, slug, embedded, children, fall, extraBg }: {
  data: LoveData; slug: Slug; embedded?: boolean | undefined; children: ReactNode; fall?: boolean | undefined; extraBg?: ReactNode;
}) {
  const m = useMusic(data.music);
  return (
    <div className={`theme-${data.theme} scene relative overflow-hidden ${embedded ? "h-[680px] overflow-y-auto rounded-3xl" : "min-h-screen"}`}>
      {extraBg}
      <FloatingLayer anim={data.anim} fall={fall} />
      <div className="relative z-20 flex items-center justify-between p-4">
        {!embedded ? (
          <Link to="/" className="btn-soft inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm"><ArrowLeft className="h-4 w-4" />LoveVerse</Link>
        ) : <span />}
        <div className="flex gap-2">
          {m.available && (
            <button onClick={m.toggle} className="btn-soft inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm" aria-label={m.on ? "Mute music" : "Play music"}>
              {m.on ? <Music2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}{m.on ? "Playing" : "Music"}
            </button>
          )}
          {!embedded && (
            <Link to="/create/$slug" params={{ slug }} className="btn-soft inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm"><Pencil className="h-4 w-4" />Make your own</Link>
          )}
        </div>
      </div>
      <main className={`relative z-10 mx-auto flex ${embedded ? "min-h-[600px]" : "min-h-[calc(100vh-4.5rem)]"} max-w-2xl flex-col items-center justify-center px-5 pb-16 text-center`}>
        {data.photo && (
          <motion.img initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: -4 }} src={data.photo} alt="Us"
            className="mb-6 h-28 w-28 rounded-3xl border-4 border-border object-cover shadow-xl" />
        )}
        {children}
      </main>
    </div>
  );
}

const NO_LINES = ["Are you sure? 🥺", "Think again 🙈", "Pretty please? 💗", "My heart is crying 😢", "Wrong button, cutie 😜", "I'll wait forever 🥹", "Nope, try YES 😌"];

export function YesNo({ onYes, yes = "YES ❤️", no = "NO 🙈", lines = NO_LINES }: { onYes: () => void; yes?: string; no?: string; lines?: string[] }) {
  const [n, setN] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dodge = () => {
    setN((v) => v + 1);
    setPos({ x: (Math.random() - 0.5) * 220, y: (Math.random() - 0.5) * 140 });
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-5">
        <motion.button onClick={onYes} animate={{ scale: 1 + Math.min(n, 8) * 0.15 }} whileTap={{ scale: 0.95 }}
          className="btn-glow rounded-full px-8 py-3 text-lg font-bold">{yes}</motion.button>
        {n < 8 && (
          <motion.button onMouseEnter={n > 1 ? dodge : undefined} onClick={dodge} animate={{ x: pos.x, y: pos.y, scale: Math.max(0.5, 1 - n * 0.07) }}
            className="btn-soft rounded-full px-6 py-3 font-semibold">{no}</motion.button>
        )}
      </div>
      <AnimatePresence mode="wait">
        {n > 0 && (
          <motion.p key={n} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="font-hand text-2xl text-primary">
            {lines[(n - 1) % lines.length]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TellThem({ data, text }: { data: LoveData; text: string }) {
  const href = `https://wa.me/?text=${encodeURIComponent(text)}`;
  return (
    <a href={href} target="_blank" rel="noreferrer" className="btn-glow mt-6 inline-flex rounded-full px-6 py-3 font-semibold">
      Tell {data.from || "them"} on WhatsApp 💌
    </a>
  );
}

export const Fade = ({ k, children }: { k: string; children: ReactNode }) => (
  <motion.div key={k} initial={{ opacity: 0, y: 24, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: -20, filter: "blur(6px)" }} transition={{ duration: 0.6 }} className="flex w-full flex-col items-center">
    {children}
  </motion.div>
);

export const Hello = ({ data }: { data: LoveData }) =>
  data.to ? <p className="font-hand text-3xl text-primary">Dear {data.to},</p> : null;

export const Signed = ({ data }: { data: LoveData }) =>
  data.from ? <p className="mt-4 font-hand text-2xl text-muted-foreground">— with love, {data.from}</p> : null;
