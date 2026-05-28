import { essi } from '@/public/assets'


export const SKILLS = [
  'Next.js',
  'TypeScript',
  'React',
  'Claude API',
  'Cursor AI',
  'Python',
  'Power BI',
  'Talend',
  'MongoDB',
  'Tailwind CSS',
  'Node.js',
  'PostgreSQL',
]

export interface InstructorStat {
  v: string
  l: string
}

export const STATS: InstructorStat[] = [
  { v: '4+', l: 'ans dev Full-Stack' },
  { v: '2+', l: 'ans data analytics' },
  { v: '13+', l: 'formations au catalogue' },
  { v: 'DQP', l: 'qualification professionnelle' },
]

export const INSTRUCTORS = [
  {
    name: 'Essi Junior',
    image: essi,
    title: 'Développeur d\'applications · Formateur IT · Designeur graphique',
    description: '4 ans de développement full-stack, 2 ans d\'outils data (Talend, Power BI, Excel avancé) et en formations IT. Designeur Graphique Python Cameroun.',
    quote:"Je forme parce que je pratique - pas l\'inverse.",
    stats: [
      { value: '4+', label: 'ans de dev Full-Stack' },
      { value: '2+', label: 'ans de formations IT' },
      { value: '10+', label: 'Formations dispensées' }
    ],
    skills: ['React.js','React Native', 'Next.js', 'Python', 'FastAPI', 'Node.js', 'Tailwind CSS', 'MongoDB', 'MySQL', 'PostgreSQL', 'Power BI', 'Talend', 'Office', 'Excel avancé', 'Google workspace', 'Claude API', 'Prompt Engineering', 'AI', 'Canva', '...'],
    philosophy: "L'Informatique est une science majeure dans le monde actuel. Ma mission est de rendre les connaissances pratiques du domaine accessibles à tous ."
  }
]