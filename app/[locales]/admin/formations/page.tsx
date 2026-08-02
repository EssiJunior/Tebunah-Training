'use client'

import { useState, useEffect } from 'react'
import { useAdmin } from '@/context/AdminContext'
import { useLocale } from 'next-intl'
import { getFormations } from '@/requests/formations'
import { useAtomValue, useSetAtom } from 'jotai'
import { formationsActionsAtom, formationsAtom } from '@/store/data/formationAtoms'
import { authUserAtom } from '@/store/auth/userAtoms'

import FormationsToolbar from '@/components/molecules/dashboard/formations/FormationsToolbar'
import FormationsGrid from '@/components/molecules/dashboard/formations/FormationsGrid'
import FormationFormModal, { FormationFormValues } from '@/components/molecules/dashboard/formations/FormationFormModal'
import DeleteFormationModal from '@/components/molecules/dashboard/formations/DeleteFormationModal'

const emptyFormValues: FormationFormValues = {
  titleEn: '',
  titleFr: '',
  descriptionEn: '',
  descriptionFr: '',
  category: 'dev',
  priceOnsite: 60000,
  priceOnline: 45000,
  availableNow: true,
  featured: false,
}

export default function AdminFormationsPage() {
  const locale = useLocale()

  const dispatch = useSetAtom(formationsActionsAtom)
  const formations = useAtomValue(formationsAtom)
  const user = useAtomValue(authUserAtom)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { addFormation, updateFormation, deleteFormation } = useAdmin()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingFormation, setEditingFormation] = useState<Formation | null>(null)
  const [editInitialValues, setEditInitialValues] = useState<FormationFormValues | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filteredFormations = formations.filter((f: Formation) => {
    const titleText = f.title[locale]
    const descText = f.description[locale]
    const matchesSearch =
      titleText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      descText.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || f.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleOpenEdit = (f: Formation) => {
    setEditingFormation(f)
    setEditInitialValues({
      titleEn: (f as any).title?.en || (f as any).metaTitle || '',
      titleFr: (f as any).title?.fr || (f as any).metaTitle || '',
      descriptionEn: (f as any).description?.en || (f as any).metaDescription || '',
      descriptionFr: (f as any).description?.fr || (f as any).metaDescription || '',
      category: f.category,
      priceOnsite: (f as any).price?.on_site ?? (f as any).priceOnsite ?? 0,
      priceOnline: (f as any).price?.on_line ?? (f as any).priceOnline ?? 0,
      availableNow: f.availableNow,
      featured: f.featured || false,
    })
  }

  const handleSaveAdd = (values: FormationFormValues) => {
    addFormation({
      title: { en: values.titleEn || values.titleFr, fr: values.titleFr || values.titleEn },
      description: {
        en: values.descriptionEn || values.descriptionFr,
        fr: values.descriptionFr || values.descriptionEn,
      },
      category: values.category,
      price: { on_site: values.priceOnsite, on_line: values.priceOnline },
      priceOnsiteLabel: `${values.priceOnsite.toLocaleString()} FCFA`,
      priceOnlineLabel: `${values.priceOnline.toLocaleString()} FCFA`,
      availableNow: values.availableNow,
      featured: values.featured,
      benefits: [
        { icon: 'LayoutGrid', title: { en: '', fr: '' }, items: Array(5).fill({ en: '', fr: '' }) },
        { icon: 'Briefcase', title: { en: '', fr: '' }, items: Array(5).fill({ en: '', fr: '' }) },
      ],
    })
    setIsAddModalOpen(false)
  }

  const handleSaveEdit = (values: FormationFormValues) => {
    if (!editingFormation) return

    updateFormation(editingFormation.id, {
      title: { en: values.titleEn || values.titleFr, fr: values.titleFr || values.titleEn },
      description: {
        en: values.descriptionEn || values.descriptionFr,
        fr: values.descriptionFr || values.descriptionEn,
      },
      category: values.category,
      price: { on_site: values.priceOnsite, on_line: values.priceOnline },
      priceOnsiteLabel: `${values.priceOnsite.toLocaleString()} FCFA`,
      priceOnlineLabel: `${values.priceOnline.toLocaleString()} FCFA`,
      availableNow: values.availableNow,
      featured: values.featured,
    })
    setEditingFormation(null)
  }

  const handleDeleteConfirm = () => {
    if (deletingId) {
      deleteFormation(deletingId)
      setDeletingId(null)
    }
  }

  useEffect(() => {
    getFormations(dispatch, setIsLoading, setError)
  }, [dispatch, user?.token])

  return (
    <div className="space-y-6 font-mono">
      <FormationsToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        onAddClick={() => setIsAddModalOpen(true)}
      />

      <FormationsGrid
        formations={filteredFormations}
        isLoading={isLoading}
        error={error}
        onEdit={handleOpenEdit}
        onDeleteRequest={setDeletingId}
      />

      {isAddModalOpen && (
        <FormationFormModal
          mode="add"
          initialValues={emptyFormValues}
          onSubmit={handleSaveAdd}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {editingFormation && editInitialValues && (
        <FormationFormModal
          mode="edit"
          initialValues={editInitialValues}
          onSubmit={handleSaveEdit}
          onClose={() => setEditingFormation(null)}
        />
      )}

      {deletingId && (
        <DeleteFormationModal onConfirm={handleDeleteConfirm} onCancel={() => setDeletingId(null)} />
      )}
    </div>
  )
}