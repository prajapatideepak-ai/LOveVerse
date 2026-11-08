import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Sparkles, Link2, QrCode, Wand2 } from "lucide-react";
import { CATEGORIES } from "@/lib/love";
import { FloatingLayer } from "@/components/love/kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LoveVerse — Little Ways to Say I Love You" },
      { name: "description", content: "Interactive romantic pages to ask, confess, apologise or propose. Personalise and share with a link or QR code." },
      { property: "og:title", content: "LoveVerse ❤️ Little Ways to Say I Love You" },
      { property: "og:description", content: "Because some feelings deserve more than just a text." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="scene relative min-h-screen overflow-hidden">
      <FloatingLayer anim="hearts" count={22} />
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="font-display text-2xl font-bold">LoveVerse <span className="text-primary">❤️</span></span>
        <a href="#moments" className="btn-soft rounded-full px-4 py-2 text-sm font-semibold">Explore moments</a>
      </header>

      <section className="relative z-10 mx-auto max-w-4xl px-5 pb-16 pt-10 text-center md:pt-20">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm">
          <Sparkles className="h-4 w-4 text-primary" /> Little ways to say I love you
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}
          className="text-6xl font-bold leading-[0.95] md:text-8xl">
          Love<span className="text-shimmer italic">Verse</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 font-hand text-3xl text-primary md:text-4xl">
          Because some feelings deserve more than just a text.
        </motion.p>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Pick a moment, add your names, a photo and your words — then send a magical link they'll never forget.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#moments" className="btn-glow inline-flex items-center gap-2 rounded-full px-7 py-3 font-bold"><Heart className="h-5 w-5" /> Create a moment</a>
          <Link to="/girlfriend" search={{ d: undefined }} className="btn-soft rounded-full px-7 py-3 font-semibold">Try a demo 💗</Link>
        </div>
      </section>

      <section id="moments" className="relative z-10 mx-auto max-w-6xl px-5 pb-20">
        <h2 className="mb-8 text-center text-4xl font-semibold md:text-5xl">Choose your moment</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <motion.div key={c.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              whileHover={{ y: -8, rotate: i % 2 ? 1 : -1 }}
              className={`theme-${c.defaults.theme} scene group relative border border-border shadow-xl flex flex-col overflow-hidden rounded-3xl p-6`}>
              <motion.div className="text-6xl" whileHover={{ scale: 1.25, rotate: 10 }}>{c.emoji}</motion.div>
              <h3 className="mt-4 text-2xl font-semibold leading-tight">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm opacity-80">{c.blurb}</p>
              <div className="mt-5 flex gap-2">
                <Link to="/create/$slug" params={{ slug: c.slug }} className="btn-glow flex-1 rounded-full py-2 text-center text-sm font-bold">Personalise</Link>
                <Link to={`/${c.slug}` as "/girlfriend"} search={{ d: undefined }} className="btn-soft rounded-full px-4 py-2 text-sm font-semibold">Preview</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-5xl gap-5 px-5 pb-24 md:grid-cols-3">
        {[
          { i: Wand2, t: "Personalise", d: "Names, photo, your own words, theme, music and animations." },
          { i: Link2, t: "Generate a link", d: "A unique link — they just open it, no sign-up needed." },
          { i: QrCode, t: "Share anywhere", d: "WhatsApp, Instagram, or a QR code on a gift card." },
        ].map(({ i: Icon, t, d }, n) => (
          <div key={t} className="glass rounded-3xl p-6 text-center">
            <div className="btn-glow mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl"><Icon className="h-6 w-6" /></div>
            <p className="font-hand text-xl text-primary">Step {n + 1}</p>
            <h3 className="text-2xl font-semibold">{t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <footer className="relative z-10 pb-8 text-center text-sm text-muted-foreground">Made with 💗 on LoveVerse</footer>
    </div>
  );
}
