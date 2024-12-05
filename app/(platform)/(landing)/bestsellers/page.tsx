'use client';
import { productsArr } from '@/app/utils/testFile';
import { useState } from 'react';
import ProductCard from '@/app/(platform)/_components/ProductCard';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';

export default function BestSellerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  // const { products, isLoading, error } = useGetProducts();
  // create a function to filter products via search term

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  // filtering
  const filteredProducts = productsArr?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const totalPages = Math.ceil(filteredProducts?.length / productsPerPage);
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  const currentProducts = filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct);
  return (
    <div>
      {/* {isLoading && <p>Loading...</p>} */}

      <div className="pt-6 flex justify-between items-center mb-10">
        <h1 className="heading-tertiary mt-[2.4rem]">
          Here are some of our <span className="text-[#15803d]">bestsellers!</span>
        </h1>

        <TextField
          placeholder="Search for products..."
          className="w-full max-w-md px-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition duration-150 ease-in-out text-gray-700 placeholder-gray-400"
          value={searchTerm}
          onChange={handleSearch}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'gray' },
              '&:hover fieldset': { borderColor: 'green' },
              '&.Mui-focused fieldset': { borderColor: 'green' },
              fontSize: '1.4rem',
            },
          }}
        />
      </div>
      <div className="grid grid-cols-1 gap-[6rem] md:grid-cols-2 lg:grid-cols-3 ">
        {/* product card */}
        {currentProducts?.map((product) => (
          <div key={product.id}>
            <ProductCard
              imgPath={product.imgPath}
              title={product.title}
              listItemOne={product.listItemOne}
              listItemTwo={product.listItemTwo}
              listItemThree={product.listItemThree}
              listItemFour={product.listItemFour}
              price={product.price}
              id={product.id}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center text-[1.2rem] mt-8 mb-6">
        <Pagination
          count={totalPages} // Total pages
          page={currentPage} // Current page
          onChange={handlePageChange} // Handle page change
          shape="rounded"
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'gray', // Default text color
              fontSize: '1.5rem', // Font size
              '&.Mui-selected': {
                backgroundColor: '#15803d', // Background for selected page
                color: 'white', // Text color for selected page
              },
            },
          }}
        />
      </div>
    </div>
  );
}
