import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { usePasswordToggle } from '@/app/hooks/usePasswordVisibility';
import { useSignUp } from '@/app/hooks/useAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
// import { useSignUpWithGoogle } from '@/app/hooks/useAuth';

interface FormData {
  email: string;
  password: string;
  name: string;
}

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isPasswordVisible, togglePasswordVisibility, inputType } =
    usePasswordToggle();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { signUp } = useSignUp();
  // const { signUpWithGoogle } = useSignUpWithGoogle();

  // SIGNUP FUNCTIONALITY
  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    signUp.mutate(formData, {
      onSuccess: () => {
        toast.success('Registration Successful');
        reset();
        router.push('/');
        setIsLoading(false);
      },
      onError: () => {
        toast.error('Registration failed');
      },
    });
  }
  // const handleGoogleSignUp = async () => {
  //   await signUpWithGoogle.mutate(undefined, {
  //     onSuccess: () => {
  //       router.push('/');
  //       setIsLoading(false);
  //     },
  //     onError: () => {
  //       toast.error('Registration failed');
  //     },
  //   });
  // };
  return (
    <>
      <div className="">
        <button
          // Handle Google sign-in
          // onClick={handleGoogleSignUp}
          className="w-full bg-gray-3 text-primary-2/70 text-lg mb-3 flex justify-center border border-s gap-2 items-center py-3 bg-gray-1 hover:bg-gray-2 duration-300 rounded-[50px]"
        >
          <img src="/assets/google.svg" alt="Google Logo" />
          Sign In With Google
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
        {/*  */}

        {/*  */}
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
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-7 right-5"
            >
              {isPasswordVisible ? (
                <FaEyeSlash size={'15px'} />
              ) : (
                <FaEye size={'15px'} />
              )}
            </button>
          </div>
        </div>
        {/*  */}
        <div className=" gap-4 items-center">
          <label
            className="block font-bold text-[1.4rem] mb-[0.5rem]"
            htmlFor="Name"
          >
            Name
          </label>
          <input
            {...register('name')}
            className="input w-full"
            type="text"
            placeholder="Your Name, e.g. John Doe"
            required
          />
        </div>

        <button
          className="text-white rounded-lg bg-green-700 w-full px-[2.8rem] py-[1.4rem] text-[1.6rem]"
          disabled={isLoading}
        >
          {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Sign Up'}
        </button>

        <p className="text-[1.4rem] font-semibold mt-[2rem]">
          Signed Up Successfully? Back to{' '}
          <Link href="/login" className="text-green-700">
            login.
          </Link>
        </p>
      </form>
    </>
  );
}

export default Signup;
