'use client'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const FAQS = [
  { q: "Les formations sont-elles certifiantes ?", a: "Une attestation de formation privée est délivrée à la fin de chaque parcours. Elle n'est pas agréée MINEFOP pour l'instant — mais les compétences acquises sont immédiatement applicables et valorisées sur le marché local et international (Upwork, Andela, missions freelance)." },
  { q: "Format présentiel ou en ligne ?", a: "Les deux options sont disponibles. Présentiel à Yaoundé pour les ateliers pratiques, ou 100% en ligne via Google Meet. Le matériel de cours est fourni en PDF." },
  { q: "Comment se déroule le paiement ?", a: "MTN Mobile Money, Orange Money ou virement bancaire. Paiement en 2 fois possible sur demande pour les formations au-dessus de 50 000 FCFA." },
  { q: "Faut-il déjà avoir des bases en informatique ?", a: "Chaque formation indique clairement ses prérequis. Certaines partent de zéro (Bureautique, HTML/CSS, IA au quotidien). D'autres supposent des bases (React, Python ML). Contactez-nous si vous avez un doute." },
  { q: "Peut-on organiser une formation en intra-entreprise ?", a: "Oui, avec un tarif forfaitaire pour un groupe. C'est particulièrement pertinent pour les formations Cybersécurité, Power BI et IA pour les entreprises." },
  { q: "Quelle est la taille des groupes ?", a: "8 à 12 participants maximum pour garantir un suivi personnalisé. Sessions individuelles ou en binôme disponibles sur demande." },
]

function Item({ item, index }: { item: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border-b border-white/[0.06]"
    >
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-6 py-6 text-left">
        <span className={['font-display text-[16px] font-semibold leading-snug transition-colors duration-200',
          open ? 'text-accent' : 'text-ink'].join(' ')}>
          {item.q}
        </span>
        <motion.span animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.76,0,0.24,1] }}
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
            transition={{ duration: 0.4, ease: [0.76,0,0.24,1] }}
            className="overflow-hidden"
          >
            <p className="font-mono text-[12px] text-white/50 leading-[2] pb-6 max-w-[680px]">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="faq" ref={ref} className="px-10 py-[120px] border-t border-white/[0.06]">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-20">
        <span className="font-mono text-[10px] text-accent tracking-[0.15em] px-2.5 py-1 rounded-px border border-accent/20 bg-accent/[0.08]">04</span>
        <span className="font-mono text-[11px] text-white/30 tracking-[0.1em]">Questions fréquentes</span>
        <div className="flex-1 h-px bg-line" />
        <span className="font-mono text-[10px] text-white/15">#faq</span>
      </motion.div>

      <div className="grid grid-cols-[1fr_2fr] gap-20 items-start">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}>
          <h2 className="font-display text-[36px] font-extrabold leading-none mb-4">
            Tu as des<br/><span className="text-accent">questions ?</span>
          </h2>
          <p className="font-mono text-[11px] text-white/30 leading-relaxed">
            Si tu ne trouves pas ta réponse, contacte-moi directement sur WhatsApp.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-white/[0.06]">
          {FAQS.map((item, i) => <Item key={i} item={item} index={i} />)}
        </motion.div>
      </div>
    </section>
  )
}
