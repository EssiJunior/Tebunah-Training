'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FAQS } from '@/data/faq'
import Accordion from '@/components/atoms/Accordion'


export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="faq" ref={ref} className="px-10 py-30 border-t border-white/6">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-20">
        <span className="font-mono text-[10px] text-accent tracking-[0.15em] px-2.5 py-1 rounded-px border border-accent/20 bg-accent/8">04</span>
        <span className="font-mono text-[11px] text-white/30 tracking-widest">Questions fréquentes</span>
        <div className="flex-1 h-px bg-line" />
        <span className="font-mono text-[10px] text-white/15">#faq</span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-20 items-start">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}>
          <h2 className="font-display text-[36px] font-extrabold leading-none! mb-4">
            Avez-vous des<br/><span className="text-accent">questions ?</span>
          </h2>
          <p className="font-mono text-[11px] text-white/30 leading-relaxed">
            Si vous ne trouvez pas votre réponse, contacte-nous directement sur WhatsApp.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-white/6">
          {FAQS.map((item, i) => <Accordion key={i} item={item} index={i} />)}
        </motion.div>
      </div>
    </section>
  )
}
