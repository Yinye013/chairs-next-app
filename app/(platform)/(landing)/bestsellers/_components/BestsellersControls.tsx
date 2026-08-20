'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';

type Props = {
  totalPages: number;
  currentPage: number;
  initialQuery: string;
};

/**
 * Search box and pagination for the bestsellers page.
 *
 * Both write to the URL rather than to local state — the Server Component
 * re-queries Sanity from the params. MUI forces a client component here
 * regardless, so this stays as thin as possible.
 */
export default function BestsellersControls({
  totalPages,
  currentPage,
  initialQuery,
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

  // Debounce so typing doesn't fire a request per character.
  useEffect(() => {
    if (term === initialQuery) return;
    const timer = setTimeout(() => push(term, 1), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  return (
    <div className="flex flex-col gap-[1.6rem] w-full md:w-auto md:items-end">
      <TextField
        placeholder="Search for products..."
        className="w-full max-w-md px-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition duration-150 ease-in-out text-gray-700 placeholder-gray-400"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'gray' },
            '&:hover fieldset': { borderColor: 'green' },
            '&.Mui-focused fieldset': { borderColor: 'green' },
            fontSize: '1.4rem',
          },
        }}
      />

      {totalPages > 1 && (
        <div
          className="flex justify-center text-[1.2rem]"
          style={{ opacity: isPending ? 0.6 : 1 }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => push(term, page)}
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'gray',
                fontSize: '1.5rem',
                '&.Mui-selected': {
                  backgroundColor: '#15803d',
                  color: 'white',
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
