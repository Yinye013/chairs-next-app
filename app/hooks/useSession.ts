import { useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "../services/supabase";

export const useSession = () => {
  const router = useRouter();
  useEffect(() => {
    const session = supabase.auth.getSession();
    if (!session) {
      router.push("/login");
    }
  }, [router]);
};
