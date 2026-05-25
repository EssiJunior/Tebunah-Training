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
    price: string
    priceRaw: number
    duration: string
    target: string
    prereq: string
    format: string
    description: string
    revenue: string
    featured?: boolean
}