'use client'

export default function RegistrationsTableLoader() {
const rows = [0, 1, 2, 3, 4]

return (
    <div className="border border-white/6 bg-surface rounded-px overflow-hidden shadow-md">
    <div className="h-[2px] w-full bg-white/6 overflow-hidden">
        <div className="h-full w-1/3 bg-accent animate-[loaderSlide_1.1s_ease-in-out_infinite]" />
    </div>

    <table className="w-full text-left text-[11px] border-collapse">
        <thead>
        <tr className="bg-surface2/50 border-b border-white/6 text-white/40">
            <th className="px-6 py-4 font-normal">Étudiant</th>
            <th className="px-6 py-4 font-normal">Formation</th>
            <th className="px-6 py-4 font-normal">Format</th>
            <th className="px-6 py-4 font-normal">Session</th>
            <th className="px-6 py-4 font-normal">Montant</th>
            <th className="px-6 py-4 font-normal">Message</th>
            <th className="px-6 py-4 font-normal">Statut</th>
            <th className="px-6 py-4 font-normal text-right">Actions</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-white/6">
        {rows.map((row) => (
            <tr key={row}>
            <td className="px-6 py-4">
                <div
                className="h-3 w-28 rounded-full bg-white/6 animate-pulse"
                style={{ animationDelay: `${row * 80}ms` }}
                />
                <div
                className="h-2 w-20 rounded-full bg-white/6 animate-pulse mt-2"
                style={{ animationDelay: `${row * 80 + 20}ms` }}
                />
            </td>
            <td className="px-6 py-4">
                <div
                className="h-3 w-32 rounded-full bg-white/6 animate-pulse"
                style={{ animationDelay: `${row * 80 + 40}ms` }}
                />
            </td>
            <td className="px-6 py-4">
                <div
                className="h-3 w-14 rounded-full bg-white/6 animate-pulse"
                style={{ animationDelay: `${row * 80 + 80}ms` }}
                />
            </td>
            <td className="px-6 py-4">
                <div
                className="h-3 w-16 rounded-full bg-white/6 animate-pulse"
                style={{ animationDelay: `${row * 80 + 100}ms` }}
                />
            </td>
            <td className="px-6 py-4">
                <div
                className="h-3 w-20 rounded-full bg-white/6 animate-pulse"
                style={{ animationDelay: `${row * 80 + 120}ms` }}
                />
            </td>
            <td className="px-6 py-4">
                <div
                className="h-3 w-24 rounded-full bg-white/6 animate-pulse"
                style={{ animationDelay: `${row * 80 + 140}ms` }}
                />
            </td>
            <td className="px-6 py-4">
                <div
                className="h-4 w-16 rounded bg-white/6 animate-pulse"
                style={{ animationDelay: `${row * 80 + 160}ms` }}
                />
            </td>
            <td className="px-6 py-4 text-right">
                <div
                className="h-3 w-14 rounded-full bg-white/6 animate-pulse ml-auto"
                style={{ animationDelay: `${row * 80 + 180}ms` }}
                />
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
)
}