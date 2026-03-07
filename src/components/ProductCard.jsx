// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoBagHandleOutline } from "react-icons/io5";
// import { Link } from "react-router"; // Link import koro

// const ProductCard = ({ product }) => {
//   return (
//     // Link to use kore route dynamic kora holo
//     <Link
//       to={`/product/${product.id}`}
//       className="product-card group cursor-pointer block"
//     >
//       {/* Image Wrapper */}
//       <div className="card-image-wrapper relative overflow-hidden bg-[#F5F5F5] rounded-sm">
//         <img
//           src={product.image}
//           alt={product.title}
//           className="card-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//         />

//         {/* Hover "Add to Cart" Button */}
//         <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-white text-black px-4 py-2 md:px-6 md:py-3 rounded-md flex items-center gap-2 font-semibold shadow-lg text-xs md:text-sm"
//             onClick={(e) => {
//               e.preventDefault(); // Jate link-e click na hoye shudhu cart-e add hoy
//               // Cart logic ekhane hobe
//             }}
//           >
//             <IoBagHandleOutline size={18} />
//             <span className="whitespace-nowrap">Add to Cart</span>
//           </motion.button>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="card-content pt-3">
//         <span className="card-category text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">
//           {product.category}
//         </span>
//         <h3 className="card-title text-sm md:text-base font-semibold text-gray-800 mt-1">
//           {product.title}
//         </h3>
//         <p className="card-price font-bold text-lg md:text-xl mt-1">
//           ${product.price}
//         </p>

//         {/* Rating Section */}
//         <div className="rating-container flex items-center gap-1 mt-1 text-[10px] md:text-xs">
//           <span className="font-medium text-gray-700">{product.rating}</span>
//           <span className="text-black text-sm">★</span>
//           <span className="text-gray-400">({product.reviews})</span>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;

import React from "react";
import { motion } from "framer-motion";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link } from "react-router";
import { useCartStore } from "../store/useCartStore"; 
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  
  const {
    _id,
    name,
    thumbnail,
    salePrice,
    categoryID,
    rating = 4.9,
    reviews = 186,
  } = product;

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 

 
    addToCart(product, 1);


    toast.success(`${name} added to cart!`);
  };

  return (
    <Link
      to={`/product/${_id}`}
      className="product-card group cursor-pointer block"
    >
      {/* Image Wrapper */}
      <div className="card-image-wrapper relative overflow-hidden bg-[#F5F5F5] rounded-sm aspect-[4/5]">
        <img
          src={thumbnail}
          alt={name}
          className="card-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Hover "Add to Cart" Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-4 py-2 md:px-6 md:py-3 rounded-md flex items-center gap-2 font-semibold shadow-lg text-xs md:text-sm"
            onClick={handleAddToCart}
          >
            <IoBagHandleOutline size={18} />
            <span className="whitespace-nowrap">Add to Cart</span>
          </motion.button>
        </div>
      </div>

      {/* Content Section */}
      <div className="card-content pt-3">
        <span className="card-category text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">
          {categoryID?.name || "Skincare"}
        </span>
        <h3 className="card-title text-sm md:text-base font-semibold text-gray-800 mt-1 line-clamp-1">
          {name}
        </h3>
        <p className="card-price font-bold text-lg md:text-xl mt-1 text-[#8B3D52]">
          ${salePrice}
        </p>

        {/* Rating Section */}
        <div className="rating-container flex items-center gap-1 mt-1 text-[10px] md:text-xs">
          <span className="font-medium text-gray-700">{rating}</span>
          <span className="text-black text-sm">★</span>
          <span className="text-gray-400">({reviews})</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
