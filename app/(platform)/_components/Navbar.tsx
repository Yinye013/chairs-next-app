"use client";

import Link from "next/link";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { MdClose } from "react-icons/md";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Logo from "./Logo";

const Navbar = () => {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [navOpen, setNavOpen] = useState<boolean>(false);

  function toggleNav() {
    setNavOpen(!navOpen);
  }

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
    <header className="flex justify-between items-center h-[9.6rem] ">
      <div className="container flex justify-between items-center sticky">
        <Logo />
        <nav>
          <ul
            className={`${
              navOpen
                ? "flex flex-col gap-[1.7rem] absolute top-1/2 left-1/2  p-20 w-[100%] h-[100vh] backdrop-blur-lg opacity-1 pointer-events-auto z-50"
                : "hidden"
            } md:block lg:flex flex-row gap-[4.8rem]`}
          >
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
        <div onClick={toggleNav} className="block transition-all duration-500 lg:hidden">
          {navOpen ? <MdClose size={"30px"} /> : <HiBars3BottomLeft size={"30px"} />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
