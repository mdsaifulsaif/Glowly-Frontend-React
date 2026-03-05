import React, { useState } from "react";
import {
  IoSearchOutline,
  IoPersonOutline,
  IoBagHandleOutline,
  IoCloseOutline,
  IoMenuOutline,
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, loginUser, logoutUser } = useAuth();
  console.log("current logged user:", user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  

  const menuItems = [
    {
      name: "Skincare",
      sub: [
        "Cleansers",
        "Toners",
        "Essences",
        "Serums",
        "Moisturizers",
        "Masks",
      ],
    },
    {
      name: "Collections",
      sub: ["Hydration", "Brightening", "Anti-Aging", "Sensitive Skin"],
    },
    { name: "About", sub: [] },
    { name: "Contact", sub: [] },
  ];

  return (
    <nav className="relative w-full bg-white border-b border-gray-100 px-4 md:px-8 py-4 z-50 font-raleway">
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Left Side: Logo & Hamburger (Mobile) */}
        <div className="flex items-center gap-4 lg:gap-10">
          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden text-2xl text-gray-700 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>

          {/* Logo - Standard img tag instead of next/image */}
          <a href="/">
            <img
              src="/assets/logo.png"
              alt="Glowly Logo"
              style={{ width: "80px", height: "auto" }}
            />
          </a>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <li
                key={item.name}
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
                className="relative group cursor-pointer text-sm font-medium text-gray-700 hover:text-black transition-all"
              >
                <div className="flex items-center gap-1 uppercase tracking-widest text-[12px]">
                  {item.name}
                  {item.sub.length > 0 && (
                    <span className="text-[8px] opacity-50 group-hover:rotate-180 transition-transform">
                      ▼
                    </span>
                  )}
                </div>

                <AnimatePresence>
                  {activeDropdown === item.name && item.sub.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-4 w-48 bg-white shadow-xl border border-gray-100 p-4 flex flex-col gap-3"
                    >
                      {item.sub.map((sub) => (
                        <a
                          key={sub}
                          href={`/${sub.toLowerCase()}`}
                          className="text-xs text-gray-500 hover:text-black transition-all"
                        >
                          {sub}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Icons */}
        <div className="flex items-center gap-4 md:gap-6 flex-1 justify-end">
          {/* Desktop Search */}
          <div className="hidden md:flex items-center justify-end relative max-w-[400px] w-full">
            <AnimatePresence>
              {isSearchOpen ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="flex items-center w-full relative h-10"
                >
                  <input
                    type="text"
                    placeholder="Search Products..."
                    className="w-full border rounded-full py-2 pl-5 pr-12 border-gray-300 text-sm focus:outline-none focus:border-black bg-transparent transition-all"
                    autoFocus
                  />
                  <IoCloseOutline
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 cursor-pointer text-xl text-gray-500 hover:text-black transition-colors"
                  />
                </motion.div>
              ) : (
                <IoSearchOutline
                  onClick={() => setIsSearchOpen(true)}
                  className="text-xl cursor-pointer hover:scale-110 transition-transform"
                />
              )}
            </AnimatePresence>
          </div>

          <div className="md:hidden">
            <IoSearchOutline
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setIsMobileMenuOpen(false);
              }}
              className="text-xl cursor-pointer"
            />
          </div>

          {/* User Icon */}
          <div className="relative group">
            <IoPersonOutline className="text-xl cursor-pointer hover:scale-110 transition-transform" />
            <div className="absolute right-0 top-full mt-4 w-40 bg-white shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 text-[13px] rounded-sm">
              {!user? (
                <>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    Sign-up
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    Sign in
                  </Link>
                </>
              ) : (
                <>
                  <a
                    href="/account"
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    My Account
                  </a>
                  <button   onClick={logoutUser} className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50">
                    Log Out
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Cart */}
          <a href="/cart" className="relative">
            <IoBagHandleOutline className="text-xl cursor-pointer hover:scale-110 transition-transform" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </a>

         
        </div>
      </div>

      {/* --- Mobile Sidebar Drawer --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/30 z-[55] lg:hidden"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 w-[280px] h-full bg-white z-[60] shadow-2xl lg:hidden p-6"
            >
              <div className="flex justify-between items-center mb-10">
                <img
                  src="/assets/logo.png"
                  alt="Logo"
                  style={{ width: "70px" }}
                />
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <IoCloseOutline className="text-2xl text-gray-500" />
                </button>
              </div>

              <ul className="flex flex-col gap-6">
                {menuItems.map((item) => (
                  <li key={item.name} className="border-b border-gray-50 pb-4">
                    <div
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.name ? null : item.name,
                        )
                      }
                      className="flex justify-between items-center cursor-pointer uppercase tracking-widest text-[12px] font-semibold text-gray-800"
                    >
                      {item.name}
                      {item.sub.length > 0 && (
                        <span>{activeDropdown === item.name ? "−" : "+"}</span>
                      )}
                    </div>

                    <AnimatePresence>
                      {activeDropdown === item.name && item.sub.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden flex flex-col gap-3 mt-4 ml-4"
                        >
                          {item.sub.map((sub) => (
                            <a
                              key={sub}
                              href={`/${sub.toLowerCase()}`}
                              className="text-xs text-gray-500 hover:text-black"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {sub}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 px-6 py-4"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search items..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:outline-none"
              />
              <IoSearchOutline className="absolute right-4 text-gray-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
