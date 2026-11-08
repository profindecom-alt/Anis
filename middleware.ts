import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

function paginationNotFound() {
  return new NextResponse(
    `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="robots" content="noindex,nofollow">
    <title>Page introuvable | Élan Patrimoine</title>
  </head>
  <body>
    <main>
      <h1>Page introuvable</h1>
      <p>Cette page d’actualités n’existe pas.</p>
      <p><a href="/actualites">Consulter les actualités</a></p>
    </main>
  </body>
</html>`,
    {
      status: 404,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=60',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    }
  );
}

/**
 * Anciennes URL de pagination (`/actualites?page=N`). La pagination vit
 * désormais sur des chemins statiques (`/actualites/page/N`) :
 *  - `?page=1`          → 308 vers /actualites
 *  - `?page=N` (N ≥ 2)  → 308 vers /actualites/page/N (qui répond 404 si N
 *                         dépasse le nombre de pages)
 *  - valeur invalide ou paramètre répété → 404 immédiat (pas de doublon 200)
 */
export function middleware(request: NextRequest) {
  const pageValues = request.nextUrl.searchParams.getAll('page');
  if (pageValues.length === 0) return NextResponse.next();

  if (pageValues.length !== 1 || !/^[1-9]\d*$/.test(pageValues[0])) {
    return paginationNotFound();
  }

  const page = Number(pageValues[0]);
  if (!Number.isSafeInteger(page)) return paginationNotFound();

  const target = request.nextUrl.clone();
  target.searchParams.delete('page');
  if (page > 1) target.pathname = `/actualites/page/${page}`;
  return NextResponse.redirect(target, 308);
}

export const config = {
  matcher: ['/actualites'],
};
