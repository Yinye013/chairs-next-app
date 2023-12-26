import React, { useState } from "react";
import Link from "next/link";

import { login } from "../services/apiAuth";
import useLogin from "../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login, isLoading } = useLogin();

  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) return;
    login({ email, password });

    const values = {
      email,
      password,
    };
    console.log(values);
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <form className=" pl-[9rem]" onSubmit={handleSubmit}>
        <div className=" gap-4 items-center">
          <label
            className="block font-bold text-[1.4rem] mb-[0.5rem]"
            htmlFor="Email"
          >
            Email
          </label>
          <input
            className="input"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
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
          <input
            className="input"
            type="password"
            placeholder="Your Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="password"
          />
        </div>
        <Link
          href="/forgotpassword"
          className="block text-green-700 text-[1.4rem] font-semibold mb-[1.3rem]"
        >
          Forgot Password?
        </Link>
        <button className="text-white bg-green-700 w-[70%] px-[2.8rem] py-[1.4rem] text-[1.6rem]">
          Login
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

export default Login;
