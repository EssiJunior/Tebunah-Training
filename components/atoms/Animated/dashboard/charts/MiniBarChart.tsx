"use client"

import { motion } from "motion/react"

type Bar = { label: string; value: number; color: string }

const MiniBarChart = ({ bars, height = 64 }: { bars: Bar[]; height?: number }) => {
    const max = Math.max(...bars.map(b => b.value), 1)

    return (
        <div className="flex items-end gap-2" style={{ height }}>
            {bars.map((bar, i) => (
                <div key={bar.label} className="flex flex-col items-center gap-1.5 flex-1">
                    <div className="relative w-full flex items-end justify-center" style={{ height: height - 16 }}>
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(bar.value / max) * 100}%` }}
                            transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="w-full rounded-t-[2px] min-h-[3px]"
                            style={{ backgroundColor: bar.color }}
                        />
                    </div>
                    <span className="font-mono text-[8px] text-white/30 uppercase tracking-wider">
                        {bar.label}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default MiniBarChart