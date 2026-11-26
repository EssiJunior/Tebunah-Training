'use client'

import { useLocale } from 'next-intl'
import { formatPrice } from '@/utils/formatting'
import RecentRegistrationsTableLoader from '@/components/atoms/loaders/RecentRegistrationsTableLoader'

type RecentRegistrationsTableProps = {
  registrations: Registration[]
  isLoading: boolean
  error: string | null
}

export default function RecentRegistrationsTable({
  registrations,
  isLoading,
  error,
}: RecentRegistrationsTableProps) {
  const locale = useLocale()

  if (isLoading) {
    return <RecentRegistrationsTableLoader />
  }

  if (error) {
    return (
      <p className="text-[12px] text-red-400 text-center py-10">
        Erreur lors du chargement des inscriptions: {error}
      </p>
    )
  }

  if (registrations.length === 0) {
    return <p className="text-[12px] text-white/30 text-center py-10">Aucune inscription pour le moment.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[11px] border-collapse">
        <thead>
          <tr className="text-white/30 border-b border-white/6 font-mono">
            <th className="py-2.5 font-normal">Étudiant</th>
            <th className="py-2.5 font-normal">Formation</th>
            <th className="py-2.5 font-normal">Format</th>
            <th className="py-2.5 font-normal">Montant</th>
            <th className="py-2.5 font-normal text-right">Statut</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/6">
          {registrations.map((reg) => (
            <tr key={reg.id} className="hover:bg-white/5 transition-colors">
              <td className="py-3 font-semibold text-ink">{reg.student.name}</td>
              <td className="px-3 text-white/60 truncate max-w-37.5">{reg.formation?.title[locale]}</td>
              <td className="p-3 uppercase text-white/40">{reg.format[locale]}</td>
              <td className="p-3 text-white/70">{formatPrice(reg.price)}</td>
              <td className="py-3 text-right">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    reg.status === 'confirmed'
                      ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                      : reg.status === 'pending'
                      ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/10 border border-red-500/20 text-red-400'
                  }`}
                >
                  {reg.status === 'confirmed' ? 'Confirmée' : reg.status === 'pending' ? 'Attente' : 'Annulée'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}