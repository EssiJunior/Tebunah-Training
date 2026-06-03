type Category = 'all' | 'ia' | 'dev' | 'data' | 'bureautique'

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

interface Formation {
    id: string
    title: string
    category: Exclude<Category, 'all'>
    priceOnsite: number
    priceOnsiteLabel: string
    priceOnline: number
    priceOnlineLabel: string
    duration: string        // display label
    hoursTotal: string      // e.g. "80h"
    target: string
    prereq: string
    description: string
    availableNow: boolean   // true = open for enrollment, false = coming soon
    priority: boolean       // first-session focus formations
    featured?: boolean
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