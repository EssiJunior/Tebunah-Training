'use client'

export default function FormationsGridLoader() {
  const cards = [0, 1, 2, 3, 4, 5]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div key={card} className="border border-white/6 bg-surface p-6 rounded-px overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div
              className="h-4 w-16 rounded bg-white/6 animate-pulse"
              style={{ animationDelay: `${card * 60}ms` }}
            />
            <div
              className="h-4 w-20 rounded bg-white/6 animate-pulse"
              style={{ animationDelay: `${card * 60 + 20}ms` }}
            />
          </div>

          <div
            className="h-4 w-3/4 rounded-full bg-white/6 animate-pulse mb-3"
            style={{ animationDelay: `${card * 60 + 40}ms` }}
          />
          <div
            className="h-3 w-full rounded-full bg-white/6 animate-pulse mb-1.5"
            style={{ animationDelay: `${card * 60 + 60}ms` }}
          />
          <div
            className="h-3 w-full rounded-full bg-white/6 animate-pulse mb-1.5"
            style={{ animationDelay: `${card * 60 + 80}ms` }}
          />
          <div
            className="h-3 w-2/3 rounded-full bg-white/6 animate-pulse mb-6"
            style={{ animationDelay: `${card * 60 + 100}ms` }}
          />

          <div className="pt-4 border-t border-white/6 grid grid-cols-2 gap-4">
            <div>
              <div
                className="h-2.5 w-14 rounded-full bg-white/6 animate-pulse mb-2"
                style={{ animationDelay: `${card * 60 + 120}ms` }}
              />
              <div
                className="h-3.5 w-20 rounded-full bg-white/6 animate-pulse"
                style={{ animationDelay: `${card * 60 + 140}ms` }}
              />
            </div>
            <div>
              <div
                className="h-2.5 w-14 rounded-full bg-white/6 animate-pulse mb-2"
                style={{ animationDelay: `${card * 60 + 160}ms` }}
              />
              <div
                className="h-3.5 w-20 rounded-full bg-white/6 animate-pulse"
                style={{ animationDelay: `${card * 60 + 180}ms` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}