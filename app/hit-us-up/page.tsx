import Link from "next/link";
import React from "react";
import { hitusupArr } from "../testFile.ts";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

function page() {
  return (
    <div className="section-pad">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center bg-[#15803d]">
        <div className="grid grid-cols-3 overflow-hidden gap-[0.5rem] bg-white">
          {hitusupArr.map((gridpic) => (
            <div key={gridpic.id} className="overflow-hidden">
              <Image
                src={gridpic.imgPath}
                alt="img"
                width={200}
                height={200}
                className=" transition-all duration-500 cursor-pointer hover:scale-125"
              />
            </div>
          ))}
        </div>
        <div className="hitusup grid px-[3rem]">
          <h1 className="text-[2.5rem] lg:text-[3.6rem] text-[#fff] font-bold mb-[3.2rem]">
            First Purchase for Free!
          </h1>
          <p className="text-[1.6rem] lg:text-[1.8rem] text-[#fff] mb-[4.8rem] leading-[1.5]">
            If you’ve made it this far, you must be at least a little curious.
            Hit any of the buttons below to become one of our esteemed
            customers!
          </p>
          <div className="flex gap-[3rem]">
            <Link
              href={"https://wa.me/2348059939767"}
              target="_blank"
              className="inline-block text-[#15803d] bg-white uppercase text-[1.7rem] font-bold px-[1.5rem] py-[0.75rem] rounded-md"
            >
              <div className="flex items-center gap-[0.5rem] ">
                {" "}
                <FaWhatsapp size={"17px"} />
                <p>Whatsapp Order</p>
              </div>
            </Link>
            <Link
              href={"tel:+2348059939767"}
              target="_blank"
              className="inline-block text-[#15803d] bg-white uppercase text-[1.7rem] font-bold px-[1.5rem] py-[0.75rem] rounded-md"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
