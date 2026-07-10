type Alert = {
  type: '' | 'error' | 'success' | 'warning' | 'info'
  tag?: string
  message: string
}

type Category = 'all' | 'ia' | 'dev' | 'data' | 'bureautique'

type BenefitCategory = {
  icon: string
  itemCount: number
}
type Formation = {
  id: string
  metaTitle: string
  metaDescription: string
  category: 'bureautique' | 'dev' | 'ia' | 'data'

  // Static (locale-independent)
  priceOnsite: number
  priceOnsiteLabel: string
  priceOnline: number
  priceOnlineLabel: string
  availableNow: boolean
  featured?: boolean

  // Translation key shapes (resolved via useTranslations('formations'))
  // t(`${id}.title`)
  // t(`${id}.description`)
  // t(`${id}.duration`)
  // t(`${id}.hoursTotal`)
  // t(`${id}.target`)
  // t(`${id}.prereq`)

  benefits: FormationBenefit[]
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
  academicLevel: string
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

interface Registration {
  id: string
  student: Student
  formation: Formation
  price: number
  format: 'onsite' | 'online'
  session: string
  message: string
  status?: string
  updated_at?: string
  created_at?: string
}


type RegistrationsAction =
  | { type: 'STORE'; payload: Registration[] }
  | { type: 'REMOVE' };