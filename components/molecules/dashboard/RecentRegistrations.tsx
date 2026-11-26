'use client'

import { useLocale } from 'next-intl'
import { MoveRight } from 'lucide-react'
import { useState, useEffect } from 'react'

import { getRegistrations } from '@/requests/registrations'

import { useAtomValue, useSetAtom } from 'jotai'
import { registrationsActionsAtom, registrationsAtom } from '@/store/data/registrationAtoms'
import { authUserAtom } from '@/store/auth/userAtoms'

import RecentRegistrationsTable from '@/components/molecules/dashboard/registrations/RecentRegistrationsTable'

const RecentRegistrations = () => {
    const locale = useLocale()
    const dispatchRegistrations = useSetAtom(registrationsActionsAtom)
    const registrations = useAtomValue(registrationsAtom)
    const [isLoadingRegistrations, setIsLoadingRegistrations] = useState(false)
    const [errorRegistrations, setErrorRegistrations] = useState<string | null>(null)

    const user = useAtomValue(authUserAtom)

    // Recent registrations list (last 5)
    const recentRegistrations = [...registrations]
        .sort((a, b) => {
        const aDate = a.created_at ? new Date(a.created_at).getTime() : 0
        const bDate = b.created_at ? new Date(b.created_at).getTime() : 0
        return bDate - aDate
        })
        .slice(0, 5)

    useEffect(() => {
        getRegistrations(dispatchRegistrations, user?.token, setIsLoadingRegistrations, setErrorRegistrations)
    }, [dispatchRegistrations, user?.token])

    return (
        <div className="lg:col-span-2 border border-white/6 bg-surface p-6 rounded-px flex flex-col justify-between">
        <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/6">
            <h6 className="text-[14px] text-ink font-bold">Dernières Inscriptions</h6>
            <a
                href={`/${locale}/admin/registrations`}
                className="text-[11px] text-accent hover:underline flex items-center gap-1"
            >
                Voir toutes les inscriptions <MoveRight size={20} />
            </a>
            </div>

            <RecentRegistrationsTable
            registrations={recentRegistrations}
            isLoading={isLoadingRegistrations}
            error={errorRegistrations}
            />
        </div>
        </div>
    )
}

export default RecentRegistrations