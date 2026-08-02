'use client'

import { useState, useEffect } from 'react'
import Field from '@/components/atoms/Field'

export type FormationFormValues = {
  titleEn: string
  titleFr: string
  descriptionEn: string
  descriptionFr: string
  category: 'office' | 'dev' | 'ia' | 'data'
  priceOnsite: number
  priceOnline: number
  availableNow: boolean
  featured: boolean
}

type FormationFormModalProps = {
  mode: 'add' | 'edit'
  initialValues: FormationFormValues
  onSubmit: (values: FormationFormValues) => void
  onClose: () => void
}

export default function FormationFormModal({
  mode,
  initialValues,
  onSubmit,
  onClose,
}: FormationFormModalProps) {
  const [values, setValues] = useState<FormationFormValues>(initialValues)

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  const handleChange = <K extends keyof FormationFormValues>(key: K, value: FormationFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!values.titleEn.trim() && !values.titleFr.trim()) return
    onSubmit(values)
  }

  const isEdit = mode === 'edit'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg border border-white/6 bg-surface p-6 rounded shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-chonburi text-[15px] font-bold text-accent mb-6">
          {isEdit ? 'Modifier la formation' : 'Ajouter une formation'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Titre (Anglais)"
              input={
                <input
                  type="text"
                  value={values.titleEn}
                  onChange={(e) => handleChange('titleEn', e.target.value)}
                  placeholder={isEdit ? undefined : 'Ex: React & Next.js — Modern Apps'}
                />
              }
            />
            <Field
              label="Titre (Français)"
              input={
                <input
                  type="text"
                  value={values.titleFr}
                  onChange={(e) => handleChange('titleFr', e.target.value)}
                  placeholder={isEdit ? undefined : 'Ex: React & Next.js — Apps modernes'}
                />
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Description (Anglais)"
              input={
                <textarea
                  value={values.descriptionEn}
                  onChange={(e) => handleChange('descriptionEn', e.target.value)}
                  rows={3}
                  placeholder={isEdit ? undefined : 'Brief description in English...'}
                />
              }
            />
            <Field
              label="Description (Français)"
              input={
                <textarea
                  value={values.descriptionFr}
                  onChange={(e) => handleChange('descriptionFr', e.target.value)}
                  rows={3}
                  placeholder={isEdit ? undefined : 'Brève description en français...'}
                />
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Catégorie"
              input={
                <select
                  value={values.category}
                  onChange={(e) => handleChange('category', e.target.value as FormationFormValues['category'])}
                >
                  <option value="office">office</option>
                  <option value="dev">Web & Mobile</option>
                  <option value="ia">Intelligence Artificielle</option>
                  <option value="data">Data & SQL</option>
                </select>
              }
            />

            <div className="flex gap-4 items-center justify-start h-full pt-6">
              <label className="flex items-center gap-2 text-[11px] text-white/50 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={values.availableNow}
                  onChange={(e) => handleChange('availableNow', e.target.checked)}
                  className="accent-accent w-4 h-4 rounded border-white/10"
                />
                Disponible immédiatement
              </label>
              <label className="flex items-center gap-2 text-[11px] text-white/50 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={values.featured}
                  onChange={(e) => handleChange('featured', e.target.checked)}
                  className="accent-accent w-4 h-4 rounded border-white/10"
                />
                Populaire
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Prix Présentiel (FCFA)"
              input={
                <input
                  type="number"
                  required
                  value={values.priceOnsite}
                  onChange={(e) => handleChange('priceOnsite', parseInt(e.target.value) || 0)}
                />
              }
            />
            <Field
              label="Prix En Ligne (FCFA)"
              input={
                <input
                  type="number"
                  required
                  value={values.priceOnline}
                  onChange={(e) => handleChange('priceOnline', parseInt(e.target.value) || 0)}
                />
              }
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-white/6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-white/10 text-white/60 hover:text-white/80 rounded text-[11px]"
            >
              Annuler
            </button>
            <button type="submit" className="px-4 py-2 bg-accent text-bg font-bold rounded text-[11px]">
              {isEdit ? 'Mettre à jour' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}