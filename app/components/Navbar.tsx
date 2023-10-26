import Link from "next/link";
import React from "react";

const Navbar = () => {
  const links: string[] = [
    "About",
    "Bestsellers",
    "Hit Us Up",
    "Login",
    "Sign Up",
  ];
  const title: string = "TheChair";
  return (
    <header className="flex justify-between items-center h-[9.6rem]">
      <div className="container flex justify-between items-center">
        <p className="logo">
          {title} <span className="text-green-700">Shop.</span>
        </p>

        <nav>
          <ul
            className="hidden md:block lg:flex block gap-[4.8rem]
          "
          >
            {links.map((link) => (
              <Link
                href="/"
                key={link}
                className="navlink text-[1.8rem] font-semibold hover:text-green-700 transition-all"
              >
                {" "}
                {link}
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
