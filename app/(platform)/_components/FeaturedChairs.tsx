import FeaturedChairsCarousel from './FeaturedChairsCarousel';
import { getFeaturedProducts } from '@/app/services/products';
import { urlFor } from '@/sanity/lib/image';

/**
 * Server Component: fetches the featured products, then hands them to the
 * client carousel. Replaces the old module-level `productsArr.slice(0, 9)` —
 * which products are featured is now editorial, set per-product in the studio.
 */
const FeaturedChairs = async () => {
  const featured = await getFeaturedProducts();

  if (featured.length === 0) return null;

  // Resolve the CDN URL here rather than in the carousel. `/` is statically
  // prerendered, so anything the client component imports is inlined into the
  // homepage bundle — passing the raw Sanity `Image` object meant the client
  // needed `urlFor`, which dragged @sanity/client (and its ~168KB of stega
  // visual-editing code, unused here) onto the page. A plain string cuts it.
  const slides = featured.map((product) => ({
    ...product,
    imageUrl: urlFor(product.imageRef).width(400).height(320).url(),
  }));

  return (
    <div className="section-pad">
      <div className="container">
        <p className="subheading">the collection</p>
        <h2 className="heading-secondary">Featured Chairs</h2>
      </div>
      {/* Full-bleed: breaks out of the ancestor .container's max-width/padding to span the viewport */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <FeaturedChairsCarousel featured={slides} />
      </div>
    </div>
  );
};

export default FeaturedChairs;
