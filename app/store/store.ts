import { create } from 'zustand';
import { toast } from 'react-toastify';

// Shape accepted by addItem — exactly the fields a cart line needs.
//
// `id` is the product slug (e.g. 'classic-comfort'), never Sanity's _id, and
// `imgPath` is a resolved image URL. Both are persisted to localStorage, so
// changing either format orphans visitors' existing carts.
interface CartInput {
  id: string;
  title: string;
  price: number;
  imgPath: string;
}

// cart. Create a cart store that will hold the cart items and the functions to add and remove items from the cart.
interface CartItems {
  id: string; // Product ID
  title: string;
  price: number;
  imgPath: string;
  quantity: number;
}
interface CartStore {
  cart: CartItems[];
  addItem: (product: CartInput) => void;
  removeItem: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  //add cart to local storage
  cart: (() => {
    try {
      // Check if we're on the client side
      if (typeof window !== 'undefined') {
        const cartFromStorage = localStorage.getItem('cart');
        return cartFromStorage ? JSON.parse(cartFromStorage) : [];
      }
      return [];
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return [];
    }
  })(), //IIFE usage
  //JSON.parse(localStorage.getItem('cart') || '[]')
  addItem: (product) => {
    const cart = get().cart;
    const existingItem = cart.find((item: any) => item.id === product.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item: any) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      toast.success(`Increased quantity of "${product.title}" in your cart!`);
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
      toast.success(`Added "${product.title}" to your cart!`);
    }

    // Ensure local storage is updated
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    set({ cart: updatedCart });
    return { cart: updatedCart };
  },

  incrementQuantity: (productId: any) => {
    // increment the quantity
    const cart = get().cart;
    const updatedCart = cart.map((item: any) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
    );

    // Ensure local storage is updated
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    set({ cart: updatedCart });
    return { cart: updatedCart };
  },

  decrementQuantity: (productId: any) => {
    // decrement the quantity
    const cart = get().cart;
    const updatedCart = cart
      .map((item: any) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      )
      .filter((item: any) => item.quantity > 0);

    // Ensure local storage is updated
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    set({ cart: updatedCart });
    return { cart: updatedCart };
  },

  removeItem: (productId) => {
    const cart = get().cart;
    const updatedCart = cart.filter((item: any) => item.id !== productId);

    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    set({ cart: updatedCart });
    toast.info(`Item removed from your cart!`);
    return { cart: updatedCart };
  },
  clearCart: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }

    set({ cart: [] });
    toast.warn('Cart cleared!');
    return { cart: [] };
  },
}));
