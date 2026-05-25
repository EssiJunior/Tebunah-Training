'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { CONTACTS, RESPONSE_TIME, LOCATION } from '@/data/contact'

const scroll = (href: string) => (e: React.MouseEvent) => {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <>
      {/* CTA */}
      <section id="contact" ref={ref}
        className="px-10 py-30 border-t border-white/6 text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-150 h-75 rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(200,242,58,0.05) 0%, transparent 70%)' }} />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-[11px] text-accent tracking-[0.14em] uppercase flex items-center justify-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-accent" /> Prêt à commencer ? <span className="w-8 h-px bg-accent" />
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          className="font-display font-extrabold leading-[1.05] tracking-[-0.02em] mb-10 text-[clamp(36px,5vw,72px)]"
        >
          Investis dans<br />
          <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.28)', color: 'transparent' }}>
            tes compétences.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          {CONTACTS.map((contact, i) => (
            <motion.a key={contact.platform} href={contact.href} 
              target={contact.platform === 'WhatsApp' ? '_blank' : undefined} 
              rel={contact.platform === 'WhatsApp' ? 'noopener noreferrer' : undefined}
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(200,242,58,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className={contact.platform === 'WhatsApp' 
                ? 'font-mono text-[13px] font-medium bg-accent text-bg px-10 py-4 rounded-px tracking-[0.08em] uppercase inline-flex items-center gap-3'
                : 'font-mono text-[13px] text-white/40 px-10 py-4 rounded-px border border-white/12 tracking-[0.08em] uppercase transition-all duration-200'
              }
            >
              {contact.platform} {contact.platform === 'WhatsApp' ? <span>→</span> : null}
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-mono text-[11px] text-white/20 mt-6"
        >
          {RESPONSE_TIME} · {LOCATION}
        </motion.p>
      </section>

      {/* Footer bar */}
      <footer className="px-10 py-6 border-t border-white/6 flex items-center justify-between flex-wrap gap-4">
        <span className="font-mono text-[12px] text-accent">
          EssiDev<span className="text-white/20">.formations</span>
        </span>
        <div className="flex gap-6">
          {['#formations', '#instructeur', '#faq', '#contact'].map(href => (
            <a key={href} href={href} onClick={scroll(href)}
              className="font-mono text-[11px] text-white/25 tracking-wider hover:text-ink transition-colors duration-200">
              {href}
            </a>
          ))}
        </div>
        <span className="font-mono text-[11px] text-white/15">© 2025 · Yaoundé, Cameroun</span>
      </footer>
    </>
  )
}
