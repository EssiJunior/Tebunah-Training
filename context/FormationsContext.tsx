'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { Category } from '@/data/formations'

interface FormationsContextType {
  active: Category
  setActive: (category: Category) => void
}

const FormationsContext = createContext<FormationsContextType | undefined>(undefined)

export function FormationsProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<Category>('all')

  return (
    <FormationsContext.Provider value={{ active, setActive }}>
      {children}
    </FormationsContext.Provider>
  )
}

export function useFormations() {
  const context = useContext(FormationsContext)
  if (context === undefined) {
    throw new Error('useFormations must be used within FormationsProvider')
  }
  return context
}
