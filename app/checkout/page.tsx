// pages/checkout.tsx

'use client';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useCartStore } from '@/app/store/store';
import { Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useCurrentUser } from '@/app/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { cart, removeItem, incrementQuantity, decrementQuantity, clearCart } =
    useCartStore();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const { user } = useCurrentUser();

  // Shipping form state
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async () => {
    // Placeholder for checkout logic (e.g., payment integration)
    // For demonstration, we'll just clear the cart and show a success message
    try {
      // Here you would handle payment processing

      // On successful payment
      clearCart();
      toast.success('Order placed successfully!');
      // Redirect to order confirmation page if available
    } catch (error: any) {
      console.error('Checkout Error:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  if (!user) {
    toast.error('Please log in or sign up to checkout');
    router.push('/login');

    return <></>;
  } else {
    return (
      <div className="min-h-screen p-4 bg-gray-100">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

          {/* Order Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            {cart.length === 0 ? (
              <div className="text-center text-gray-500">
                Your cart is empty.{' '}
                <Link href="/bestsellers" className="text-blue-500 underline">
                  Shop now
                </Link>
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
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="text-center sm:text-left">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-gray-500 text-sm">
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
                        <span className="text-md">Qty: {item.quantity}</span>
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="text-md font-semibold">
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

                <div className="mt-6 text-right">
                  <h3 className="text-xl font-bold">
                    Total: ${total.toFixed(2)}
                  </h3>
                </div>
              </div>
            )}
          </div>

          {/* Shipping Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Shipping Information
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={shippingInfo.fullName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="123 Main St"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="New York"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-gray-700">
                  State/Province
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="NY"
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={shippingInfo.postalCode}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="10001"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-gray-700">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Country</option>
                  <option value="USA">United States</option>
                  <option value="CAN">Canada</option>
                  <option value="GBR">United Kingdom</option>
                  <option value="AUS">Australia</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
            </form>
          </div>

          {/* Payment Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
            {/* Placeholder for payment integration */}
            <div className="p-4 border border-gray-300 rounded-md text-center text-gray-500">
              Payment integration goes here (e.g., Stripe Checkout)
            </div>
          </div>

          {/* Order Total and Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-xl font-bold">
                Order Total: ${total.toFixed(2)}
              </h3>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/bestsellers"
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Continue Shopping
              </Link>
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className={`px-6 py-2 text-white rounded-lg transition-colors duration-200 ${
                  cart.length === 0
                    ? 'bg-green-300 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CheckoutPage;
