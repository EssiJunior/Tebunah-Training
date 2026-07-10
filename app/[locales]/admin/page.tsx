'use client'

import CategoryBreakdown from '@/components/molecules/dashboard/CategoryBreakdown'
import RecentRegistrations from '@/components/molecules/dashboard/RecentRegistrations'
import { useAdmin } from '@/context/AdminContext'
import { ArrowRight } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminDashboardPage() {
  const { isAuthenticated, formations, students, registrations } = useAdmin()
  const pathname = usePathname()

  const segments = pathname?.split('/') || []
  const locale = segments[1] || 'fr'

  // Calculations
  const totalStudents = students.length
  const totalRegistrations = registrations.length
  const totalFormations = formations.length

  // Filter out confirmed registrations for total revenue calculation
  const confirmedRegistrations = registrations.filter(r => r.status === 'confirmed')
  const totalRevenue = confirmedRegistrations.reduce((sum, reg) => sum + reg.price, 0)

  // Registration statuses
  const pendingCount = registrations.filter(r => r.status === 'pending').length
  const confirmedCount = registrations.filter(r => r.status === 'confirmed').length
  const cancelledCount = registrations.filter(r => r.status === 'cancelled').length



  return (
    <div className="space-y-8 font-mono">
      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Students Card */}
        <div className="border border-white/6 bg-surface p-6 rounded-px hover:border-accent/30 transition-all duration-300 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-white/40 uppercase tracking-wider">Étudiants Inscrits</span>
            <span className="text-xl">👥</span>
          </div>
          <p className="font-chonburi text-2xl font-bold text-ink">{totalStudents}</p>
          <div className="mt-3 flex items-center justify-between text-[10px]">
            <span className="text-green-400 font-semibold">100% Actif</span>
            <a href={`/${locale}/admin/students`} className="text-accent hover:underline">Gérer →</a>
          </div>
        </div>

        {/* Total Registrations Card */}
        <div className="border border-white/6 bg-surface p-6 rounded-px hover:border-accent/30 transition-all duration-300 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-white/40 uppercase tracking-wider">Inscriptions Totales</span>
            <span className="text-xl">📝</span>
          </div>
          <p className="font-chonburi text-2xl font-bold text-ink">{totalRegistrations}</p>
          <div className="mt-3 flex items-center gap-2 text-[9px] text-white/40">
            <span className="text-yellow-400">{pendingCount} en attente</span>
            <span>·</span>
            <span className="text-green-400">{confirmedCount} validées</span>
          </div>
        </div>

        {/* Total Formations Card */}
        <div className="border border-white/6 bg-surface p-6 rounded-px hover:border-accent/30 transition-all duration-300 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-white/40 uppercase tracking-wider">Formations Actives</span>
            <span className="text-xl">🎓</span>
          </div>
          <p className="font-chonburi text-2xl font-bold text-ink">{totalFormations}</p>
          <div className="mt-3 flex items-center justify-between text-[10px]">
            <span className="text-white/40">4 catégories</span>
            <a href={`/${locale}/admin/formations`} className="text-accent hover:underline">Gérer →</a>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="border border-white/6 bg-surface p-6 rounded-px hover:border-accent/30 transition-all duration-300 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] text-white/40 uppercase tracking-wider">Revenu Confirmé</span>
            <span className="text-xl">💰</span>
          </div>
          <p className="font-chonburi text-2xl font-bold text-accent">
            {totalRevenue.toLocaleString()} FCFA
          </p>
          <div className="mt-3 flex items-center justify-between text-[10px]">
            <span className="text-white/40">Inscriptions validées</span>
            <span className="text-white/30">Mock</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Side: Recent Registrations (Colspan 2) */}
        <RecentRegistrations />

        <CategoryBreakdown />

      </div>
    </div>
  )
}
