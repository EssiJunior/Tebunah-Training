import { useAdmin } from '@/context/AdminContext'
import { ArrowRight, MoveRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

const RecentRegistrations = () => {
    const { registrations } = useAdmin()
    const pathname = usePathname()

    const segments = pathname?.split('/') || []
    const locale = segments[1] || 'fr'

    // Recent registrations list (last 5)
    const recentRegistrations = [...registrations]
        .sort((a, b) => b.id.localeCompare(a.id)) // mock sorting by latest
        .slice(0, 5)

    const formatLabel = (format: string | Translation) =>
        typeof format === 'string' ? format : format.value

    const priceAmount = (price: number | Price) =>
        typeof price === 'number' ? price : price.amount

    return (
        <div className="lg:col-span-2 border border-white/6 bg-surface p-6 rounded-px flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/6">
                    <h6 className="text-[14px] text-ink font-bold">Dernières Inscriptions</h6>
                    <a href={`/${locale}/admin/registrations`} className="text-[11px] text-accent hover:underline flex items-center gap-1">
                        Voir toutes les inscriptions <MoveRight size={20} />
                    </a>
                </div>

                {recentRegistrations.length === 0 ? (
                    <p className="text-[12px] text-white/30 text-center py-10">Aucune inscription pour le moment.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-[11px] border-collapse">
                            <thead>
                                <tr className="text-white/30 border-b border-white/6 font-mono">
                                    <th className="py-2.5 font-normal">Étudiant</th>
                                    <th className="py-2.5 font-normal">Formation</th>
                                    <th className="py-2.5 font-normal">Format</th>
                                    <th className="py-2.5 font-normal">Montant</th>
                                    <th className="py-2.5 font-normal text-right">Statut</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/6">
                                {recentRegistrations.map((reg) => (
                                    <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                                        <td className="py-3 font-semibold text-ink">{reg.student.name}</td>
                                        <td className="py-3 text-white/60 truncate max-w-[150px]">
                                            {reg.formation?.metaTitle}
                                        </td>
                                        <td className="py-3 uppercase text-white/40">{formatLabel(reg.format)}</td>
                                        <td className="py-3 text-white/70">{priceAmount(reg.price).toLocaleString()} FCFA</td>
                                        <td className="py-3 text-right">
                                            <span
                                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${reg.status === 'confirmed'
                                                    ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                                                    : reg.status === 'pending'
                                                        ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
                                                        : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                                    }`}
                                            >
                                                {reg.status === 'confirmed'
                                                    ? 'Confirmée'
                                                    : reg.status === 'pending'
                                                        ? 'Attente'
                                                        : 'Annulée'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>)
}

export default RecentRegistrations