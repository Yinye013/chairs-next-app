'use client';

import Link from 'next/link';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { HiBars3BottomLeft } from 'react-icons/hi2';
import { MdClose } from 'react-icons/md';
import { IoCartOutline } from 'react-icons/io5';
import { RxAvatar } from 'react-icons/rx';
import { useCartStore } from '@/app/store/store';
import { useIsDesktop, useHasMounted } from '@/app/hooks/useMediaQuery';
import { MENU_LINKS } from './navLinks';

/**
 * Mobile navigation: the hamburger trigger and its full-screen overlay.
 *
 * Owns all of its own state so the Navbar stays a plain presentational bar.
 * On desktop this renders `null` outright — the overlay is never in the DOM
 * at all, rather than being hidden with a `lg:hidden` class.
 *
 * The overlay is portalled to `document.body` so it escapes the navbar's
 * stacking and layout context; a `position: fixed` element nested inside the
 * header gets sized by the header's flex row instead of filling the viewport.
 */
const MobileMenu = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const hasMounted = useHasMounted();
  const { cart } = useCartStore();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Close on navigation, otherwise the menu covers the page just opened.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Growing past the breakpoint must dismiss it, or it lingers as a
  // full-screen layer that swallows clicks.
  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  // Lock the page behind the overlay, and let Escape close it.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Nothing to render on desktop. `hasMounted` keeps the server and first
  // client paint agreeing before the media query is known.
  if (!hasMounted || isDesktop) return null;

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="relative z-[110] block transition-all duration-500"
      >
        {open ? <MdClose size="30px" /> : <HiBars3BottomLeft size="30px" />}
      </button>

      {open &&
        createPortal(
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="menu-overlay fixed inset-0 z-[95] flex flex-col justify-center items-center gap-[3.2rem] px-[3.2rem]"
          >
            <ul className="flex flex-col items-center gap-[1.6rem]">
              {MENU_LINKS.map(({ link, name }, i) => (
                <li
                  key={link}
                  className="menu-item"
                  style={{ animationDelay: `${80 + i * 70}ms` }}
                >
                  <Link
                    href={link}
                    onClick={close}
                    className={`${
                      pathname === link ? 'text-[#15803d]' : 'text-[#222]'
                    } block text-[3.6rem] font-bold leading-[1.3] tracking-tight hover:text-[#15803d] transition-colors`}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Secondary actions, divided off from the main links */}
            <div
              className="menu-item flex items-center justify-center gap-[3.2rem] w-[60%] max-w-[28rem] pt-[3.2rem] border-t border-black/10"
              style={{ animationDelay: `${80 + MENU_LINKS.length * 70}ms` }}
            >
              <Link
                href="/cart"
                onClick={close}
                className="flex items-center gap-[0.8rem] text-[1.8rem] font-semibold text-[#444] hover:text-[#15803d] transition-colors"
              >
                <IoCartOutline size="22px" />
                Cart{totalItems > 0 && ` (${totalItems})`}
              </Link>
              <Link
                href="/login"
                onClick={close}
                className="flex items-center gap-[0.8rem] text-[1.8rem] font-semibold text-[#444] hover:text-[#15803d] transition-colors"
              >
                <RxAvatar size="22px" />
                Account
              </Link>
            </div>
          </nav>,
          document.body,
        )}
    </>
  );
};

export default MobileMenu;
