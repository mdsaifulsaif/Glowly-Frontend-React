import React, { useState } from "react";
import { FaRegEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion"; // এটি মিসিং ছিল

const ContactUsPage = () => {
  const [openFaq, setOpenFaq] = useState(1);

  const faqs = [
    {
      id: 1,
      question: "Figma ipsum component variant main layer?",
      answer:
        "Figma ipsum component variant main layer. Line ellipse object list undo rectangle duplicate editor distribute overflow. Arrow pen union device share scrolling style.",
    },
    {
      id: 2,
      question: "Figma ipsum component variant main layer?",
      answer:
        "Figma ipsum component variant main layer. Line ellipse object list undo rectangle duplicate editor distribute overflow.",
    },
    {
      id: 3,
      question: "Figma ipsum component variant main layer?",
      answer:
        "Figma ipsum component variant main layer. Line ellipse object list undo rectangle duplicate editor distribute overflow.",
    },
    {
      id: 4,
      question: "Figma ipsum component variant main layer?",
      answer:
        "Figma ipsum component variant main layer. Line ellipse object list undo rectangle duplicate editor distribute overflow.",
    },
    {
      id: 5,
      question: "Figma ipsum component variant main layer?",
      answer:
        "Figma ipsum component variant main layer. Line ellipse object list undo rectangle duplicate editor distribute overflow.",
    },
  ];

  return (
    <div className="bg-white min-h-screen font-raleway">
      {/* --- Get in Touch Section --- */}
      <div className="container mx-auto px-4 md:px-12 py-16">
        <h1 className="text-5xl font-medium text-[#1A1A1A] mb-12">
          Contact Us
        </h1>

        <div className="flex flex-col md:flex-row gap-16">
          {/* Form Side */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
              Get in Touch
            </h2>
            <p className="text-gray-500 text-sm mb-10 max-w-md leading-relaxed">
              Have a question or need assistance? Fill out the form below and
              our team will get back to you as soon as possible.
            </p>

            <form className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">
                  How can we help
                </label>
                <textarea
                  rows="5"
                  className="w-full border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400 transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="border border-black text-black px-10 py-3 rounded-md font-bold text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-all"
              >
                Let us Know
              </button>
            </form>
          </div>

          {/* Top Right Image */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src="/assets/cont2.png"
              alt="Product"
              className="w-full max-w-[500px] object-cover rounded-sm"
            />
          </div>
        </div>
      </div>

      {/* --- Other Ways to Reach Us (Beige Section) --- */}
      <div className="bg-[#F2E6D9] py-16 mt-10">
        <div className="container mx-auto px-4 md:px-12">
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-12">
            Other Ways to Reach Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex items-start gap-4">
              <FaRegEnvelope className="text-xl text-[#333] mt-1" />
              <div>
                <h4 className="font-bold text-sm text-[#1A1A1A] mb-1">Email</h4>
                <p className="text-xs text-gray-700">seoulmirage@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaPhone className="text-xl text-[#333] mt-1" />
              <div>
                <h4 className="font-bold text-sm text-[#1A1A1A] mb-1">Phone</h4>
                <p className="text-xs text-gray-700">+82 2 123 4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-xl text-[#333] mt-1" />
              <div>
                <h4 className="font-bold text-sm text-[#1A1A1A] mb-1">
                  Address
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  123 Beauty Lane, Gangnam, Seoul, South Korea
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FAQ Section --- */}
      <div className="container mx-auto px-4 md:px-12 py-24">
        <div className="flex flex-col md:flex-row gap-20 items-start">
          {/* Bottom Left Image */}
          <div className="flex-1">
            <img
              src="/assets/cont1.png"
              alt="FAQ section"
              className="w-full object-cover rounded-sm"
            />
          </div>

          {/* FAQ Accordion Side */}
          <div className="flex-1 w-full">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-sm mb-12 leading-relaxed">
              Find answers to our most commonly asked questions. If you can't
              find what you're looking for, please contact us.
            </p>

            <div className="border-t border-[#EEE]">
              {faqs.map((faq) => (
                <div key={faq.id} className="border-b border-[#EEE]">
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === faq.id ? null : faq.id)
                    }
                    className="w-full flex justify-between items-center py-6 text-left group transition-all"
                  >
                    <span
                      className={`text-sm font-bold tracking-tight ${openFaq === faq.id ? "text-black" : "text-gray-800"}`}
                    >
                      {faq.question}
                    </span>
                    {openFaq === faq.id ? (
                      <FiChevronUp className="text-xl" />
                    ) : (
                      <FiChevronDown className="text-xl text-gray-400" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-[13px] text-gray-500 pb-6 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
