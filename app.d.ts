type Category = 'all' | 'ia' | 'dev' | 'data' | 'bureautique'

type BenefitCategory = {
  title: string
  icon: string // lucide icon name
  items: string[]
}

type Formation = {
  id: string
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

interface Registration {
  name: string
  email: string
  phone: string
  address: string
  academic_level: string
  format: 'onsite' | 'online'
  price: number
  formation: string
  message: string
  session: string
  status?: string
  updated_at?: string
  created_at?: string
  token?: string
}