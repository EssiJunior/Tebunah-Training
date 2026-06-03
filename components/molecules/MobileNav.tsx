import { AnimatePresence, motion } from "framer-motion"

function MobileNav({ open, onClose, go }: { open: boolean; onClose: () => void; go: (href: string) => (e: React.MouseEvent) => void }) {
    const ALL_LINKS = [
        { label: 'Formations', href: '#formations' },
        { label: 'IA (6 cours 🔥)', href: '#ia' },
        { label: 'Instructeur', href: '#instructeur' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#contact' },
    ]

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        className="fixed inset-0 z-90 bg-black/60 backdrop-blur-sm md:hidden"
                    />

                    {/* panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed top-0 right-0 bottom-0 z-95 w-72 bg-surface border-l border-white/8 flex flex-col md:hidden"
                    >
                        {/* header */}
                        <div className="flex items-center justify-between px-6 h-15 border-b border-white/6">
                            <span className="font-mono text-[12px] text-accent tracking-[0.08em]">Menu</span>
                        </div>

                        {/* links */}
                        <div className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
                            {ALL_LINKS.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => { go(link.href)(e); onClose() }}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.06 }}
                                    className="group flex items-center justify-between px-3 py-3.5 rounded-px hover:bg-white/5 transition-colors duration-150"
                                >
                                    <span className="font-display text-[16px] font-semibold text-white/60 group-hover:text-ink transition-colors duration-150">
                                        {link.label}
                                    </span>
                                    <span className="text-white/20 group-hover:text-white/50 transition-colors text-[14px] translate-x-0 group-hover:translate-x-1 duration-150">
                                        →
                                    </span>
                                </motion.a>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="px-4 pb-6 pt-2 border-t border-white/6 mt-auto">
                            <motion.a
                                href="#contact" onClick={(e) => { go('#contact')(e); onClose() }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.35 }}
                                className="w-full bg-accent text-bg font-mono text-[12px] font-medium py-3.5 rounded-px tracking-[0.08em] uppercase flex items-center justify-center gap-2"
                            >
                                Candidater <span>→</span>
                            </motion.a>
                            <p className="font-mono text-[10px] text-white/20 text-center mt-3 tracking-wide">
                                Réponse sous 24h · Yaoundé, CM
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default MobileNav