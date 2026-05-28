'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'
import Logo from './Logo'

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setPct(p => {
        if (p >= 100) { clearInterval(id); setTimeout(() => setVisible(false), 400); return 100 }
        return Math.min(p + Math.floor(Math.random() * 12) + 3, 100)
      })
    }, 100) // 1 sec
    return () => clearInterval(id)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76,0,0.24,1] } }}
          className="fixed inset-0 bg-bg z-9995 flex flex-col items-center justify-center gap-4"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Logo />
          </motion.p>

          <div className="relative w-64">
            <div className="h-px bg-white/5 w-full" />
            <div
              className="absolute top-0 left-0 h-px bg-accent shadow-[0_0_8px_rgba(255,210,45,0.6)] transition-[width] duration-75 linear"
              style={{ width: `${pct}%` }}
            />
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-display text-[11px] text-white/20 tracking-wide"
          >
            {pct}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
