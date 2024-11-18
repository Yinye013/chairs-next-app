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
