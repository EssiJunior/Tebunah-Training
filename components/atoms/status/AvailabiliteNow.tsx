import { useTranslations } from 'next-intl'

const AvailabiliteNow = () => {
    const t = useTranslations('Formations')

    return (
        <div className="relative flex items-center gap-2">
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded-px tracking-widest border border-green-500/30 text-green-400">
                {t('statusAvailable')}
            </span>
        </div>)
}

export default AvailabiliteNow