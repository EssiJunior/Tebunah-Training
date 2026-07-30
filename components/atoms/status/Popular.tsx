import { useTranslations } from 'next-intl'

const Popular = ({ className }: { className?: string }) => {
    const t = useTranslations('Formations')

    return (
        <span className={`text-[9px] bg-accent/10 text-accent px-2 py-0.5 rounded-px tracking-widest ${className}`}>
            {t('featured')}
        </span>
    )
}

export default Popular