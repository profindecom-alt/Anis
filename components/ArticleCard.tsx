import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import { formatDate, type Article } from '@/lib/articles';

/**
 * Carte d'article. `variant`:
 *  - "featured" : grande carte (article mis en avant)
 *  - "default"  : carte standard avec image
 *  - "mini"     : ligne compacte sans grande image (colonne secondaire)
 */
export default function ArticleCard({
  article,
  variant = 'default',
}: {
  article: Article;
  variant?: 'featured' | 'default' | 'mini';
}) {
  const href = `/actualites/${article.slug}`;

  if (variant === 'mini') {
    const src = urlForImage(article.image)?.width(320).url();
    return (
      <Link
        href={href}
        className="group flex gap-4 border-b border-ink/10 pb-5 last:border-0"
      >
        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-forest/10">
          {src && (
            <Image
              src={src}
              alt={article.title}
              fill
              sizes="96px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-[0.7rem] font-medium uppercase tracking-wider text-gold-dark">
            {article.category}
          </span>
          <h4 className="mt-1 line-clamp-2 font-serif text-lg font-semibold leading-tight text-forest transition-colors group-hover:text-forest-light">
            {article.title}
          </h4>
          <span className="mt-auto pt-1 text-xs text-ink/45">
            {formatDate(article.date)}
          </span>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    const src = urlForImage(article.image)?.width(1000).url();
    return (
      <Link
        href={href}
        className="group grid overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-card transition-all duration-500 hover:shadow-elevated md:grid-cols-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-forest/10 md:aspect-auto">
          {src && (
            <Image
              src={src}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <span className="absolute left-5 top-5 rounded-full bg-gold px-3 py-1 text-xs font-medium text-forest-dark">
            À la une
          </span>
        </div>
        <div className="flex flex-col p-8 md:p-10">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-medium uppercase tracking-wider text-gold-dark">
              {article.category}
            </span>
            <span className="text-ink/40">·</span>
            <span className="text-ink/50">{formatDate(article.date)}</span>
          </div>
          <h3 className="mt-4 text-balance font-serif text-2xl font-semibold leading-tight text-forest transition-colors group-hover:text-forest-light md:text-3xl">
            {article.title}
          </h3>
          <p className="mt-4 line-clamp-3 text-ink/65">{article.excerpt}</p>
          <span className="link-underline mt-auto pt-6">
            Lire l'article
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
              <path d="M1 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    );
  }

  // default
  const src = urlForImage(article.image)?.width(800).url();
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-forest/10">
        {src && (
          <Image
            src={src}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs">
          <span className="font-medium uppercase tracking-wider text-gold-dark">
            {article.category}
          </span>
          <span className="text-ink/40">·</span>
          <span className="text-ink/50">{article.readingTime} min</span>
        </div>
        <h3 className="mt-3 line-clamp-2 font-serif text-xl font-semibold leading-tight text-forest transition-colors group-hover:text-forest-light">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm text-ink/60">{article.excerpt}</p>
        <span className="mt-auto pt-5 text-xs text-ink/45">
          {formatDate(article.date)}
        </span>
      </div>
    </Link>
  );
}
