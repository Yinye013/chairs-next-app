import type { Image } from 'sanity';

/**
 * A product as returned by the GROQ projections in `sanity/lib/queries.ts`.
 *
 * `id` is the Sanity slug, never `_id` — it is the cart line-item key
 * persisted in visitors' localStorage and the key the backend will use for
 * order line items.
 */
export type Product = {
  id: string;
  title: string;
  price: number;
  useCase?: string;
  comfort?: string;
  material?: string;
  weightKg?: number;
  imageRef: Image;
  alt: string;
  blurDataURL?: string;
};

/** Product plus the fields only the single-product query returns. */
export type ProductDetail = Product & {
  description?: string;
  stock?: number;
};
