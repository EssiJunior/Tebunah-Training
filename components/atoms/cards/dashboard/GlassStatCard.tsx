"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

const GlassStatCard = ({
    label,
    icon,
    value,
    footer,
    chart,
    delay = 0,
    glow = false,
}: {
    label: string
    icon: ReactNode
    value: ReactNode
    footer?: ReactNode
    chart?: ReactNode
    delay?: number
    glow?: boolean
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ y: 3 }}
            className={[
                'relative group overflow-hidden rounded-px py-6 px-4',
                'bg-white/3 backdrop-blur-xl border border-white/10',
                'shadow-[0_8px_32px_rgba(0,0,0,0.35)]',
                'transition-colors duration-300 hover:border-accent/30',
                glow ? 'shadow-[0_0_40px_rgba(255,210,80,0.08)]' : '',
            ].join(' ')}
        >

            <div className="-z-1 absolute rounded-full -top-10 -right-10" style={{ width: "100px", height: "100px", border: "30px solid var(--color-accent)", opacity: "0.05" }} />

            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
            <div className="pointer-events-none absolute -top-16 -right-16 w-32 h-32 rounded-full bg-accent/10 blur-3xl" />


            <div className="flex items-center justify-between mb-4 w-full ">
                <span className="font-mono text-[11px] text-white/50 group-hover:text-ink transition-colors ease-in-out duration-300 uppercase tracking-wider">
                    {label}
                </span>
                <span>{icon}</span>
            </div>

            <div className="relative flex items-end justify-between gap-3">
                <p className="font-chonburi text-2xl font-bold text-ink">{value}</p>
                {chart && <div className="shrink-0">{chart}</div>}
            </div>

            {footer && (
                <div className="relative mt-4 pt-2 border-t border-white/5 text-[10px]">
                    {footer}
                </div>
            )}
        </motion.div>
    )
}

export default GlassStatCard