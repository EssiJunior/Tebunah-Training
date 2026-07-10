import { CATEGORIES } from "@/data/formations"

const CategoryBreakdown = () => {
    const totalRegistrations = 10

    const categoryColors: Record<string, string> = {
        bureautique: 'bg-pink-500',
        dev: 'bg-green-500',
        ia: 'bg-blue-400',
        data: 'bg-yellow-400'
    }

    return (
        <div className="border border-white/6 bg-surface p-6 rounded-px">
            <div className="mb-6 pb-4 border-b border-white/6">
                <h6 className="font-chonburi text-[14px] text-ink font-bold">Répartition par Catégorie</h6>
            </div>

            <div className="space-y-5">
                {CATEGORIES.slice(1).map((cat) => {
                    const count = cat.quantity
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