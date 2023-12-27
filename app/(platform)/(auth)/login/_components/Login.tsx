import Link from "next/link";

import { useForm } from "react-hook-form";
import { useLogin } from "@/app/hooks/useCalls";

export default function Login() {
  const methods = useForm();

  const { register, handleSubmit } = methods;

  const { loginUser } = useLogin();

  async function onSubmit(data: any) {
    try {
     await loginUser.mutate(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className=" pl-[9rem]" onSubmit={handleSubmit(onSubmit)}>
      <div className=" gap-4 items-center">
        <label className="block font-bold text-[1.4rem] mb-[0.5rem]" htmlFor="Email">
          Email
        </label>

        <input {...register("email")} className="input" type="email" placeholder="john@example.com" required />
      </div>

      <div className=" gap-4 items-center">
        <label className="block font-bold text-[1.4rem] mb-[0.5rem]" htmlFor="Password">
          Password
        </label>

        <input {...register("password")} className="input" type="password" placeholder="Your Password..." required />
      </div>

      <Link href="/forgotpassword" className="block text-green-700 text-[1.4rem] font-semibold mb-[1.3rem]">
        Forgot Password?
      </Link>

      <button className="text-white bg-green-600 px-5 py-4 rounded-md shadow-sm w-1/2 text-2xl">
        {loginUser.isLoading ? "Loading..." : "Login"}
      </button>

      <p className="text-[1.4rem] mt-[1.3rem]">
        Don't have an account yet?{" "}
        <Link href="/sign-up" className="text-green-700 font-semibold">
          Sign up here.
        </Link>
      </p>
    </form>
  );
}
