'use client'

type StudentsToolbarProps = {
  searchTerm: string
  onSearchChange: (value: string) => void
  onAddClick: () => void
}

export default function StudentsToolbar({
  searchTerm,
  onSearchChange,
  onAddClick,
}: StudentsToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-surface p-4 border border-white/6 rounded-px shadow-sm">
      <div className="flex-1 max-w-md">
        <input
          type="text"
          placeholder="Rechercher par nom, email, téléphone..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-surface2 border border-white/6 px-3 py-2 rounded text-[11px] outline-none text-ink placeholder:text-white/20"
        />
      </div>

      <button
        onClick={onAddClick}
        className="px-4 py-2 bg-accent text-bg text-[11px] font-bold rounded-px uppercase tracking-wider hover:bg-accent/90 transition-colors"
      >
        ＋ Ajouter un Étudiant
      </button>
    </div>
  )
}