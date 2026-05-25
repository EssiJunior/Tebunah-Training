import { motion } from "motion/react"

const HamburgerIcon = ({ open, onClick }: { open: boolean; onClick: () => void }) => {
  return (
    <button onClick={onClick}
      className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.25"
      aria-label="Menu">
      <motion.span
        animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        className="block w-5 h-px bg-ink origin-center"
      />
      <motion.span
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="block w-5 h-px bg-ink origin-center"
      />
      <motion.span
        animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        className="block w-5 h-px bg-ink origin-center"
      />
    </button>
  )
}

export default HamburgerIcon