

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { BASE_URL } from "../helper/config";
import ProductCard from "../components/ProductCard";
import { IoBagHandleOutline } from "react-icons/io5";

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // States
  const [activeCategory, setActiveCategory] = useState("All Product");
  const [sortOption, setSortOption] = useState("Featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    "All Product",
    "Serums",
    "Moisturizers",
    "Masks",
    "Cleansers",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // API query params for pagination
        const response = await axios.get(
          `${BASE_URL}/products?page=${currentPage}`,
        );
        if (response.data.success) {
          setAllProducts(response.data.data);
          setTotalPages(response.data.totalPages || 1);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  // Handle Filtering and Sorting (Client side logic)
  useEffect(() => {
    let filtered = [...allProducts];

    // 1. Category Filter
    if (activeCategory !== "All Product") {
      filtered = filtered.filter((p) => p.categoryID?.name === activeCategory);
    }

    // 2. Sort Logic
    if (sortOption === "Price: Low to High") {
      filtered.sort((a, b) => a.salePrice - b.salePrice);
    } else if (sortOption === "Price: High to Low") {
      filtered.sort((a, b) => b.salePrice - a.salePrice);
    } else if (sortOption === "Newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setDisplayProducts(filtered);
  }, [activeCategory, sortOption, allProducts]);

  return (
    <div className="bg-white min-h-screen pb-20 ">
      {/* Category & Sort Header */}
      <div className="bg-[#F9E4CB] py-4 border-b border-[#e5d8cb]">
        <div className="container mx-auto px-4 lg:px-0 flex flex-wrap items-center justify-between gap-6">
          {/* Categories */}
          <div className="flex gap-8 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1); // Reset to page 1 on filter
                }}
                className={`text-sm font-semibold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "text-black border-b-2 border-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-500 font-medium">Sort :</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-transparent font-bold focus:outline-none cursor-pointer border-none outline-none"
            >
              <option value="Featured">Featured</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Newest">Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid Section */}
      <div className="container mx-auto px-4 lg:px-0 mt-12 ">
        {loading ? (
          <div className="h-96 flex justify-center items-center font-medium text-gray-400 italic tracking-widest">
            Loading products...
          </div>
        ) : displayProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {displayProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination Logic */}
            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="w-10 h-10 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-all"
                >
                  <span className="text-xl">←</span>
                </button>

                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-10 h-10 border rounded flex items-center justify-center text-sm font-bold transition-all ${
                        currentPage === idx + 1
                          ? "border-black bg-black text-white shadow-md"
                          : "border-gray-200 text-gray-400 hover:border-gray-600"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="w-10 h-10 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 transition-all"
                >
                  <span className="text-xl">→</span>
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State - Jokhon kono product thakbe na */
          <div className="h-96 flex flex-col justify-center items-center text-center px-4">
            <div className="bg-gray-50 p-6 rounded-full mb-4">
              <IoBagHandleOutline size={40} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-widest">
              No Products Found
            </h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              We couldn't find any products in the{" "}
              <span className="font-bold text-black italic">
                "{activeCategory}"
              </span>{" "}
              category at the moment. Please try another filter.
            </p>
            <button
              onClick={() => setActiveCategory("All Product")}
              className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all"
            >
              Show All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
