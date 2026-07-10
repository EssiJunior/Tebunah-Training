'use client'

import { useState } from 'react'
import { useAdmin } from '@/context/AdminContext'
import Field from '@/components/atoms/Field'
import { academicLevels } from '@/utils/form'

export default function AdminStudentsPage() {
  const { students, addStudent, updateStudent, deleteStudent } = useAdmin()
  const [searchTerm, setSearchTerm] = useState('')

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<any | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Form states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setaddress] = useState('') // Matches schema spelling: 'address'
  const [academicLevel, setAcademicLevel] = useState(academicLevels[0])

  // Filter students
  const filteredStudents = students.filter((s) => {
    const term = searchTerm.toLowerCase()
    return (
      s.name.toLowerCase().includes(term) ||
      s.email.toLowerCase().includes(term) ||
      s.phone.toLowerCase().includes(term) ||
      s.address.toLowerCase().includes(term)
    )
  })

  // Handlers
  const handleOpenAdd = () => {
    setName('')
    setEmail('')
    setPhone('')
    setaddress('')
    setAcademicLevel(academicLevels[0])
    setIsAddModalOpen(true)
  }

  const handleOpenEdit = (s: any) => {
    setEditingStudent(s)
    setName(s.name)
    setEmail(s.email)
    setPhone(s.phone)
    setaddress(s.address)
    setAcademicLevel(s.academicLevel)
  }

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    addStudent({
      name,
      email,
      phone,
      address,
      academicLevel
    })
    setIsAddModalOpen(false)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingStudent || !name.trim()) return

    updateStudent(editingStudent.id, {
      name,
      email,
      phone,
      address,
      academicLevel
    })
    setEditingStudent(null)
  }

  const handleDelete = () => {
    if (deletingId) {
      deleteStudent(deletingId)
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6 font-mono">
      
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-surface p-4 border border-white/6 rounded-px shadow-sm">
        
        {/* Search */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Rechercher par nom, email, téléphone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface2 border border-white/6 px-3 py-2 rounded text-[11px] outline-none text-ink placeholder:text-white/20"
          />
        </div>

        {/* Add Student Button */}
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-accent text-bg text-[11px] font-bold rounded-px uppercase tracking-wider hover:bg-accent/90 transition-colors"
        >
          ＋ Ajouter un Étudiant
        </button>
      </div>

      {/* Students Table Card */}
      <div className="border border-white/6 bg-surface rounded-px overflow-hidden shadow-md">
        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center text-white/30 text-[12px]">
            Aucun étudiant ne correspond à votre recherche.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="bg-surface2/50 border-b border-white/6 text-white/40">
                  <th className="px-6 py-4 font-normal">Nom complet</th>
                  <th className="px-6 py-4 font-normal">Email</th>
                  <th className="px-6 py-4 font-normal">Téléphone</th>
                  <th className="px-6 py-4 font-normal">addresse</th>
                  <th className="px-6 py-4 font-normal">Niveau académique</th>
                  <th className="px-6 py-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6 text-white/70">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-3.5 font-bold text-ink">{student.name}</td>
                    <td className="px-6 py-3.5 font-semibold text-white/60">{student.email}</td>
                    <td className="px-6 py-3.5 text-white/60">{student.phone || '—'}</td>
                    <td className="px-6 py-3.5 text-white/50">{student.address || '—'}</td>
                    <td className="px-6 py-3.5 text-white/50">{student.academicLevel}</td>
                    <td className="px-6 py-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(student)}
                        className="px-2 py-1 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/70 rounded text-[10px] transition-colors"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => setDeletingId(student.id)}
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
        )}
      </div>

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md border border-white/6 bg-surface p-6 rounded shadow-2xl">
            <h2 className="font-chonburi text-[15px] font-bold text-accent mb-6">Ajouter un étudiant</h2>
            
            <form onSubmit={handleSaveAdd} className="space-y-4">
              <Field
                label="Nom Complet"
                input={
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Essi Junior"
                  />
                }
              />

              <Field
                label="addresse Email"
                input={
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: student@tebunah.com"
                  />
                }
              />

              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Téléphone"
                  input={
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex: 690743737"
                    />
                  }
                />
                
                <Field
                  label="Niveau Académique"
                  input={
                    <select
                      value={academicLevel}
                      onChange={(e) => setAcademicLevel(e.target.value)}
                    >
                      {academicLevels.map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl}
                        </option>
                      ))}
                    </select>
                  }
                />
              </div>

              <Field
                label="addresse Physique"
                input={
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    placeholder="Ex: Bastos, Yaoundé"
                  />
                }
              />

              <div className="flex gap-3 justify-end pt-4 border-t border-white/6">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-white/10 text-white/60 hover:text-white/80 rounded text-[11px]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-accent text-bg font-bold rounded text-[11px]"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md border border-white/6 bg-surface p-6 rounded shadow-2xl">
            <h2 className="font-chonburi text-[15px] font-bold text-accent mb-6">Modifier l'étudiant</h2>
            
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <Field
                label="Nom Complet"
                input={
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                }
              />

              <Field
                label="addresse Email"
                input={
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                }
              />

              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Téléphone"
                  input={
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  }
                />
                
                <Field
                  label="Niveau Académique"
                  input={
                    <select
                      value={academicLevel}
                      onChange={(e) => setAcademicLevel(e.target.value)}
                    >
                      {academicLevels.map((lvl) => (
                        <option key={lvl} value={lvl}>
                          {lvl}
                        </option>
                      ))}
                    </select>
                  }
                />
              </div>

              <Field
                label="addresse Physique"
                input={
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                  />
                }
              />

              <div className="flex gap-3 justify-end pt-4 border-t border-white/6">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 border border-white/10 text-white/60 hover:text-white/80 rounded text-[11px]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-accent text-bg font-bold rounded text-[11px]"
                >
                  Mettre à jour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm border border-white/6 bg-surface p-6 rounded shadow-2xl">
            <h2 className="font-chonburi text-[14px] font-bold text-red-400 mb-3">Supprimer l'étudiant ?</h2>
            <p className="text-[11px] text-white/40 leading-relaxed mb-6">
              Êtes-vous sûr de vouloir supprimer cet étudiant ? Cela supprimera également toutes ses inscriptions associées du cache local.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeletingId(null)}
                className="px-3 py-1.5 border border-white/10 text-white/60 hover:text-white/80 rounded text-[10px]"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded text-[10px]"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
