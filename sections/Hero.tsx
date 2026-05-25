'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const WORDS = ['numérique.', 'web.', "l'IA.", 'la data.']
const D = 2.2

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
        transition={{ duration: 0.8, ease: [0.76,0,0.24,1], delay }}
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
        transition={{ duration: 0.55, ease: [0.76,0,0.24,1] }}
        className="inline-block text-accent"
      >
        {WORDS[i]}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const formations = useCounter(13, 1500, 0)
  const years      = useCounter(4,  1200, 200)

  return (
    <section id="hero"
      className="min-h-screen flex flex-col justify-center px-10 pt-[120px] pb-20 relative overflow-hidden">

      {/* Grid BG */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-100">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="0.5"/>
            </pattern>
            <radialGradient id="glow" cx="100%" cy="0%" r="80%">
              <stop offset="0%"   stopColor="rgba(200,242,58,0.04)"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)"/>
          <rect width="100%" height="100%" fill="url(#glow)"/>
        </svg>
      </div>

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
          className="inline-block w-10 h-px bg-accent"
        />
        Formations IT · Yaoundé, Cameroun
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink" />
      </motion.div>

      {/* Title */}
      <h1 className="font-display font-extrabold leading-none tracking-[-0.03em] mb-8 text-[clamp(48px,7vw,96px)] max-w-4xl">
        <div>
          <Slot delay={D + 0.00}>Maîtrise&nbsp;</Slot>
          <Slot delay={D + 0.06}>le&nbsp;</Slot>
        </div>
        <div className="overflow-hidden">
          <motion.span
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.8, ease: [0.76,0,0.24,1], delay: D + 0.12 }}
            className="inline-block"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.22)', color: 'transparent' }}
          >
            numérique.
          </motion.span>
        </div>
        <div>
          <Slot delay={D + 0.26}>Construis&nbsp;</Slot>
          <Slot delay={D + 0.32}>ton&nbsp;</Slot>
          <Slot delay={D + 0.38}>futur.</Slot>
        </div>
      </h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: D + 0.6 }}
        className="font-mono text-[13px] text-white/45 leading-[1.9] max-w-md mb-12"
      >
        13+ formations pratiques en développement web, data & IA.<br/>
        Dispensées à Yaoundé par un dev Full-Stack actif - 4 ans d&apos;expérience terrain.
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
          { v: years,      s: '+', l: "ans d'expérience"       },
          { v: 500,        s: 'k', l: 'objectif FCFA /mois'    },
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
    </section>
  )
}
