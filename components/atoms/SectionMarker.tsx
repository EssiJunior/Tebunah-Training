import { motion } from "motion/react"

const SectionMarker = ({ title, id, className, inView }: { title?: string, id?: string, className?: string, inView?: boolean }) => {

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`flex items-center gap-4 mb-10 ${className}`}>
            <div className="w-10 h-px bg-accent" />
            <span className="font-mono text-accent tracking-widest">{title}</span>
            <div className="flex-1 h-px bg-line" />
            <span className="font-mono text-[10px] text-white/15">{id}</span>
        </motion.div>
    )
}

export default SectionMarker