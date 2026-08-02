'use client'

import { useLocale } from 'next-intl'
import RegistrationsTableLoader from '@/components/atoms/loaders/RegistrationsTableLoader'

type RegistrationsTableProps = {
  registrations: Registration[]
  isLoading: boolean
  error: string | null
  onEdit: (reg: Registration) => void
  onDeleteRequest: (id: string) => void
}

export default function RegistrationsTable({
  registrations,
  isLoading,
  error,
  onEdit,
  onDeleteRequest,
}: RegistrationsTableProps) {
  const locale = useLocale()

  if (isLoading) {
    return <RegistrationsTableLoader />
  }

  if (error) {
    return (
      <div className="border border-white/6 bg-surface rounded-px overflow-hidden shadow-md">
        <div className="p-12 text-center text-red-400 text-[12px]">
          Erreur lors du chargement des inscriptions: {error}
        </div>
      </div>
    )
  }

  if (registrations.length === 0) {
    return (
      <div className="border border-white/6 bg-surface rounded-px overflow-hidden shadow-md">
        <div className="p-12 text-center text-white/30 text-[12px]">
          Aucune inscription enregistrée.
        </div>
      </div>
    )
  }

  return (
    <div className="border border-white/6 bg-surface rounded-px overflow-hidden shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] border-collapse">
          <thead>
            <tr className="bg-surface2/50 border-b border-white/6 text-white/40">
              <th className="px-6 py-4 font-normal">Étudiant</th>
              <th className="px-6 py-4 font-normal">Formation</th>
              <th className="px-6 py-4 font-normal">Format</th>
              <th className="px-6 py-4 font-normal">Session</th>
              <th className="px-6 py-4 font-normal">Montant</th>
              <th className="px-6 py-4 font-normal">Message</th>
              <th className="px-6 py-4 font-normal">Statut</th>
              <th className="px-6 py-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/6 text-white/70">
            {registrations.map((reg) => (
              <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-3.5">
                  <div className="font-bold text-ink">{reg.student.name}</div>
                  <div className="text-[9px] text-white/30">{reg.student.email}</div>
                </td>
                <td className="px-6 py-3.5">
                  <div className="font-semibold text-white/80">{reg.formation.title[locale]}</div>
                  <div className="text-[9px] text-white/30 capitalize">{reg.formation.category}</div>
                </td>
                <td className="px-6 py-3.5 uppercase text-white/50">{reg.format[locale]}</td>
                <td className="px-6 py-3.5 capitalize text-white/50">{reg.session[locale] || '—'}</td>
                <td className="px-6 py-3.5 font-semibold text-ink">
                  {reg.price.toLocaleString()} FCFA
                </td>
                <td className="px-6 py-3.5 text-white/40 max-w-[150px] truncate" title={reg.message}>
                  {reg.message || '—'}
                </td>
                <td className="px-6 py-3.5">
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
                <td className="px-6 py-3.5 text-right space-x-2">
                  <button
                    onClick={() => onEdit(reg)}
                    className="px-2 py-1 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/70 rounded text-[10px] transition-colors"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => onDeleteRequest(reg.id)}
                    className="px-2 py-1 border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded text-[10px] transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}