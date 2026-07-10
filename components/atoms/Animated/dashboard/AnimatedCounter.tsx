"use client"

import { useEffect, useRef, useState } from "react"

const AnimatedCounter = ({
    value,
    duration = 1200,
    formatter = (n: number) => Math.round(n).toLocaleString(),
}: {
    value: number
    duration?: number
    formatter?: (n: number) => string
}) => {
    const [display, setDisplay] = useState(0)
    const frameRef = useRef<number | null>(null)

    useEffect(() => {
        const start = performance.now()
        const from = 0

        const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplay(from + (value - from) * eased)

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(tick)
            }
        }

        frameRef.current = requestAnimationFrame(tick)
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current)
        }
    }, [value, duration])

    return <>{formatter(display)}</>
}

export default AnimatedCounter