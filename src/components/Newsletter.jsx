import React, { useState } from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed with:", email);
    // Add your API call here
  };

  return (
    <section className="bg-white py-16 md:py-24">
      {/* Tomar professional global-container class */}
      <div className="global-container">
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto">
          {/* Section Header */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Join Our Community
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-sm md:text-base leading-relaxed mb-10 px-4"
          >
            Subscribe to our newsletter for exclusive offers, skincare tips, and
            new product announcements.
          </motion.p>

          {/* Subscription Form */}
          <motion.form
            onSubmit={handleSubscribe}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-[600px] flex flex-col sm:flex-row items-center gap-4 px-4"
          >
            <div className="relative w-full">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-gray-400 transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Same color as image #D1A0B0 (Pinkish Rose) */}
            <button
              type="submit"
              className="bg-[#D1A0B0] text-white px-10 py-4 rounded-full text-sm font-semibold hover:bg-[#c48e9f] transition-all w-full sm:w-auto whitespace-nowrap"
            >
              Subscribe
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
