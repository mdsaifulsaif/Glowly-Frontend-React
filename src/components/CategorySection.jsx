import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BASE_URL } from '../helper/config';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`);
        if (response.data.success) {
          // Shudhu prothom 4-ti category nibe
          setCategories(response.data.data.slice(0, 4));
        }
      } catch (error) {
        console.error("Category fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="bg-[#F5F2F0] py-16 md:py-24">
      <div className="container mx-auto px-4 lg:px-0">
        
        {/* Section Title */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-10 tracking-tight">
          Shop by Category
        </h2>

        {/* Categories Grid */}
        {loading ? (
          <div className="h-40 flex justify-center items-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat, index) => (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer overflow-hidden aspect-square"
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay with Text */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <h3 className="text-white text-lg md:text-xl font-medium tracking-wide">
                    {cat.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;