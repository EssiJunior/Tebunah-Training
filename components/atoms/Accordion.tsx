"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

function Accordion({ item, index }: { item: FAQ; index: number }) {
    const [open, setOpen] = useState(false)
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
            className="border-b border-white/6"
        >
            <button onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between gap-6 py-6 text-left">
                <span className={['font-display text-[16px] font-semibold leading-snug transition-colors duration-200',
                    open ? 'text-accent' : 'text-ink'].join(' ')}>
                    {item.question}
                </span>
                <motion.span animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                    className={['font-mono text-[22px] shrink-0 leading-none transition-colors duration-200',
                        open ? 'text-accent' : 'text-white/20'].join(' ')}>
                    +
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div key="body"
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="font-mono text-[12px] text-white/50 leading-loose pb-6 max-w-170">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Accordion