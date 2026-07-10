/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { formations as initialFormations } from '@/data/formations'
import { userSignIn } from '@/requests/auth'

interface AdminContextType {
  formations: Formation[]
  students: Student[]
  registrations: Registration[]
  isAuthenticated: boolean
  isLoading: boolean
  message: string
  setMessage: (message: string) => void

  // Auth CRUD
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void

  // Formations CRUD
  addFormation: (formation: Omit<Formation, 'id'>) => void
  updateFormation: (id: string, formation: Partial<Formation>) => void
  deleteFormation: (id: string) => void

  // Students CRUD
  addStudent: (student: Omit<Student, 'id'>) => Student
  updateStudent: (id: string, student: Partial<Student>) => void
  deleteStudent: (id: string) => void

  // Registrations CRUD
  addRegistration: (registration: Omit<Registration, 'id'>) => void
  updateRegistration: (id: string, registration: Partial<Registration>) => void
  deleteRegistration: (id: string) => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

// Pre-populate some mock students
const MOCK_STUDENTS: Student[] = [
  {
    id: 'std_1',
    name: 'Essi Junior',
    email: 'dev@essijunior.com',
    phone: '+237 690 74 37 37',
    adress: 'Santa Barbara, Yaoundé',
    academicLevel: 'BTS / DUT'
  },
  {
    id: 'std_2',
    name: 'Marc Kamga',
    email: 'marc.kamga@gmail.com',
    phone: '+237 677 88 99 00',
    adress: 'Bastos, Yaoundé',
    academicLevel: 'Licence'
  },
  {
    id: 'std_3',
    name: 'Florence Ngo',
    email: 'florence.ngo@outlook.com',
    phone: '+237 655 44 33 22',
    adress: 'Bonapriso, Douala',
    academicLevel: 'Master'
  },
  {
    id: 'std_4',
    name: 'Jean Dupont',
    email: 'jean.dupont@yahoo.fr',
    phone: '+237 688 11 22 33',
    adress: 'Mvan, Yaoundé',
    academicLevel: 'Lycée / Baccalauréat'
  }
]

export function AdminProvider({ children }: { children: ReactNode }) {
  const [formations, setFormations] = useState<Formation[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [message, setMessage] = useState<string>("")

  // Load from local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAuth = localStorage.getItem('tebunah_admin_auth')
      const storedFormations = localStorage.getItem('tebunah_admin_formations')
      const storedStudents = localStorage.getItem('tebunah_admin_students')

      if (storedAuth === 'true') {
        setIsAuthenticated(true)
      }

      if (storedFormations) {
        setFormations(JSON.parse(storedFormations))
      } else {
        setFormations(initialFormations)
        localStorage.setItem('tebunah_admin_formations', JSON.stringify(initialFormations))
      }

      if (storedStudents) {
        setStudents(JSON.parse(storedStudents))
      } else {
        setStudents(MOCK_STUDENTS)
        localStorage.setItem('tebunah_admin_students', JSON.stringify(MOCK_STUDENTS))
      }

      setIsLoading(false)
    }
  }, [])

  // Sync registrations after formations/students are loaded/available
  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoading) {
      const storedRegistrations = localStorage.getItem('tebunah_admin_registrations')
      if (storedRegistrations) {
        setRegistrations(JSON.parse(storedRegistrations))
      } else {
        // Build mock registrations linking to the correct loaded students and formations
        const mockRegs: Registration[] = [
          {
            id: 'reg_1',
            student: MOCK_STUDENTS[0],
            formation: initialFormations.find(f => f.id === 'dev4') || initialFormations[0],
            price: 100000,
            format: 'onsite',
            message: 'I want to build highly performant web applications using NextJS.',
            session: 'soirée',
            status: 'confirmed'
          },
          {
            id: 'reg_2',
            student: MOCK_STUDENTS[1],
            formation: initialFormations.find(f => f.id === 'ia1') || initialFormations[2],
            price: 25000,
            format: 'online',
            message: 'I want to integrate AI APIs like Claude into my work.',
            session: 'journée',
            status: 'pending'
          },
          {
            id: 'reg_3',
            student: MOCK_STUDENTS[2],
            formation: initialFormations.find(f => f.id === 'dat1') || initialFormations[1],
            price: 60000,
            format: 'onsite',
            message: 'I want to learn to build interactive business dashboards.',
            session: 'soirée',
            status: 'cancelled'
          }
        ]
        setRegistrations(mockRegs)
        localStorage.setItem('tebunah_admin_registrations', JSON.stringify(mockRegs))
      }
    }
  }, [isLoading])

  // Authentication Handlers
  const login = async (email: string, password: string): Promise<boolean> => {
    const formData = { email, password }
    await userSignIn(formData, setIsLoading, setMessage, setIsAuthenticated)

    return isAuthenticated;
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('tebunah_admin_auth')
  }

  // Formations CRUD
  const addFormation = (formationData: Omit<Formation, 'id'>) => {
    const newFormation: Formation = {
      ...formationData,
      id: `form_${Date.now()}`
    }
    const updated = [...formations, newFormation]
    setFormations(updated)
    localStorage.setItem('tebunah_admin_formations', JSON.stringify(updated))
  }

  const updateFormation = (id: string, updatedData: Partial<Formation>) => {
    const updated = formations.map(f => (f.id === id ? { ...f, ...updatedData } : f))
    setFormations(updated)
    localStorage.setItem('tebunah_admin_formations', JSON.stringify(updated))

    // Update related registrations as well to keep data consistent
    const updatedRegs = registrations.map(reg => {
      if (reg.formation.id === id) {
        return { ...reg, formation: { ...reg.formation, ...updatedData } }
      }
      return reg
    })
    setRegistrations(updatedRegs)
    localStorage.setItem('tebunah_admin_registrations', JSON.stringify(updatedRegs))
  }

  const deleteFormation = (id: string) => {
    const updated = formations.filter(f => f.id !== id)
    setFormations(updated)
    localStorage.setItem('tebunah_admin_formations', JSON.stringify(updated))
  }

  // Students CRUD
  const addStudent = (studentData: Omit<Student, 'id'>): Student => {
    const newStudent: Student = {
      ...studentData,
      id: `std_${Date.now()}`
    }
    const updated = [...students, newStudent]
    setStudents(updated)
    localStorage.setItem('tebunah_admin_students', JSON.stringify(updated))
    return newStudent
  }

  const updateStudent = (id: string, updatedData: Partial<Student>) => {
    const updated = students.map(s => (s.id === id ? { ...s, ...updatedData } : s))
    setStudents(updated)
    localStorage.setItem('tebunah_admin_students', JSON.stringify(updated))

    // Update registrations as well
    const updatedRegs = registrations.map(reg => {
      if (reg.student.id === id) {
        return { ...reg, student: { ...reg.student, ...updatedData } }
      }
      return reg
    })
    setRegistrations(updatedRegs)
    localStorage.setItem('tebunah_admin_registrations', JSON.stringify(updatedRegs))
  }

  const deleteStudent = (id: string) => {
    const updated = students.filter(s => s.id !== id)
    setStudents(updated)
    localStorage.setItem('tebunah_admin_students', JSON.stringify(updated))
  }

  // Registrations CRUD
  const addRegistration = (regData: Omit<Registration, 'id'>) => {
    const newReg: Registration = {
      ...regData,
      id: `reg_${Date.now()}`
    }
    const updated = [...registrations, newReg]
    setRegistrations(updated)
    localStorage.setItem('tebunah_admin_registrations', JSON.stringify(updated))
  }

  const updateRegistration = (id: string, updatedData: Partial<Registration>) => {
    const updated = registrations.map(r => (r.id === id ? { ...r, ...updatedData } : r))
    setRegistrations(updated)
    localStorage.setItem('tebunah_admin_registrations', JSON.stringify(updated))
  }

  const deleteRegistration = (id: string) => {
    const updated = registrations.filter(r => r.id !== id)
    setRegistrations(updated)
    localStorage.setItem('tebunah_admin_registrations', JSON.stringify(updated))
  }

  return (
    <AdminContext.Provider
      value={{
        formations,
        students,
        registrations,
        isAuthenticated,
        isLoading,
        message,
        setMessage,
        login,
        logout,
        addFormation,
        updateFormation,
        deleteFormation,
        addStudent,
        updateStudent,
        deleteStudent,
        addRegistration,
        updateRegistration,
        deleteRegistration
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}
