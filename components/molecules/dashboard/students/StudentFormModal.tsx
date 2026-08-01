'use client'

import { useState, useEffect } from 'react'
import Field from '@/components/atoms/Field'
import { academicLevels } from '@/utils/form'

export type StudentFormValues = {
  name: string
  email: string
  phone: string
  address: string
  academicLevel: string
}

type StudentFormModalProps = {
  mode: 'add' | 'edit'
  initialValues?: StudentFormValues
  onSubmit: (values: StudentFormValues) => void
  onClose: () => void
}

const emptyValues: StudentFormValues = {
  name: '',
  email: '',
  phone: '',
  address: '',
  academicLevel: academicLevels[0],
}

export default function StudentFormModal({
  mode,
  initialValues,
  onSubmit,
  onClose,
}: StudentFormModalProps) {
  const [values, setValues] = useState<StudentFormValues>(initialValues ?? emptyValues)

  // Keep form in sync if a different student is opened for editing
  useEffect(() => {
    setValues(initialValues ?? emptyValues)
  }, [initialValues])

  const handleChange = <K extends keyof StudentFormValues>(key: K, value: StudentFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!values.name.trim() || !values.email.trim()) return
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
          {isEdit ? "Modifier l'étudiant" : 'Ajouter un étudiant'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field
            label="Nom Complet"
            input={
              <input
                type="text"
                required
                value={values.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder={isEdit ? undefined : 'Ex: Essi Junior'}
              />
            }
          />

          <Field
            label="Adresse Email"
            input={
              <input
                type="email"
                required
                value={values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder={isEdit ? undefined : 'Ex: student@tebunah.com'}
              />
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Téléphone"
              input={
                <input
                  type="tel"
                  value={values.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder={isEdit ? undefined : 'Ex: 690743737'}
                />
              }
            />

            <Field
              label="Niveau Académique"
              input={
                <select
                  value={values.academicLevel}
                  onChange={(e) => handleChange('academicLevel', e.target.value)}
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
            label="Adresse Physique"
            input={
              <input
                type="text"
                value={values.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder={isEdit ? undefined : 'Ex: Bastos, Yaoundé'}
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
            <button
              type="submit"
              className="px-4 py-2 bg-accent text-bg font-bold rounded text-[11px]"
            >
              {isEdit ? 'Mettre à jour' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}