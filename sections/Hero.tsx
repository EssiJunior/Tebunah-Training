'use client'

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { WORDS, ANIMATION_DELAY } from '@/data/hero'
import GridBackground from '@/components/molecules/GridBackround'

function useCounter(target: number, dur = 2000, delay = 0) {
  const [v, setV] = useState(0)
  const [go, setGo] = useState(false)
  useEffect(() => { const t = setTimeout(() => setGo(true), delay + 2800); return () => clearTimeout(t) }, [delay])
  useEffect(() => {
    if (!go) return
    const s = performance.now()
    const r = requestAnimationFrame(function t(now) {
      const p = Math.min((now - s) / dur, 1)
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(t)
    })
    return () => cancelAnimationFrame(r)
  }, [go, target, dur])
  return v
}

function Slot({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="overflow-hidden inline-block align-bottom">
      <motion.span
        initial={{ y: '105%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  )
}

function WordCycler() {
  const [i, setI] = useState(0)
  useEffect(() => { const id = setInterval(() => setI(n => (n + 1) % WORDS.length), 2200); return () => clearInterval(id) }, [])
  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <motion.span
        key={i}
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        exit={{ y: '-110%' }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        className="inline-block text-accent"
      >
        {WORDS[i]}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const formations = useCounter(13, 1500, 0)
  const years = useCounter(2, 1200, 200)
  const D = ANIMATION_DELAY

  return (
    <section id="hero"
      className="min-h-screen flex flex-col justify-center px-2.5 sm:px-10 pt-30 pb-20 relative overflow-hidden">
      <WordCycler />

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: D }}
        className="flex items-center gap-3 mb-8 font-mono text-[11px] text-accent tracking-[0.14em] uppercase"
      >
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: D }}
          style={{ transformOrigin: 'left' }}
          className="inline-block w-10 h-px bg-accent white"
        />
        Formations IT · Yaoundé, Cameroun / En ligne
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink" />
      </motion.div>

      {/* Title */}
      <h1 className="leading-none! tracking-[-0.03em]! mb-8 text-[clamp(48px,7vw,96px)]! max-w-4xl">
        <div>
          <Slot delay={D + 0.00}>Maîtrise&nbsp;</Slot>
        </div>
        <div className="overflow-hidden">
          <motion.span
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: D + 0.06 }}
            className="inline-block bg-accent text-bg px-1"
          >
            l&apos;informatique.
          </motion.span>
        </div>
        <div>
          <Slot delay={D + 0.12}>à&nbsp;</Slot>
          <Slot delay={D + 0.26}>l&apos;aire&nbsp;</Slot>
          <Slot delay={D + 0.32}>de{" "}
            <span
              className="inline-block"
              style={{ WebkitTextStroke: '0.25px rgba(255,255,255)', color: 'transparent' }}
            > l&apos;IA.</span>
          </Slot>
        </div>
      </h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: D + 0.6 }}
        className="font-mono text-[13px] text-white/45 leading-[1.9] max-w-3xl mb-12"
      >
        13+ formations pratiques en développement web, data & IA.<br />
        Dispensées à Yaoundé / en ligne (Google meet).
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: D + 0.8 }}
        className="flex items-center gap-6 mb-20 flex-wrap"
      >
        <motion.a
          href="#formations"
          onClick={e => { e.preventDefault(); document.querySelector('#formations')?.scrollIntoView({ behavior: 'smooth' }) }}
          whileHover={{ scale: 1.03, boxShadow: '0 0 32px rgba(200,242,58,0.25)' }}
          whileTap={{ scale: 0.97 }}
          className="font-mono text-[12px] font-medium bg-accent text-bg px-8 py-3.5 rounded-px tracking-[0.1em] uppercase inline-flex items-center gap-2.5"
        >
          Voir les formations <span>↓</span>
        </motion.a>
        <motion.a
          href="#instructeur"
          onClick={e => { e.preventDefault(); document.querySelector('#instructeur')?.scrollIntoView({ behavior: 'smooth' }) }}
          whileHover={{ x: 4 }}
          className="font-mono text-[12px] text-white/35 tracking-wider flex items-center gap-2 hover:text-white/60 transition-colors"
        >
          <span className="w-4 h-px bg-current" /> Qui enseigne ?
        </motion.a>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: D + 1.0 }}
        className="flex gap-12 pt-8 flex-wrap"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        {[
          { v: formations, s: '+', l: 'formations disponibles' },
          { v: years, s: '+', l: "ans d'expérience" },
          { v: 30, s: '', l: 'apprenants actifs' },
        ].map((st, i) => (
          <div key={i}>
            <div className="font-display text-[36px] font-extrabold text-ink leading-none">
              {st.v}<span className="text-accent text-[28px]">{st.s}</span>
            </div>
            <div className="font-mono text-[10px] text-white/30 mt-1.5 tracking-[0.06em]">
              {st.l}
            </div>
          </div>
        ))}
      </motion.div>


      {/* ── Right: 1/3 animation panel ────────────────────────── */}
      <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-1/2 -z-1">

        {/* Canvas animation fills the full panel */}
        <GridBackground />

        {/* ── Transition: multi-stop fade from bg to transparent ─
            Left edge blends seamlessly into the text column.
            Three layers for depth:
            1. Hard dark fade (bg color)  — hides the abrupt edge
            2. Soft mid-tone veil         — smooths the luminance ramp
            3. Subtle vertical gradient   — anchors top/bottom        */}

        {/* Layer 1 — main horizontal fade, bg → transparent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #00193a 0%, #00193a 22%, rgba(0,25,58,0.45) 42%, rgba(0,25,58,0.12) 65%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #00193a 0%, #00193a 10%, rgba(0,25,58,0.45) 23%, rgba(0,25,58,0.12) 40%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, #00193a 0%, #00193a 10%, rgba(0,25,58,0.45) 33%, rgba(0,25,58,0.12) 50%, transparent 100%)',
          }}
        />

        {/* Layer 2 — softens the mid-zone chromatic spill */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(0,25,58,0.4) 0%, rgba(0,25,58,0.1) 30%, transparent 60%)',
          }}
        />
        {/* Layer 3 — top and bottom vignette for containment */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #00193a 0%, transparent 12%, transparent 88%, #00193a 100%)',
          }}
        />
      </div>

      {/* ── Full-page background tint on mobile (no animation panel) */}
      <div
        className="lg:hidden absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(255,216,45,0.05) 0%, transparent 60%)',
        }}>
      </div>
    </section>
  )
}
