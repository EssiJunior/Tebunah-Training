import ToggleLanguages from '@/components/atoms/ToggleLanguages'
import { usePathname } from 'next/navigation'
import React from 'react'

const TopNav = () => {
    const pathname = usePathname()

    return (
        <header className="h-14 border-b border-white/6 bg-surface/50 backdrop-blur-md flex items-center justify-between px-8 z-10 shrink-0">
            <div>
                <h6 className="font-chonburi text-[14px] font-bold text-accent">
                    {pathname?.includes('/formations')
                        ? 'Formations'
                        : pathname?.includes('/students')
                            ? 'Étudiants'
                            : pathname?.includes('/registrations')
                                ? 'Inscriptions'
                                : 'Dashboard'}
                </h6>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
                <span className="text-white/30">Yaoundé, Cameroun</span>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <ToggleLanguages />
            </div>
        </header>
    )
}

export default TopNav