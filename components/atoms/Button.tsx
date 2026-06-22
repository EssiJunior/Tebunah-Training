import { motion } from "motion/react"

const Button = ({ children, type }: { children: React.ReactNode, type: 'button' | 'submit' }) => {
    return (
        <motion.button
            type={type}
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(200,242,58,0.2)' }}
            whileTap={{ scale: 0.96 }}
            className="hidden md:inline-flex items-center gap-2 bg-accent text-bg font-mono text-[11px] font-medium px-4 py-2 rounded-px tracking-[0.08em] uppercase"
        >
            {children}
        </motion.button>
    )
}

export default Button