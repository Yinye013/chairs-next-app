'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Props = {
  totalPages: number;
  currentPage: number;
  initialQuery: string;
  /**
   * Which half to render. Search sits in the page header, pagination below the
   * grid — but both need the same `push()` and debounced `term`, so they stay
   * one component rendered twice rather than two that duplicate that logic.
   *
   * The pagination instance re-reads `q` from the URL, so it always paginates
   * within the current search even though it does not own the input.
   */
  render: 'search' | 'pagination';
};

/**
 * Builds the page list with ellipses: always the first and last page, plus a
 * window around the current one. Returns numbers and 'gap' markers, e.g.
 * [1, 'gap', 4, 5, 6, 'gap', 12].
 */
function pageItems(total: number, current: number): (number | 'gap')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const items: (number | 'gap')[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push('gap');
  for (let p = start; p <= end; p++) items.push(p);
  if (end < total - 1) items.push('gap');

  items.push(total);
  return items;
}

/**
 * Search box and pagination for the bestsellers page.
 *
 * Both write to the URL rather than to local state — the Server Component
 * re-queries Sanity from the params.
 */
export default function BestsellersControls({
  totalPages,
  currentPage,
  initialQuery,
  render,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [term, setTerm] = useState(initialQuery);

  // Keep in sync when the user navigates back/forward.
  useEffect(() => {
    setTerm(initialQuery);
  }, [initialQuery]);

  const push = (q: string, page: number) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (page > 1) params.set('page', String(page));
    const query = params.toString();
    startTransition(() => {
      // `replace` so a search doesn't stack a history entry per keystroke;
      // `scroll: false` keeps the viewport steady while results swap.
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
  };

  // Debounce so typing doesn't fire a request per character. Only the search
  // instance owns the input, so only it should push on term changes.
  useEffect(() => {
    if (render !== 'search') return;
    if (term === initialQuery) return;
    const timer = setTimeout(() => push(term, 1), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  if (render === 'search') {
    return (
      <input
        type="search"
        placeholder="Search for products..."
        aria-label="Search for products"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-full md:max-w-md px-[1.4rem] py-[1.4rem] text-[1.4rem] rounded-lg border border-gray-500 shadow-sm text-gray-700 placeholder-gray-400 transition duration-150 ease-in-out hover:border-green-700 focus:border-green-700 focus:ring-1 focus:ring-green-700 focus:outline-none"
      />
    );
  }

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-[4.8rem] mb-[3rem] flex justify-center md:justify-end transition-opacity"
      style={{ opacity: isPending ? 0.6 : 1 }}
    >
      <ul className="flex items-center gap-[0.4rem]">
        {pageItems(totalPages, currentPage).map((item, i) =>
          item === 'gap' ? (
            <li
              key={`gap-${i}`}
              aria-hidden
              className="px-[0.8rem] text-[1.5rem] text-gray-500 select-none"
            >
              &hellip;
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => push(term, item)}
                aria-label={`Go to page ${item}`}
                aria-current={item === currentPage ? 'page' : undefined}
                className={`min-w-[3.2rem] h-[3.2rem] px-[0.8rem] rounded text-[1.5rem] transition-colors ${
                  item === currentPage
                    ? 'bg-green-700 text-white cursor-pointer'
                    : 'text-gray-500 hover:bg-gray-100 cursor-pointer'
                }`}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
