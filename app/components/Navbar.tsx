"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../ui/Logo";
import React, { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

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
    // {
    //   name: "Sign Up",
    //   link: "/sign-up",
    // },
  ];

  return (
    <header className="flex justify-between items-center h-[9.6rem]">
      <div className="container flex justify-between items-center sticky">
        <Logo />
        <nav>
          <ul className="hidden md:block lg:flex gap-[4.8rem]">
            {MENU_LINKS.map(({ link, name }) => (
              <Link
                href={link}
                key={link}
                className={`${
                  pathname === link && "text-[#15803d] font-bold"
                } navlink text-[1.8rem] font-semibold hover:text-green-700 transition-all`}
              >
                {name}
              </Link>
            ))}
          </ul>
        </nav>
        {loggedIn ? <p>Hello, User</p> : null}
      </div>
    </header>
  );
};

export default Navbar;
