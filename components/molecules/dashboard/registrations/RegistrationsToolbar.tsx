'use client'

type RegistrationsToolbarProps = {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  onAddClick: () => void
}

export default function RegistrationsToolbar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onAddClick,
}: RegistrationsToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-surface p-4 border border-white/6 rounded-px shadow-sm">
      <div className="flex flex-1 flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Rechercher par étudiant, formation..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 max-w-md bg-surface2 border border-white/6 px-3 py-2 rounded text-[11px] outline-none text-ink placeholder:text-white/20"
        />

        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="bg-surface2 border border-white/6 px-3 py-2 rounded text-[11px] outline-none text-ink"
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente (Pending)</option>
          <option value="confirmed">Confirmée (Confirmed)</option>
          <option value="cancelled">Annulée (Cancelled)</option>
        </select>
      </div>

      <button
        onClick={onAddClick}
        className="px-4 py-2 bg-accent text-bg text-[11px] font-bold rounded-px uppercase tracking-wider hover:bg-accent/90 transition-colors"
      >
        ＋ Créer une Inscription
      </button>
    </div>
  )
}