"use client"

import { useState, useRef, useId } from "react"
import { AnimatePresence, motion } from "motion/react"

type Side = 'top' | 'bottom' | 'left' | 'right'

const SIDE_OFFSET: Record<Side, { x: number; y: number }> = {
    top: { x: 0, y: -8 },
    bottom: { x: 0, y: 8 },
    left: { x: -8, y: 0 },
    right: { x: 8, y: 0 },
}

const SIDE_POSITION: Record<Side, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

const Tooltip = ({
    children,
    label,
    side = 'top',
    delay = 300,
    className = '',
}: {
    children: React.ReactNode
    label: React.ReactNode
    side?: Side
    delay?: number
    className?: string
}) => {
    const [open, setOpen] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const id = useId()

    const show = () => {
        timeoutRef.current = setTimeout(() => setOpen(true), delay)
    }

    const hide = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setOpen(false)
    }

    const offset = SIDE_OFFSET[side]

    return (
        <span
            className={`relative inline-flex ${className}`}
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
            aria-describedby={open ? id : undefined}
        >
            {children}

            <AnimatePresence>
                {open && (
                    <motion.span
                        id={id}
                        role="tooltip"
                        initial={{ opacity: 0, scale: 0.92, x: offset.x, y: offset.y }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, x: offset.x, y: offset.y }}
                        transition={{ duration: 0.16, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className={[
                            'pointer-events-none absolute z-50 whitespace-nowrap',
                            'bg-surface2 border border-white/10 text-ink',
                            'font-mono text-[10px] tracking-wide px-2.5 py-1.5 rounded-px shadow-lg shadow-black/40',
                            SIDE_POSITION[side],
                        ].join(' ')}
                    >
                        {label}
                        <span
                            className={[
                                'absolute w-1.5 h-1.5 bg-surface2 border-white/10 rotate-45',
                                side === 'top' && 'top-full left-1/2 -translate-x-1/2 -mt-[3px] border-r border-b',
                                side === 'bottom' && 'bottom-full left-1/2 -translate-x-1/2 -mb-[3px] border-l border-t',
                                side === 'left' && 'left-full top-1/2 -translate-y-1/2 -ml-[3px] border-t border-r',
                                side === 'right' && 'right-full top-1/2 -translate-y-1/2 -mr-[3px] border-b border-l',
                            ].filter(Boolean).join(' ')}
                        />
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    )
}

export default Tooltip