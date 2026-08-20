import Link from 'next/link';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';
import { hitusupArr } from '@/app/utils/testFile';

function page() {
  return (
    <div className="section-pad">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center bg-[#15803d] rounded-[20px] overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 overflow-hidden gap-[0.5rem] bg-white">
            {hitusupArr.map((gridpic) => (
              <div key={gridpic.id} className="overflow-hidden aspect-square">
                <Image
                  src={gridpic.imgPath}
                  alt="img"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover transition-all duration-500 cursor-pointer hover:scale-125"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col px-[3rem] py-[4.8rem] lg:py-[3rem]">
            <h1 className="text-[2.5rem] lg:text-[3.6rem] text-[#fff] font-bold mb-[3.2rem]">
              First Purchase for Free!
            </h1>
            <p className="text-[1.6rem] lg:text-[1.8rem] text-[#fff] mb-[4.8rem] leading-[1.5]">
              If you&rsquo;ve made it this far, you must be at least a little
              curious. Hit any of the buttons below to become one of our
              esteemed customers!
            </p>
            <div className="flex flex-wrap gap-[1.6rem] sm:gap-[3rem]">
              <Link
                href={'https://wa.me/2348059939767'}
                target="_blank"
                className="inline-block text-[#15803d] bg-white uppercase text-[1.7rem] font-bold px-[1.5rem] py-[0.75rem] rounded-md"
              >
                <div className="flex items-center gap-[0.5rem]">
                  <FaWhatsapp size={'17px'} />
                  <p>Whatsapp Order</p>
                </div>
              </Link>
              <Link
                href={'tel:+2348059939767'}
                className="inline-block text-[#15803d] bg-white uppercase text-[1.7rem] font-bold px-[1.5rem] py-[0.75rem] rounded-md"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
