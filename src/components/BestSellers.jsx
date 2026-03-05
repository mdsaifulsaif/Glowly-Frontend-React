// import React from 'react'
// import { Link } from 'react-router'
// import { CgArrowLongRight } from "react-icons/cg";

// function BestSellers() {
//   return (
//     <div className='mt-5'>
//         <div className='container mx-auto'>
//           <div className='flex items-center justify-between'>
//             <h2 className='section-title'>Bestsellers</h2>
//             <Link className='btn-base'>View all products <CgArrowLongRight /> </Link>
//           </div>
//         </div>
//     </div>
//   )
// }

// export default BestSellers

import React, { useEffect, useState } from "react";
import axios from "axios"; // Axios import koro
import { Link } from "react-router";
import { CgArrowLongRight } from "react-icons/cg";
import ProductCard from "./ProductCard";
import { BASE_URL } from "../helper/config";

function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        // Axios call
        const response = await axios.get(`${BASE_URL}/products`);

        if (response.data.success) {
          const allData = response.data.data;

          // 1. Shudhu Bestseller filter koro
          let filtered = allData.filter((item) => item.isBestseller === true);

          // 2. Jodi Bestseller 4 tar kom hoy, tobe normal data theke baki gulo nao (Optional safe logic)
          if (filtered.length < 4) {
            filtered = allData;
          }

          // 3. Random Shuffle & Slice
          const randomFour = filtered
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);

          setProducts(randomFour);
        }
      } catch (error) {
        console.error("Axios Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    // <div className="mt-16 mb-20">
    //   <div className="container mx-auto px-4 md:px-0">
    //     {/* Header */}
    //     <div className="flex items-center justify-between mb-10">
    //       <h2 className="section-title text-2xl md:text-4xl font-bold">
    //         Bestsellers
    //       </h2>
    //       <Link
    //         to="/shop"
    //         className="btn-base flex items-center gap-2 text-sm font-semibold uppercase tracking-wider"
    //       >
    //         View all products <CgArrowLongRight size={20} />
    //       </Link>
    //     </div>

    //     {/* Grid Section */}
    //     {loading ? (
    //       <div className="flex justify-center items-center h-40">
    //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    //       </div>
    //     ) : (
    //       <div className="product-grid">
    //         {products.map((product) => (
    //           <ProductCard
    //             key={product._id}
    //             product={{
    //               id: product._id,
    //               image: product.thumbnail,
    //               category: product.categoryID?.name || "Skincare",
    //               title: product.name,
    //               price: product.salePrice,
    //               rating: 4.9, // Static jodi API te na thake
    //               reviews: Math.floor(Math.random() * 100) + 50, // Random placeholder
    //             }}
    //           />
    //         ))}
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="mt-16 mb-20">
      {/* Shob kichu ekta single container er bhitor rakho */}
      <div className="container mx-auto px-4 lg:px-0">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="section-title text-2xl md:text-4xl font-bold">
            Bestsellers
          </h2>
          <Link
            to="/shop"
            className="btn-base flex items-center gap-2 text-sm font-semibold uppercase tracking-wider"
          >
            View all products <CgArrowLongRight size={20} />
          </Link>
        </div>

        {/* Grid Section */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          /* Grid e extra container dorkar nai, container er bhitor thaklei hobe */
          <div className="product-grid w-full">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  id: product._id,
                  image: product.thumbnail,
                  category: product.categoryID?.name || "Skincare",
                  title: product.name,
                  price: product.salePrice,
                  rating: 4.9,
                  reviews: 186,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BestSellers;
