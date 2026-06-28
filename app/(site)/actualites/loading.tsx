/**
 * Squelette de chargement de la liste des actualités (route dynamique).
 */
export default function Loading() {
  return (
    <div className="bg-cream">
      {/* En-tête */}
      <div className="bg-forest pt-20">
        <div className="container-content py-16 md:py-24">
          <div className="h-3 w-28 rounded bg-cream/20" />
          <div className="mt-6 h-12 w-3/4 max-w-xl rounded bg-cream/20" />
          <div className="mt-5 h-4 w-1/2 max-w-md rounded bg-cream/15" />
        </div>
      </div>

      {/* Grille de cartes */}
      <div className="container-content py-20">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-ink/10 bg-white"
            >
              <div className="aspect-[16/10] animate-pulse bg-ink/5" />
              <div className="space-y-3 p-6">
                <div className="h-3 w-24 animate-pulse rounded bg-ink/10" />
                <div className="h-5 w-full animate-pulse rounded bg-ink/10" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-ink/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
