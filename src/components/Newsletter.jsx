import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../helper/config";


const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/subscribe`, { email });

      if (res.data.success) {
        toast.success(res.data.message || "Subscribed successfully!");
        setEmail(""); 
      }
    } catch (err) {
     
      const errorMessage =
        err.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-16 md:py-24">
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
                disabled={loading}
                className="w-full px-6 py-4 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-gray-400 transition-all placeholder:text-gray-400 disabled:bg-gray-50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#D1A0B0] text-white px-10 py-4 rounded-full text-sm font-semibold hover:bg-[#c48e9f] transition-all w-full sm:w-auto whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Subscribe"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
