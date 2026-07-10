"use client"

import { motion } from "motion/react"

const Sparkline = ({
    points,
    width = 140,
    height = 44,
    color = 'var(--color-accent, #ffd250)',
}: {
    points: number[]
    width?: number
    height?: number
    color?: string
}) => {
    if (points.length < 2) return null

    const max = Math.max(...points)
    const min = Math.min(...points)
    const range = max - min || 1

    const coords = points.map((p, i) => {
        const x = (i / (points.length - 1)) * width
        const y = height - ((p - min) / range) * (height - 6) - 3
        return [x, y]
    })

    const linePath = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
    const areaPath = `${linePath} L${width},${height} L0,${height} Z`

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <defs>
                <linearGradient id="sparklineFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.35" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <motion.path
                d={areaPath}
                fill="url(#sparklineFill)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            />
            <motion.path
                d={linePath}
                fill="none"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
        </svg>
    )
}

export default Sparkline