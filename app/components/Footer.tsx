import React from "react";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaDribbble } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import Logo from "../ui/Logo";
const year = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer-border pt-[3.8rem]">
      <div className="container flex flex-col items-center justify-center gap-[3rem] lg:flex-row justify-between mb-[3rem]">
        <div>
          <Logo />
        </div>
        <div className="flex gap-[3rem] text-[1.5rem] items-center">
          <Link href="facebook.com" target="_blank">
            <FaFacebook size={"30px"} />
          </Link>
          <Link href={"instagram.com"}>
            <FaInstagram size={"30px"} />
          </Link>
          <Link href={"x.com"}>
            <FaXTwitter size={"30px"} />
          </Link>
          <Link href={"dribbble.com"}>
            <FaDribbble size={"30px"} />
          </Link>
          <Link href={"pinterest.com"}>
            <FaPinterest size={"30px"} />
          </Link>
        </div>
        <p className="text-[1.4rem]">
          Copyright &copy;{`The Chair Shop Limited, ${year}`}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
