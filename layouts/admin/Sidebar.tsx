"use client"

import Tooltip from "@/components/atoms/Animated/Tooltip"
import Logo from "@/components/atoms/Logo"
import { useAdmin } from "@/context/AdminContext"
import { authUserActionsAtom, authUserAtom } from "@/store/auth/userAtoms"
import { getInitials } from "@/utils/formatting"
import { useAtomValue, useSetAtom } from "jotai"
import { Book, BookOpenTextIcon, LayoutDashboard, LogOut, User, Users } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

const SidebarHeader = () => {
    return (
        <div className="p-5 mt-2.5 border-b border-white/6 flex items-center justify-between">
            <div className="relative">
                <Logo />
                <span className="absolute -top-3 left-1.5 font-chonburi text-[10px] text-accent tracking-wider font-bold border border-accent px-1 bg-accent/10 rounded-xl">ADMIN</span>
            </div>

            <span className="text-[8px] bg-teal-400/10 border border-teal-400/20 text-teal-400 px-1.5 py-0.5 rounded font-mono uppercase">V1.0</span>
        </div>
    )
}

const SidebarFooter = () => {
    const user = useAtomValue(authUserAtom);
    const authActions = useSetAtom(authUserActionsAtom);

    const { logout } = useAdmin()
    const router = useRouter()
    const pathname = usePathname()
    const segments = pathname?.split('/') || []
    const locale = segments[1] || 'fr'

    return (
        <div className="p-4 border-t border-white/6">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent text-[12px]">
                        {getInitials(user.user.name)}
                    </div>
                    <div>
                        <p className="text-[11px] text-ink font-semibold">{user.user.name}</p>
                        <p className="text-[9px] text-white/30">{user.user.email}</p>
                    </div>
                </div>
                <Tooltip label="Déconnexion" side="top">
                    <button
                        onClick={() => {
                            authActions({ type: 'REMOVE' })
                            router.push(`/${locale}/admin/login`)
                        }}
                        className=" relative rounded-full p-2 bg-red-500/10 text-red-400/80 hover:text-red-400 hover:bg-red-500/30 font-mono text-[11px] transition-colors duration-300 ease-in"
                    >
                        <LogOut size={18} className="cursor-pointer!" />
                    </button>
                </Tooltip>
            </div>

        </div>
    )
}
const Sidebar = () => {
    const { logout } = useAdmin()
    const router = useRouter()
    const pathname = usePathname()

    const segments = pathname?.split('/') || []
    const locale = segments[1] || 'fr'

    return (
        <aside className="w-64 border-r border-white/6 bg-surface flex flex-col justify-between shrink-0">
            <div>
                <SidebarHeader />

                {/* Navigation Links */}
                <nav className="p-4 space-y-1">
                    <a
                        href={`/${locale}/admin`}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded font-mono text-[12px] transition-all duration-200 ${pathname === `/${locale}/admin` || pathname === `/${locale}/admin/`
                            ? 'bg-accent/10 border border-accent/20 text-accent font-semibold'
                            : 'text-white/40 hover:text-ink hover:bg-white/5 border border-transparent'
                            }`}
                    >
                        <LayoutDashboard /> Tableaux de bord
                    </a>
                    <a
                        href={`/${locale}/admin/formations`}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded font-mono text-[12px] transition-all duration-200 ${pathname?.includes('/admin/formations')
                            ? 'bg-accent/10 border border-accent/20 text-accent font-semibold'
                            : 'text-white/40 hover:text-ink hover:bg-white/5 border border-transparent'
                            }`}
                    >
                        <Book /> Formations
                    </a>
                    <a
                        href={`/${locale}/admin/students`}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded font-mono text-[12px] transition-all duration-200 ${pathname?.includes('/admin/students')
                            ? 'bg-accent/10 border border-accent/20 text-accent font-semibold'
                            : 'text-white/40 hover:text-ink hover:bg-white/5 border border-transparent'
                            }`}
                    >
                        <Users /> Étudiants
                    </a>
                    <a
                        href={`/${locale}/admin/registrations`}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded font-mono text-[12px] transition-all duration-200 ${pathname?.includes('/admin/registrations')
                            ? 'bg-accent/10 border border-accent/20 text-accent font-semibold'
                            : 'text-white/40 hover:text-ink hover:bg-white/5 border border-transparent'
                            }`}
                    >
                        <BookOpenTextIcon /> Inscriptions
                    </a>
                </nav>
            </div>

            <SidebarFooter />
        </aside>
    )
}

export default Sidebar