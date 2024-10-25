import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { usePasswordToggle } from "@/app/hooks/usePasswordVisibility";
import { useSignUp } from "@/app/hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

interface FormData {
  email: string;
  password: string;
  name: string;
}

function Signup() {
  const router = useRouter();
  const { isPasswordVisible, togglePasswordVisibility, inputType } = usePasswordToggle();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { mutate: signUp, isLoading, isError, error } = useSignUp();

  // SIGNUP FUNCTIONALITY
  function onSubmit(data: { email: string; password: string; name: string }) {
    signUp(data, {
      onSuccess: () => {
        toast.success(`Welcome ${data.name}, you have registered successfully!`);
        router.push("/");
      },
      onError: () => {
        toast.error("Not registered");
      },
    });
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
          <input
            {...register("password")}
            className="input mr-[-2.5rem]"
            type={inputType}
            placeholder="Your Password..."
            required
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {isPasswordVisible ? <FaEyeSlash size={"15px"} /> : <FaEye size={"15px"} />}
          </button>
        </div>
        {/*  */}
        <div className=" gap-4 items-center">
          <label className="block font-bold text-[1.4rem] mb-[0.5rem]" htmlFor="Name">
            Name
          </label>
          <input {...register("name")} className="input" type="text" placeholder="Your Name, e.g. John Doe" required />
        </div>

        <button className="text-white bg-green-700 w-[70%] px-[2.8rem] py-[1.4rem] text-[1.6rem]" disabled={isLoading}>
          {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Sign Up"}
        </button>

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
