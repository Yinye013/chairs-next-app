import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  console.error(
    'NEXT_PUBLIC_API_URL is not set. API requests will fail. Add it to .env.local.',
  );
}

export const apiClient = axios.create({
  baseURL,
});

export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.message ?? fallback;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
};
