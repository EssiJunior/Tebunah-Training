'use client'

const ITEMS = [
  'Développement Web','✦','Intelligence Artificielle','✦','Data & Analyse','✦',
  'Bureautique','✦','Power BI','✦','React & Next.js','✦','Claude API','✦',
  'Cursor AI','✦','Python','✦','Excel Avancé','✦',
]

export default function Marquee() {
  const all = [...ITEMS, ...ITEMS]
  return (
    <div className="overflow-hidden border-y border-white/[0.06] py-4">
      <div className="marquee-track">
        {all.map((item, i) => (
          <span key={i}
            className={[
              'font-mono text-[11px] px-5 whitespace-nowrap tracking-[0.1em] uppercase',
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
