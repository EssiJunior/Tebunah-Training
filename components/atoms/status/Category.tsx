import { CATEGORY_COLORS } from '@/data/formations'
import { useTranslations } from 'next-intl'

const Category = ({ category }: { category: Exclude<Category, 'all'> }) => {
    const t = useTranslations('Formations')

    return (
        <span
            className="text-[10px] tracking-[0.12em] uppercase"
            style={{ color: CATEGORY_COLORS[category] }}
        >
            {t(`categories.${category}`)}
        </span>)
}

export default Category