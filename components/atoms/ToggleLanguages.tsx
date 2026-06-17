'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { useTransition } from 'react'

const LOCALES = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
] as const

type Locale = (typeof LOCALES)[number]['code']

export default function ToggleLanguages() {
    const locale = useLocale() as Locale
    const router = useRouter()
    const pathname = usePathname()
    const [isPending, startTransition] = useTransition()

    const switchLocale = (next: Locale) => {
        if (next === locale) return

        // Strip the current locale prefix and replace with the new one.
        // Assumes next-intl routing: /<locale>/rest-of-path
        const segments = pathname.split('/')
        segments[1] = next
        const newPath = segments.join('/')

        startTransition(() => {
            router.push(newPath)
        })
    }

    return (
        <div
            className="relative flex items-center border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/20 overflow-hidden"
            aria-label="Language switcher"
        >
            {/* Sliding pill indicator */}
            <AnimatePresence initial={false}>
                <motion.span
                    key={locale}
                    layoutId="lang-pill"
                    className="absolute inset-y-0 w-1/2 bg-white/8 border border-white/10"
                    style={{ left: locale === 'fr' ? '0%' : '50%' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 34, mass: 0.6 }}
                />
            </AnimatePresence>

            {LOCALES.map(({ code, label }) => {
                const isActive = code === locale

                return (
                    <button
                        key={code}
                        onClick={() => switchLocale(code)}
                        disabled={isPending}
                        aria-pressed={isActive}
                        className={[
                            'relative z-10 px-3 py-2 font-mono text-[11px] tracking-wider transition-colors duration-200',
                            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60',
                            isActive
                                ? 'text-ink'
                                : 'text-white/40 hover:text-white/70',
                            isPending ? 'opacity-50 cursor-wait' : 'cursor-pointer',
                        ].join(' ')}
                    >
                        {label}
                    </button>
                )
            })}
        </div>
    )
}