'use client'

import CategoryBreakdown from '@/components/molecules/dashboard/CategoryBreakdown'
import RecentRegistrations from '@/components/molecules/dashboard/RecentRegistrations'
import { useAdmin } from '@/context/AdminContext'
import { usePathname } from 'next/navigation'
import GlassStatCard from '@/components/atoms/cards/dashboard/GlassStatCard'
import AnimatedCounter from '@/components/atoms/Animated/dashboard/AnimatedCounter'
import RadialProgress from '@/components/atoms/Animated/dashboard/charts/RadialProgress'
import MiniBarChart from '@/components/atoms/Animated/dashboard/charts/MiniBarChart'
import DonutChart from '@/components/atoms/Animated/dashboard/charts/DonutChart'
import Sparkline from '@/components/atoms/Animated/dashboard/charts/Sparkline'
import { CATEGORY_COLORS } from '@/data/formations'
import { Book, Coins, UserPlus, UserPlus2, Users } from 'lucide-react'

export default function AdminDashboardPage() {
  const { formations, students, registrations } = useAdmin()
  const pathname = usePathname()

  const segments = pathname?.split('/') || []
  const locale = segments[1] || 'fr'

  const totalStudents = students.length
  const totalRegistrations = registrations.length
  const totalFormations = formations.length

  const confirmedRegistrations = registrations.filter(r => r.status === 'confirmed')
  const totalRevenue = confirmedRegistrations.reduce((sum, reg) => sum + reg.price, 0)

  const pendingCount = registrations.filter(r => r.status === 'pending').length
  const confirmedCount = registrations.filter(r => r.status === 'confirmed').length
  const cancelledCount = registrations.filter(r => r.status === 'cancelled').length

  const categoryOrder: Array<keyof typeof CATEGORY_COLORS> = ['office', 'dev', 'ia', 'data']
  const donutSegments = categoryOrder
    .map(cat => ({
      label: cat,
      value: formations.filter(f => f.category === cat).length,
      color: CATEGORY_COLORS[cat],
    }))
    .filter(seg => seg.value > 0)

  const revenueTrend = confirmedRegistrations.reduce<number[]>((acc, reg) => {
    const prev = acc.length ? acc[acc.length - 1] : 0
    acc.push(prev + reg.price)
    return acc
  }, [0])

  return (
    <div className="space-y-8 font-mono">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <GlassStatCard
          label="Étudiants Inscrits"
          icon={<Users size={18} className='text-white/50 group-hover:text-accent transition-colors ease-in-out duration-300' />}
          delay={0}
          value={<AnimatedCounter value={totalStudents} />}
          chart={<RadialProgress percent={100} />}
          footer={
            <div className="flex items-center justify-between">
              <span className="text-green-400 font-semibold">100% Actif</span>
              <a href={`/${locale}/admin/students`} className="text-accent hover:underline">Gérer →</a>
            </div>
          }
        />

        <GlassStatCard
          label="Inscriptions Totales"
          icon={<UserPlus2 size={18} className='text-white/50 group-hover:text-accent transition-colors ease-in-out duration-300' />}
          delay={0.08}
          value={<AnimatedCounter value={totalRegistrations} />}
          chart={
            <MiniBarChart
              bars={[
                { label: 'Att.', value: pendingCount, color: '#facc15' },
                { label: 'Conf.', value: confirmedCount, color: '#4ade80' },
                { label: 'Ann.', value: cancelledCount, color: '#f87171' },
              ]}
            />
          }
          footer={
            <div className="flex items-center gap-2 text-white/40">
              <span className="text-yellow-400">{pendingCount} en attente</span>
              <span>·</span>
              <span className="text-green-400">{confirmedCount} validées</span>
            </div>
          }
        />

        <GlassStatCard
          label="Formations Actives"
          icon={<Book size={18} className='text-white/50 group-hover:text-accent transition-colors ease-in-out duration-300' />}
          delay={0.16}
          value={<AnimatedCounter value={totalFormations} />}
          chart={<DonutChart segments={donutSegments} />}
          footer={
            <div className="flex items-center justify-between">
              <span className="text-white/40">{donutSegments.length} catégories</span>
              <a href={`/${locale}/admin/formations`} className="text-accent hover:underline">Gérer →</a>
            </div>
          }
        />

        <GlassStatCard
          label="Revenu Confirmé"
          icon={<Coins size={18} className='text-white/50 group-hover:text-accent transition-colors ease-in-out duration-300' />}
          delay={0.24}
          glow
          value={
            <span className="text-accent">
              <AnimatedCounter value={totalRevenue} formatter={n => Math.round(n).toLocaleString()} /> FCFA
            </span>
          }
          chart={revenueTrend.length > 1 ? <Sparkline points={revenueTrend} /> : undefined}
          footer={
            <div className="flex items-center justify-between">
              <span className="text-white/40">Inscriptions validées</span>
              <span className="text-white/30">Mock</span>
            </div>
          }
        />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentRegistrations />
        <CategoryBreakdown />
      </div>
    </div>
  )
}