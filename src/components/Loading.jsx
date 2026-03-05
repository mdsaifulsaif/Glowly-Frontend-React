import React from "react";
import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#F9E4CB]">
      <div className="relative flex flex-col items-center">
        {/* Logo ba Brand Name Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl font-light tracking-[0.3em] uppercase text-gray-800 mb-8 font-raleway"
        >
          Glowly
        </motion.h1>

        {/* Smooth Animated Loader */}
        <div className="relative w-16 h-16">
          {/* Outer Ring */}
          <motion.span className="absolute inset-0 border-2 border-black/10 rounded-full" />

          {/* Spinning Top Ring */}
          <motion.span
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
            className="absolute inset-0 border-t-2 border-black rounded-full"
          />
        </div>

        {/* Pulsing Text */}
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="mt-6 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium"
        >
          Loading Perfection...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingPage;
