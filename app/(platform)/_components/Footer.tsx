import React from 'react';
import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaDribbble } from 'react-icons/fa';
import { FaPinterest } from 'react-icons/fa';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import Logo from './Logo';

const socialLinks = [
  { href: 'https://facebook.com', label: 'Facebook', Icon: FaFacebook },
  { href: 'https://instagram.com', label: 'Instagram', Icon: FaInstagram },
  { href: 'https://x.com', label: 'X (Twitter)', Icon: FaXTwitter },
  { href: 'https://dribbble.com', label: 'Dribbble', Icon: FaDribbble },
  { href: 'https://pinterest.com', label: 'Pinterest', Icon: FaPinterest },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-border pt-[6rem]">
      <div className="container grid grid-cols-1 gap-[4rem] pb-[4rem] sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-[1.6rem]">
          <Logo />
          <p className="text-[1.4rem] text-gray-500">
            Chairs designed for comfort, crafted to last.
          </p>
          <div className="flex gap-[2rem] text-[1.5rem] items-center">
            {socialLinks.map(({ href, label, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon size={'22px'} />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[1.2rem]">
          <h3 className="text-[1.5rem] font-bold uppercase tracking-wide">
            Shop
          </h3>
          <Link href="/bestsellers" className="text-[1.4rem] hover:underline">
            Bestsellers
          </Link>
          <Link href="/cart" className="text-[1.4rem] hover:underline">
            Cart
          </Link>
          <Link href="/checkout" className="text-[1.4rem] hover:underline">
            Checkout
          </Link>
        </div>

        <div className="flex flex-col gap-[1.2rem]">
          <h3 className="text-[1.5rem] font-bold uppercase tracking-wide">
            Company
          </h3>
          <Link href="/about" className="text-[1.4rem] hover:underline">
            About
          </Link>
          <Link href="/hit-us-up" className="text-[1.4rem] hover:underline">
            Contact
          </Link>
          <Link href="/login" className="text-[1.4rem] hover:underline">
            Log In
          </Link>
        </div>

        <div className="flex flex-col gap-[1.2rem]">
          <h3 className="text-[1.5rem] font-bold uppercase tracking-wide">
            Contact
          </h3>
          <Link
            href="https://wa.me/2348059939767"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[0.8rem] text-[1.4rem] hover:underline"
          >
            <FaWhatsapp size={'16px'} /> WhatsApp Order
          </Link>
          <Link
            href="tel:+2348059939767"
            className="flex items-center gap-[0.8rem] text-[1.4rem] hover:underline"
          >
            <FaPhone size={'14px'} /> Call Us
          </Link>
        </div>
      </div>

      <div className="container mt-6 border-t border-gray-200 py-[2rem]">
        <p className="text-[1.4rem] py-4 text-center">
          Copyright &copy;{` The Chair Shop Limited, ${year}`}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
