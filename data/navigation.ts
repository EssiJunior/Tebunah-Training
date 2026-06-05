export interface NavLink {
  label: string
  href: string
  sub?: NavLink[] | null
  tag?: string
}

export const NAV_LINKS: NavLink[] = [
  {
    label: 'Formations',
    href: '#formations',
    sub: [
      { label: 'Développement Web', href: '#formations', tag: '4 cours' },
      { label: 'Intelligence Artificielle', href: '#ia', tag: '6 cours 🔥' },
      { label: 'Data & Analyse', href: '#formations', tag: '3 cours' },
      { label: 'Bureautique', href: '#formations', tag: '3 cours' },
    ],
  },
  { label: 'Instructeurs', href: '#instructeurs', sub: null },
  { label: 'FAQ', href: '#faq', sub: null },
]
