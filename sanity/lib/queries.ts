// From `groq` directly — next-sanity only re-exports this same tag, and
// importing it from there pulls the whole live-preview stack in with it.
import groq from 'groq';

/**
 * All GROQ lives here.
 *
 * Every projection aliases `"id": slug.current`. Sanity's `_id` must never
 * reach a component: the cart persists `id` in localStorage, so leaking a UUID
 * would orphan every existing cart.
 *
 * `image.asset->metadata.lqip` is a base64 blur placeholder Sanity generates
 * for free — wired into next/image's `placeholder="blur"`.
 */

const PRODUCT_FIELDS = groq`
  "id": slug.current,
  title,
  price,
  useCase,
  comfort,
  material,
  weightKg,
  "imageRef": image,
  "alt": coalesce(image.alt, title),
  "blurDataURL": image.asset->metadata.lqip
`;

/** Matches the search term, or everything when the term is empty. */
const SEARCH_FILTER = groq`
  _type == "product" && defined(slug.current) &&
  ($q == "" || title match $q + "*")
`;

/** One page of products, filtered by search term. */
export const PRODUCTS_PAGE_QUERY = groq`
  *[${SEARCH_FILTER}] | order(order asc, _createdAt asc) [$start...$end] {
    ${PRODUCT_FIELDS}
  }
`;

/** Total matching products, for the pagination control. */
export const PRODUCTS_COUNT_QUERY = groq`
  count(*[${SEARCH_FILTER}])
`;

/** Homepage carousel. */
export const FEATURED_PRODUCTS_QUERY = groq`
  *[_type == "product" && featured == true && defined(slug.current)]
    | order(order asc, _createdAt asc) [0...9] {
    ${PRODUCT_FIELDS}
  }
`;

/** Single product — for a future detail page and backend order validation. */
export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    ${PRODUCT_FIELDS},
    description,
    stock
  }
`;
