'use client'

import { useEffect, useState } from 'react'
import { useAdmin } from '@/context/AdminContext'
import Field from '@/components/atoms/Field'
import { timeslots } from '@/utils/form'
import { getRegistrations } from '@/requests/registrations'
import { useAtomValue, useSetAtom } from 'jotai'
import { registrationsActionsAtom, registrationsAtom } from '@/store/data/registrationAtoms'

export default function AdminRegistrationsPage() {
  const {
    students,
    formations,
    addRegistration,
    updateRegistration,
    deleteRegistration
  } = useAdmin()

  const dispatch = useSetAtom(registrationsActionsAtom);
  const registrations = useAtomValue(registrationsAtom);
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingReg, setEditingReg] = useState<any | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Form states (Add Registration)
  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [selectedFormationId, setSelectedFormationId] = useState('')
  const [format, setFormat] = useState('onsite')
  const [price, setPrice] = useState(0)
  const [session, setSession] = useState(timeslots[0])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('pending')

  // Form states (Edit Registration)
  const [editFormat, setEditFormat] = useState('onsite')
  const [editPrice, setEditPrice] = useState(0)
  const [editSession, setEditSession] = useState(timeslots[0])
  const [editStatus, setEditStatus] = useState('pending')
  const [editMessage, setEditMessage] = useState('')

  // Filter registrations
  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      reg.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.formation.title.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Handlers
  const handleOpenAdd = () => {
    if (students.length === 0 || formations.length === 0) {
      alert('Veuillez d\'abord ajouter des étudiants et des formations pour créer une inscription.')
      return
    }

    const firstStudent = students[0]
    const firstFormation = formations[0]

    setSelectedStudentId(firstStudent.id)
    setSelectedFormationId(firstFormation.id)
    setFormat('onsite')
    setPrice(firstFormation.priceOnsite)
    setSession(timeslots[0])
    setMessage('')
    setStatus('pending')
    setIsAddModalOpen(true)
  }

  const handleFormationChange = (formId: string, currentFormat: string) => {
    setSelectedFormationId(formId)
    const formation = formations.find(f => f.id === formId)
    if (formation) {
      setPrice(currentFormat === 'onsite' ? formation.priceOnsite : formation.priceOnline)
    }
  }

  const handleFormatChange = (newFormat: string) => {
    setFormat(newFormat)
    const formation = formations.find(f => f.id === selectedFormationId)
    if (formation) {
      setPrice(newFormat === 'onsite' ? formation.priceOnsite : formation.priceOnline)
    }
  }

  const handleOpenEdit = (reg: any) => {
    setEditingReg(reg)
    setEditFormat(reg.format)
    setEditPrice(reg.price)
    setEditSession(reg.session)
    setEditStatus(reg.status)
    setEditMessage(reg.message)
  }

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault()

    const student = students.find(s => s.id === selectedStudentId)
    const formation = formations.find(f => f.id === selectedFormationId)

    if (!student || !formation) return

    addRegistration({
      student,
      formations: formation,
      price,
      format,
      message,
      session,
      status
    })

    setIsAddModalOpen(false)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingReg) return

    updateRegistration(editingReg.id, {
      format: editFormat,
      price: editPrice,
      session: editSession,
      status: editStatus,
      message: editMessage
    })

    setEditingReg(null)
  }

  const handleDelete = () => {
    if (deletingId) {
      deleteRegistration(deletingId)
      setDeletingId(null)
    }
  }

  useEffect(() => {
    getRegistrations(dispatch, setIsLoading, setError)

  }, [dispatch])

  return (
    <div className="space-y-6 font-mono">

      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-surface p-4 border border-white/6 rounded-px shadow-sm">

        {/* Search & Filter */}
        <div className="flex flex-1 flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Rechercher par étudiant, formation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 max-w-md bg-surface2 border border-white/6 px-3 py-2 rounded text-[11px] outline-none text-ink placeholder:text-white/20"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface2 border border-white/6 px-3 py-2 rounded text-[11px] outline-none text-ink"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente (Pending)</option>
            <option value="confirmed">Confirmée (Confirmed)</option>
            <option value="cancelled">Annulée (Cancelled)</option>
          </select>
        </div>

        {/* Add Registration Button */}
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-accent text-bg text-[11px] font-bold rounded-px uppercase tracking-wider hover:bg-accent/90 transition-colors"
        >
          ＋ Créer une Inscription
        </button>
      </div>

      {/* Registrations List Table */}
      <div className="border border-white/6 bg-surface rounded-px overflow-hidden shadow-md">
        {filteredRegistrations.length === 0 ? (
          <div className="p-12 text-center text-white/30 text-[12px]">
            Aucune inscription enregistrée.
          </div>
        ) : (
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
                {filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="font-bold text-ink">{reg.student.name}</div>
                      <div className="text-[9px] text-white/30">{reg.student.email}</div>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="font-semibold text-white/80">{reg.formations.metaTitle}</div>
                      <div className="text-[9px] text-white/30 capitalize">{reg.formations.category}</div>
                    </td>
                    <td className="px-6 py-3.5 uppercase text-white/50">{reg.format}</td>
                    <td className="px-6 py-3.5 capitalize text-white/50">{reg.session || '—'}</td>
                    <td className="px-6 py-3.5 font-semibold text-ink">
                      {reg.price.toLocaleString()} FCFA
                    </td>
                    <td className="px-6 py-3.5 text-white/40 max-w-[150px] truncate" title={reg.message}>
                      {reg.message || '—'}
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${reg.status === 'confirmed'
                          ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                          : reg.status === 'pending'
                            ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/10 border border-red-500/20 text-red-400'
                          }`}
                      >
                        {reg.status === 'confirmed'
                          ? 'Confirmée'
                          : reg.status === 'pending'
                            ? 'Attente'
                            : 'Annulée'}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(reg)}
                        className="px-2 py-1 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/70 rounded text-[10px] transition-colors"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => setDeletingId(reg.id)}
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

      {/* Add Registration Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md border border-white/6 bg-surface p-6 rounded shadow-2xl">
            <h2 className="font-chonburi text-[15px] font-bold text-accent mb-6">Inscrire un étudiant</h2>

            <form onSubmit={handleSaveAdd} className="space-y-4">
              <Field
                label="Sélectionner l'étudiant"
                input={
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.email})
                      </option>
                    ))}
                  </select>
                }
              />

              <Field
                label="Sélectionner la formation"
                input={
                  <select
                    value={selectedFormationId}
                    onChange={(e) => handleFormationChange(e.target.value, format)}
                  >
                    {formations.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.metaTitle}
                      </option>
                    ))}
                  </select>
                }
              />

              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Format"
                  input={
                    <select
                      value={format}
                      onChange={(e) => handleFormatChange(e.target.value)}
                    >
                      <option value="onsite">Présentiel (Onsite)</option>
                      <option value="online">En Ligne (Online)</option>
                    </select>
                  }
                />

                <Field
                  label="Session (Présentiel uniquement)"
                  input={
                    <select
                      value={session}
                      disabled={format === 'online'}
                      onChange={(e) => setSession(e.target.value)}
                    >
                      <option value="journée">Journée (Matin)</option>
                      <option value="soirée">Soirée (Nuit)</option>
                    </select>
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Prix facturé (FCFA)"
                  input={
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                    />
                  }
                />

                <Field
                  label="Statut initial"
                  input={
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="pending">En attente (Pending)</option>
                      <option value="confirmed">Confirmée (Confirmed)</option>
                      <option value="cancelled">Annulée (Cancelled)</option>
                    </select>
                  }
                />
              </div>

              <Field
                label="Message / Notes"
                input={
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={2}
                    placeholder="Notes optionnelles sur cette inscription..."
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
                  Valider l'inscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Registration Modal */}
      {editingReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md border border-white/6 bg-surface p-6 rounded shadow-2xl">
            <h2 className="font-chonburi text-[15px] font-bold text-accent mb-6">Modifier l'inscription</h2>

            <div className="mb-4 bg-white/5 p-3 border border-white/6 rounded text-[10px] space-y-1">
              <p className="text-white/40">
                Étudiant : <span className="text-white/80 font-bold">{editingReg.student.name}</span>
              </p>
              <p className="text-white/40">
                Formation : <span className="text-white/80 font-bold">{editingReg.formations.metaTitle}</span>
              </p>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Format"
                  input={
                    <select
                      value={editFormat}
                      onChange={(e) => {
                        setEditFormat(e.target.value)
                        // Adjust default price if clicked format shifts
                        const formation = formations.find(f => f.id === editingReg.formations.id)
                        if (formation) {
                          setEditPrice(e.target.value === 'onsite' ? formation.priceOnsite : formation.priceOnline)
                        }
                      }}
                    >
                      <option value="onsite">Présentiel</option>
                      <option value="online">En Ligne</option>
                    </select>
                  }
                />

                <Field
                  label="Session"
                  input={
                    <select
                      value={editSession}
                      disabled={editFormat === 'online'}
                      onChange={(e) => setEditSession(e.target.value)}
                    >
                      <option value="journée">Journée (Matin)</option>
                      <option value="soirée">Soirée (Nuit)</option>
                    </select>
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Prix facturé (FCFA)"
                  input={
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(parseInt(e.target.value) || 0)}
                    />
                  }
                />

                <Field
                  label="Statut"
                  input={
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                    >
                      <option value="pending">En attente (Pending)</option>
                      <option value="confirmed">Confirmée (Confirmed)</option>
                      <option value="cancelled">Annulée (Cancelled)</option>
                    </select>
                  }
                />
              </div>

              <Field
                label="Message / Notes"
                input={
                  <textarea
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    rows={2}
                  />
                }
              />

              <div className="flex gap-3 justify-end pt-4 border-t border-white/6">
                <button
                  type="button"
                  onClick={() => setEditingReg(null)}
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
            <h2 className="font-chonburi text-[14px] font-bold text-red-400 mb-3">Supprimer l'inscription ?</h2>
            <p className="text-[11px] text-white/40 leading-relaxed mb-6">
              Êtes-vous sûr de vouloir supprimer cette inscription de votre session locale ?
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
