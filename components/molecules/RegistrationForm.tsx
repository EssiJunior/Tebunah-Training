"use client"

import { createRegistration } from "@/requests/registrations"
import { academicLevels, formats, timeslots } from "@/utils/form"
import { useState } from "react"
import { motion } from "motion/react"
import Field from "../atoms/Field"
import { useTranslations } from "next-intl"

const RegistrationForm = ({ formation }: { formation: Formation }) => {
    const t = useTranslations("formations")
    const tF = useTranslations("Formation")

    const INITIAL: Registration = {
        id: '',
        student: {
            id: '',
            name: '',
            email: '',
            phone: '',
            adress: '',
            academicLevel: academicLevels[0],
        },
        formation: formation,
        format: 'onsite',
        price: formation.priceOnsite,
        session: timeslots[0],
        message: '',
        status: 'pending'
    }

    const [form, setForm] = useState<Registration>(INITIAL)
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
    const [errors, setErrors] = useState<Partial<Record<'name' | 'phone' | 'email', string>>>({})

    const setStudentField = (k: keyof Student) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => setForm(prev => ({
        ...prev,
        student: {
            ...prev.student,
            [k]: e.target.value
        }
    }))

    const setRegField = (k: keyof Registration) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => setForm(prev => ({ ...prev, [k]: e.target.value }))

    const validate = () => {
        const e: typeof errors = {}
        if (!form.student.name.trim()) e.name = tF('form.validation.required')
        if (!form.student.phone.trim()) e.phone = tF('form.validation.required')
        if (form.student.email && !/\S+@\S+\.\S+/.test(form.student.email)) e.email = tF('form.validation.email')
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = async () => {
        if (!validate()) return
        setStatus('sending')
        await createRegistration(form, setStatus)
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
                <p className="font-display text-[16px] font-bold text-ink">
                    {tF('form.success.title')}
                </p>
                <p className="font-mono text-[12px] text-white/40 max-w-xs leading-relaxed">
                    {tF('form.success.body')}{' '}
                    <span className="text-white/60">{t(formation.id + ".title")}</span>.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="font-mono text-[11px] text-white/30 hover:text-white/50 mt-2 transition-colors"
                >
                    {tF('form.success.again')}
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-5">

            {/* Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                    label={tF('form.fields.name')}
                    error={errors.name}
                    input={<input type="text" value={form.student.name} onChange={setStudentField('name')} placeholder="Ex : Essi Junior" />}
                />
                <Field
                    label={tF('form.fields.phone')}
                    error={errors.phone}
                    input={<input type="tel" value={form.student.phone} onChange={setStudentField('phone')} placeholder="6907437373" />}
                />
            </div>

            {/* Email */}
            <Field
                label={tF('form.fields.email')}
                error={errors.email}
                input={<input type="email" value={form.student.email} onChange={setStudentField('email')} placeholder="dev@essijunior.com" />}
            />

            {/* Address + Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                    label={tF('form.fields.address')}
                    input={<input type="text" value={form.student.adress} onChange={setStudentField('adress')} placeholder="Ex : Santa Barbara, Yaoundé" />}
                />
                <Field
                    label={tF('form.fields.level')}
                    input={
                        <select value={form.student.academicLevel} onChange={setStudentField('academicLevel')}>
                            {academicLevels.map(level => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                    }
                />
            </div>

            {/* Format toggle */}
            <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] text-white/30 uppercase tracking-widest">
                    {tF('form.fields.format')}
                </span>
                <div className="grid grid-cols-2 gap-3">
                    {formats.map(mode => (
                        <button
                            key={mode}
                            onClick={() => {
                                setForm(prev => ({
                                    ...prev,
                                    format: mode,
                                    price: mode === 'onsite' ? formation.priceOnsite : formation.priceOnline,
                                    session: mode === 'online' ? '' : timeslots[0]
                                }))
                            }}
                            className={[
                                'flex flex-col items-start gap-1 p-4 rounded border transition-all duration-150 text-left',
                                form.format === mode
                                    ? 'border-accent/40 bg-accent/5'
                                    : 'border-white/8 bg-surface hover:border-white/15',
                            ].join(' ')}
                        >
                            <span className="font-mono text-[11px] text-white/50">
                                {mode === 'onsite' ? `🏢 ${tF('form.format.onsiteLabel')}` : `💻 ${tF('form.format.onlineLabel')}`}
                            </span>
                            <span className={[
                                'font-display text-[16px] font-extrabold',
                                form.format === mode ? 'text-accent' : 'text-white/60',
                            ].join(' ')}>
                                {mode === 'onsite' ? formation.priceOnsiteLabel : formation.priceOnlineLabel}
                            </span>
                            <span className="font-mono text-[10px] text-white/25">
                                {mode === 'onsite' ? tF('onsite') : tF('online')}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Session timing — onsite only */}
            {form.format === 'onsite' && (
                <div className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] text-white/30 uppercase tracking-widest">
                        {tF('form.fields.session')}
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                        {timeslots.map(sess => (
                            <button
                                key={sess}
                                onClick={() => setForm(prev => ({ ...prev, session: sess }))}
                                className={[
                                    'flex flex-col items-start gap-1 p-4 rounded border transition-all duration-150 text-left',
                                    form.session === sess
                                        ? 'border-accent/40 bg-accent/5'
                                        : 'border-white/8 bg-surface hover:border-white/15',
                                ].join(' ')}
                            >
                                <span className="font-mono text-[11px] text-white/50">
                                    {sess === 'journée' ? `☀️ ${tF('form.timeslot.morningLabel')}` : `🌙 ${tF('form.timeslot.eveningLabel')}`}
                                </span>
                                <span className={[
                                    'font-display text-[14px] font-extrabold',
                                    form.session === sess ? 'text-accent' : 'text-white/60',
                                ].join(' ')}>
                                    {sess === 'journée' ? tF('form.timeslot.morningHours') : tF('form.timeslot.eveningHours')}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Message */}
            <Field
                label={tF('form.fields.message')}
                input={
                    <textarea
                        value={form.message}
                        onChange={setRegField('message')}
                        rows={3}
                        placeholder={tF('form.fields.messagePlaceholder')}
                        className="resize-none"
                    />
                }
            />

            {/* Summary line */}
            <p className="font-mono text-[11px] text-white/25 leading-relaxed">
                {tF('form.summary.prefix')}{' '}
                <span className="text-white/50">{t(formation.id + ".title")}</span>
                {' · '}<span className="text-accent">{displayPrice}</span>
                {' · '}{form.format === 'onsite' ? tF('form.format.onsiteLabel') : tF('form.format.onlineLabel')}
            </p>

            {/* Registration fee notice */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-accent/10 border border-accent/20 rounded px-3.5 py-1 flex items-center gap-2"
            >
                <span className="text-accent text-lg shrink-0">ℹ</span>
                <p className="font-mono text-[11px] text-white/60 leading-relaxed whitespace-nowrap text-ellipsis overflow-hidden">
                    {tF('form.fee.label')}{' '}
                    <span className="text-accent font-semibold">{tF('form.fee.amount')}</span>
                    {' '}{tF('form.fee.methods')}
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
                {status === 'sending' ? tF('form.submit.sending') : tF('form.submit.idle')}
            </button>

            {status === 'error' && (
                <p className="font-mono text-[11px] text-red-400 text-center">
                    {tF('form.error')}
                </p>
            )}
        </div>
    )
}

export default RegistrationForm