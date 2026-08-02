'use client'

type FormationsToolbarProps = {
  searchTerm: string
  onSearchChange: (value: string) => void
  categoryFilter: string
  onCategoryFilterChange: (value: string) => void
  onAddClick: () => void
}

export default function FormationsToolbar({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  onAddClick,
}: FormationsToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-surface p-4 border border-white/6 rounded-px">
      <div className="flex flex-1 flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Rechercher une formation..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 max-w-md bg-surface2 border border-white/6 px-3 py-2 rounded text-[11px] outline-none text-ink placeholder:text-white/20"
        />

        <select
          value={categoryFilter}
          onChange={(e) => onCategoryFilterChange(e.target.value)}
          className="bg-surface2 border border-white/6 px-3 py-2 rounded text-[11px] outline-none text-ink"
        >
          <option value="all">Toutes les catégories</option>
          <option value="office">office</option>
          <option value="dev">Web & Mobile</option>
          <option value="ia">Intelligence Artificielle</option>
          <option value="data">Data & SQL</option>
        </select>
      </div>

      <button
        onClick={onAddClick}
        className="px-4 py-2 bg-accent text-bg text-[11px] font-bold rounded-px uppercase tracking-wider hover:bg-accent/90 transition-colors"
      >
        ＋ Ajouter une Formation
      </button>
    </div>
  )
}