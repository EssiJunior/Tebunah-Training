'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Accordion from '@/components/atoms/Accordion'
import SectionMarker from '@/components/atoms/SectionMarker'
import { useTranslations } from 'next-intl'

export default function FAQ() {
  const t = useTranslations('FAQ')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const faqs = t.raw('items') as { question: string; answer: string }[]

  return (
    <section id="faq" ref={ref} className="px-2.5 sm:px-10 py-30 border-t border-white/6">
      <SectionMarker title={t('title')} id="#faq" inView={inView} />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-20 items-start">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}>
          <h2 className="font-display text-[36px] font-extrabold leading-none! mb-4">
            {t('subtitleNormal')}<br/><span className="text-accent">{t('subtitleAccent')}</span>
          </h2>
          <p className="font-mono text-[11px] text-white/30 leading-relaxed">
            {t('hint')}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-white/6">
          {faqs.map((item, i) => <Accordion key={i} item={item} index={i} />)}
        </motion.div>
      </div>
    </section>
  )
}
