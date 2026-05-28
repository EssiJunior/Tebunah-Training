'use client'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { formations, CATEGORIES, CATEGORY_COLORS } from '@/data/formations'
import SectionMarker from '@/components/atoms/SectionMarker';


function Card({ f, index }: { f: Formation; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 12, y: -((e.clientY - r.top) / r.height - 0.5) * 12 })
  }

  return (
    <motion.div
      ref={ref} layout
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
      ].join(' ')}
    >
      {hovered && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="absolute -top-16 -right-10 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: f.featured ? 'rgba(200,242,58,0.04)' : 'rgba(255,255,255,0.02)', filter: 'blur(40px)' }}
        />
      )}

      {/* Tag row */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase"
          style={{ color: CATEGORY_COLORS[f.category] }}>
          {f.category === 'bureautique' ? 'Bureautique' : f.category.toUpperCase()}
        </span>
        {f.featured && (
          <span className="font-mono text-[9px] bg-accent/10 text-accent px-2 py-0.5 rounded-px tracking-[0.1em]">
            Populaire
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className={['font-display text-[15px] font-bold leading-snug flex-1',
        f.featured ? 'text-accent' : 'text-ink'].join(' ')}>
        {f.title}
      </h3>

      {/* Description */}
      <p className="font-mono text-[11px] text-white/30 leading-[1.7]">{f.description}</p>

      {/* Meta */}
      <div className="flex gap-4 flex-wrap">
        {[['Cible', f.target], ['Format', f.format]].map(([k, v]) => (
          <div key={k}>
            <div className="font-mono text-[9px] text-white/20 tracking-[0.1em] uppercase mb-0.5">{k}</div>
            <div className="font-mono text-[10px] text-white/45">{v}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 mt-1 border-t border-white/[0.06]">
        <div>
          <div className="font-display text-[18px] font-extrabold text-accent">{f.price}</div>
          <div className="font-mono text-[10px] text-white/25 mt-0.5">{f.duration}</div>
        </div>
        <motion.span animate={{ x: hovered ? 4 : 0 }} className="text-[18px] text-white/20">→</motion.span>
      </div>
    </motion.div>
  )
}

export default function Formations() {
  const [active, setActive] = useState<Category>('all')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const filtered = active === 'all' ? formations : formations.filter(f => f.category === active)

  return (
    <section id="formations" ref={ref} className="px-10 py-30">
      <SectionMarker title="Catalogue" id="#formations" inView={inView} />


      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex gap-2 flex-wrap mb-10"
      >
        {CATEGORIES.map(cat => (
          <motion.button key={cat.id} onClick={() => setActive(cat.id)}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className={[
              'font-mono text-[11px] px-[18px] py-2 rounded-full tracking-[0.06em] transition-all duration-200',
              active === cat.id
                ? 'border border-accent/50 text-accent bg-accent/[0.06]'
                : 'border border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/60',
            ].join(' ')}
          >
            {cat.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div layout
        className="grid gap-px bg-white/[0.04] border border-white/[0.04] rounded overflow-hidden"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((f, i) => <Card key={f.id} f={f} index={i} />)}
        </AnimatePresence>
      </motion.div>

      <motion.p layout className="font-mono text-[11px] text-white/20 mt-4 text-right">
        {filtered.length} formation{filtered.length > 1 ? 's' : ''}
      </motion.p>
    </section>
  )
}
