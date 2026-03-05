import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const SkincarePhilosophy = () => {
  const fadeIn = {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  return (
    <section className="w-full bg-[#F9E4CB] overflow-hidden">
      {/* Container wrapper jate content alignment global thake */}
      <div className="container mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[500px] gap-0">
          {/* Left Side: Content Box (Exactly aligned with your titles) */}
          <motion.div
            {...fadeIn}
            className="flex flex-col justify-center py-16 md:pr-12 lg:pr-24 text-left"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6 leading-tight uppercase tracking-tight">
              Our Skincare <br className="hidden lg:block" /> Philosophy
            </h2>

            <div className="space-y-6 text-gray-600 text-sm md:text-base leading-relaxed max-w-lg">
              <p>
                Seoul Mirage was born from a deep appreciation for Korean
                skincare innovation and the belief that effective products
                should be accessible to everyone.
              </p>
              <p>
                We combine time-tested Korean ingredients with modern science to
                create formulations that deliver visible results. Each product
                is meticulously crafted to honor the tradition.
              </p>
            </div>

            <div className="mt-10">
              <Link
                to="/about"
                className="global-btn px-10 py-3 bg-white inline-block rounded-full shadow-sm hover:shadow-md transition-all uppercase text-xs font-bold tracking-widest"
              >
                About Us
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Image - Fixed Height & Aligned */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-[400px] md:h-full w-full"
          >
            <img
              src="/assets/ab1.png"
              alt="Skincare Products"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkincarePhilosophy;
