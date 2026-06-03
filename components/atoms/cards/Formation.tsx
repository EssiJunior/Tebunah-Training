"use client"

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { CATEGORY_COLORS } from "@/data/formations";
import Link from "next/link";
const Formation = ({ f, index }: { f: Formation; index: number }) => {
    const [hovered, setHovered] = useState(false)
    const [tilt, setTilt] = useState({ x: 0, y: 0 })
    const [mode, setMode] = useState<'onsite' | 'online'>('onsite')
    const ref = useRef<HTMLDivElement>(null)

    const onMove = (e: React.MouseEvent) => {
        const el = ref.current; if (!el) return
        const r = el.getBoundingClientRect()
        setTilt({
            x: ((e.clientX - r.left) / r.width - 0.5) * 12,
            y: -((e.clientY - r.top) / r.height - 0.5) * 12,
        })
    }

    const displayPrice = mode === 'onsite' ? f.priceOnsiteLabel : f.priceOnlineLabel

    return (
        <Link href={`/formations/${f.id}`} className="block group">
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
                style={{
                    transform: `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                    border: f.featured
                        ? `1px solid rgba(200,242,58,${hovered ? '0.45' : '0.2'})`
                        : `0.5px solid rgba(255,255,255,${hovered ? '0.1' : '0.06'})`,
                    boxShadow: hovered && f.featured ? '0 0 40px rgba(200,242,58,0.05)' : 'none',
                }}
                className={[
                    'relative flex flex-col gap-3 p-6 rounded-px overflow-hidden transition-all duration-200 h-full',
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
                        {f.priority && (
                            <span className="font-mono text-[9px] bg-accent/10 text-accent px-2 py-0.5 rounded-px tracking-widest">
                                1ère session
                            </span>
                        )}
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
                        ['Cible', f.target],
                        ['Durée', `${f.duration} · ${f.hoursTotal}`],
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
                        <div
                            className="flex gap-0 rounded-px overflow-hidden border border-white/8 w-fit"
                            onClick={e => e.preventDefault()}
                        >
                            {(['onsite', 'online'] as const).map(m => (
                                <button
                                    key={m}
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMode(m) }}
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
                        className="text-[18px] text-white/20 group-hover:text-white/40 transition-colors"
                    >
                        →
                    </motion.span>
                </div>
            </motion.div>
        </Link>
    )
}


export default Formation