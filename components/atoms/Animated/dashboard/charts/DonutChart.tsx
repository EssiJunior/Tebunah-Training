"use client"

import { motion } from "motion/react"

type Segment = { label: string; value: number; color: string }

const DonutChart = ({
    segments,
    size = 64,
    stroke = 9,
}: {
    segments: Segment[]
    size?: number
    stroke?: number
}) => {
    const total = segments.reduce((sum, s) => sum + s.value, 0) || 1
    const radius = (size - stroke) / 2
    const circumference = 2 * Math.PI * radius

    let cumulative = 0

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
            {segments.map((seg, i) => {
                const fraction = seg.value / total
                const dash = fraction * circumference
                const offset = circumference - (cumulative / total) * circumference
                cumulative += seg.value

                return (
                    <motion.circle
                        key={seg.label}
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth={stroke}
                        strokeDasharray={`${dash} ${circumference - dash}`}
                        initial={{ strokeDashoffset: circumference, opacity: 0 }}
                        animate={{ strokeDashoffset: offset, opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                )
            })}
        </svg>
    )
}

export default DonutChart