'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { CATEGORY_COLORS } from '@/data/formations'

// ─── helpers ────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
    bureautique: 'Bureautique',
    dev: 'Web & Mobile',
    ia: 'Intelligence Artificielle',
    data: 'Data & SQL',
}

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

// ─── registration form ───────────────────────────────────────────────────────

interface FormState {
    name: string
    phone: string
    email: string
    city: string
    level: string
    format: 'onsite' | 'online'
    message: string
}

const INITIAL: FormState = {
    name: '',
    phone: '',
    email: '',
    city: '',
    level: '',
    format: 'onsite',
    message: '',
}

function RegistrationForm({ formation }: { formation: Formation }) {
    const [form, setForm] = useState<FormState>(INITIAL)
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

    const set = (k: keyof FormState) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => setForm(prev => ({ ...prev, [k]: e.target.value }))

    const setFormat = (v: 'onsite' | 'online') =>
        setForm(prev => ({ ...prev, format: v }))

    const validate = () => {
        const e: typeof errors = {}
        if (!form.name.trim()) e.name = 'Champ requis'
        if (!form.phone.trim()) e.phone = 'Champ requis'
        if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = async () => {
        if (!validate()) return
        setStatus('sending')
        try {
            // Replace with your actual API route or email service
            await fetch('/api/inscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formation: formation.title,
                    formationId: formation.id,
                    ...form,
                    priceLabel: form.format === 'onsite'
                        ? formation.priceOnsiteLabel
                        : formation.priceOnlineLabel,
                }),
            })
            setStatus('sent')
            setForm(INITIAL)
        } catch {
            setStatus('error')
        }
    }

    const displayPrice = form.format === 'onsite'
        ? formation.priceOnsiteLabel
        : formation.priceOnlineLabel

    if (status === 'sent') {
        return (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 text-2xl">
                    ✓
                </div>
                <p className="font-display text-[16px] font-bold text-ink">Demande envoyée !</p>
                <p className="font-mono text-[12px] text-white/40 max-w-xs leading-relaxed">
                    Nous vous contacterons dans les 24h pour confirmer votre inscription à <span className="text-white/60">{formation.title}</span>.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="font-mono text-[11px] text-white/30 hover:text-white/50 mt-2 transition-colors"
                >
                    Soumettre une autre demande
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-5">

            {/* Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                    label="Nom complet *"
                    error={errors.name}
                    input={<input type="text" value={form.name} onChange={set('name')} placeholder="Ex : Jean Mbarga" />}
                />
                <Field
                    label="Téléphone *"
                    error={errors.phone}
                    input={<input type="tel" value={form.phone} onChange={set('phone')} placeholder="6XX XXX XXX" />}
                />
            </div>

            {/* Email */}
            <Field
                label="Email"
                error={errors.email}
                input={<input type="email" value={form.email} onChange={set('email')} placeholder="jean@exemple.com" />}
            />

            {/* City + Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                    label="Ville"
                    input={<input type="text" value={form.city} onChange={set('city')} placeholder="Ex : Yaoundé" />}
                />
                <Field
                    label="Niveau d'études"
                    input={
                        <select value={form.level} onChange={set('level')}>
                            <option value="">Sélectionner…</option>
                            <option>Lycée / Baccalauréat</option>
                            <option>BTS / DUT</option>
                            <option>Licence</option>
                            <option>Master +</option>
                            <option>Professionnel en activité</option>
                            <option>Autre</option>
                        </select>
                    }
                />
            </div>

            {/* Format toggle */}
            <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] text-white/30 uppercase tracking-widest">
                    Format souhaité *
                </span>
                <div className="grid grid-cols-2 gap-3">
                    {(['onsite', 'online'] as const).map(mode => (
                        <button
                            key={mode}
                            onClick={() => setFormat(mode)}
                            className={[
                                'flex flex-col items-start gap-1 p-4 rounded border transition-all duration-150 text-left',
                                form.format === mode
                                    ? 'border-accent/40 bg-accent/5'
                                    : 'border-white/8 bg-surface hover:border-white/15',
                            ].join(' ')}
                        >
                            <span className="font-mono text-[11px] text-white/50">
                                {mode === 'onsite' ? '🏢 Présentiel' : '💻 En ligne'}
                            </span>
                            <span className={[
                                'font-display text-[16px] font-extrabold',
                                form.format === mode ? 'text-accent' : 'text-white/60',
                            ].join(' ')}>
                                {mode === 'onsite' ? formation.priceOnsiteLabel : formation.priceOnlineLabel}
                            </span>
                            <span className="font-mono text-[10px] text-white/25">
                                {mode === 'onsite' ? 'Yaoundé · en salle' : 'Via Google Meet / Zoom'}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Message */}
            <Field
                label="Message (optionnel)"
                input={
                    <textarea
                        value={form.message}
                        onChange={set('message')}
                        rows={3}
                        placeholder="Questions, contraintes horaires, besoins particuliers…"
                        className="resize-none"
                    />
                }
            />

            {/* Summary line */}
            <p className="font-mono text-[11px] text-white/25 leading-relaxed">
                Inscription à <span className="text-white/50">{formation.title}</span>
                {' · '}<span className="text-accent">{displayPrice}</span>
                {' · '}{form.format === 'onsite' ? 'Présentiel' : 'En ligne'}
            </p>

            {/* Submit */}
            <button
                onClick={handleSubmit}
                disabled={status === 'sending'}
                className={[
                    'w-full py-3.5 rounded font-mono text-[12px] tracking-widest uppercase transition-all duration-200',
                    status === 'sending'
                        ? 'bg-white/5 text-white/20 cursor-not-allowed'
                        : 'bg-accent text-black hover:bg-accent/90 active:scale-[0.99]',
                ].join(' ')}
            >
                {status === 'sending' ? 'Envoi en cours…' : "Envoyer ma demande d'inscription →"}
            </button>

            {status === 'error' && (
                <p className="font-mono text-[11px] text-red-400 text-center">
                    Une erreur s'est produite. Réessayez ou contactez-nous directement.
                </p>
            )}
        </div>
    )
}

// ─── small field wrapper ─────────────────────────────────────────────────────

function Field({
    label,
    input,
    error,
}: {
    label: string
    input: React.ReactNode
    error?: string
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-white/30 uppercase tracking-widest">
                {label}
            </label>
            <div className={[
                'font-mono text-[13px]',
                '[&_input]:w-full [&_input]:bg-surface2 [&_input]:border [&_input]:rounded [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-white/70 [&_input]:outline-none [&_input]:placeholder:text-white/15',
                '[&_select]:w-full [&_select]:bg-surface2 [&_select]:border [&_select]:rounded [&_select]:px-3 [&_select]:py-2.5 [&_select]:text-white/70 [&_select]:outline-none',
                '[&_textarea]:w-full [&_textarea]:bg-surface2 [&_textarea]:border [&_textarea]:rounded [&_textarea]:px-3 [&_textarea]:py-2.5 [&_textarea]:text-white/70 [&_textarea]:outline-none [&_textarea]:placeholder:text-white/15',
                error
                    ? '[&_input]:border-red-500/40 [&_select]:border-red-500/40 [&_textarea]:border-red-500/40'
                    : '[&_input]:border-white/8 [&_select]:border-white/8 [&_textarea]:border-white/8',
            ].join(' ')}>
                {input}
            </div>
            {error && (
                <span className="font-mono text-[10px] text-red-400">{error}</span>
            )}
        </div>
    )
}

// ─── main page component ─────────────────────────────────────────────────────

export default function FormationDetail({ formation }: { formation: Formation }) {
    const catColor = CATEGORY_COLORS[formation.category]

    const META_ITEMS = [
        { label: 'Durée', value: formation.duration },
        { label: 'Volume horaire', value: formation.hoursTotal },
        { label: 'Public cible', value: formation.target },
        { label: 'Prérequis', value: formation.prereq },
    ]

    return (
        <main className="px-6 md:px-10 py-16 max-w-3xl mx-auto">

            {/* Back */}
            <motion.div {...fadeUp(0)}>
                <Link
                    href="/#formations"
                    className="inline-flex items-center gap-2 font-mono text-[11px] text-white/30 hover:text-white/60 transition-colors mb-8"
                >
                    ← Retour aux formations
                </Link>
            </motion.div>

            {/* Hero */}
            <motion.div {...fadeUp(0.05)} className="flex flex-col gap-3 mb-10">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                    <span
                        className="font-mono text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-px"
                        style={{ color: catColor, border: `0.5px solid ${catColor}30` }}
                    >
                        {CATEGORY_LABELS[formation.category] ?? formation.category}
                    </span>

                    {formation.availableNow ? (
                        <span className="font-mono text-[10px] px-2.5 py-1 rounded-px border border-green-500/30 text-green-400">
                            ● Disponible
                        </span>
                    ) : (
                        <span className="font-mono text-[10px] px-2.5 py-1 rounded-px border border-white/10 text-white/30">
                            Bientôt disponible
                        </span>
                    )}

                    {formation.priority && (
                        <span className="font-mono text-[10px] bg-accent/10 text-accent px-2.5 py-1 rounded-px">
                            1ère session
                        </span>
                    )}
                </div>

                {/* Title */}
                <h1 className="font-display text-[28px] md:text-[34px] font-extrabold leading-tight text-ink">
                    {formation.title}
                </h1>

                {/* Description */}
                <p className="font-mono text-[13px] text-white/45 leading-[1.85] max-w-xl">
                    {formation.description}
                </p>
            </motion.div>

            {/* Meta grid */}
            <motion.div {...fadeUp(0.1)} className="mb-10">
                <p className="font-mono text-[10px] text-white/20 tracking-widest uppercase mb-4">
                    Détails de la formation
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/4 border border-white/4 rounded overflow-hidden">
                    {META_ITEMS.map(({ label, value }) => (
                        <div key={label} className="bg-surface p-4 flex flex-col gap-1">
                            <span className="font-mono text-[9px] text-white/20 tracking-widest uppercase">
                                {label}
                            </span>
                            <span className="font-mono text-[12px] text-white/60 leading-snug">
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Pricing */}
            <motion.div {...fadeUp(0.15)} className="mb-12">
                <p className="font-mono text-[10px] text-white/20 tracking-widest uppercase mb-4">
                    Tarifs
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {(
                        [
                            {
                                mode: 'Présentiel',
                                label: formation.priceOnsiteLabel,
                                note: 'Yaoundé · en salle',
                                primary: true,
                            },
                            {
                                mode: 'En ligne',
                                label: formation.priceOnlineLabel,
                                note: 'Google Meet / Zoom',
                                primary: false,
                            },
                        ] as const
                    ).map(({ mode, label, note, primary }) => (
                        <div
                            key={mode}
                            className={[
                                'p-5 rounded flex flex-col gap-1',
                                primary
                                    ? 'border border-accent/20 bg-accent/3'
                                    : 'border border-white/6 bg-surface',
                            ].join(' ')}
                        >
                            <span className="font-mono text-[10px] text-white/25 tracking-widest uppercase">
                                {mode}
                            </span>
                            <span className={[
                                'font-display text-[22px] font-extrabold',
                                primary ? 'text-accent' : 'text-white/70',
                            ].join(' ')}>
                                {label}
                            </span>
                            <span className="font-mono text-[10px] text-white/20">{note}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-white/6 mb-12" />

            {/* Registration form */}
            <motion.div {...fadeUp(0.2)}>
                <div className="mb-6">
                    <h2 className="font-display text-[20px] font-bold text-ink mb-1">
                        S'inscrire à cette formation
                    </h2>
                    <p className="font-mono text-[12px] text-white/30 leading-relaxed">
                        Remplissez le formulaire ci-dessous. Nous vous contacterons dans les 24h pour confirmer votre place.
                    </p>
                </div>

                <RegistrationForm formation={formation} />
            </motion.div>

        </main>
    )
}