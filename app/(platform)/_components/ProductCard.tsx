import React from 'react';
import { ProductCardProps } from '@/app/utils/testFile';
import { FaRegStar, FaShoppingCart } from 'react-icons/fa';
import { CiClock2 } from 'react-icons/ci';
import { IoEarthSharp } from 'react-icons/io5';
import { GiCubes } from 'react-icons/gi';
import { useCartStore } from '@/app/store/store';

const ProductCard: React.FC<ProductCardProps> = ({
  imgPath,
  title,
  price,
  listItemOne,
  listItemTwo,
  listItemThree,
  listItemFour,
  id,
}) => {
  const addtoCart = useCartStore((state) => state.addItem);

  const handleAddtoCart = (product: any) => {
    addtoCart(product);
    // console log what has been added to the cart

    console.log('Product added to cart:', product);
  };

  return (
    <div className="max-w-xl rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-full h-[25rem] object-cover"
        src={imgPath}
        alt={title}
        loading="lazy"
      />
      <div className="p-4">
        <h1 className="text-[2.4rem] font-bold mb-2">{title}</h1>
        <div>
          <ul className="grid grid-cols-2 text-[1.2rem] font-semibold gap-4 list-none p-0 tracking-wide">
            <li className="flex items-center gap-[1rem]">
              <FaRegStar fill="#15803d" />
              {listItemOne}
            </li>
            <li className="flex items-center gap-[1rem]">
              <CiClock2 fill="#15803d" />
              {listItemTwo}
            </li>
            <li className="flex items-center gap-[1rem]">
              <IoEarthSharp fill="#15803d" />
              {listItemThree}
            </li>
            <li className="flex items-center gap-[1rem]">
              <GiCubes fill="#15803d" />
              {listItemFour}
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between p-4">
        <p className="text-[2.4rem] font-bold">$ {price}</p>
        <button
          className="flex items-center gap-[1.2rem] uppercase text-[1.4rem] px-[1.6rem] py-[0.8rem] bg-[#15803d] text-white font-bold rounded-md"
          onClick={() => handleAddtoCart({ title, id, price, imgPath })}
        >
          Add to cart <FaShoppingCart fill="#fff" />
        </button>
      </div>
    </div>
  );
};
export default ProductCard;

// <div key={product.id}>
//   <div className="shadow-lg rounded-lg mb-[3rem] cursor-pointer hover:translate-y-[-1rem] transition-all duration-500">
//     <figure style={{ marginBottom: '0.5rem', overflow: 'hidden' }}>
//       <Image src={product.imgPath} alt={'hero image'} width={378} height={100} className="overflow-hidden" />
//     </figure>
//     <div className="p-[3rem]">
//       <div>
//         <h3 className="text-[2.4rem] font-bold mb-[3rem] leading-5">{product.title}</h3>
//         <ul className="flex flex-col text-[1.8rem] mb-[3rem] gap-[1.2rem] tracking-wide">
//           <li className="flex items-center gap-[1rem]">
//             <FaRegStar fill="#15803d" />
//             {product.listItemOne}
//           </li>
//           <li className="flex items-center gap-[1rem]">
//             <CiClock2 fill="#15803d" />
//             {product.listItemTwo}
//           </li>
//           <li className="flex items-center gap-[1rem]">
//             <IoEarthSharp fill="#15803d" />
//             {product.listItemThree}
//           </li>
//           <li className="flex items-center gap-[1rem]">
//             <GiCubes fill="#15803d" />
//             {product.listItemFour}
//           </li>
//         </ul>
//       </div>
//       <div className="flex justify-between">
//         <p className="text-[2.4rem] font-bold">$ {product.price}</p>
//         <button className="flex items-center gap-[1.2rem] uppercase text-[1.4rem] px-[1.6rem] py-[0.8rem] bg-[#15803d] text-white font-bold rounded-md">
//           Add to cart <FaShoppingCart fill="#fff" />
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
