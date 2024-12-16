import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const currentUser = localStorage.getItem('currentUser');
      return currentUser ? JSON.parse(currentUser) : null;
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(!user);

  useEffect(() => {
    const checkUser = () => {
      setIsLoading(true);
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        try {
          const parsedUser: User = JSON.parse(currentUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user from localStorage:', error);
          localStorage.removeItem('currentUser');
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    if (!user) {
      checkUser();
    }
  }, [user]);

  return { user, isLoading };
};
