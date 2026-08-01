'use client'

import { useLocale } from 'next-intl'
import StudentsTableLoader from '@/components/atoms/loaders/StudentsTableLoader'

type Student = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  academicLevel: Record<string, string>
}

type StudentsTableProps = {
  students: Student[]
  isLoading: boolean
  error: string | null
  onEdit: (student: Student) => void
  onDeleteRequest: (id: string) => void
}

export default function StudentsTable({
  students,
  isLoading,
  error,
  onEdit,
  onDeleteRequest,
}: StudentsTableProps) {
  const locale = useLocale()

  if (isLoading) {
    return (
      <StudentsTableLoader />
    )
  }

  if (error) {
    return (
      <div className="border border-white/6 bg-surface rounded-px overflow-hidden shadow-md">
        <div className="p-12 text-center text-red-400 text-[12px]">
          Erreur lors du chargement des étudiants: {error}
        </div>
      </div>
    )
  }

  if (students.length === 0) {
    return (
      <div className="border border-white/6 bg-surface rounded-px overflow-hidden shadow-md">
        <div className="p-12 text-center text-white/30 text-[12px]">
          Aucun étudiant ne correspond à votre recherche.
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
              <th className="px-6 py-4 font-normal">Nom complet</th>
              <th className="px-6 py-4 font-normal">Email</th>
              <th className="px-6 py-4 font-normal">Téléphone</th>
              <th className="px-6 py-4 font-normal">Adresse</th>
              <th className="px-6 py-4 font-normal">Niveau académique</th>
              <th className="px-6 py-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/6 text-white/70">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-3.5 font-bold text-ink">{student.name}</td>
                <td className="px-6 py-3.5 font-semibold text-white/60">{student.email}</td>
                <td className="px-6 py-3.5 text-white/60">{student.phone || '—'}</td>
                <td className="px-6 py-3.5 text-white/50">{student.address || '—'}</td>
                <td className="px-6 py-3.5 text-white/50">{student.academicLevel[locale]}</td>
                <td className="px-6 py-3.5 text-right space-x-2">
                  <button
                    onClick={() => onEdit(student)}
                    className="px-2 py-1 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/70 rounded text-[10px] transition-colors"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => onDeleteRequest(student.id)}
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