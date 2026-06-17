"use client"

import { createRegistration } from "@/requests/registrations"
import { academicLevels, formats, timeslots } from "@/utils/form"
import { useState } from "react"
import { motion } from "motion/react"
import Field from "../atoms/Field"

const RegistrationForm = ({ formation }: { formation: Formation }) => {
    const INITIAL: Registration = {
        name: '',
        email: '',
        phone: '',
        address: '',
        academic_level: academicLevels[0],
        format: 'onsite',
        price: 0,
        formation: formation.title,
        message: '',
        session: timeslots[0],
    }

    const [form, setForm] = useState<Registration>(INITIAL)
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
    const [errors, setErrors] = useState<Partial<Record<keyof Registration, string>>>({})

    const set = (k: keyof Registration) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => setForm(prev => ({ ...prev, [k]: e.target.value }))

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

        await createRegistration(form, setStatus);
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
                <p className="font-display text-[16px] font-bold text-ink">Pré-inscription initiée !</p>
                <p className="font-mono text-[12px] text-white/40 max-w-xs leading-relaxed">
                    Nous vous contacterons dans les 24h pour confirmer votre pré-inscription à <span className="text-white/60">{formation.title}</span>.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="font-mono text-[11px] text-white/30 hover:text-white/50 mt-2 transition-colors"
                >
                    Soumettre une autre pré-inscription
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
                    input={<input type="text" value={form.name} onChange={set('name')} placeholder="Ex : Essi Junior" />}
                />
                <Field
                    label="Téléphone *"
                    error={errors.phone}
                    input={<input type="tel" value={form.phone} onChange={set('phone')} placeholder="6907437373" />}
                />
            </div>

            {/* Email */}
            <Field
                label="Email"
                error={errors.email}
                input={<input type="email" value={form.email} onChange={set('email')} placeholder="dev@essijunior.com" />}
            />

            {/* Address + Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                    label="Adresse"
                    input={<input type="text" value={form.address} onChange={set('address')} placeholder="Ex : Santa Barbara, Yaoundé" />}
                />
                <Field
                    label="Niveau d'études"
                    input={
                        <select value={form.academic_level} onChange={set('academic_level')}>
                            {
                                academicLevels.map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))
                            }
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
                    {formats.map(mode => (
                        <button
                            key={mode}
                            onClick={() => {
                                setForm(prev => ({ ...prev, format: mode }))
                                setForm(prev => ({ ...prev, price: mode === 'onsite' ? formation.priceOnsite : formation.priceOnline }))
                                setForm(prev => ({ ...prev, session: mode === 'online' ? '' : timeslots[0] }))
                            }}
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

            {/* Session timing - only shown if onsite */}
            {form.format === 'onsite' && (
                <div className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] text-white/30 uppercase tracking-widest">
                        Créneau souhaité
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                        {timeslots.map(session => (
                            <button
                                key={session}
                                onClick={() => setForm(prev => ({ ...prev, session }))}
                                className={[
                                    'flex flex-col items-start gap-1 p-4 rounded border transition-all duration-150 text-left',
                                    form.session === session
                                        ? 'border-accent/40 bg-accent/5'
                                        : 'border-white/8 bg-surface hover:border-white/15',
                                ].join(' ')}
                            >
                                <span className="font-mono text-[11px] text-white/50">
                                    {session === 'journée' ? '☀️ Journée' : '🌙 Soirée'}
                                </span>
                                <span className={[
                                    'font-display text-[14px] font-extrabold',
                                    form.session === session ? 'text-accent' : 'text-white/60',
                                ].join(' ')}>
                                    {session === 'journée' ? '09:00 - 13:00' : '15:00 - 19:00'}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

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
                Pré-inscription à <span className="text-white/50">{formation.title}</span>
                {' · '}<span className="text-accent">{displayPrice}</span>
                {' · '}{form.format === 'onsite' ? 'Présentiel' : 'En ligne'}
            </p>

            {/* Registration fee notice */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-accent/10 border border-accent/20 rounded px-3.5 py-1 flex items-center gap-2"
            >
                <span className="text-accent text-lg shrink-0">ℹ</span>
                <p className="font-mono text-[11px] text-white/60 leading-relaxed">
                    Frais d&apos;inscription : <span className="text-accent font-semibold">5 000 FCFA</span>
                </p>
            </motion.div>

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
                {status === 'sending' ? 'Envoi en cours…' : "Envoyer ma pré-inscription →"}
            </button>

            {status === 'error' && (
                <p className="font-mono text-[11px] text-red-400 text-center">
                    Une erreur s&apos;est produite. Réessayez ou contactez-nous directement.
                </p>
            )}
        </div>
    )
}

export default RegistrationForm