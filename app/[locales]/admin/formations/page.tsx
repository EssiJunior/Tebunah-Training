'use client'

import { useState } from 'react'
import { useAdmin } from '@/context/AdminContext'
import Field from '@/components/atoms/Field'
import AvailabiliteNow from '@/components/atoms/status/AvailabiliteNow'
import AvailableSoon from '@/components/atoms/status/AvailableSoon'
import Popular from '@/components/atoms/status/Popular'
import Category from '@/components/atoms/status/Category'
import Tooltip from '@/components/atoms/Animated/Tooltip'
import { Pencil, Trash } from 'lucide-react'

export default function AdminFormationsPage() {
  const { formations, addFormation, updateFormation, deleteFormation } = useAdmin()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingFormation, setEditingFormation] = useState<Formation | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Form states
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [category, setCategory] = useState<'office' | 'dev' | 'ia' | 'data'>('dev')
  const [priceOnsite, setPriceOnsite] = useState(60000)
  const [priceOnline, setPriceOnline] = useState(45000)
  const [availableNow, setAvailableNow] = useState(true)
  const [featured, setFeatured] = useState(false)

  // Filtered formations
  const filteredFormations = formations.filter((f) => {
    const matchesSearch =
      f.metaTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.metaDescription.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || f.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Handlers
  const handleOpenAdd = () => {
    setMetaTitle('')
    setMetaDescription('')
    setCategory('dev')
    setPriceOnsite(60000)
    setPriceOnline(45000)
    setAvailableNow(true)
    setFeatured(false)
    setIsAddModalOpen(true)
  }

  const handleOpenEdit = (f: Formation) => {
    setEditingFormation(f)
    setMetaTitle(f.metaTitle)
    setMetaDescription(f.metaDescription)
    setCategory(f.category)
    setPriceOnsite(f.priceOnsite)
    setPriceOnline(f.priceOnline)
    setAvailableNow(f.availableNow)
    setFeatured(f.featured || false)
  }

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!metaTitle.trim()) return

    addFormation({
      metaTitle,
      metaDescription,
      category,
      priceOnsite,
      priceOnsiteLabel: `${priceOnsite.toLocaleString()} FCFA`,
      priceOnline,
      priceOnlineLabel: `${priceOnline.toLocaleString()} FCFA`,
      availableNow,
      featured,
      benefits: [
        { icon: 'LayoutGrid', itemCount: 5 },
        { icon: 'Briefcase', itemCount: 5 }
      ]
    })
    setIsAddModalOpen(false)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingFormation || !metaTitle.trim()) return

    updateFormation(editingFormation.id, {
      metaTitle,
      metaDescription,
      category,
      priceOnsite,
      priceOnsiteLabel: `${priceOnsite.toLocaleString()} FCFA`,
      priceOnline,
      priceOnlineLabel: `${priceOnline.toLocaleString()} FCFA`,
      availableNow,
      featured
    })
    setEditingFormation(null)
  }

  const handleDelete = () => {
    if (deletingId) {
      deleteFormation(deletingId)
      setDeletingId(null)
    }
  }

  const categoryNames: Record<string, string> = {
    office: 'office',
    dev: 'Web & Mobile',
    ia: 'Intelligence Artificielle',
    data: 'Data & SQL'
  }

  return (
    <div className="space-y-6 font-mono">

      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-surface p-4 border border-white/6 rounded-px">

        {/* Left Side: Search + Filter */}
        <div className="flex flex-1 flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Rechercher une formation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 max-w-md bg-surface2 border border-white/6 px-3 py-2 rounded text-[11px] outline-none text-ink placeholder:text-white/20"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-surface2 border border-white/6 px-3 py-2 rounded text-[11px] outline-none text-ink"
          >
            <option value="all">Toutes les catégories</option>
            <option value="office">office</option>
            <option value="dev">Web & Mobile</option>
            <option value="ia">Intelligence Artificielle</option>
            <option value="data">Data & SQL</option>
          </select>
        </div>

        {/* Right Side: Add Button */}
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-accent text-bg text-[11px] font-bold rounded-px uppercase tracking-wider hover:bg-accent/90 transition-colors"
        >
          ＋ Ajouter une Formation
        </button>
      </div>

      {/* Formations Grid */}
      {filteredFormations.length === 0 ? (
        <div className="border border-white/6 bg-surface p-12 text-center text-white/30 text-[12px] rounded-px">
          Aucune formation ne correspond à votre recherche.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredFormations.map((formation) => (
            <div
              key={formation.id}
              className="border border-white/6 bg-surface p-6 rounded-px flex flex-col justify-between hover:border-accent/20 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-1 text-[10px]">
                  <Category category={formation.category} />

                  {formation.availableNow ? <AvailabiliteNow /> : <AvailableSoon />}
                </div>
                {formation.featured ? <Popular className="block w-fit mb-3" /> : <div className='mb-3' />}

                <h3 className="font-chonburi text-[14px] text-ink font-bold leading-snug mb-2">
                  {formation.metaTitle}
                </h3>
                <p className="text-[11px] text-white/40 leading-relaxed mb-4 line-clamp-3">
                  {formation.metaDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-white/6 space-y-3">
                {/* Prices list */}
                <div className="grid grid-cols-2 gap-4 text-[11px]">
                  <div>
                    <span className="text-white/30 text-[10px] block">Présentiel</span>
                    <span className="text-accent font-semibold">{formation.priceOnsiteLabel}</span>
                  </div>
                  <div>
                    <span className="text-white/30 text-[10px] block">En Ligne</span>
                    <span className="text-accent font-semibold">{formation.priceOnlineLabel}</span>
                  </div>
                </div>

                {/* Operations buttons */}
                <div className="flex gap-2 justify-end pt-2">
                  <Tooltip label="Modifier">
                    <button
                      onClick={() => handleOpenEdit(formation)}
                      className="px-2.5 py-1.5 border border-cyan-400/10! hover:border-cyan-400/20! hover:bg-cyan-400/5! text-cyan-400/70! rounded text-[10px] transition-colors"
                    >
                      <Pencil size={18} />
                    </button>
                  </Tooltip>

                  <Tooltip label="Supprimer">
                    <button
                      onClick={() => setDeletingId(formation.id)}
                      className="px-2.5 py-1.5 border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded text-[10px] transition-colors"
                    >
                      <Trash size={18} />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg border border-white/6 bg-surface p-6 rounded shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="font-chonburi text-[15px] font-bold text-accent mb-6">Ajouter une formation</h2>

            <form onSubmit={handleSaveAdd} className="space-y-4">
              <Field
                label="Titre Meta (Titre principal)"
                input={
                  <input
                    type="text"
                    required
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="Ex: React & Next.js — Master les bases"
                  />
                }
              />

              <Field
                label="Description"
                input={
                  <textarea
                    required
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={3}
                    placeholder="Entrez une brève description de la formation..."
                  />
                }
              />

              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Catégorie"
                  input={
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
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
                      checked={availableNow}
                      onChange={(e) => setAvailableNow(e.target.checked)}
                      className="accent-accent w-4 h-4 rounded border-white/10"
                    />
                    Disponible immédiatement
                  </label>
                  <label className="flex items-center gap-2 text-[11px] text-white/50 select-none cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
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
                      value={priceOnsite}
                      onChange={(e) => setPriceOnsite(parseInt(e.target.value) || 0)}
                    />
                  }
                />
                <Field
                  label="Prix En Ligne (FCFA)"
                  input={
                    <input
                      type="number"
                      required
                      value={priceOnline}
                      onChange={(e) => setPriceOnline(parseInt(e.target.value) || 0)}
                    />
                  }
                />
              </div>

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

      {/* Edit Modal */}
      {editingFormation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg border border-white/6 bg-surface p-6 rounded shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="font-chonburi text-[15px] font-bold text-accent mb-6">Modifier la formation</h2>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <Field
                label="Titre Meta (Titre principal)"
                input={
                  <input
                    type="text"
                    required
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                  />
                }
              />

              <Field
                label="Description"
                input={
                  <textarea
                    required
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={3}
                  />
                }
              />

              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Catégorie"
                  input={
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
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
                      checked={availableNow}
                      onChange={(e) => setAvailableNow(e.target.checked)}
                      className="accent-accent w-4 h-4 rounded border-white/10"
                    />
                    Disponible immédiatement
                  </label>
                  <label className="flex items-center gap-2 text-[11px] text-white/50 select-none cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
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
                      value={priceOnsite}
                      onChange={(e) => setPriceOnsite(parseInt(e.target.value) || 0)}
                    />
                  }
                />
                <Field
                  label="Prix En Ligne (FCFA)"
                  input={
                    <input
                      type="number"
                      required
                      value={priceOnline}
                      onChange={(e) => setPriceOnline(parseInt(e.target.value) || 0)}
                    />
                  }
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-white/6">
                <button
                  type="button"
                  onClick={() => setEditingFormation(null)}
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
            <h2 className="font-chonburi text-[14px] font-bold text-red-400 mb-3">Supprimer la formation ?</h2>
            <p className="text-[11px] text-white/40 leading-relaxed mb-6">
              Êtes-vous sûr de vouloir supprimer cette formation ? Cette action est irréversible et supprimera les données du cache local.
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
