'use client'

import FormationCard from '@/components/atoms/cards/dashboard/Formation'
import FormationsGridLoader from '@/components/atoms/loaders/FormationsGridLoader'

type FormationsGridProps = {
  formations: Formation[]
  isLoading: boolean
  error: string | null
  onEdit: (formation: Formation) => void
  onDeleteRequest: (id: string) => void
}

export default function FormationsGrid({
  formations,
  isLoading,
  error,
  onEdit,
  onDeleteRequest,
}: FormationsGridProps) {
  if (isLoading) {
    return <FormationsGridLoader />
  }

  if (error) {
    return (
      <div className="border border-white/6 bg-surface p-12 text-center text-red-400 text-[12px] rounded-px">
        Erreur lors du chargement des formations: {error}
      </div>
    )
  }

  if (formations.length === 0) {
    return (
      <div className="border border-white/6 bg-surface p-12 text-center text-white/30 text-[12px] rounded-px">
        Aucune formation ne correspond à votre recherche.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {formations.map((formation) => (
        <FormationCard
          key={formation.id}
          formation={formation}
          onEdit={onEdit}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </div>
  )
}