import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../services/supabase';

export const useSession = () => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      }
    };
    checkSession();
  }, [router]);
};
