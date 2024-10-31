import { create } from "zustand";

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
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
