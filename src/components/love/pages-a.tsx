import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { LoveData } from "@/lib/love";
import { Burst, Fade, Hello, PageShell, Signed, TellThem, YesNo } from "./kit";

type P = { data: LoveData; embedded?: boolean | undefined };

export function GirlfriendPage({ data, embedded }: P) {
  const [step, setStep] = useState<"intro" | "ask" | "yes">("intro");
  return (
    <PageShell data={data} slug="girlfriend" embedded={embedded}>
      <Burst show={step === "yes"} />
      <AnimatePresence mode="wait">
        {step === "intro" && (
          <Fade k="i">
            <Hello data={data} />
            <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} className="my-6 text-8xl">💌</motion.div>
            <h1 className="text-4xl font-semibold md:text-5xl">I have something special to ask you...</h1>
            <button onClick={() => setStep("ask")} className="btn-glow mt-8 rounded-full px-8 py-3 font-bold">Tap to find out ✨</button>
          </Fade>
        )}
        {step === "ask" && (
          <Fade k="a">
            <p className="mb-3 max-w-md text-lg text-muted-foreground">{data.msg}</p>
            <h1 className="text-shimmer mb-10 text-5xl font-bold md:text-7xl">{data.q}</h1>
            <YesNo onYes={() => setStep("yes")} />
          </Fade>
        )}
        {step === "yes" && (
          <Fade k="y">
            <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} className="text-9xl">🥰</motion.div>
            <h1 className="mt-4 text-5xl font-bold md:text-6xl">Yay! You're officially mine 💗</h1>
            <p className="mt-3 text-lg text-muted-foreground">Best. Answer. Ever. I promise to make you smile every single day.</p>
            <Signed data={data} />
            <TellThem data={data} text={`I said YES! 💗 I'm your girlfriend now${data.from ? `, ${data.from}` : ""} 🥰`} />
          </Fade>
        )}
      </AnimatePresence>
    </PageShell>
  );
}

const SPOTS = ["Candlelit dinner 🕯️", "Picnic in the park 🧺", "Café & desserts 🍰", "Stargazing 🌌", "Beach sunset 🌊", "Movie night 🍿"];

export function DatePage({ data, embedded }: P) {
  const [step, setStep] = useState<"card" | "ask" | "plan" | "done">("card");
  const [plan, setPlan] = useState({ date: "", time: "19:30", spot: SPOTS[0] });
  return (
    <PageShell data={data} slug="date" embedded={embedded}>
      <Burst show={step === "done"} glyphs={["🌹", "🥂", "✨", "💕", "🕯️"]} />
      <AnimatePresence mode="wait">
        {step === "card" && (
          <Fade k="c">
            <motion.button onClick={() => setStep("ask")} initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} whileHover={{ rotate: -2, scale: 1.03 }}
              className="glass relative w-full max-w-sm rounded-3xl p-10">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl">🌹</div>
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">You're invited</p>
              <h2 className="mt-4 text-4xl font-semibold">A Night to Remember</h2>
              <p className="mt-4 font-hand text-2xl text-primary">for {data.to || "you"}</p>
              <p className="mt-6 text-sm text-muted-foreground">tap to open 🥂</p>
            </motion.button>
          </Fade>
        )}
        {step === "ask" && (
          <Fade k="a">
            <div className="mb-4 text-7xl">🍝🕯️🍷</div>
            <p className="mb-3 text-lg text-muted-foreground">{data.msg}</p>
            <h1 className="mb-10 text-5xl font-bold md:text-6xl">{data.q}</h1>
            <YesNo onYes={() => setStep("plan")} yes="Yes, I'd love to 🌹" no="No 🙈" lines={["The pasta will be sad 🍝", "I already booked the candles 🕯️", "Dessert is on me 🍰", "One date, pleeease? 🥺"]} />
          </Fade>
        )}
        {step === "plan" && (
          <Fade k="p">
            <div className="glass w-full max-w-md rounded-3xl p-6 text-left">
              <h2 className="mb-4 text-center text-3xl font-semibold">Let's plan our date 💕</h2>
              <label className="text-sm font-semibold">Pick a day</label>
              <input type="date" className="field mb-3 mt-1" value={plan.date} onChange={(e) => setPlan({ ...plan, date: e.target.value })} />
              <label className="text-sm font-semibold">What time?</label>
              <input type="time" className="field mb-3 mt-1" value={plan.time} onChange={(e) => setPlan({ ...plan, time: e.target.value })} />
              <label className="text-sm font-semibold">Where shall we go?</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {SPOTS.map((s) => (
                  <button key={s} onClick={() => setPlan({ ...plan, spot: s })}
                    className={`rounded-full px-3 py-1.5 text-sm ${plan.spot === s ? "btn-glow" : "btn-soft"}`}>{s}</button>
                ))}
              </div>
              <button disabled={!plan.date} onClick={() => setStep("done")} className="btn-glow mt-6 w-full rounded-full py-3 font-bold disabled:opacity-50">It's a date! 🥂</button>
            </div>
          </Fade>
        )}
        {step === "done" && (
          <Fade k="d">
            <motion.div initial={{ y: 40, rotate: -6 }} animate={{ y: 0, rotate: -2 }} className="glass w-full max-w-sm rounded-3xl border-2 border-dashed p-8">
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Confirmed</p>
              <h2 className="mt-2 text-4xl font-semibold">It's a date! 🌹</h2>
              <div className="mt-5 space-y-1 text-lg">
                <p>📅 {new Date(plan.date + "T00:00").toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</p>
                <p>⏰ {plan.time}</p>
                <p>📍 {plan.spot}</p>
              </div>
              <Signed data={data} />
            </motion.div>
            <TellThem data={data} text={`Yes to our date! 🌹 ${plan.date} at ${plan.time} — ${plan.spot}`} />
          </Fade>
        )}
      </AnimatePresence>
    </PageShell>
  );
}

function RingBox({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="relative mx-auto my-6 h-40 w-40" aria-label="Open the ring box" style={{ perspective: 600 }}>
      <div className="absolute bottom-0 h-20 w-40 rounded-b-2xl rounded-t-md bg-accent shadow-2xl" />
      <motion.div animate={{ rotateX: open ? -110 : 0 }} transition={{ duration: 1, ease: "easeInOut" }} style={{ transformOrigin: "bottom" }}
        className="absolute bottom-20 h-14 w-40 rounded-t-2xl bg-accent brightness-110" />
      <motion.div initial={false} animate={{ y: open ? -30 : 10, opacity: open ? 1 : 0, scale: open ? 1 : 0.5 }} transition={{ delay: open ? 0.6 : 0, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-6xl drop-shadow-[0_0_25px_var(--glow)]">💍</motion.div>
      {open && <motion.div className="absolute -inset-6 rounded-full" animate={{ opacity: [0, 0.6, 0.2] }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        style={{ background: "radial-gradient(circle, var(--glow), transparent 65%)" }} />}
    </button>
  );
}

export function MarryPage({ data, embedded }: P) {
  const [step, setStep] = useState<"box" | "ask" | "yes">("box");
  return (
    <PageShell data={data} slug="marry" embedded={embedded} fall>
      <Burst show={step === "yes"} glyphs={["💍", "🌹", "✨", "🥂", "💐", "🤍"]} />
      <AnimatePresence mode="wait">
        {step === "box" && (
          <Fade k="b">
            <Hello data={data} />
            <h1 className="mt-2 text-4xl italic md:text-6xl">"{data.msg}"</h1>
            <RingBox open={false} onOpen={() => setStep("ask")} />
            <p className="text-sm tracking-widest text-muted-foreground">TAP THE BOX</p>
          </Fade>
        )}
        {step === "ask" && (
          <Fade k="a">
            <RingBox open onOpen={() => {}} />
            <h1 className="text-shimmer mb-10 text-6xl font-bold md:text-8xl">{data.q}</h1>
            <YesNo onYes={() => setStep("yes")} yes="YES, forever 💍" no="No 🙈" lines={["The ring says otherwise 💍", "I'm on one knee here 🧎", "My mom already knows 😳", "Forever starts with yes 🥹"]} />
          </Fade>
        )}
        {step === "yes" && (
          <Fade k="y">
            <motion.p initial={{ letterSpacing: "1em", opacity: 0 }} animate={{ letterSpacing: "0.4em", opacity: 1 }} transition={{ duration: 2 }}
              className="text-sm uppercase text-muted-foreground">And so it begins</motion.p>
            <motion.h1 initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6, duration: 1.4 }}
              className="text-shimmer mt-4 text-6xl font-bold md:text-8xl">She said YES</motion.h1>
            <p className="mt-6 max-w-md text-lg">{data.to && data.from ? `${data.from} & ${data.to}` : "Two hearts"}, from this day until forever. 🤍</p>
            <TellThem data={data} text="YES! A thousand times yes 💍🤍" />
          </Fade>
        )}
      </AnimatePresence>
    </PageShell>
  );
}

export function CrushPage({ data, embedded }: P) {
  const [open, setOpen] = useState(false);
  const [reply, setReply] = useState<string | null>(null);
  const replies = [
    { l: "I like you too 🥰", r: "Wait... REALLY?! My heart just did a backflip 💗" },
    { l: "Let's talk more ☕", r: "Coffee soon? I'll bring the butterflies ☕🦋" },
    { l: "Aww, thank you 🌸", r: "Thank you for reading it. You're still my favourite 🌸" },
  ];
  return (
    <PageShell data={data} slug="crush" embedded={embedded}>
      <Burst show={!!reply && reply === replies[0]?.r} glyphs={["🥰", "💜", "✨", "🦋"]} />
      <Hello data={data} />
      <h1 className="mb-6 text-4xl font-semibold md:text-5xl">{open ? "Okay... here goes 🙈" : "I wrote you something 🥺"}</h1>
      <button onClick={() => setOpen(true)} className="relative h-56 w-80 max-w-full" style={{ perspective: 800 }} aria-label="Open the envelope">
        <motion.div initial={false} animate={{ y: open ? -150 : 0 }} transition={{ delay: open ? 0.5 : 0, duration: 0.9 }}
          className="absolute inset-x-4 top-4 z-10 min-h-48 rounded-xl bg-popover p-5 text-left text-popover-foreground shadow-lg">
          <p className="font-hand text-xl leading-snug">{data.msg}</p>
          <p className="mt-2 text-right font-hand text-lg">— {data.from || "your secret admirer"} 💜</p>
        </motion.div>
        <div className="absolute inset-0 z-20 rounded-xl bg-accent shadow-xl" style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)" }} />
        <motion.div initial={false} animate={{ rotateX: open ? 180 : 0 }} transition={{ duration: 0.6 }} style={{ transformOrigin: "top", zIndex: open ? 5 : 30 }}
          className="absolute inset-x-0 top-0 h-32 bg-primary/80" >
          <div className="h-full w-full" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
        </motion.div>
        {!open && <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} className="absolute left-1/2 top-24 z-40 -translate-x-1/2 text-4xl">💜</motion.span>}
      </button>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="mt-36 flex flex-col items-center gap-4">
          <p className="text-xl font-semibold">{data.q}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {replies.map((x) => <button key={x.l} onClick={() => setReply(x.r)} className="btn-glow rounded-full px-5 py-2.5 font-semibold">{x.l}</button>)}
          </div>
          {reply && <motion.p key={reply} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="font-hand text-3xl text-primary">{reply}</motion.p>}
          {reply && <TellThem data={data} text={`I read your letter 💜 ${replies.find((x) => x.r === reply)?.l}`} />}
        </motion.div>
      )}
    </PageShell>
  );
}
