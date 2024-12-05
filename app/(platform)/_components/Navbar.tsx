'use client';

import Link from 'next/link';
import { HiBars3BottomLeft } from 'react-icons/hi2';
import { IoCartOutline } from 'react-icons/io5';
import { RxAvatar } from 'react-icons/rx';
import { MdClose } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import React, { useState, useCallback } from 'react';
import Logo from './Logo';
import AccountMenu from './AccountMenu';
import { useCartStore } from '@/app/store/store';

const Navbar = () => {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);
  const { cart } = useCartStore();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  function toggleNav() {
    setNavOpen(!navOpen);
  }

  const MENU_LINKS = [
    {
      name: 'About',
      link: '/about',
    },
    {
      name: 'Bestsellers',
      link: '/bestsellers',
    },
    {
      name: 'Hit Us Up',
      link: '/hit-us-up',
    },
    // {
    //   name: "Login",
    //   link: "/login",
    // },
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
                ? 'flex flex-col gap-[1.7rem] absolute top-1/2 left-1/2  p-20 w-[100%] h-[100vh] backdrop-blur-lg opacity-1 pointer-events-auto z-50'
                : 'hidden'
            } md:block lg:flex flex-row gap-[4.8rem]`}
          >
            {MENU_LINKS.map(({ link, name }) => (
              <Link
                href={link}
                key={link}
                className={`${
                  pathname === link && 'text-[#15803d] font-bold'
                } navlink text-[1.8rem] font-semibold hover:text-green-700 transition-all`}
              >
                {name}
              </Link>
            ))}
          </ul>
        </nav>

        {/* for cart and avatar */}
        <div className="flex items-center gap-8 bg-gray-200 px-1 py-1 rounded-full">
          <div className="rounded-full bg-gray-500 p-1 lg:p-2 relative cursor-pointer">
            <IoCartOutline className="text-white" size={' 25px'} />
            <p className="absolute top-0 md:top-1 right-0 md:right-1 lg:right-2  bg-[#FF0000] border border-white h-[15px] w-[15px] rounded-full text-[10px] text-white flex items-center justify-center">
              {totalItems}
            </p>
          </div>

          <div className="bg-[#15803d] rounded-full md:p-1 lg:p-2 cursor-pointer" onClick={toggleAccountMenu}>
            <RxAvatar className="text-white" size={'25px'} />
          </div>
        </div>
        {/* end of cart and avatar */}

        <AccountMenu visible={showAccountMenu} />
        <div onClick={toggleNav} className="block transition-all duration-500 lg:hidden">
          {navOpen ? <MdClose size={'30px'} /> : <HiBars3BottomLeft size={'30px'} />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
