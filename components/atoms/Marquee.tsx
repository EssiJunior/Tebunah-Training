'use client'

import { MARQUEE_ITEMS } from '@/data/marquee'

export default function Marquee() {
  const all = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="overflow-hidden border-y border-white/6 py-4">
      <div className="marquee-track">
        {all.map((item, i) => (
          <span key={i}
            className={[
              'font-mono text-[11px] px-5 whitespace-nowrap tracking-widest uppercase',
              item === '✦' ? 'text-accent tracking-normal' : 'text-white/25',
            ].join(' ')}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
