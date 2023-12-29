import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSignUp } from "@/app/hooks/useCalls";
import { useRouter } from "next/navigation";

function Signup() {
  const { register, handleSubmit, reset } = useForm();

  const { signupUser } = useSignUp();

  async function onSubmit(data: any) {
    try {
      console.log(data);
      await signupUser.mutate(data);
    } catch (error) {
      console.log(error);
    }
    reset();
  }
  return (
    <>
      <form className="pl-[9rem]" onSubmit={handleSubmit(onSubmit)}>
        <div className=" gap-4 items-center">
          <label className="block font-bold text-[1.4rem] mb-[0.5rem]" htmlFor="Email">
            Email
          </label>
          <input {...register("email")} className="input" type="email" placeholder="john@example.com" required />
        </div>
        {/*  */}

        {/*  */}
        <div className=" gap-4 items-center">
          <label className="block font-bold text-[1.4rem] mb-[0.5rem]" htmlFor="Password">
            Password
          </label>
          <input {...register("password")} className="input" type="password" placeholder="Your Password..." required />
        </div>
        {/*  */}
        <div className=" gap-4 items-center">
          <label className="block font-bold text-[1.4rem] mb-[0.5rem]" htmlFor="Name">
            Name
          </label>
          <input {...register("name")} className="input" type="text" placeholder="Your Name, e.g. John Doe" required />
        </div>

        <button className="text-white bg-green-700 w-[70%] px-[2.8rem] py-[1.4rem] text-[1.6rem]">Sign Up</button>

        <p className="text-[1.4rem] font-semibold mt-[2rem]">
          Signed Up Successfully? Back to{" "}
          <Link href="/login" className="text-green-700">
            login.
          </Link>
        </p>
      </form>
    </>
  );
}

export default Signup;
