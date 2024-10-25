import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSignIn } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { usePasswordToggle } from "@/app/hooks/usePasswordVisibility";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

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
  const router = useRouter();
  const methods = useForm<FormData>();
  const { register, handleSubmit, reset } = methods;
  const { isPasswordVisible, togglePasswordVisibility, inputType } = usePasswordToggle();
  const { mutate: signIn, isLoading, isError, error } = useSignIn();

  // LOGIN FUNCTIONALITY
  const onSubmit = (data: { email: string; password: string }) => {
    signIn(data, {
      onSuccess: (result) => {
        if (result) {
          const { profileData } = result as SignInResponse;
          toast.success(`Welcome back, ${profileData.name}`);
          router.push("/");
          // console.log(result);
          reset();
        } else {
          toast.error("Login failed. Please try again.");
        }
      },
      onError: (err: any) => {
        toast.error("Login Failed. Invalid credentials");
      },
    });
  };

  return (
    <>
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
          <input
            {...register("password")}
            className="input mr-[-2.5rem]"
            type={inputType}
            placeholder="Your Password..."
            required
          />{" "}
          <button type="button" onClick={togglePasswordVisibility}>
            {isPasswordVisible ? <FaEyeSlash size={"15px"} /> : <FaEye size={"15px"} />}
          </button>
        </div>

        <Link href="/forgotpassword" className="block text-green-700 text-[1.4rem] font-semibold mb-[1.3rem]">
          Forgot Password?
        </Link>

        <button className="text-white bg-green-700 px-5 py-4 rounded-md shadow-sm w-1/2 text-2xl" disabled={isLoading}>
          {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Login"}
        </button>

        <p className="text-[1.4rem] mt-[1.3rem]">
          Don't have an account yet?{" "}
          <Link href="/sign-up" className="text-green-700 font-semibold">
            Sign up here.
          </Link>
        </p>
      </form>
    </>
  );
}
