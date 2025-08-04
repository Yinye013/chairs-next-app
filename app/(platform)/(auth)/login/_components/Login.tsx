import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useSignIn } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { usePasswordToggle } from '@/app/hooks/usePasswordVisibility';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

interface FormData {
  email: string;
  password: string;
}
interface ProfileData {
  name: string;
}

interface SignInResponse {
  data: {
    user: any;
    session: any;
  };
  profileData: ProfileData;
}

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();
  const methods = useForm<FormData>();
  const { register, handleSubmit, reset } = methods;
  const { isPasswordVisible, togglePasswordVisibility, inputType } =
    usePasswordToggle();
  const { signIn } = useSignIn();
  // const { signInWithGoogle } = useSignInWithGoogle();

  // LOGIN FUNCTIONALITY
  const onSubmit = (data: { email: string; password: string }) => {
    setIsLoading(true);
    signIn.mutate(data, {
      onSuccess: () => {
        toast.success('Login Successful');
        router.push('/');
        reset();
        setIsLoading(false);
      },
      onError: (err: any) => {
        toast.error('Login Failed. Invalid credentials');
        setIsLoading(false);
      },
    });
  };
  // const handleGoogleSignIn = async () => {
  //   await signInWithGoogle.mutate(undefined, {
  //     onSuccess: () => {
  //       router.push('/');
  //       setIsLoading(false);
  //     },
  //     onError: () => {
  //       toast.error('Login failed');
  //     },
  //   });
  // };

  return (
    <>
      <div className="">
        <button
          // Handle Google sign-in
          // onClick={handleGoogleSignIn}
          className="w-full bg-gray-3 text-primary-2/70 text-lg mb-3 flex justify-center border border-s gap-2 items-center py-3 bg-gray-1 hover:bg-gray-2 duration-300 rounded-[50px]"
        >
          <img src="/assets/google.svg" alt="Google Logo" />
          Continue with Google
        </button>
      </div>
      <div className="flex gap-2 w-full items-center">
        <hr className="!bg-primary-2/40 w-full" />
        <p className="text-lg">OR</p>
        <hr className="w-full !bg-primary-2/40" />
      </div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className=" gap-4 items-center">
          <label
            className="block font-bold text-[1.4rem] mb-[0.5rem]"
            htmlFor="Email"
          >
            Email
          </label>

          <input
            {...register('email')}
            className="input w-full"
            type="email"
            placeholder="john@example.com"
            required
          />
        </div>

        <div className=" gap-4 items-center">
          <label
            className="block font-bold text-[1.4rem] mb-[0.5rem]"
            htmlFor="Password"
          >
            Password
          </label>
          <div className="relative">
            <input
              {...register('password')}
              className="input w-full"
              type={inputType}
              placeholder="Your Password..."
              required
            />{' '}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-7 right-6"
            >
              {isPasswordVisible ? (
                <FaEyeSlash size={'15px'} />
              ) : (
                <FaEye size={'15px'} />
              )}
            </button>
          </div>
        </div>

        <Link
          href="/forgotpassword"
          className="block text-green-700 text-[1.4rem] font-semibold mb-[1.3rem]"
        >
          Forgot Password?
        </Link>

        <button
          className="text-white bg-green-700 px-5 py-4 rounded-md shadow-sm w-full text-2xl"
          disabled={isLoading}
        >
          {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Login'}
        </button>

        <p className="text-[1.4rem] mt-[1.3rem]">
          Don't have an account yet?{' '}
          <Link href="/sign-up" className="text-green-700 font-semibold">
            Sign up here.
          </Link>
        </p>
      </form>
    </>
  );
}
