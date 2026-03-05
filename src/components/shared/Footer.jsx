import { Link } from "react-router";
import { FaGoogle, FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full px-4 bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
          
          {/* Left Side */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <Link to="/">
              <img
                src="/assets/logo.png"
                alt="Seoul Mirage"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="content-text max-w-[300px] text-[16px] leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Scelerisque lectus
              habitasse adipiscing.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 text-[#D185A2] justify-center md:justify-start">
              <Link to="#" className="hover:opacity-70 transition">
                <FaGoogle size={18} />
              </Link>

              <Link to="#" className="hover:opacity-70 transition">
                <FaFacebookF size={18} />
              </Link>

              <Link to="#" className="hover:opacity-70 transition">
                <FaInstagram size={18} />
              </Link>
            </div>
          </div>

          {/* Shop Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-[24px] font-semibold mb-6 font-serif">Shop</h3>

            <ul className="flex flex-col gap-4">
              <li>
                <Link to="/products" className="content-text hover:text-black transition">
                  All Products
                </Link>
              </li>

              <li>
                <Link to="/bestsellers" className="content-text hover:text-black transition">
                  Bestsellers
                </Link>
              </li>

              <li>
                <Link to="/new-arrivals" className="content-text hover:text-black transition">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* About Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-[24px] font-semibold mb-6 font-serif">About</h3>

            <ul className="flex flex-col gap-4">
              <li>
                <Link to="/about" className="content-text hover:text-black transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/contact" className="content-text hover:text-black transition">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link to="/shipping" className="content-text hover:text-black transition">
                  Shipping & Returns
                </Link>
              </li>

              <li>
                <Link to="/privacy" className="content-text hover:text-black transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-[14px] text-gray-500 font-medium">
            © 2025 Seoul Mirage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;