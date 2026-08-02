// Formation type — translatable fields replaced by their translation key.
// All fields prefixed with `t_` are keys pointing to messages/[locale]/formations.json
// Usage: t(`formations.${formation.id}.title`)

export type FormationBenefit = {
  icon?: string
  title: { en: string; fr: string }
  items: { en: string; fr: string }[]
}

export const formations: Formation[] = [

  // ── office ───────────────────────────────────────────────────────────
  {
    id: 'bur1',
    title: { en: 'Complete Office Suite', fr: 'Complete Office Suite' },
    description: { en: 'General introduction + Word, Excel, PowerPoint — operational proficiency guaranteed by end of training + AI for office productivity', fr: 'General introduction + Word, Excel, PowerPoint — operational proficiency guaranteed by end of training + AI for office productivity' },
    category: 'office',
    price: { on_site: 60000, on_line: 45000 },
    // legacy labels retained for UI compatibility
    priceOnsiteLabel: '60 000 FCFA',
    priceOnlineLabel: '45 000 FCFA',
    availableNow: true,
    featured: true,
    benefits: [
      { icon: 'LayoutDashboard', title: { en: 'Key Skills', fr: 'Compétences clés' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Briefcase', title: { en: 'Career', fr: 'Carrière' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Globe2', title: { en: 'Global Tools', fr: 'Outils globaux' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Users', title: { en: 'Collaboration', fr: 'Collaboration' }, items: Array(5).fill({ en: '', fr: '' }) },
    ],
  },

  {
    id: 'bur2',
    title: { en: 'Google Workspace', fr: 'Google Workspace' },
    description: { en: 'Gmail, Drive, Docs, Sheets, Slides, Forms, Calendar — collaborate effectively and automate tasks with Google tools', fr: 'Gmail, Drive, Docs, Sheets, Slides, Forms, Calendar — collaborate effectively and automate tasks with Google tools' },
    category: 'office',
    price: { on_site: 60000, on_line: 45000 },
    priceOnsiteLabel: '60 000 FCFA',
    priceOnlineLabel: '45 000 FCFA',
    availableNow: true,
    featured: true,
    benefits: [
      { icon: 'LayoutGrid', title: { en: 'Productivity', fr: 'Productivité' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Briefcase', title: { en: 'Business', fr: 'Affaires' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Building2', title: { en: 'Enterprise', fr: 'Entreprise' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Users', title: { en: 'Teams', fr: 'Équipes' }, items: Array(5).fill({ en: '', fr: '' }) },
    ],
  },

  {
    id: 'bur3',
    title: { en: 'Advanced Excel & Dashboards', fr: 'Advanced Excel & Dashboards' },
    description: { en: 'Advanced formulas, pivot tables, charts, introduction to Power Query and Power Pivot to create interactive dashboards', fr: 'Advanced formulas, pivot tables, charts, introduction to Power Query and Power Pivot to create interactive dashboards' },
    category: 'office',
    price: { on_site: 65000, on_line: 50000 },
    priceOnsiteLabel: '65 000 FCFA',
    priceOnlineLabel: '50 000 FCFA',
    availableNow: false,
    benefits: [
      { icon: 'TableProperties', title: { en: 'Data', fr: 'Données' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'BarChart3', title: { en: 'Charts', fr: 'Graphiques' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'LineChart', title: { en: 'Trends', fr: 'Tendances' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Users', title: { en: 'Collaboration', fr: 'Collaboration' }, items: Array(5).fill({ en: '', fr: '' }) },
    ],
  },

  // ── WEB & MOBILE ──────────────────────────────────────────────────────────
  {
    id: 'dev1',
    title: { en: 'HTML/CSS/JS — Master the bases of web development', fr: 'HTML/CSS/JS — Master the bases of web development' },
    description: { en: 'Web fundamentals, responsive layout, basic SEO and site deployment', fr: 'Web fundamentals, responsive layout, basic SEO and site deployment' },
    category: 'dev',
    price: { on_site: 65000, on_line: 50000 },
    priceOnsiteLabel: '65 000 FCFA',
    priceOnlineLabel: '50 000 FCFA',
    availableNow: true,
    featured: true,
    benefits: [
      { icon: 'Code2', title: { en: 'Coding', fr: 'Programmation' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Monitor', title: { en: 'UI', fr: 'Interface' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'TrendingUp', title: { en: 'Growth', fr: 'Croissance' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Users', title: { en: 'Community', fr: 'Communauté' }, items: Array(5).fill({ en: '', fr: '' }) },
    ],
  },

  {
    id: 'dev2',
    title: { en: 'Advanced JavaScript — Interactivity & DOM', fr: 'Advanced JavaScript — Interactivity & DOM' },
    description: { en: 'Programming logic, DOM manipulation, interactive forms', fr: 'Programming logic, DOM manipulation, interactive forms' },
    category: 'dev',
    price: { on_site: 65000, on_line: 40000 },
    priceOnsiteLabel: '65 000 FCFA',
    priceOnlineLabel: '40 000 FCFA',
    availableNow: false,
    featured: false,
    benefits: [
      { icon: 'Braces', title: { en: 'Patterns', fr: 'Patrons' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'AppWindow', title: { en: 'Apps', fr: 'Applications' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'TrendingUp', title: { en: 'Optimization', fr: 'Optimisation' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Users', title: { en: 'Teams', fr: 'Équipes' }, items: Array(5).fill({ en: '', fr: '' }) },
    ],
  },

  {
    id: 'dev3',
    title: { en: 'WordPress & SME Websites', fr: 'WordPress & SME Websites' },
    description: { en: 'Installation, themes, WooCommerce plugins, publishing and basic SEO', fr: 'Installation, themes, WooCommerce plugins, publishing and basic SEO' },
    category: 'dev',
    price: { on_site: 45000, on_line: 28000 },
    priceOnsiteLabel: '45 000 FCFA',
    priceOnlineLabel: '28 000 FCFA',
    availableNow: false,
    benefits: [
      { icon: 'Globe', title: { en: 'Websites', fr: 'Sites web' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Store', title: { en: 'E-commerce', fr: 'E-commerce' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'TrendingUp', title: { en: 'SEO', fr: 'SEO' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Users', title: { en: 'Support', fr: 'Support' }, items: Array(5).fill({ en: '', fr: '' }) },
    ],
  },

  {
    id: 'dev4',
    title: { en: 'React & Next.js — Modern Apps', fr: 'React & Next.js — Modern Apps' },
    description: { en: 'Building modern, performant and deployable web applications', fr: 'Building modern, performant and deployable web applications' },
    category: 'dev',
    price: { on_site: 100000, on_line: 80000 },
    priceOnsiteLabel: '100 000 FCFA',
    priceOnlineLabel: '80 000 FCFA',
    availableNow: false,
    featured: true,
    benefits: [
      { icon: 'Layers', title: { en: 'Architecture', fr: 'Architecture' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'AppWindow', title: { en: 'UI', fr: 'Interface' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'TrendingUp', title: { en: 'Performance', fr: 'Performance' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Users', title: { en: 'Community', fr: 'Communauté' }, items: Array(5).fill({ en: '', fr: '' }) },
    ],
  },

  {
    id: 'dev5',
    title: { en: 'Mobile Development — React Native', fr: 'Mobile Development — React Native' },
    description: { en: 'Build Android and iOS applications from a single codebase', fr: 'Build Android and iOS applications from a single codebase' },
    category: 'dev',
    price: { on_site: 110000, on_line: 70000 },
    priceOnsiteLabel: '110 000 FCFA',
    priceOnlineLabel: '70 000 FCFA',
    availableNow: false,
    benefits: [
      { icon: 'Smartphone', title: { en: 'Mobile', fr: 'Mobile' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'TabletSmartphone', title: { en: 'Cross-platform', fr: 'Cross-platform' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'TrendingUp', title: { en: 'Deployment', fr: 'Déploiement' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Users', title: { en: 'Support', fr: 'Support' }, items: Array(5).fill({ en: '', fr: '' }) },
    ],
  },

  // ── INTELLIGENCE ARTIFICIELLE ─────────────────────────────────────────────
  {
    id: 'ia1',
    title: { en: 'AI for Daily Work — ChatGPT, Gemini, Claude...', fr: 'AI for Daily Work — ChatGPT, Gemini, Claude...' },
    description: { en: 'Use ChatGPT, Claude, Gemini and Copilot to save time at work', fr: 'Use ChatGPT, Claude, Gemini and Copilot to save time at work' },
    category: 'ia',
    price: { on_site: 40000, on_line: 25000 },
    priceOnsiteLabel: '40 000 FCFA',
    priceOnlineLabel: '25 000 FCFA',
    availableNow: true,
    featured: true,
    benefits: [
      { icon: 'Bot', title: { en: 'Automation', fr: 'Automatisation' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Zap', title: { en: 'Speed', fr: 'Vitesse' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Rocket', title: { en: 'Launch', fr: 'Lancement' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Users', title: { en: 'Collaboration', fr: 'Collaboration' }, items: Array(5).fill({ en: '', fr: '' }) },
    ],
  },

  {
    id: 'ia2',
    title: { en: 'Prompt Engineering', fr: 'Prompt Engineering' },
    description: { en: 'Write effective prompts and automate tasks with AI', fr: 'Write effective prompts and automate tasks with AI' },
    category: 'ia',
    price: { on_site: 55000, on_line: 35000 },
    priceOnsiteLabel: '55 000 FCFA',
    priceOnlineLabel: '35 000 FCFA',
    availableNow: false,
    featured: true,
    benefits: [
      { icon: 'MessageSquareCode', title: { en: 'Prompts', fr: 'Prompts' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Wand2', title: { en: 'Automation', fr: 'Automatisation' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Trophy', title: { en: 'Excellence', fr: 'Excellence' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Users', title: { en: 'Community', fr: 'Communauté' }, items: Array(5).fill({ en: '', fr: '' }) },
    ],
  },

  {
    id: 'ia3',
    title: { en: 'Generative AI for Marketing', fr: 'Generative AI for Marketing' },
    description: { en: 'Generate text, visuals and videos for social media and advertising campaigns', fr: 'Generate text, visuals and videos for social media and advertising campaigns' },
    category: 'ia',
    price: { on_site: 50000, on_line: 32000 },
    priceOnsiteLabel: '50 000 FCFA',
    priceOnlineLabel: '32 000 FCFA',
    availableNow: false,
    benefits: [
      { icon: 'Palette', title: { en: 'Creative', fr: 'Créatif' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Megaphone', title: { en: 'Promotion', fr: 'Promotion' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'TrendingUp', title: { en: 'Growth', fr: 'Croissance' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Users', title: { en: 'Collaboration', fr: 'Collaboration' }, items: Array(5).fill({ en: '', fr: '' }) },
    ],
  },

  {
    id: 'ia4',
    title: { en: 'Develop with AI — Cursor & Claude API', fr: 'Develop with AI — Cursor & Claude API' },
    description: { en: 'Code faster with Cursor, integrate the Claude API into your projects', fr: 'Code faster with Cursor, integrate the Claude API into your projects' },
    category: 'ia',
    price: { on_site: 95000, on_line: 60000 },
    priceOnsiteLabel: '95 000 FCFA',
    priceOnlineLabel: '60 000 FCFA',
    availableNow: false,
    featured: true,
    benefits: [
      { icon: 'Terminal', title: { en: 'Developer Tools', fr: 'Outils développeur' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'FolderCode', title: { en: 'Integration', fr: 'Intégration' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Zap', title: { en: 'Automation', fr: 'Automatisation' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Users', title: { en: 'Community', fr: 'Communauté' }, items: Array(5).fill({ en: '', fr: '' }) },
    ],
  },

  {
    id: 'ia5',
    title: { en: 'AI & Data — Python + Machine Learning', fr: 'AI & Data — Python + Machine Learning' },
    description: { en: 'Scikit-learn, regression/classification models, concrete business use cases', fr: 'Scikit-learn, regression/classification models, concrete business use cases' },
    category: 'ia',
    price: { on_site: 130000, on_line: 85000 },
    priceOnsiteLabel: '130 000 FCFA',
    priceOnlineLabel: '85 000 FCFA',
    availableNow: false,
    benefits: [
      { icon: 'BrainCircuit', title: { en: 'ML', fr: 'ML' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Database', title: { en: 'Data', fr: 'Données' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'TrendingUp', title: { en: 'Growth', fr: 'Croissance' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Users', title: { en: 'Community', fr: 'Communauté' }, items: Array(5).fill({ en: '', fr: '' }) },
    ],
  },

  // ── DATA & SQL ────────────────────────────────────────────────────────────
  {
    id: 'dat1',
    title: { en: 'Power BI — Introduction & Reporting', fr: 'Power BI — Introduction & Reporting' },
    description: { en: 'Data connection, interactive visuals, sharing and publishing Power BI reports', fr: 'Data connection, interactive visuals, sharing and publishing Power BI reports' },
    category: 'data',
    price: { on_site: 60000, on_line: 38000 },
    priceOnsiteLabel: '60 000 FCFA',
    priceOnlineLabel: '38 000 FCFA',
    availableNow: false,
    benefits: [
      { icon: 'PieChart', title: { en: 'Reporting', fr: 'Reporting' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'LayoutDashboard', title: { en: 'Dashboards', fr: 'Tableaux de bord' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'BarChart2', title: { en: 'Visuals', fr: 'Visuels' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Users', title: { en: 'Sharing', fr: 'Partage' }, items: Array(5).fill({ en: '', fr: '' }) },
    ],
  },

  {
    id: 'dat2',
    title: { en: 'SQL for Management & Analysis', fr: 'SQL for Management & Analysis' },
    description: { en: 'SQL queries, database design, automated reports', fr: 'SQL queries, database design, automated reports' },
    category: 'data',
    price: { on_site: 55000, on_line: 35000 },
    priceOnsiteLabel: '55 000 FCFA',
    priceOnlineLabel: '35 000 FCFA',
    availableNow: false,
    benefits: [
      { icon: 'Database', title: { en: 'Databases', fr: 'Bases de données' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'FileSpreadsheet', title: { en: 'Reports', fr: 'Rapports' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'TrendingUp', title: { en: 'Optimization', fr: 'Optimisation' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Users', title: { en: 'Teams', fr: 'Équipes' }, items: Array(5).fill({ en: '', fr: '' }) },
    ],
  },

  {
    id: 'dat3',
    title: { en: 'Python — Introduction & Automation', fr: 'Python — Introduction & Automation' },
    description: { en: 'Task automation, utility scripts, introduction to data analysis', fr: 'Task automation, utility scripts, introduction to data analysis' },
    category: 'data',
    price: { on_site: 65000, on_line: 42000 },
    priceOnsiteLabel: '65 000 FCFA',
    priceOnlineLabel: '42 000 FCFA',
    availableNow: false,
    benefits: [
      { icon: 'Code2', title: { en: 'Scripting', fr: 'Scripting' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Bot', title: { en: 'Automation', fr: 'Automatisation' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'TrendingUp', title: { en: 'Growth', fr: 'Croissance' }, items: Array(5).fill({ en: '', fr: '' }) },
      { icon: 'Users', title: { en: 'Community', fr: 'Communauté' }, items: Array(5).fill({ en: '', fr: '' }) },
    ],
  },
]

export const CATEGORIES: { id: Category; label: string, quantity: number }[] = [
  { id: 'all', label: 'Toutes', quantity: formations.length },
  { id: 'office', label: 'office', quantity: formations.filter(f => f.category === 'office').length },
  { id: 'dev', label: 'Web & Mobile', quantity: formations.filter(f => f.category === 'dev').length },
  { id: 'ia', label: 'Intelligence Artificielle', quantity: formations.filter(f => f.category === 'ia').length },
  { id: 'data', label: 'Data & SQL', quantity: formations.filter(f => f.category === 'data').length },
]

export const CATEGORY_COLORS: Record<Exclude<Category, 'all'>, string> = {
  ia: '#60a5fa',
  dev: '#4ade80',
  data: '#facc15',
  office: '#fb64b6',
}

