import { useFormations } from "@/context/FormationsContext";
import { NAV_LINKS } from "@/data/navigation";
import { createGoHandler } from "@/utils/navigation";
import { motion, AnimatePresence } from "motion/react"
import { useRouter } from "next/navigation";

const Dropdown = ({ items, visible }: { items: NonNullable<typeof NAV_LINKS[0]['sub']>; visible: boolean }) => {
    const router = useRouter()
    const { setActive } = useFormations()
    const go = createGoHandler(router, setActive)

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute top-[calc(100%+12px)] left-0 min-w-65 z-50 bg-surface border border-white/8 overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
                >
                    {/* top accent line */}
                    <div className="h-px w-full bg-accent" />
                    <div className="p-2">
                        {items.map((item) => (
                            <a
                                key={item.label}
                                href={`#formations-${item.href}`}
                                onClick={go(`#formations-${item.href}`)}
                                className="group flex items-center justify-between px-2 py-2.5 rounded-px hover:bg-white/5 transition-colors duration-150"
                            >
                                <span className="font-mono text-[12px] text-white/55 group-hover:text-ink transition-colors duration-150 tracking-wide">
                                    {item.label}
                                </span>
                                <span className="font-mono text-[10px] text-accent/60 group-hover:text-accent transition-colors duration-150 tracking-[0.08em] text-ellipsis overflow-hidden whitespace-nowrap">
                                    {item.tag}
                                </span>
                            </a>
                        ))}
                    </div>
                    <div className="px-4 py-3 border-t border-white/6">
                        <a href="#formations-all" onClick={go('#formations-all')}
                            className="font-mono text-[10px] text-accent/50 hover:text-accent transition-colors duration-150 tracking-widest uppercase flex items-center gap-2">
                            <span className="w-3 h-px bg-current" /> Voir toutes les formations
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Dropdown