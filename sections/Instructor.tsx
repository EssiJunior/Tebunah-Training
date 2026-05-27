'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SKILLS, STATS } from '@/data/instructor'
import Image from 'next/image'
import { essi } from '@/public/assets'

function SectionMarker() {
  return (
    <div className="flex items-center gap-4 mb-20">
      <span className="font-mono text-[10px] text-accent tracking-[0.15em] px-2.5 py-1 rounded-px border border-accent/20 bg-accent/[0.08]">03</span>
      <span className="font-mono text-[11px] text-white/30 tracking-[0.1em]">Instructeur</span>
      <div className="flex-1 h-px bg-line" />
      <span className="font-mono text-[10px] text-white/15">#instructeur</span>
    </div>
  )
}

export default function Instructor() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="instructeur" ref={ref}
      className="px-10 py-30 border-t border-white/6">
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}>
        <SectionMarker />
      </motion.div>

      <div className="grid grid-cols-2 gap-20 items-start">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-start justify-start mb-2"
          >
            <Image src={essi} alt="Photo d'Essi Junior" width={140} height={140} className="rounded-px object-cover" />
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-[36px] font-extrabold text-ink leading-none mb-2">
            Essi Junior
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-mono text-[11px] text-accent tracking-[0.08em] mb-6">
            Développeur d&apos;applications · Formateur IT · Designeur graphique
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-[12px] text-white/45 leading-[2] mb-8">
            4 ans de développement full-stack, 2 ans d'outils data (Talend, Power BI, Excel avancé).
            Contributeur Python Cameroun. Actif sur des projets Next.js, Claude API, MongoDB.
            <br/><br/>
            <span className="text-accent/70">Je forme parce que je pratique — pas l'inverse.</span>
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4">
            {STATS.map((s, i) => (
              <div key={i} className="bg-surface border border-white/[0.06] rounded-px p-4">
                <div className="font-display text-[22px] font-extrabold text-accent">{s.v}</div>
                <div className="font-mono text-[10px] text-white/30 mt-1 leading-snug">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right */}
        <div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-surface border border-white/[0.06] rounded-px p-8 mb-6">
            <p className="font-mono text-[10px] text-white/20 tracking-[0.12em] uppercase mb-4">Stack maîtrisé</p>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((sk, i) => (
                <motion.span key={sk}
                  initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                  whileHover={{ borderColor: 'rgba(200,242,58,0.4)', color: '#C8F23A', scale: 1.05 }}
                  className="font-mono text-[11px] px-3.5 py-1.5 bg-surface2 border border-white/[0.08]
                             rounded-px text-white/50 transition-all duration-200"
                >{sk}</motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="border-l-2 border-accent/30 pl-6">
            <p className="font-display text-[18px] font-bold text-ink leading-relaxed mb-3">
              &ldquo;L&apos;informatique n&apos;est pas réservée aux génies. Elle est réservée à ceux qui osent commencer.&rdquo;
            </p>
            <p className="font-mono text-[11px] text-white/30">— philosophie de formation</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
