import ProductCard from '@/app/(platform)/_components/ProductCard';
import BestsellersControls from './_components/BestsellersControls';
import { sanityFetch } from '@/sanity/lib/fetch';
import {
  PRODUCTS_PAGE_QUERY,
  PRODUCTS_COUNT_QUERY,
} from '@/sanity/lib/queries';
import type { Product } from '@/app/utils/types';

const PRODUCTS_PER_PAGE = 6;

type PageProps = {
  searchParams: { q?: string; page?: string };
};

/**
 * Search and pagination are server-side: they live in the URL, so results are
 * linkable, the back button works, and only the current page of products is
 * ever sent to the browser. GROQ does the filtering and slicing.
 */
export default async function BestSellerPage({ searchParams }: PageProps) {
  const q = (searchParams.q || '').trim();
  const requestedPage = Number(searchParams.page) || 1;
  const currentPage = Math.max(1, requestedPage);

  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const params = { q, start, end: start + PRODUCTS_PER_PAGE };

  const [products, total] = await Promise.all([
    sanityFetch<Product[]>({ query: PRODUCTS_PAGE_QUERY, params }),
    sanityFetch<number>({ query: PRODUCTS_COUNT_QUERY, params: { q } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE));

  return (
    <div>
      <div className="pt-6 flex flex-col gap-[1.6rem] md:flex-row md:justify-between md:items-center mb-10">
        <h1 className="heading-tertiary mt-[2.4rem]">
          Here are some of our{' '}
          <span className="text-[#15803d]">bestsellers!</span>
        </h1>

        <BestsellersControls
          totalPages={totalPages}
          currentPage={currentPage}
          initialQuery={q}
        />
      </div>

      {products.length === 0 ? (
        <p className="text-[1.6rem] text-[#777] py-[4.8rem] text-center">
          {q
            ? `No products match “${q}”.`
            : 'No products yet. Add some in the studio.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-[6rem] md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}
