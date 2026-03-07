import React, { useState, useEffect } from "react";
import {
  IoSearchOutline,
  IoPersonOutline,
  IoBagHandleOutline,
  IoCloseOutline,
  IoMenuOutline,
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import axios from "axios";
import { BASE_URL } from "../../helper/config";
import { useAuth } from "../../contexts/AuthContext";
import { useCartStore } from "../../store/useCartStore";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // 1. Sticky Navbar Logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Body Scroll Lock Logic (Sidebar khulle scroll bondho)
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  // 3. Search Logic with Debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 1) {
        setIsSearching(true);
        try {
          const res = await axios.get(
            `${BASE_URL}/products?search=${searchQuery}`,
          );
          setSearchResults(res.data.data || res.data || []);
        } catch (err) {
          console.error("Search Error:", err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const menuItems = [
    {
      name: "Skincare",
      path: "/skincare",
      sub: [
        "Cleansers",
        "Toners",
        "Essences",
        "Serums",
        "Moisturizers",
        "Masks",
      ],
    },
    { name: "Shop", path: "/shop", sub: [] },
    {
      name: "Collections",
      path: "/collections",
      sub: ["Hydration", "Brightening", "Anti-Aging", "Sensitive Skin"],
    },
    { name: "About", path: "/about", sub: [] },
    { name: "Contact", path: "/contact", sub: [] },
  ];

  return (
    <>
      {/* Spacer: content niche jate jump na kore */}
      {isScrolled && <div className="h-[72px] md:h-[84px]"></div>}

      <nav
        className={`${
          isScrolled
            ? "fixed top-0 left-0 shadow-md bg-white/90 backdrop-blur-md py-3"
            : "relative bg-white py-4"
        } w-full border-b border-gray-100 px-4 md:px-8 z-[100] font-raleway transition-all duration-300`}
      >
        <div className="container mx-auto flex items-center justify-between gap-4">
          {/* Left Side: Logo & Hamburger */}
          <div className="flex items-center gap-4 lg:gap-10">
            <button
              className="lg:hidden text-2xl text-gray-700 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <IoMenuOutline />
            </button>

            <Link to="/">
              <img
                src="/assets/logo.png"
                alt="Glowly Logo"
                style={{ width: isScrolled ? "70px" : "80px", height: "auto" }}
                className="transition-all duration-300"
              />
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-6">
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="relative group cursor-pointer text-sm font-medium text-gray-700 hover:text-black transition-all"
                >
                  <Link
                    to={item.path}
                    className="flex items-center gap-1 uppercase tracking-widest text-[12px]"
                  >
                    {item.name}
                    {item.sub.length > 0 && (
                      <span className="text-[8px] opacity-50 group-hover:rotate-180 transition-transform">
                        ▼
                      </span>
                    )}
                  </Link>

                  <AnimatePresence>
                    {activeDropdown === item.name && item.sub.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-4 w-48 bg-white shadow-xl border border-gray-100 p-4 flex flex-col gap-3"
                      >
                        {item.sub.map((sub) => (
                          <Link
                            key={sub}
                            to={`/category/${sub.toLowerCase()}`}
                            className="text-xs text-gray-500 hover:text-black"
                          >
                            {sub}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Search & Icons */}
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
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Products..."
                      className="w-full border rounded-full py-2 pl-5 pr-12 border-gray-300 text-sm focus:outline-none focus:border-black bg-transparent"
                      autoFocus
                    />
                    <IoCloseOutline
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="absolute right-4 cursor-pointer text-xl text-gray-500 hover:text-black"
                    />

                    {/* Desktop Results Dropdown */}
                    {searchQuery.length > 1 && (
                      <div className="absolute top-full left-0 w-full bg-white mt-2 shadow-2xl border border-gray-100 rounded-lg overflow-hidden z-[110] max-h-[350px] overflow-y-auto">
                        {isSearching ? (
                          <div className="p-4 text-xs text-gray-400 text-center italic">
                            Searching...
                          </div>
                        ) : searchResults.length > 0 ? (
                          searchResults.map((product) => (
                            <Link
                              key={product._id}
                              to={`/product/${product._id}`}
                              onClick={() => {
                                setIsSearchOpen(false);
                                setSearchQuery("");
                              }}
                              className="flex items-center gap-4 p-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors"
                            >
                              <img
                                src={product.thumbnail}
                                alt=""
                                className="w-10 h-10 object-contain bg-gray-50 rounded"
                              />
                              <div className="flex flex-col text-left">
                                <span className="text-xs font-bold text-gray-800 line-clamp-1">
                                  {product.name}
                                </span>
                                <span className="text-[10px] text-gray-400 uppercase">
                                  {product.category}
                                </span>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div className="p-4 text-xs text-gray-400 text-center">
                            No products found
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <IoSearchOutline
                    onClick={() => setIsSearchOpen(true)}
                    className="text-xl cursor-pointer hover:scale-110 transition-transform"
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Search Icon */}
            <div className="md:hidden">
              <IoSearchOutline
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setIsMobileMenuOpen(false);
                }}
                className="text-xl cursor-pointer"
              />
            </div>

            {/* User Dropdown */}
            <div className="relative group">
              <IoPersonOutline className="text-xl cursor-pointer hover:scale-110 transition-transform" />
              <div className="absolute right-0 top-full mt-4 w-40 bg-white shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 text-[13px] rounded-sm z-[110]">
                {!user ? (
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
                    <Link
                      to="/my-account"
                      className="block px-4 py-2 hover:bg-gray-50"
                    >
                      My Account
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-50"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={logoutUser}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                    >
                      Log Out
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <IoBagHandleOutline className="text-xl cursor-pointer hover:scale-110 transition-transform" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            </Link>
          </div>
        </div>

        {/* --- Mobile Search Overlay --- */}
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search items..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:outline-none"
                />
                <IoSearchOutline className="absolute right-4 text-gray-400" />
              </div>
              {searchQuery.length > 1 && (
                <div className="mt-4 max-h-60 overflow-y-auto">
                  {isSearching ? (
                    <p className="text-xs text-center text-gray-400 italic">
                      Searching...
                    </p>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((p) => (
                      <Link
                        key={p._id}
                        to={`/product/${p._id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0"
                      >
                        <img
                          src={p.thumbnail}
                          className="w-10 h-10 object-contain rounded bg-gray-50"
                          alt=""
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-medium">{p.name}</span>
                          <span className="text-[10px] text-gray-400">
                            {p.salePrice} BDT
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-xs text-center text-gray-400">
                      No results found
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Mobile Sidebar (Drawer) --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Sidebar Background Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150]"
              />

              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 left-0 w-[280px] h-full bg-white z-[160] shadow-2xl p-6 overflow-y-auto"
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
                    <li
                      key={item.name}
                      className="border-b border-gray-50 pb-4"
                    >
                      <div className="flex justify-between items-center">
                        <Link
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="uppercase tracking-widest text-[12px] font-semibold text-gray-800"
                        >
                          {item.name}
                        </Link>
                        {item.sub.length > 0 && (
                          <span
                            className="text-gray-400 text-lg p-2 cursor-pointer"
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === item.name ? null : item.name,
                              )
                            }
                          >
                            {activeDropdown === item.name ? "−" : "+"}
                          </span>
                        )}
                      </div>
                      <AnimatePresence>
                        {activeDropdown === item.name &&
                          item.sub.length > 0 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden flex flex-col gap-3 mt-4 ml-4"
                            >
                              {item.sub.map((sub) => (
                                <Link
                                  key={sub}
                                  to={`/category/${sub.toLowerCase()}`}
                                  className="text-xs text-gray-500 hover:text-black"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {sub}
                                </Link>
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
      </nav>
    </>
  );
};

export default Navbar;
