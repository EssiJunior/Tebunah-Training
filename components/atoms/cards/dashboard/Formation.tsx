'use client'

import AvailabiliteNow from '@/components/atoms/status/AvailabiliteNow'
import AvailableSoon from '@/components/atoms/status/AvailableSoon'
import Popular from '@/components/atoms/status/Popular'
import Category from '@/components/atoms/status/Category'
import Tooltip from '@/components/atoms/Animated/Tooltip'
import { Pencil, Trash } from 'lucide-react'
import { useLocale } from 'next-intl'
import { formatPrice } from '@/utils/formatting'

type FormationCardProps = {
  formation: Formation
  onEdit: (formation: Formation) => void
  onDeleteRequest: (id: string) => void
}

export default function FormationCard({ formation, onEdit, onDeleteRequest }: FormationCardProps) {
  const locale = useLocale()

  return (
    <div className="border border-white/6 bg-surface p-6 rounded-px flex flex-col justify-between hover:border-accent/20 transition-all duration-200">
      <div>
        <div className="flex items-center justify-between mb-1 text-[10px]">
          <Category category={formation.category} />
          {formation.availableNow ? <AvailabiliteNow /> : <AvailableSoon />}
        </div>
        {formation.featured ? <Popular className="block w-fit mb-3" /> : <div className="mb-3" />}

        <h3 className="font-chonburi text-[14px] text-ink font-bold leading-snug mb-2">
          {formation.title[locale]}
        </h3>
        <p className="text-[11px] text-white/40 leading-relaxed mb-4 line-clamp-3">
          {formation.description[locale]}
        </p>
      </div>

      <div className="pt-4 border-t border-white/6 space-y-3">
        <div className="grid grid-cols-2 gap-4 text-[11px]">
          <div>
            <span className="text-white/30 text-[10px] block">Présentiel</span>
            <span className="text-accent font-semibold">{formatPrice(formation.price.on_site)}</span>
          </div>
          <div>
            <span className="text-white/30 text-[10px] block">En Ligne</span>
            <span className="text-accent font-semibold">{formatPrice(formation.price.on_line)}</span>
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-2">
          <Tooltip label="Modifier">
            <button
              onClick={() => onEdit(formation)}
              className="px-2.5 py-1.5 border border-cyan-400/10! hover:border-cyan-400/20! hover:bg-cyan-400/5! text-cyan-400/70! rounded text-[10px] transition-colors"
            >
              <Pencil size={18} />
            </button>
          </Tooltip>

          <Tooltip label="Supprimer">
            <button
              onClick={() => onDeleteRequest(formation.id)}
              className="px-2.5 py-1.5 border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded text-[10px] transition-colors"
            >
              <Trash size={18} />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}