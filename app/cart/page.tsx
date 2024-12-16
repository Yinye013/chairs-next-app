'use client';
import React from 'react';
import { useCartStore } from '@/app/store/store';
import { Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

const page = () => {
  const { cart, removeItem, incrementQuantity, decrementQuantity, clearCart } =
    useCartStore();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Your Cart</h1>
        {cart.length === 0 ? null : (
          <button
            onClick={() => clearCart()}
            className="bg-red-500 text-lg text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          Your cart is empty: no items in your cart
        </div>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between border-b py-4 space-y-4 sm:space-y-0"
            >
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <img
                  src={item.imgPath}
                  alt={item.title}
                  className="w-20 h-20 object-cover"
                />
                <div className="text-center sm:text-left">
                  <h2 className="font-semibold text-xl">{item.title}</h2>
                  <p className="text-gray-500 text-lg">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-xl">Quantity: {item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-xl">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 text-center sm:text-right">
            <h3 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h3>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-5 space-y-4 sm:space-y-0">
              <Link
                href="/bestsellers"
                className="text-lg bg-white border px-6 py-2 rounded-lg"
              >
                Continue Shopping
                <span className="text-[#15803d]"> &rarr;</span>
              </Link>
              <Link
                href={'/checkout'}
                className="w-full sm:w-auto bg-[#15803d] text-white px-6 py-2 text-xl rounded transition-colors duration-200 hover:bg-green-800"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
