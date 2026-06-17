'use client'

import { useTranslations } from 'next-intl'

export default function Marquee() {
  const t = useTranslations('Marquee')
  const items = t.raw('items') as string[]
  const all = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-white/6 py-4 bg-surface">
      <div className="marquee-track">
        {all.map((item, i) => (
          <span key={i}
            className={[
              'font-mono text-[11px] px-5 whitespace-nowrap tracking-widest uppercase',
              item === '―' ? 'text-accent tracking-normal' : 'text-white/25',
            ].join(' ')}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
