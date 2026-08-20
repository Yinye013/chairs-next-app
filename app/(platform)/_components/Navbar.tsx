'use client';

import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';
import { RxAvatar } from 'react-icons/rx';
import { usePathname } from 'next/navigation';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import Logo from './Logo';
import AccountMenu from './AccountMenu';
import MobileMenu from './MobileMenu';
import { useCartStore } from '@/app/store/store';
import { useHasMounted } from '@/app/hooks/useMediaQuery';
import GlassFilter from '@/app/components/GlassFilter';
import { MENU_LINKS } from './navLinks';

const Navbar = () => {
  const pathname = usePathname();
  const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);
  const { cart } = useCartStore();
  // The cart is hydrated from localStorage, which the server cannot see, so
  // rendering the count before mount produces a hydration mismatch (server
  // says 0, client says N). Show 0 until mounted, then the real count.
  const hasMounted = useHasMounted();
  const totalItems = hasMounted
    ? cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  // Close account menu when pathname changes
  useEffect(() => {
    setShowAccountMenu(false);
  }, [pathname]);

  return (
    <header className="nav-glass top-0 left-0 right-0 z-[100] flex justify-between items-center h-[9.6rem]">
      <GlassFilter />
      <div className="container flex justify-between items-center">
        <Logo />

        {/* Primary links, inline in the bar from `lg` up */}
        <nav className="hidden lg:block">
          <ul className="flex flex-row gap-[4.8rem]">
            {MENU_LINKS.map(({ link, name }) => (
              <li key={link}>
                <Link
                  href={link}
                  className={`${
                    pathname === link ? 'text-[#15803d] font-bold' : ''
                  } navlink text-[1.8rem] font-semibold hover:text-green-700 transition-all`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* for cart and avatar */}
        <div className="flex items-center gap-8 bg-gray-200 px-1 py-1 rounded-full">
          <Link
            className="rounded-full bg-gray-500 p-1 lg:p-2 relative cursor-pointer"
            href={'/cart'}
          >
            <IoCartOutline className="text-white" size={' 25px'} />
            <p className="absolute top-0 md:top-1 right-0 md:right-1 lg:right-2  bg-[#FF0000] border border-white h-[15px] w-[15px] rounded-full text-[10px] text-white flex items-center justify-center">
              {totalItems}
            </p>
          </Link>

          <div
            ref={avatarRef}
            className="bg-[#15803d] rounded-full md:p-1 lg:p-2 cursor-pointer"
            onClick={toggleAccountMenu}
          >
            <RxAvatar className="text-white" size={'25px'} />
          </div>
        </div>
        {/* end of cart and avatar */}

        <AccountMenu
          visible={showAccountMenu}
          onClose={() => setShowAccountMenu(false)}
          triggerRef={avatarRef}
        />

        {/* Hamburger + overlay; renders nothing at all on desktop */}
        <MobileMenu />
      </div>
    </header>
  );
};

export default Navbar;
