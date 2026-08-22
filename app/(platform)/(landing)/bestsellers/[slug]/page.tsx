import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaRegStar } from 'react-icons/fa';
import { CiClock2 } from 'react-icons/ci';
import { IoEarthSharp } from 'react-icons/io5';
import { GiCubes } from 'react-icons/gi';
import { getProductBySlug, getProductSlugs } from '@/app/services/products';
import { urlFor } from '@/sanity/lib/image';
import AddToCartButton from './_components/AddToCartButton';

type PageProps = {
  params: { slug: string };
};

/**
 * Unknown slugs must be a real 404, not a soft one. With the default
 * `dynamicParams: true`, `notFound()` inside a prerendered route still returns
 * HTTP 200 with 404 content — Google indexes that as a live page.
 *
 * The tradeoff: a product published in the studio after the last build 404s
 * until the next deploy, rather than rendering on demand. Acceptable while the
 * catalog changes rarely; if that stops being true, switch this back to true
 * and 404 correctly some other way.
 */
export const dynamicParams = false;

/** Prerender every product at build time. */
export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return { title: 'Product not found' };
  }

  const description =
    product.description ??
    `${product.title} — ${[product.useCase, product.comfort, product.material]
      .filter(Boolean)
      .join(', ')}.`;

  return {
    title: `${product.title} | The Chair Shop`,
    description,
    openGraph: {
      title: product.title,
      description,
      type: 'website',
      images: [
        {
          url: urlFor(product.imageRef).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: product.alt || product.title,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) notFound();

  // Resolved server-side so the client button never needs `urlFor` — see the
  // note in CLAUDE.md about keeping Sanity out of the client bundle.
  const imgPath = urlFor(product.imageRef).width(1200).height(900).url();

  const specs = [
    { icon: FaRegStar, label: 'Best for', value: product.useCase },
    { icon: CiClock2, label: 'Comfort', value: product.comfort },
    { icon: IoEarthSharp, label: 'Material', value: product.material },
    {
      icon: GiCubes,
      label: 'Weight',
      value: product.weightKg ? `${product.weightKg}kg` : undefined,
    },
  ].filter((s) => s.value);

  const outOfStock = product.stock === 0;

  return (
    <div className="py-[4.8rem]">
      <nav aria-label="Breadcrumb" className="mb-[3.2rem]">
        <Link
          href="/bestsellers"
          className="text-[1.4rem] text-[#6b6b6b] hover:text-[#15803d] transition-colors"
        >
          &larr; Back to bestsellers
        </Link>
      </nav>

      <div className="grid grid-cols-1 gap-[4rem] lg:grid-cols-2 lg:gap-[6rem]">
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#f5f5f5]">
          <Image
            src={imgPath}
            alt={product.alt || product.title}
            fill
            // Above the fold on this route — the LCP element.
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            {...(product.blurDataURL
              ? { placeholder: 'blur' as const, blurDataURL: product.blurDataURL }
              : {})}
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-[3.2rem] md:text-[4rem] font-bold leading-tight mb-[1.6rem]">
            {product.title}
          </h1>

          <p className="text-[3.2rem] font-bold text-[#15803d] mb-[2.4rem]">
            &#8358;{product.price.toLocaleString()}
          </p>

          {product.description && (
            <p className="text-[1.6rem] leading-relaxed text-[#444] mb-[3.2rem]">
              {product.description}
            </p>
          )}

          {specs.length > 0 && (
            <dl className="grid grid-cols-2 gap-[2rem] mb-[3.2rem] pb-[3.2rem] border-b border-[#e8e8e8]">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-[1.2rem]">
                  <Icon fill="#15803d" className="mt-[0.3rem] shrink-0" />
                  <div>
                    <dt className="text-[1.2rem] uppercase tracking-wide text-[#6b6b6b]">
                      {label}
                    </dt>
                    <dd className="text-[1.5rem] font-semibold">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          )}

          {/* `stock` is display-only — Sanity has no row locking, so the real
              check happens server-side at checkout (see the backend roadmap). */}
          {typeof product.stock === 'number' && (
            <p
              className={`text-[1.4rem] mb-[2.4rem] ${
                outOfStock ? 'text-[#b91c1c]' : 'text-[#6b6b6b]'
              }`}
            >
              {outOfStock
                ? 'Currently out of stock'
                : `${product.stock} in stock`}
            </p>
          )}

          <AddToCartButton
            id={product.id}
            title={product.title}
            price={product.price}
            imgPath={imgPath}
            outOfStock={outOfStock}
          />
        </div>
      </div>
    </div>
  );
}
