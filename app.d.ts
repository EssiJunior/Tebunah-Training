type Category = 'all' | 'ia' | 'dev' | 'data' | 'bureautique'

type BenefitCategory = {
  title: string
  icon: string // lucide icon name
  items: string[]
}

type Formation = {
  id: string
  title: string
  category: 'bureautique' | 'dev' | 'ia' | 'data'
  priceOnsite: number
  priceOnsiteLabel: string
  priceOnline: number
  priceOnlineLabel: string
  duration: string
  hoursTotal: string
  target: string
  prereq: string
  description: string
  availableNow: boolean
  featured?: boolean
  benefits: BenefitCategory[]
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