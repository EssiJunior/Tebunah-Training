'use client'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { formations, CATEGORIES } from '@/data/formations'
import SectionMarker from '@/components/atoms/SectionMarker'
import Formation from '@/components/atoms/cards/Formation'
import { useFormations } from '@/context/FormationsContext'
import { useTranslations } from 'next-intl'


export default function Formations() {
  const t = useTranslations('Formations')

  const { active, setActive } = useFormations()
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const filtered = formations
    .filter(f => active === 'all' || f.category === active)
    .filter(f => !showAvailableOnly || f.availableNow)

  return (
    <section id="formations" ref={ref} className="px-2.5 sm:px-10 py-30">
      <SectionMarker title={t('title')} id="#formations" inView={inView} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-3 flex-wrap mb-10"
      >
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={[
                'text-[11px] px-4.5 py-2 rounded-full tracking-[0.06em] transition-all duration-200',
                active === cat.id
                  ? 'border border-accent/50 text-accent bg-accent/6'
                  : 'border border-white/8 text-white/40 hover:border-white/20 hover:text-white/60',
              ].join(' ')}
            >
              {t(`categories.${cat.id}`)}
            </motion.button>
          ))}
        </div>

        <motion.button
          onClick={() => setShowAvailableOnly(v => !v)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={[
            'text-[11px] px-4.5 py-2 rounded-full tracking-[0.06em] transition-all duration-200 flex items-center gap-1.5 ml-auto',
            showAvailableOnly
              ? 'border border-green-500/40 text-green-400 bg-green-500/6'
              : 'border border-white/8 text-white/40 hover:border-white/20 hover:text-white/60',
          ].join(' ')}
        >
          <span className={[
            'w-1.5 h-1.5 rounded-full inline-block',
            showAvailableOnly ? 'bg-green-400' : 'bg-white/20',
          ].join(' ')} />
          {t('availableNow')}
        </motion.button>
      </motion.div>

      <motion.div
        layout
        className="grid gap-px bg-white/4 border border-white/4 rounded overflow-hidden"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((f, i) => <Formation key={f.id} f={f} index={i} />)}
        </AnimatePresence>
      </motion.div>

      <motion.p layout className="font-mono text-[11px] text-white/20 mt-4 text-right">
        {t('count', { count: filtered.length })}
        {showAvailableOnly ? t('availableNowSuffix') : ''}
      </motion.p>
    </section>
  )
}