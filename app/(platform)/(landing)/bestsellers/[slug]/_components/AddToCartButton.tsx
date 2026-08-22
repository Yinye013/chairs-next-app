'use client';

import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCartStore } from '@/app/store/store';

/** A sane ceiling for a single add; the real limit is server-side stock. */
const MAX_QUANTITY = 99;

type AddToCartButtonProps = {
  /** Product slug — the cart line id. Never Sanity's `_id`. */
  id: string;
  title: string;
  price: number;
  /** Already-resolved CDN URL, built server-side. */
  imgPath: string;
  outOfStock?: boolean;
};

/**
 * The only client component on the detail page: everything else is static, so
 * this keeps the route's JS to the cart store plus this button.
 */
export default function AddToCartButton({
  id,
  title,
  price,
  imgPath,
  outOfStock = false,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    // One call, one state write, one toast — `addItem` takes the quantity.
    // Never loop this: that was N toasts and N re-renders for one action.
    addItem({ id, title, price, imgPath }, quantity);
  };

  if (outOfStock) {
    return (
      <button
        type="button"
        disabled
        className="w-full sm:w-auto uppercase text-[1.4rem] px-[2.4rem] py-[1.2rem] bg-[#e8e8e8] text-[#6b6b6b] font-bold rounded-md cursor-not-allowed"
      >
        Out of stock
      </button>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[1.6rem]">
      <div className="flex items-center border border-[#e8e8e8] rounded-md self-start">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity === 1}
          aria-label="Decrease quantity"
          className="px-[1.6rem] py-[1rem] text-[1.8rem] leading-none disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f5f5f5] transition-colors rounded-l-md"
        >
          &minus;
        </button>
        <span
          aria-live="polite"
          className="px-[1.6rem] text-[1.6rem] font-semibold tabular-nums min-w-[4rem] text-center"
        >
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
          disabled={quantity === MAX_QUANTITY}
          aria-label="Increase quantity"
          className="px-[1.6rem] py-[1rem] text-[1.8rem] leading-none disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f5f5f5] transition-colors rounded-r-md"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center justify-center gap-[1.2rem] uppercase text-[1.4rem] px-[2.4rem] py-[1.2rem] bg-[#15803d] text-white font-bold rounded-md hover:bg-[#166534] transition-colors"
      >
        Add to cart <FaShoppingCart fill="#fff" />
      </button>
    </div>
  );
}
