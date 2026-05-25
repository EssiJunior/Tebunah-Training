type Category = 'all' | 'ia' | 'dev' | 'data' | 'bureautique'

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