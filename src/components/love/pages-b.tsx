import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { LoveData } from "@/lib/love";
import { Burst, Fade, Hello, PageShell, Signed, TellThem, YesNo } from "./kit";

type P = { data: LoveData; embedded?: boolean | undefined };

export function ValentinePage({ data, embedded }: P) {
  const [yes, setYes] = useState(false);
  return (
    <PageShell data={data} slug="valentine" embedded={embedded}>
      <Burst show={yes} glyphs={["💘", "🌹", "❤️", "💝", "🍫"]} />
      <AnimatePresence mode="wait">
        {!yes ? (
          <Fade k="a">
            <Hello data={data} />
            <div className="relative my-4">
              <motion.div animate={{ scale: [1, 1.15, 1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.6 }} className="text-[9rem] leading-none drop-shadow-[0_0_40px_var(--glow)]">💘</motion.div>
              <span className="absolute -left-10 bottom-0 text-5xl">🌹</span><span className="absolute -right-10 bottom-0 text-5xl">🌹</span>
            </div>
            <p className="mb-2 max-w-md font-hand text-2xl">{data.msg}</p>
            <h1 className="mb-10 text-5xl font-bold md:text-7xl">{data.q}</h1>
            <YesNo onYes={() => setYes(true)} yes="YES 💘" no="No 💔" lines={["Cupid is crying 🏹😢", "The chocolates are for you though 🍫", "Roses are red... say yes? 🌹", "I'll ask again tomorrow 😌"]} />
          </Fade>
        ) : (
          <Fade k="y">
            <motion.div initial={{ rotate: -30, scale: 0 }} animate={{ rotate: 0, scale: 1 }} className="text-9xl">💝</motion.div>
            <h1 className="mt-4 text-6xl font-bold">Happy Valentine's, my love!</h1>
            <p className="mt-3 text-lg">Roses, chocolates and all of my heart — they're yours. 🌹🍫</p>
            <Signed data={data} />
            <TellThem data={data} text="YES! I'll be your Valentine 💘" />
          </Fade>
        )}
      </AnimatePresence>
    </PageShell>
  );
}

export function MissYouPage({ data, embedded }: P) {
  const [hugs, setHugs] = useState(0);
  const [hugging, setHugging] = useState(false);
  const hug = () => { setHugs((h) => h + 1); setHugging(true); setTimeout(() => setHugging(false), 2600); };
  return (
    <PageShell data={data} slug="miss-you" embedded={embedded}
      extraBg={<motion.div aria-hidden animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 6 }}
        className="pointer-events-none absolute right-[8%] top-16 h-28 w-28 rounded-full md:h-40 md:w-40"
        style={{ background: "radial-gradient(circle at 35% 35%, oklch(0.98 0.03 90), oklch(0.88 0.05 80))", boxShadow: "0 0 80px 20px color-mix(in oklab, var(--glow) 40%, transparent)" }} />}>
      <Hello data={data} />
      <motion.div animate={{ rotate: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 3 }} className="my-4 text-8xl">🥹</motion.div>
      <h1 className="text-5xl font-semibold md:text-6xl">I miss you</h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">{data.msg}</p>
      <motion.button whileTap={{ scale: 0.9 }} onClick={hug} className="btn-glow mt-10 rounded-full px-8 py-4 text-lg font-bold">Send Me a Hug 🤗</motion.button>
      {hugs > 0 && <p className="mt-4 font-hand text-2xl text-primary">{hugs} {hugs === 1 ? "hug" : "hugs"} received. Recharging my heart 🔋💗</p>}
      <Signed data={data} />
      <AnimatePresence>
        {hugging && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm">
            <div className="flex items-center">
              <motion.span initial={{ x: -160 }} animate={{ x: 10 }} transition={{ type: "spring", stiffness: 80 }} className="text-8xl">🧸</motion.span>
              <motion.span initial={{ x: 160, scaleX: -1 }} animate={{ x: -10, scaleX: -1 }} transition={{ type: "spring", stiffness: 80 }} className="text-8xl">🧸</motion.span>
            </div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.4, 1] }} transition={{ delay: 0.6 }} className="-mt-6 text-6xl">💗</motion.div>
            <p className="mt-4 text-3xl font-semibold">*big warm squeeze*</p>
          </motion.div>
        )}
      </AnimatePresence>
      <Burst show={hugging} glyphs={["💗", "🤍", "✨", "🫶"]} />
    </PageShell>
  );
}

function Teddy({ sad }: { sad: boolean }) {
  return (
    <motion.svg viewBox="0 0 200 200" className="h-48 w-48 md:h-56 md:w-56" animate={{ y: [0, -8, 0], rotate: sad ? [-2, 2, -2] : 0 }} transition={{ repeat: Infinity, duration: 2.4 }}>
      <g fill="oklch(0.68 0.08 55)">
        <circle cx="55" cy="45" r="20" /><circle cx="145" cy="45" r="20" />
        <ellipse cx="100" cy="150" rx="55" ry="45" /><circle cx="100" cy="80" r="50" />
      </g>
      <g fill="oklch(0.85 0.05 60)"><circle cx="55" cy="45" r="10" /><circle cx="145" cy="45" r="10" /><ellipse cx="100" cy="95" rx="22" ry="17" /></g>
      <circle cx="82" cy="72" r="5" fill="oklch(0.25 0.03 40)" /><circle cx="118" cy="72" r="5" fill="oklch(0.25 0.03 40)" />
      <ellipse cx="100" cy="88" rx="7" ry="5" fill="oklch(0.25 0.03 40)" />
      <path d={sad ? "M90 104 Q100 96 110 104" : "M90 100 Q100 110 110 100"} stroke="oklch(0.25 0.03 40)" strokeWidth="3" fill="none" strokeLinecap="round" />
      {sad && <circle cx="80" cy="84" r="3" fill="oklch(0.75 0.1 230)" />}
      <circle cx="72" cy="90" r="6" fill="oklch(0.8 0.1 10 / 0.6)" /><circle cx="128" cy="90" r="6" fill="oklch(0.8 0.1 10 / 0.6)" />
      <motion.path animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 1 }} style={{ transformOrigin: "100px 150px" }}
        d="M100 175 C60 150 70 120 100 138 C130 120 140 150 100 175Z" fill="oklch(0.68 0.2 15)" />
      <g fill="oklch(0.68 0.08 55)"><ellipse cx="62" cy="145" rx="14" ry="22" transform="rotate(-30 62 145)" /><ellipse cx="138" cy="145" rx="14" ry="22" transform="rotate(30 138 145)" /></g>
    </motion.svg>
  );
}

export function SorryPage({ data, embedded }: P) {
  const [level, setLevel] = useState(50);
  const [state, setState] = useState<"ask" | "sad" | "yes">("ask");
  return (
    <PageShell data={data} slug="sorry" embedded={embedded}>
      <Burst show={state === "yes"} glyphs={["🧸", "💗", "🌸", "🍬", "✨"]} />
      {state !== "yes" ? (
        <>
          <Hello data={data} />
          <Teddy sad={state === "sad"} />
          <h1 className="mt-2 text-5xl font-semibold">I'm so sorry 🥺</h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">{data.msg}</p>
          <div className="glass mt-8 w-full max-w-sm rounded-3xl p-5">
            <p className="font-semibold">How much do you forgive me? {level}%</p>
            <input type="range" min={0} max={100} value={level} onChange={(e) => setLevel(+e.target.value)} className="mt-3 w-full accent-primary" />
            <p className="mt-1 text-sm text-muted-foreground">{level < 30 ? "Teddy is nervous… 😰" : level < 80 ? "Teddy is hopeful 🙏" : "Teddy is wiggling with joy 🧸💃"}</p>
          </div>
          <p className="mt-6 text-xl font-semibold">{data.q}</p>
          <div className="mt-4 flex gap-3">
            <button onClick={() => setState("yes")} className="btn-glow rounded-full px-6 py-3 font-bold">I forgive you 🧸</button>
            <button onClick={() => setState("sad")} className="btn-soft rounded-full px-6 py-3 font-semibold">Still mad 😤</button>
          </div>
          {state === "sad" && <p className="mt-4 font-hand text-2xl text-primary">Teddy is sad… he made you a heart though. Please? 🥺</p>}
        </>
      ) : (
        <Fade k="y">
          <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} className="text-9xl">🧸</motion.div>
          <h1 className="mt-4 text-5xl font-bold">Thank you for forgiving me 💗</h1>
          <p className="mt-3 text-lg">I promise to do better. Teddy hugs, forever.</p>
          <Signed data={data} />
          <TellThem data={data} text="Okay… I forgive you 🧸💗" />
        </Fade>
      )}
    </PageShell>
  );
}

function Typewriter({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => { setN(0); const id = setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), 35); return () => clearInterval(id); }, [text]);
  return <p className="min-h-24 max-w-md text-lg">{text.slice(0, n)}<span className="animate-pulse">|</span></p>;
}

export function OneMoreChancePage({ data, embedded }: P) {
  const [state, setState] = useState<"ask" | "think" | "yes">("ask");
  useEffect(() => { if (state === "think") { const t = setTimeout(() => setState("ask"), 3500); return () => clearTimeout(t); } return undefined; }, [state]);
  return (
    <PageShell data={data} slug="one-more-chance" embedded={embedded}
      extraBg={<motion.div aria-hidden initial={false} animate={{ y: state === "yes" ? "-35vh" : "0vh", scale: state === "yes" ? 1.6 : 1 }} transition={{ duration: 3, ease: "easeOut" }}
        className="pointer-events-none absolute -bottom-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, oklch(0.92 0.12 80), oklch(0.82 0.14 50) 60%, transparent 72%)", boxShadow: "0 0 120px 40px color-mix(in oklab, var(--glow) 50%, transparent)" }} />}>
      <AnimatePresence mode="wait">
        {state !== "yes" ? (
          <Fade k="a">
            <Hello data={data} />
            <h1 className="mb-4 text-5xl font-semibold md:text-6xl">One more chance? 🥺</h1>
            <Typewriter text={data.msg} />
            <p className="mb-6 mt-4 text-xl font-semibold">{data.q}</p>
            {state === "think" ? (
              <p className="font-hand text-3xl text-primary">Take your time. I'll wait 💭</p>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <YesNo onYes={() => setState("yes")} yes="Yes, one more chance 🌅" no="No" lines={["I'll keep the light on 🕯️", "Hearts can heal 🩹", "Look, the sun is rising 🌅"]} />
                <button onClick={() => setState("think")} className="btn-soft rounded-full px-5 py-2 text-sm">Let me think 🤔</button>
              </div>
            )}
          </Fade>
        ) : (
          <Fade k="y">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-sm uppercase tracking-[0.5em] text-muted-foreground">Chapter two</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1.5 }} className="text-shimmer mt-3 text-6xl font-bold md:text-7xl">A new beginning ✨</motion.h1>
            <p className="mt-4 max-w-md text-lg">Thank you for believing in us. I won't waste a single sunrise.</p>
            <Signed data={data} />
            <TellThem data={data} text="One more chance… yes 🌅" />
          </Fade>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
