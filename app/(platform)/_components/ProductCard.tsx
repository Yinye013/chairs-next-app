'use client';

import React from 'react';
import Image from 'next/image';
import { FaRegStar, FaShoppingCart } from 'react-icons/fa';
import { CiClock2 } from 'react-icons/ci';
import { IoEarthSharp } from 'react-icons/io5';
import { GiCubes } from 'react-icons/gi';
import { useCartStore } from '@/app/store/store';
import { urlFor } from '@/sanity/lib/image';
import type { Product } from '@/app/utils/types';

const ProductCard: React.FC<Product> = ({
  id,
  title,
  price,
  useCase,
  comfort,
  material,
  weightKg,
  imageRef,
  alt,
  blurDataURL,
}) => {
  const addtoCart = useCartStore((state) => state.addItem);

  // Resized/WebP via the CDN rather than the full-size original.
  const imgPath = urlFor(imageRef).width(800).height(500).url();

  const specs = [
    { icon: FaRegStar, value: useCase },
    { icon: CiClock2, value: comfort },
    { icon: IoEarthSharp, value: material },
    {
      icon: GiCubes,
      value: weightKg ? `Weighs ${weightKg}kg` : undefined,
    },
  ].filter((s) => s.value);

  return (
    <div className="max-w-xl rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-[25rem]">
        <Image
          src={imgPath}
          alt={alt || title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          {...(blurDataURL ? { placeholder: 'blur' as const, blurDataURL } : {})}
        />
      </div>
      <div className="p-4">
        <h1 className="text-[2.4rem] font-bold mb-2">{title}</h1>
        <div>
          <ul className="grid grid-cols-2 text-[1.2rem] font-semibold gap-4 list-none p-0 tracking-wide">
            {specs.map(({ icon: Icon, value }) => (
              <li key={value} className="flex items-center gap-[1rem]">
                <Icon fill="#15803d" />
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-between p-4">
        <p className="text-[2.4rem] font-bold">
          &#8358;{price.toLocaleString()}
        </p>
        <button
          className="flex items-center gap-[1.2rem] uppercase text-[1.4rem] px-[1.6rem] py-[0.8rem] bg-[#15803d] text-white font-bold rounded-md"
          // Cart contract: the shape and the slug-based `id` must not change,
          // or previously persisted localStorage carts orphan.
          onClick={() => addtoCart({ title, id, price, imgPath })}
        >
          Add to cart <FaShoppingCart fill="#fff" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
