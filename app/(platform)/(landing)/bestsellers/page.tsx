import ProductCard from '@/app/(platform)/_components/ProductCard';
import BestsellersControls from './_components/BestsellersControls';
import { getProducts } from '@/app/services/products';

type PageProps = {
  searchParams: { q?: string; page?: string };
};

export default async function BestSellerPage({ searchParams }: PageProps) {
  const { items, totalPages, currentPage, query } =
    await getProducts(searchParams);

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
          initialQuery={query}
        />
      </div>

      {items.length === 0 ? (
        <p className="text-[1.6rem] text-[#777] py-[4.8rem] text-center">
          {query
            ? `No products match “${query}”.`
            : 'No products yet. Add some in the studio.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-[6rem] md:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}
