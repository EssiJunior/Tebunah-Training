// Formation type — translatable fields replaced by their translation key.
// All fields prefixed with `t_` are keys pointing to messages/[locale]/formations.json
// Usage: t(`formations.${formation.id}.title`)

export type FormationBenefit = {
  icon: string
  // Translation keys — resolved at render time:
  // t(`formations.${id}.benefits.${index}.title`)
  // t(`formations.${id}.benefits.${index}.items.${itemIndex}`)
  itemCount: number // number of items in this benefit block (for array index loop)
}

export const formations: Formation[] = [

  // ── BUREAUTIQUE ───────────────────────────────────────────────────────────
  {
    id: 'bur1',
    category: 'bureautique',
    priceOnsite: 60000,
    priceOnsiteLabel: '60 000 FCFA',
    priceOnline: 45000,
    priceOnlineLabel: '45 000 FCFA',
    availableNow: true,
    featured: true,
    benefits: [
      { icon: 'LayoutDashboard', itemCount: 5 },
      { icon: 'Briefcase', itemCount: 5 },
      { icon: 'Globe2', itemCount: 5 },
      { icon: 'Users', itemCount: 5 },
    ],
  },

  {
    id: 'bur2',
    category: 'bureautique',
    priceOnsite: 60000,
    priceOnsiteLabel: '60 000 FCFA',
    priceOnline: 45000,
    priceOnlineLabel: '45 000 FCFA',
    availableNow: true,
    featured: true,
    benefits: [
      { icon: 'LayoutGrid', itemCount: 5 },
      { icon: 'Briefcase', itemCount: 5 },
      { icon: 'Building2', itemCount: 5 },
      { icon: 'Users', itemCount: 5 },
    ],
  },

  {
    id: 'bur3',
    category: 'bureautique',
    priceOnsite: 65000,
    priceOnsiteLabel: '65 000 FCFA',
    priceOnline: 50000,
    priceOnlineLabel: '50 000 FCFA',
    availableNow: false,
    benefits: [
      { icon: 'TableProperties', itemCount: 5 },
      { icon: 'BarChart3', itemCount: 5 },
      { icon: 'LineChart', itemCount: 5 },
      { icon: 'Users', itemCount: 5 },
    ],
  },

  // ── WEB & MOBILE ──────────────────────────────────────────────────────────
  {
    id: 'dev1',
    category: 'dev',
    priceOnsite: 65000,
    priceOnsiteLabel: '65 000 FCFA',
    priceOnline: 50000,
    priceOnlineLabel: '50 000 FCFA',
    availableNow: true,
    featured: true,
    benefits: [
      { icon: 'Code2', itemCount: 5 },
      { icon: 'Monitor', itemCount: 5 },
      { icon: 'TrendingUp', itemCount: 5 },
      { icon: 'Users', itemCount: 5 },
    ],
  },

  {
    id: 'dev2',
    category: 'dev',
    priceOnsite: 65000,
    priceOnsiteLabel: '65 000 FCFA',
    priceOnline: 40000,
    priceOnlineLabel: '40 000 FCFA',
    availableNow: false,
    featured: false,
    benefits: [
      { icon: 'Braces', itemCount: 5 },
      { icon: 'AppWindow', itemCount: 5 },
      { icon: 'TrendingUp', itemCount: 5 },
      { icon: 'Users', itemCount: 5 },
    ],
  },

  {
    id: 'dev3',
    category: 'dev',
    priceOnsite: 45000,
    priceOnsiteLabel: '45 000 FCFA',
    priceOnline: 28000,
    priceOnlineLabel: '28 000 FCFA',
    availableNow: false,
    benefits: [
      { icon: 'Globe', itemCount: 5 },
      { icon: 'Store', itemCount: 5 },
      { icon: 'TrendingUp', itemCount: 5 },
      { icon: 'Users', itemCount: 5 },
    ],
  },

  {
    id: 'dev4',
    category: 'dev',
    priceOnsite: 100000,
    priceOnsiteLabel: '100 000 FCFA',
    priceOnline: 80000,
    priceOnlineLabel: '80 000 FCFA',
    availableNow: false,
    featured: true,
    benefits: [
      { icon: 'Layers', itemCount: 5 },
      { icon: 'AppWindow', itemCount: 5 },
      { icon: 'TrendingUp', itemCount: 5 },
      { icon: 'Users', itemCount: 5 },
    ],
  },

  {
    id: 'dev5',
    category: 'dev',
    priceOnsite: 110000,
    priceOnsiteLabel: '110 000 FCFA',
    priceOnline: 70000,
    priceOnlineLabel: '70 000 FCFA',
    availableNow: false,
    benefits: [
      { icon: 'Smartphone', itemCount: 5 },
      { icon: 'TabletSmartphone', itemCount: 5 },
      { icon: 'TrendingUp', itemCount: 5 },
      { icon: 'Users', itemCount: 5 },
    ],
  },

  // ── INTELLIGENCE ARTIFICIELLE ─────────────────────────────────────────────
  {
    id: 'ia1',
    category: 'ia',
    priceOnsite: 40000,
    priceOnsiteLabel: '40 000 FCFA',
    priceOnline: 25000,
    priceOnlineLabel: '25 000 FCFA',
    availableNow: true,
    featured: true,
    benefits: [
      { icon: 'Bot', itemCount: 5 },
      { icon: 'Zap', itemCount: 5 },
      { icon: 'Rocket', itemCount: 5 },
      { icon: 'Users', itemCount: 5 },
    ],
  },

  {
    id: 'ia2',
    category: 'ia',
    priceOnsite: 55000,
    priceOnsiteLabel: '55 000 FCFA',
    priceOnline: 35000,
    priceOnlineLabel: '35 000 FCFA',
    availableNow: false,
    featured: true,
    benefits: [
      { icon: 'MessageSquareCode', itemCount: 5 },
      { icon: 'Wand2', itemCount: 5 },
      { icon: 'Trophy', itemCount: 5 },
      { icon: 'Users', itemCount: 5 },
    ],
  },

  {
    id: 'ia3',
    category: 'ia',
    priceOnsite: 50000,
    priceOnsiteLabel: '50 000 FCFA',
    priceOnline: 32000,
    priceOnlineLabel: '32 000 FCFA',
    availableNow: false,
    benefits: [
      { icon: 'Palette', itemCount: 5 },
      { icon: 'Megaphone', itemCount: 5 },
      { icon: 'TrendingUp', itemCount: 5 },
      { icon: 'Users', itemCount: 5 },
    ],
  },

  {
    id: 'ia4',
    category: 'ia',
    priceOnsite: 95000,
    priceOnsiteLabel: '95 000 FCFA',
    priceOnline: 60000,
    priceOnlineLabel: '60 000 FCFA',
    availableNow: false,
    featured: true,
    benefits: [
      { icon: 'Terminal', itemCount: 5 },
      { icon: 'FolderCode', itemCount: 5 },
      { icon: 'Zap', itemCount: 5 },
      { icon: 'Users', itemCount: 5 },
    ],
  },

  {
    id: 'ia5',
    category: 'ia',
    priceOnsite: 130000,
    priceOnsiteLabel: '130 000 FCFA',
    priceOnline: 85000,
    priceOnlineLabel: '85 000 FCFA',
    availableNow: false,
    benefits: [
      { icon: 'BrainCircuit', itemCount: 5 },
      { icon: 'Database', itemCount: 5 },
      { icon: 'TrendingUp', itemCount: 5 },
      { icon: 'Users', itemCount: 5 },
    ],
  },

  // ── DATA & SQL ────────────────────────────────────────────────────────────
  {
    id: 'dat1',
    category: 'data',
    priceOnsite: 60000,
    priceOnsiteLabel: '60 000 FCFA',
    priceOnline: 38000,
    priceOnlineLabel: '38 000 FCFA',
    availableNow: false,
    benefits: [
      { icon: 'PieChart', itemCount: 5 },
      { icon: 'LayoutDashboard', itemCount: 5 },
      { icon: 'BarChart2', itemCount: 5 },
      { icon: 'Users', itemCount: 5 },
    ],
  },

  {
    id: 'dat2',
    category: 'data',
    priceOnsite: 55000,
    priceOnsiteLabel: '55 000 FCFA',
    priceOnline: 35000,
    priceOnlineLabel: '35 000 FCFA',
    availableNow: false,
    benefits: [
      { icon: 'Database', itemCount: 5 },
      { icon: 'FileSpreadsheet', itemCount: 5 },
      { icon: 'TrendingUp', itemCount: 5 },
      { icon: 'Users', itemCount: 5 },
    ],
  },

  {
    id: 'dat3',
    category: 'data',
    priceOnsite: 65000,
    priceOnsiteLabel: '65 000 FCFA',
    priceOnline: 42000,
    priceOnlineLabel: '42 000 FCFA',
    availableNow: false,
    benefits: [
      { icon: 'Code2', itemCount: 5 },
      { icon: 'Bot', itemCount: 5 },
      { icon: 'TrendingUp', itemCount: 5 },
      { icon: 'Users', itemCount: 5 },
    ],
  },
]

export const CATEGORIES: { id: Category; label: string, quantity: number }[] = [
  { id: 'all', label: 'Toutes', quantity: formations.length },
  { id: 'bureautique', label: 'Bureautique', quantity: formations.filter(f => f.category === 'bureautique').length },
  { id: 'dev', label: 'Web & Mobile', quantity: formations.filter(f => f.category === 'dev').length },
  { id: 'ia', label: 'Intelligence Artificielle', quantity: formations.filter(f => f.category === 'ia').length },
  { id: 'data', label: 'Data & SQL', quantity: formations.filter(f => f.category === 'data').length },
]

export const CATEGORY_COLORS: Record<Exclude<Category, 'all'>, string> = {
  ia: '#60a5fa',
  dev: '#4ade80',
  data: '#facc15',
  bureautique: '#fb64b6',
}

