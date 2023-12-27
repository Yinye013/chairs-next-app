import React from "react";
import Link from "next/link";

function Signup() {
  return (
    <>
      <form className="pl-[9rem]">
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
          />
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
            className="input"
            type="password"
            placeholder="Your Name, e.g. John Doe"
          />
        </div>

        <button className="text-white bg-green-700 w-[70%] px-[2.8rem] py-[1.4rem] text-[1.6rem]">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default Signup;
