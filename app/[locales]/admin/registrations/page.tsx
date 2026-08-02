'use client'

import { useEffect, useState } from 'react'
import { useAdmin } from '@/context/AdminContext'
import { useLocale, useTranslations } from 'next-intl'
import { timeslots } from '@/utils/form'
import { getRegistrations } from '@/requests/registrations'
import { useAtomValue, useSetAtom } from 'jotai'
import { registrationsActionsAtom, registrationsAtom } from '@/store/data/registrationAtoms'
import { authUserAtom } from '@/store/auth/userAtoms'
import RegistrationsToolbar from '@/components/molecules/dashboard/registrations/RegistrationsToolbar'
import RegistrationsTable from '@/components/molecules/dashboard/registrations/RegistrationsTable'
import RegistrationFormModal, {
  RegistrationFormValues,
} from '@/components/molecules/dashboard/registrations/RegistrationFormModal'
import DeleteRegistrationModal from '@/components/molecules/dashboard/registrations/DeleteRegistrationModal'

export default function AdminRegistrationsPage() {
  const locale = useLocale()
  const tF = useTranslations('Formation')

  const { students, formations, addRegistration, updateRegistration, deleteRegistration } = useAdmin()

  const dispatch = useSetAtom(registrationsActionsAtom)
  const registrations = useAtomValue(registrationsAtom)
  const user = useAtomValue(authUserAtom)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [addInitialValues, setAddInitialValues] = useState<RegistrationFormValues | null>(null)
  const [editingReg, setEditingReg] = useState<Registration | null>(null)
  const [editInitialValues, setEditInitialValues] = useState<RegistrationFormValues | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const formatTranslation = (formatKey: string): Translation => ({
    locale,
    key: formatKey === 'onsite' ? 'Formation.format.onsiteLabel' : 'Formation.format.onlineLabel',
    value: formatKey === 'onsite' ? tF('form.format.onsiteLabel') : tF('form.format.onlineLabel'),
  })

  const sessionTranslation = (sessionValue: string): Translation => ({
    locale,
    key: sessionValue === 'journée' ? 'Formation.timeslot.morningLabel' : 'Formation.timeslot.eveningLabel',
    value: sessionValue === 'journée' ? tF('form.timeslot.morningLabel') : tF('form.timeslot.eveningLabel'),
  })

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      reg.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.formation.title[locale].toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleOpenAdd = () => {
    if (students.length === 0 || formations.length === 0) {
      alert("Veuillez d'abord ajouter des étudiants et des formations pour créer une inscription.")
      return
    }

    const firstStudent = students[0]
    const firstFormation = formations[0]

    setAddInitialValues({
      selectedStudentId: firstStudent.id,
      selectedFormationId: firstFormation.id,
      format: 'onsite',
      price: firstFormation.priceOnsite,
      session: timeslots[0],
      status: 'pending',
      message: '',
    })
    setIsAddModalOpen(true)
  }

  const handleOpenEdit = (reg: Registration) => {
    const existingFormat = typeof reg.format === 'string' ? reg.format : reg.format.key.includes('onsite') ? 'onsite' : 'online'
    const existingSession = typeof reg.session === 'string' ? reg.session : reg.session.value
    const existingPrice = typeof reg.price === 'number' ? reg.price : reg.price.amount

    setEditingReg(reg)
    setEditInitialValues({
      selectedStudentId: reg.student.id,
      selectedFormationId: reg.formation.id,
      format: existingFormat,
      price: existingPrice,
      session: existingSession,
      status: reg.status,
      message: reg.message,
    })
  }

  const handleSaveAdd = (values: RegistrationFormValues) => {
    const student = students.find((s) => s.id === values.selectedStudentId)
    const formation = formations.find((f) => f.id === values.selectedFormationId)
    if (!student || !formation) return

    const registrationPayload: Omit<Registration, 'id'> = {
      student: {
        ...student,
        academic_level: student.academicLevel,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
      formation,
      price: {
        amount: values.price,
        currency: 'FCFA',
        label: `${values.price.toLocaleString()} FCFA`,
      },
      format: formatTranslation(values.format),
      session: values.format === 'online' ? '' : sessionTranslation(values.session),
      message: values.message,
      status: values.status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    addRegistration(registrationPayload)
    setIsAddModalOpen(false)
  }

  const handleSaveEdit = (values: RegistrationFormValues) => {
    if (!editingReg) return

    const editedPayload: Partial<Registration> = {
      format: formatTranslation(values.format),
      session: values.format === 'online' ? '' : sessionTranslation(values.session),
      price: {
        amount: values.price,
        currency: 'FCFA',
        label: `${values.price.toLocaleString()} FCFA`,
      },
      status: values.status,
      message: values.message,
      updated_at: new Date().toISOString(),
    }

    updateRegistration(editingReg.id, editedPayload)
    setEditingReg(null)
  }

  const handleDeleteConfirm = () => {
    if (deletingId) {
      deleteRegistration(deletingId)
      setDeletingId(null)
    }
  }

  useEffect(() => {
    getRegistrations(dispatch, user.token, setIsLoading, setError)
  }, [dispatch, user?.token])

  return (
    <div className="space-y-6 font-mono">
      <RegistrationsToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onAddClick={handleOpenAdd}
      />

      <RegistrationsTable
        registrations={filteredRegistrations}
        isLoading={isLoading}
        error={error}
        onEdit={handleOpenEdit}
        onDeleteRequest={setDeletingId}
      />

      {isAddModalOpen && addInitialValues && (
        <RegistrationFormModal
          mode="add"
          students={students}
          formations={formations}
          initialValues={addInitialValues}
          onSubmit={handleSaveAdd}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {editingReg && editInitialValues && (
        <RegistrationFormModal
          mode="edit"
          students={students}
          formations={formations}
          initialValues={editInitialValues}
          editingReg={editingReg}
          onSubmit={handleSaveEdit}
          onClose={() => setEditingReg(null)}
        />
      )}

      {deletingId && (
        <DeleteRegistrationModal onConfirm={handleDeleteConfirm} onCancel={() => setDeletingId(null)} />
      )}
    </div>
  )
}