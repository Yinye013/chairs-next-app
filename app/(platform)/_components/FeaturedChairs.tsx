import FeaturedChairsCarousel from './FeaturedChairsCarousel';
import { sanityFetch } from '@/sanity/lib/fetch';
import { FEATURED_PRODUCTS_QUERY } from '@/sanity/lib/queries';
import type { Product } from '@/app/utils/types';

/**
 * Server Component: fetches the featured products, then hands them to the
 * client carousel. Replaces the old module-level `productsArr.slice(0, 9)` —
 * which products are featured is now editorial, set per-product in the studio.
 */
const FeaturedChairs = async () => {
  const featured = await sanityFetch<Product[]>({
    query: FEATURED_PRODUCTS_QUERY,
  });

  if (featured.length === 0) return null;

  return (
    <div className="section-pad">
      <div className="container">
        <p className="subheading">the collection</p>
        <h2 className="heading-secondary">Featured Chairs</h2>
      </div>
      {/* Full-bleed: breaks out of the ancestor .container's max-width/padding to span the viewport */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <FeaturedChairsCarousel featured={featured} />
      </div>
    </div>
  );
};

export default FeaturedChairs;
