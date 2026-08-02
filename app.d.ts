type Alert = {
  type: '' | 'error' | 'success' | 'warning' | 'info'
  tag?: string
  message: string
}

type Translation = {
  [key: string]: string
}

type Category = 'all' | 'ia' | 'dev' | 'data' | 'office'

type BenefitCategory = {
  icon: string
  itemCount: number
}
type Formation = {
  id: string
  title: Translation
  description: Translation
  duration?: {
    months: number
    days_per_week: number
    hours: number
  }
  target?: { en: string; fr: string }[]
  prerequisites?: { en: string; fr: string }[]
  category: Exclude<Category, 'all'>
  price: {
    on_site: number
    on_line: number
  }
  availableNow: boolean
  featured?: boolean
  benefits: Array<{
    title: { en: string; fr: string }
    items: { en: string; fr: string }[]
    icon?: string
  }>
  updated_at?: string
  created_at?: string
}

type LogoProps = {
  size?: LogoSize;
  className?: string;
  hideText?: boolean;
  id?: string;
  handleClick?: (e: React.MouseEvent) => void;
}

type LogoSize = 'small' | 'mid' | 'large'

interface FAQ {
  question: string
  answer: string
}
type Student = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  academicLevel: Translation
  academic_level?: Translation
  token?: string
  updated_at?: string
  created_at?: string
}

type User = {
  name: string,
  email: string,
  phone: string,
  role: string
}

type AuthUser = {
  token: string;
  user: User;
}

type AuthUserAction =
  | { type: 'STORE'; payload: AuthUser }
  | { type: 'REMOVE' };
  
type RegistrationsAction =
  | { type: 'STORE'; payload: Registration[] }
  | { type: 'REMOVE' };

type StudentsAction =
  | { type: 'STORE'; payload: Student[] }
  | { type: 'REMOVE' };

type FormationsAction =
  | { type: 'STORE'; payload: Formation[] }
  | { type: 'REMOVE' };

type RegistrationStatus = 'pending' | 'confirmed' | 'cancelled'

interface Registration {
  id: string
  _id?: string
  student: Student
  formation: Formation
  price: number | Price
  format:  Translation
  session: Translation
  message: string
  status?: RegistrationStatus
  updated_at?: string
  created_at?: string
}


type RegistrationsAction =
  | { type: 'STORE'; payload: Registration[] }
  | { type: 'REMOVE' };


interface NavLink {
  label: string
  href: string
  sub?: (NavLink & { quantity?: number })[] | null
  tag?: string
}