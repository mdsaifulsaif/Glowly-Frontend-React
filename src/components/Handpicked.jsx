import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { CgArrowLongRight } from "react-icons/cg";
import ProductCard from "./ProductCard";
import { BASE_URL } from "../helper/config";

function Handpicked() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/products`);

        if (response.data.success) {
          const allData = response.data.data;

          // 1. Shudhu New Arrivals (isNew: true) filter koro
          let filtered = allData.filter((item) => item.isNew === true);

          // 2. Fallback: Jodi New product 4 tar kom thake, pura data use koro
          if (filtered.length < 4) {
            filtered = allData;
          }

          // 3. Random Shuffle & Slice prothom 4-ti
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

    fetchNewArrivals();
  }, []);

  return (
    <div className="mt-16 mb-20">
      <div className="container mx-auto px-4 lg:px-0">
        {/* Header Section - Perfectly Aligned with Title */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="section-title text-2xl md:text-4xl font-bold">
            Hand picked for you
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
          <div className="product-grid w-full">
            {products.map((product) => (
             
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Handpicked;