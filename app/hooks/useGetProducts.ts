import supabase from "../services/supabase";
import { useQuery } from "@tanstack/react-query";
import { useProductStore } from "../store/store";

// creating a custom hook to fetch products and store them in zustand
export const useGetProducts = () => {
  const setProducts = useProductStore((state) => state.setProducts);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.log(error);
    return data ?? [];
  };

  const {
    data: products,
    isLoading,
    error,
  } = useQuery(["products"], fetchProducts, {
    onSuccess: (data) => {
      setProducts(data);
    },
  });
  return { products, isLoading, error };
};
