import { Loader2 } from "lucide-react"
import { motion } from "motion/react"

const Button = ({ children, className, type = "button", isLoading }: { children: React.ReactNode, className?: string, type?: 'button' | 'submit', isLoading?: boolean }) => {
    return (
        <motion.button
            type={type}
            disabled={isLoading}
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(200,242,58,0.2)' }}
            whileTap={{ scale: 0.96 }}
            className={`flex items-center justify-center gap-2 bg-accent text-bg font-mono text-[11px] font-medium px-4 py-2 rounded-px tracking-[0.08em] uppercase ${className}`}
        >
            {children}
            {isLoading && <Loader2 className="animate-spin" />}
        </motion.button>
    )
}

export default Button