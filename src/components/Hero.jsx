import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative min-h-[997px] w-full flex items-center bg-gray-950 font-raleway overflow-hidden"
      style={{
        // standard img tag handle korar jonno public directory approach
        backgroundImage: "url('/assets/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Overlay jate text professional dekhay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Tomar professional global-container class ekhane apply koro */}
      <div className=" container px-4 md:px-0 mx-auto relative z-10 w-full py-20 md:py-32 flex flex-col items-center justify-center">
        <div className="w-full flex justify-center md:justify-start">
          <div className="max-w-[900px] w-full text-center md:text-start flex flex-col gap-6 items-center md:items-start text-white">
            {/* Smooth Entrance Animation Header */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide leading-tight"
            >
              Discover your skin's true potential
            </motion.h1>

            {/* Subtitle animation */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="text-gray-100 font-normal leading-relaxed text-xs sm:text-sm md:text-base max-w-[550px]"
            >
              Premium skincare infused with authentic Korean ingredients. Simple
              routines, powerful results.
            </motion.p>

            {/* Buttons section with staggered animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, staggerChildren: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto"
            >
              {/* Global Black Button */}
              <button className="global-btn w-full sm:w-auto">Shop Now</button>

              {/* Global Bordered Button */}
              <button className="outline-btn w-full sm:w-auto">About Us</button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
