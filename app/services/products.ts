import 'server-only';
import { sanityFetch } from '@/sanity/lib/fetch';
import {
  PRODUCTS_PAGE_QUERY,
  PRODUCTS_COUNT_QUERY,
  FEATURED_PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_SLUGS_QUERY,
} from '@/sanity/lib/queries';
import type { Product, ProductDetail } from '@/app/utils/types';

/**
 * Product data access.
 *
 * Everything that knows about GROQ, paging arithmetic and query params lives
 * here; pages stay presentational. These are plain async functions rather than
 * React hooks because the callers are Server Components — hooks cannot run on
 * the server, and moving the fetch client-side would give up server-rendered
 * results and reintroduce a loading state.
 */

export const PRODUCTS_PER_PAGE = 6;

export type ProductListParams = {
  q?: string;
  page?: string | number;
};

export type ProductList = {
  items: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
  query: string;
};

/**
 * One page of products for the given search term. Filtering and slicing happen
 * in GROQ, so only the current page crosses the wire.
 */
export async function getProducts({
  q,
  page,
}: ProductListParams): Promise<ProductList> {
  const query = (q || '').trim();
  const currentPage = Math.max(1, Number(page) || 1);
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const [items, total] = await Promise.all([
    sanityFetch<Product[]>({
      query: PRODUCTS_PAGE_QUERY,
      params: { q: query, start, end: start + PRODUCTS_PER_PAGE },
    }),
    sanityFetch<number>({
      query: PRODUCTS_COUNT_QUERY,
      params: { q: query },
    }),
  ]);

  return {
    items,
    total,
    totalPages: Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE)),
    currentPage,
    query,
  };
}

/** Products flagged for the homepage carousel. */
export async function getFeaturedProducts(): Promise<Product[]> {
  return sanityFetch<Product[]>({ query: FEATURED_PRODUCTS_QUERY });
}

/** A single product by slug — for a detail page, or order validation. */
export async function getProductBySlug(
  slug: string,
): Promise<ProductDetail | null> {
  return sanityFetch<ProductDetail | null>({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug },
  });
}

/**
 * Every product slug, for `generateStaticParams` on `/bestsellers/[slug]`.
 *
 * A longer revalidate than the reads above: the set of products changes far
 * less often than their contents, and a missed new slug still renders — the
 * route falls back to rendering on demand.
 */
export async function getProductSlugs(): Promise<string[]> {
  return sanityFetch<string[]>({
    query: PRODUCT_SLUGS_QUERY,
    revalidate: 3600,
  });
}
