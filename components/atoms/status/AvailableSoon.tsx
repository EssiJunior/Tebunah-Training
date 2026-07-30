import { useTranslations } from 'next-intl'

const AvailableSoon = () => {
    const t = useTranslations('Formations')

    return (
        <span className="text-[9px] px-2 py-0.5 rounded-px tracking-widest border border-white/10 text-white/30">
            {t('statusSoon')}
        </span>)
}

export default AvailableSoon