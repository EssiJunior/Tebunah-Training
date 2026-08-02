'use client'

import { useState, useEffect } from 'react'
import Field from '@/components/atoms/Field'
import { timeslots } from '@/utils/form'

export type RegistrationFormValues = {
  selectedStudentId: string
  selectedFormationId: string
  format: string
  price: number
  session: string
  status: string
  message: string
}

type RegistrationFormModalProps = {
  mode: 'add' | 'edit'
  students: Student[]
  formations: Formation[]
  initialValues: RegistrationFormValues
  editingReg?: Registration
  onSubmit: (values: RegistrationFormValues) => void
  onClose: () => void
}

export default function RegistrationFormModal({
  mode,
  students,
  formations,
  initialValues,
  editingReg,
  onSubmit,
  onClose,
}: RegistrationFormModalProps) {
  const [values, setValues] = useState<RegistrationFormValues>(initialValues)

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  const handleChange = <K extends keyof RegistrationFormValues>(
    key: K,
    value: RegistrationFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  // In edit mode the formation is fixed to editingReg.formation; in add mode it's whatever's selected
  const activeFormationId = mode === 'edit' ? editingReg?.formation.id : values.selectedFormationId

  const handleFormationChange = (formationId: string) => {
    const formation = formations.find((f) => f.id === formationId)
    setValues((prev) => ({
      ...prev,
      selectedFormationId: formationId,
      price: formation ? (prev.format === 'onsite' ? formation.priceOnsite : formation.priceOnline) : prev.price,
    }))
  }

  const handleFormatChange = (newFormat: string) => {
    const formation = formations.find((f) => f.id === activeFormationId)
    setValues((prev) => ({
      ...prev,
      format: newFormat,
      price: formation ? (newFormat === 'onsite' ? formation.priceOnsite : formation.priceOnline) : prev.price,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(values)
  }

  const isEdit = mode === 'edit'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md border border-white/6 bg-surface p-6 rounded shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-chonburi text-[15px] font-bold text-accent mb-6">
          {isEdit ? "Modifier l'inscription" : 'Inscrire un étudiant'}
        </h2>

        {isEdit && editingReg && (
          <div className="mb-4 bg-white/5 p-3 border border-white/6 rounded text-[10px] space-y-1">
            <p className="text-white/40">
              Étudiant : <span className="text-white/80 font-bold">{editingReg.student.name}</span>
            </p>
            <p className="text-white/40">
              Formation : <span className="text-white/80 font-bold">{editingReg.formation.metaTitle}</span>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isEdit && (
            <>
              <Field
                label="Sélectionner l'étudiant"
                input={
                  <select
                    value={values.selectedStudentId}
                    onChange={(e) => handleChange('selectedStudentId', e.target.value)}
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
                    value={values.selectedFormationId}
                    onChange={(e) => handleFormationChange(e.target.value)}
                  >
                    {formations.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.metaTitle}
                      </option>
                    ))}
                  </select>
                }
              />
            </>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Format"
              input={
                <select value={values.format} onChange={(e) => handleFormatChange(e.target.value)}>
                  <option value="onsite">Présentiel (Onsite)</option>
                  <option value="online">En Ligne (Online)</option>
                </select>
              }
            />

            <Field
              label="Session (Présentiel uniquement)"
              input={
                <select
                  value={values.session}
                  disabled={values.format === 'online'}
                  onChange={(e) => handleChange('session', e.target.value)}
                >
                  {timeslots.map((slot: string) => (
                    <option key={slot} value={slot}>
                      {slot === 'journée' ? 'Journée (Matin)' : 'Soirée (Nuit)'}
                    </option>
                  ))}
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
                  value={values.price}
                  onChange={(e) => handleChange('price', parseInt(e.target.value) || 0)}
                />
              }
            />

            <Field
              label={isEdit ? 'Statut' : 'Statut initial'}
              input={
                <select value={values.status} onChange={(e) => handleChange('status', e.target.value)}>
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
                value={values.message}
                onChange={(e) => handleChange('message', e.target.value)}
                rows={2}
                placeholder={isEdit ? undefined : 'Notes optionnelles sur cette inscription...'}
              />
            }
          />

          <div className="flex gap-3 justify-end pt-4 border-t border-white/6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-white/10 text-white/60 hover:text-white/80 rounded text-[11px]"
            >
              Annuler
            </button>
            <button type="submit" className="px-4 py-2 bg-accent text-bg font-bold rounded text-[11px]">
              {isEdit ? 'Mettre à jour' : "Valider l'inscription"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}