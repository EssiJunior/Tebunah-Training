'use client'
import { motion, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'Formations', href: '#formations' },
  { label: 'IA',         href: '#ia'         },
  { label: 'Instructeur',href: '#instructeur' },
  { label: 'FAQ',        href: '#faq'         },
]

const scroll = (href: string) => (e: React.MouseEvent) => {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => scrollYProgress.on('change', v => setScrolled(v > 0.01)), [scrollYProgress])

  return (
    <>
      <motion.div className="scroll-bar" style={{ scaleX }} />

      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.76,0,0.24,1], delay: 2.4 }}
        className={[
          'fixed top-0 inset-x-0 z-100 flex items-center justify-between px-10 h-15 transition-all duration-300',
          scrolled
            ? 'border-b border-white/6 bg-bg/90 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        ].join(' ')}
      >
        <a href="#hero" onClick={scroll('#hero')}
          className="font-mono text-[12px] text-accent tracking-[0.08em]">
          EssiDev<span className="text-white/25">.formations</span>
        </a>

        <div className="flex gap-8">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={scroll(l.href)}
              className="font-mono text-[11px] text-white/35 tracking-wider hover:text-ink transition-colors duration-200">
              {l.label}
            </a>
          ))}
        </div>

        <motion.a
          href="#contact" onClick={scroll('#contact')}
          whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(200,242,58,0.25)' }}
          whileTap={{ scale: 0.97 }}
          className="font-mono text-[11px] font-medium bg-accent text-bg px-5 py-2 rounded-px tracking-[0.08em] uppercase"
        >
          Candidater →
        </motion.a>
      </motion.nav>
    </>
  )
}
