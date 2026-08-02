'use client'

type DeleteFormationModalProps = {
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteFormationModal({ onConfirm, onCancel }: DeleteFormationModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm border border-white/6 bg-surface p-6 rounded shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-chonburi text-[14px] font-bold text-red-400 mb-3">Supprimer la formation ?</h2>
        <p className="text-[11px] text-white/40 leading-relaxed mb-6">
          Êtes-vous sûr de vouloir supprimer cette formation ? Cette action est irréversible et
          supprimera les données du cache local.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 border border-white/10 text-white/60 hover:text-white/80 rounded text-[10px]"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded text-[10px]"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}