import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiClient, getErrorMessage } from '@/app/utils/apiClient';

export const useSignUp = () => {
  const signUp = useMutation(
    async (credentials: { email: string; password: string; name: string }) => {
      const { data } = await apiClient.post('/auth/register', credentials);
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentUser', JSON.stringify(data));
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success('Registration Successful');
      },
      onError: (error: unknown) => {
        toast.error(getErrorMessage(error, 'Registration failed.'));
      },
    },
  );
  return { signUp };
};

// SIGN OUT HOOK
export const useSignOut = () => {
  return useMutation(async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  }, {
    onSuccess: () => {
      toast.success('Signed Out Successfully');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Error signing out'));
    },
  });
};

//SIGN IN (LOGIN) HOOK
export const useSignIn = () => {
  const signIn = useMutation(
    async (credentials: { email: string; password: string }) => {
      const { data } = await apiClient.post('/auth/login', credentials);
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentUser', JSON.stringify(data));
      }
      return data;
    },
    {
      onError: (error: unknown) => {
        const errorMessage = getErrorMessage(
          error,
          'Login failed. Invalid credentials',
        );
        console.error('Error:', errorMessage);
        toast.error(errorMessage);
      },
      onSuccess: (data) => {
        toast.success(`Welcome back, ${data.name}!`);
      },
    },
  );
  return { signIn };
};
