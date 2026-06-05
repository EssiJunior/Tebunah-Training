'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import SectionMarker from '@/components/atoms/SectionMarker'
import { INSTRUCTORS } from '@/data/instructor'


export default function Instructors() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="instructeurs" ref={ref}
      className="px-2.5 sm:px-10 py-30 border-t border-white/6">
      <SectionMarker title="Instructeurs" id="#instructeurs" inView={inView} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 items-start">
        {INSTRUCTORS.map((instructor, idx) => (
          <div key={idx} className="contents">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7 }}
                className="flex items-start justify-start mb-2"
              >
                <Image src={instructor.image} alt={`Photo de ${instructor.name}`} width={140} height={140} className="rounded-px object-cover" />
              </motion.div>

              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-[36px] font-extrabold text-ink leading-none mb-2">
                {instructor.name}
              </motion.h2>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="font-mono text-[11px] text-accent tracking-[0.08em] mb-6">
                {instructor.title}
              </motion.p>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-mono text-[12px] text-white/45 leading-loose mb-8">
                {instructor.description}
                <br /><br />
                <span className="text-accent/70">{instructor.quote}</span>
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 gap-4">
                {instructor.stats.map((s, i) => (
                  <div key={i} className="bg-surface border border-white/6 rounded-px p-4">
                    <div className="font-display text-[22px] font-extrabold text-accent">{s.value}</div>
                    <div className="font-mono text-[10px] text-white/30 mt-1 leading-snug">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right */}
            <div>
              <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-surface border border-white/6 rounded-px p-8 mb-6">
                <p className="font-mono text-[10px] text-white/20 tracking-[0.12em] uppercase mb-4">Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {instructor.skills.map((sk, i) => (
                    <motion.span key={sk}
                      initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                      whileHover={{ borderColor: 'rgba(255,210,45,0.4)', color: '#FFD22D', scale: 1.05 }}
                      className="font-mono text-[11px] px-3.5 py-1.5 bg-surface2 border border-white/8 rounded-px text-white/50 transition-all duration-200"
                    >{sk}</motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="border-l-2 border-accent/30 pl-6">
                <p className="font-display text-[18px] font-bold text-ink leading-relaxed mb-3">
                  &ldquo;{instructor.philosophy}&rdquo;
                </p>
                <p className="font-mono text-[11px] text-white/30">— philosophie du formateur</p>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
