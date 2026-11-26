import { CATEGORIES } from "@/data/formations"
import { useAdmin } from '@/context/AdminContext'

const CategoryBreakdown = () => {
    const { registrations } = useAdmin()
    const categoryColors: Record<string, string> = {
        office: 'bg-pink-500',
        dev: 'bg-green-500',
        ia: 'bg-blue-400',
        data: 'bg-yellow-400'
    }

    const validCategories = new Set(Object.keys(categoryColors))
    const validRegistrations = registrations.filter(
        (registration) => registration.formation?.category && validCategories.has(registration.formation.category)
    )
    const totalRegistrations = validRegistrations.length

    const categoryCounts = validRegistrations.reduce<Record<string, number>>((acc, registration) => {
        const category = registration.formation!.category
        acc[category] = (acc[category] || 0) + 1
        return acc
    }, {})

    return (
        <div className="border border-white/6 bg-surface p-6 rounded-px">
            <div className="mb-6 pb-4 border-b border-white/6">
                <h6 className="font-chonburi text-[14px] text-ink font-bold">Répartition par Catégorie</h6>
            </div>

            <div className="space-y-5">
                {CATEGORIES.slice(1).map((cat) => {
                    const count = categoryCounts[cat.id] || 0
                    const percentage = totalRegistrations > 0 ? (count / totalRegistrations) * 100 : 0
                    return (
                        <div key={cat.id} className="space-y-1.5">
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="text-white/60 font-semibold">{cat.label}</span>
                                <span className="text-white/30">
                                    {count} ({Math.round(percentage)}%)
                                </span>
                            </div>
                            {/* Progress bar */}
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${categoryColors[cat.id]} transition-all duration-500`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CategoryBreakdown