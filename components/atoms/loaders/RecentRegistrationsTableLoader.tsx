'use client'

export default function RecentRegistrationsTableLoader() {
  const rows = [0, 1, 2, 3, 4]

  return (
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
        {rows.map((row) => (
          <tr key={row}>
            <td className="py-3">
              <div
                className="h-3 w-24 rounded-full bg-white/6 animate-pulse"
                style={{ animationDelay: `${row * 80}ms` }}
              />
            </td>
            <td className="px-3">
              <div
                className="h-3 w-28 rounded-full bg-white/6 animate-pulse"
                style={{ animationDelay: `${row * 80 + 40}ms` }}
              />
            </td>
            <td className="p-3">
              <div
                className="h-3 w-12 rounded-full bg-white/6 animate-pulse"
                style={{ animationDelay: `${row * 80 + 80}ms` }}
              />
            </td>
            <td className="p-3">
              <div
                className="h-3 w-16 rounded-full bg-white/6 animate-pulse"
                style={{ animationDelay: `${row * 80 + 120}ms` }}
              />
            </td>
            <td className="py-3 text-right">
              <div
                className="h-4 w-14 rounded bg-white/6 animate-pulse ml-auto"
                style={{ animationDelay: `${row * 80 + 160}ms` }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}