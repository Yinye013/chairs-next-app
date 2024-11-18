"use client";
// import { cardArr } from "@/app/utils/testFile";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { IoEarthSharp } from "react-icons/io5";
import { GiCubes } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { useGetProducts } from "@/app/hooks/useGetProducts";

export default function BestSellerPage() {
  const { products, isLoading, error } = useGetProducts();
  return (
    <div>
      {isLoading && <p>Loading...</p>}

      <div>
        <h1 className="heading-tertiary mt-[2.4rem]">
          Here are some of our <span className="text-[#15803d]">bestsellers!</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-[6rem] md:grid-cols-2 lg:grid-cols-3 ">
        {products?.map((product) => (
          <div key={product.id}>
            <div className="shadow-lg rounded-lg mb-[3rem] cursor-pointer hover:translate-y-[-3rem] transition-all duration-500">
              <figure style={{ marginBottom: "0.5rem", overflow: "hidden" }}>
                <Image src={product.imgPath} alt={"hero image"} width={378} height={100} className="overflow-hidden" />
              </figure>
              <div className="p-[3rem]">
                <div>
                  <h3 className="text-[2.4rem] font-bold mb-[3rem] leading-5">{product.title}</h3>
                  <ul className="flex flex-col text-[1.8rem] mb-[3rem] gap-[1.2rem] tracking-wide ">
                    <li className="flex items-center gap-[1rem]">
                      <FaRegStar fill="#15803d" />
                      {product.listItemOne}
                    </li>
                    <li className="flex items-center gap-[1rem]">
                      <CiClock2 fill="#15803d" />
                      {product.listItemTwo}
                    </li>
                    <li className="flex items-center gap-[1rem]">
                      <IoEarthSharp fill="#15803d" />
                      {product.listItemThree}
                    </li>
                    <li className="flex items-center gap-[1rem]">
                      <GiCubes fill="#15803d" />
                      {product.listItemFour}
                    </li>
                  </ul>
                </div>
                <div className="flex justify-between">
                  <p className="text-[2.4rem] font-bold">$ {product.price}</p>
                  <button className="flex items-center gap-[1.2rem] uppercase text-[1.4rem] px-[1.6rem] py-[0.8rem] bg-[#15803d] text-white font-bold rounded-md">
                    Add to cart <FaShoppingCart fill="#fff" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
