'use client'

import { useState, useEffect } from 'react'
import { useAdmin } from '@/context/AdminContext'
import { getStudents } from '@/requests/students'
import { useAtomValue, useSetAtom } from 'jotai'
import { studentsActionsAtom, studentsAtom } from '@/store/data/studentAtoms'
import { authUserAtom } from '@/store/auth/userAtoms'
import StudentsToolbar from '@/components/molecules/dashboard/students/StudentsToolbar'
import StudentsTable from '@/components/molecules/dashboard/students/StudentsTable'
import StudentFormModal, { StudentFormValues } from '@/components/molecules/dashboard/students/StudentFormModal'
import DeleteStudentModal from '@/components/molecules/dashboard/students/DeleteStudentModal'

export default function AdminStudentsPage() {
  const { addStudent, updateStudent, deleteStudent } = useAdmin()
  const [searchTerm, setSearchTerm] = useState('')

  const dispatch = useSetAtom(studentsActionsAtom)
  const students = useAtomValue(studentsAtom)
  const user = useAtomValue(authUserAtom)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<any | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filteredStudents = students.filter((s) => {
    const term = searchTerm.toLowerCase()
    return (
      s.name.toLowerCase().includes(term) ||
      s.email.toLowerCase().includes(term) ||
      s.phone.toLowerCase().includes(term) ||
      s.address.toLowerCase().includes(term)
    )
  })

  const handleAddSubmit = (values: StudentFormValues) => {
    addStudent(values)
    setIsAddModalOpen(false)
  }

  const handleEditSubmit = (values: StudentFormValues) => {
    if (!editingStudent) return
    updateStudent(editingStudent.id, values)
    setEditingStudent(null)
  }

  const handleDeleteConfirm = () => {
    if (deletingId) {
      deleteStudent(deletingId)
      setDeletingId(null)
    }
  }

  useEffect(() => {
    getStudents(dispatch, user?.token, setIsLoading, setError)
  }, [dispatch, user?.token])

  return (
    <div className="space-y-6 font-mono">
      <StudentsToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => setIsAddModalOpen(true)}
      />

      <StudentsTable
        students={filteredStudents}
        isLoading={isLoading}
        error={error}
        onEdit={setEditingStudent}
        onDeleteRequest={setDeletingId}
      />

      {isAddModalOpen && (
        <StudentFormModal
          mode="add"
          onSubmit={handleAddSubmit}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {editingStudent && (
        <StudentFormModal
          mode="edit"
          initialValues={editingStudent}
          onSubmit={handleEditSubmit}
          onClose={() => setEditingStudent(null)}
        />
      )}

      {deletingId && (
        <DeleteStudentModal onConfirm={handleDeleteConfirm} onCancel={() => setDeletingId(null)} />
      )}
    </div>
  )
}