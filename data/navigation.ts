import { CATEGORIES } from "./formations"


export const NAV_LINKS: NavLink[] = [
  {
    label: 'Formations',
    href: '#formations',
    sub: CATEGORIES.filter(c => c.id !== 'all').map(c => ({
      label: c.label,
      href: c.id,
      tag: `${c.quantity} cours`,
      quantity: c.quantity
    })),
  },
  { label: 'Instructeurs', href: '#instructeurs', sub: null },
  { label: 'FAQ', href: '#faq', sub: null },
]
