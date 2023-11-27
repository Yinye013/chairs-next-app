"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const title: string = "TheChair";

  const router = useRouter();

  const MENU_LINKS = [
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Bestsellers",
      link: "/bestsellers",
    },
    {
      name: "Hit Us Up",
      link: "/hit-us-up",
    },
    {
      name: "Login",
      link: "/login",
    },
    {
      name: "Sign Up",
      link: "/about",
    },
  ];

  return (
    <header className="flex justify-between items-center h-[9.6rem]">
      <div className="container flex justify-between items-center">
        <p onClick={() => router.push("/")} className="logo cursor-pointer">
          {title} <span className="text-green-700">Shop.</span>
        </p>

        <nav>
          <ul className="hidden md:block lg:flex gap-[4.8rem]">
            {MENU_LINKS.map(({ link, name }) => (
              <Link
                href={link}
                key={link}
                className="navlink text-[1.8rem] font-semibold hover:text-green-700 transition-all"
              >
                {name}
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
