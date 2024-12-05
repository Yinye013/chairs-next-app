import { create } from 'zustand';
import { toast } from 'react-toastify';

interface Product {
  imgPath: string;
  title: string;
  listItemOne: string;
  listItemTwo: string;
  listItemThree: string;
  listItemFour: string;
  price: number;
  id: string;
}

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  // for pagination
  currentPage: number;
  rowsPerPage: number;
  setPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  //   for pagination
  currentPage: 0,
  rowsPerPage: 2,
  setPage: (page) => set({ currentPage: page }),
  setRowsPerPage: (rows) => set({ rowsPerPage: rows }),
}));

// cart. Create a cart store that will hold the cart items and the functions to add and remove items from the cart.
// interface Product {
//   id: string;
//   title: string;
//   price: number;
//   quantity: number; // Add quantity here
// }
interface CartItems {
  id: string; // Product ID
  title: string;
  price: number;
  quantity: number;
}
interface CartStore {
  cart: CartItems[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  //add cart to local storage
  cart: [],
  //JSON.parse(localStorage.getItem('cart') || '[]')
  addItem: (product) => {
    const cart = get().cart; //always get the current cart
    const existingItem = cart.find((item: any) => item.id === product.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = set({
        cart: cart.map((item: any) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
      });
      toast.success(`Increased quantity of "${product.title}" in your cart!`);
    } else {
      updatedCart = set({ cart: [...cart, { ...product, quantity: 1 }] }); //error here: SPREAD OUT THE
      toast.success(`Added "${product.title}" to your cart!`);
    }
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to localStorage
    return { cart: updatedCart };
  },

  removeItem: (productId) => {
    const cart = get().cart;
    const updatedCart = set({ cart: cart.filter((item: any) => item.id !== productId) });
    toast.info(`Item removed from your cart!`);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to localStorage
    return { cart: updatedCart };
  },
  clearCart: () => {
    set({ cart: [] });
    toast.warn('Cart cleared!');
    return { cart: [] };
  },
}));
