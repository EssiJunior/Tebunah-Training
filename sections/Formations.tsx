'use client'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { formations, CATEGORIES, CATEGORY_COLORS } from '@/data/formations'
import type { Formation, Category } from '@/data/formations'
import SectionMarker from '@/components/atoms/SectionMarker'

function Card({ f, index }: { f: Formation; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [mode, setMode] = useState<'onsite' | 'online'>('onsite')
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    setTilt({
      x:  ((e.clientX - r.left)  / r.width  - 0.5) * 12,
      y: -((e.clientY - r.top)   / r.height - 0.5) * 12,
    })
  }

  const displayPrice = mode === 'onsite' ? f.priceOnsiteLabel : f.priceOnlineLabel

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      data-cur
      style={{
        transform: `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        border: f.featured
          ? `1px solid rgba(200,242,58,${hovered ? '0.45' : '0.2'})`
          : `0.5px solid rgba(255,255,255,${hovered ? '0.1' : '0.06'})`,
        boxShadow: hovered && f.featured ? '0 0 40px rgba(200,242,58,0.05)' : 'none',
      }}
      className={[
        'relative flex flex-col gap-3 p-6 rounded-px overflow-hidden transition-all duration-200',
        hovered ? 'bg-surface2' : 'bg-surface',
        !f.availableNow ? 'opacity-60' : '',
      ].join(' ')}
    >
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -top-16 -right-10 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: f.featured ? 'rgba(200,242,58,0.04)' : 'rgba(255,255,255,0.02)',
            filter: 'blur(40px)',
          }}
        />
      )}

      {/* Tag row */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-[10px] tracking-[0.12em] uppercase"
            style={{ color: CATEGORY_COLORS[f.category] }}
          >
            {f.category === 'bureautique' ? 'Bureautique' : f.category.toUpperCase()}
          </span>

          {/* Availability badge */}
          {f.availableNow ? (
            <span className="font-mono text-[9px] px-2 py-0.5 rounded-px tracking-widest border border-green-500/30 text-green-400">
              Disponible
            </span>
          ) : (
            <span className="font-mono text-[9px] px-2 py-0.5 rounded-px tracking-widest border border-white/10 text-white/30">
              Bientôt
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {/* Priority tag */}
          {f.priority && (
            <span className="font-mono text-[9px] bg-accent/10 text-accent px-2 py-0.5 rounded-px tracking-widest">
              1ère session
            </span>
          )}
          {/* Featured tag */}
          {f.featured && (
            <span className="font-mono text-[9px] border border-accent/20 text-accent/60 px-2 py-0.5 rounded-px tracking-widest">
              Populaire
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className={[
        'font-display text-[15px] font-bold leading-snug flex-1',
        f.featured ? 'text-accent' : 'text-ink',
      ].join(' ')}>
        {f.title}
      </h3>

      {/* Description */}
      <p className="font-mono text-[11px] text-white/30 leading-[1.7]">
        {f.description}
      </p>

      {/* Meta */}
      <div className="flex gap-4 flex-wrap">
        {([
          ['Cible',    f.target],
          ['Prérequis', f.prereq],
          ['Durée',    `${f.duration} · ${f.hoursTotal}`],
        ] as [string, string][]).map(([k, v]) => (
          <div key={k}>
            <div className="font-mono text-[9px] text-white/20 tracking-widest uppercase mb-0.5">{k}</div>
            <div className="font-mono text-[10px] text-white/45">{v}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-end justify-between pt-4 mt-1 border-t border-white/6">
        <div className="flex flex-col gap-1">
          <div className="font-display text-[18px] font-extrabold text-accent">{displayPrice}</div>

          {/* Mode toggle */}
          <div className="flex gap-0 rounded-px overflow-hidden border border-white/8 w-fit">
            {(['onsite', 'online'] as const).map(m => (
              <button
                key={m}
                onClick={(e) => { e.stopPropagation(); setMode(m) }}
                className={[
                  'font-mono text-[9px] px-2.5 py-1 tracking-widest transition-colors duration-150',
                  mode === m
                    ? 'bg-white/10 text-white/70'
                    : 'text-white/25 hover:text-white/40',
                ].join(' ')}
              >
                {m === 'onsite' ? 'Présentiel' : 'En ligne'}
              </button>
            ))}
          </div>
        </div>

        <motion.span
          animate={{ x: hovered ? 4 : 0 }}
          className="text-[18px] text-white/20"
        >
          →
        </motion.span>
      </div>
    </motion.div>
  )
}

export default function Formations() {
  const [active, setActive] = useState<Category>('all')
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const filtered = formations
    .filter(f => active === 'all' || f.category === active)
    .filter(f => !showAvailableOnly || f.availableNow)

  return (
    <section id="formations" ref={ref} className="px-10 py-30">
      <SectionMarker title="Catalogue" id="#formations" inView={inView} />

      {/* Filters row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-3 flex-wrap mb-10"
      >
        {/* Category filters */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={[
                'font-mono text-[11px] px-4.5 py-2 rounded-full tracking-[0.06em] transition-all duration-200',
                active === cat.id
                  ? 'border border-accent/50 text-accent bg-accent/6'
                  : 'border border-white/8 text-white/40 hover:border-white/20 hover:text-white/60',
              ].join(' ')}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Available now toggle */}
        <motion.button
          onClick={() => setShowAvailableOnly(v => !v)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={[
            'font-mono text-[11px] px-4.5 py-2 rounded-full tracking-[0.06em] transition-all duration-200 flex items-center gap-1.5 ml-auto',
            showAvailableOnly
              ? 'border border-green-500/40 text-green-400 bg-green-500/6'
              : 'border border-white/8 text-white/40 hover:border-white/20 hover:text-white/60',
          ].join(' ')}
        >
          <span className={[
            'w-1.5 h-1.5 rounded-full inline-block',
            showAvailableOnly ? 'bg-green-400' : 'bg-white/20',
          ].join(' ')} />
          Disponibles maintenant
        </motion.button>
      </motion.div>

      {/* Grid */}
      <motion.div
        layout
        className="grid gap-px bg-white/4 border border-white/4 rounded overflow-hidden"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((f, i) => (
            <Card key={f.id} f={f} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.p layout className="font-mono text-[11px] text-white/20 mt-4 text-right">
        {filtered.length} formation{filtered.length > 1 ? 's' : ''}
        {showAvailableOnly ? ' · disponibles maintenant' : ''}
      </motion.p>
    </section>
  )
}