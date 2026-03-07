import React, { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import axios from "axios";
import { BASE_URL } from "../helper/config";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const { cart, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const shippingCost = 5.99;
  const subtotal = cart.reduce(
    (acc, item) => acc + item.salePrice * item.quantity,
    0,
  );
  const totalAmount = (subtotal + shippingCost).toFixed(2);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Dhaka", // Default set
    postalCode: "",
    country: "Bangladesh", // Default set
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleOrder = async (e) => {
    e.preventDefault();
    const cartItems = cart.map((item) => ({
      _id: item._id,
      name: item.name,
      category: item.category || "General",
      qty: item.quantity,
      salePrice: item.salePrice,
      thumbnail: item.thumbnail,
    }));

    try {
      const res = await axios.post(
        `${BASE_URL}/order-create`,
        {
          ...formData,
          shippingMethod: shippingCost.toString(),
          totalAmount: `$${totalAmount}`,
          cartItems,
        },
        {
          withCredentials: true,
        },
      );
      if (res.data) {
        clearCart();
        setIsSuccess(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  // --- Success Screen (image_4df12e.png) ---
  if (isSuccess) {
    return (
      <div className="bg-[#F2E6D9] h-screen flex flex-col justify-center items-center text-center px-4 font-sans">
        <div className="bg-[#78A962] w-20 h-20 rounded-full flex items-center justify-center mb-10 shadow-sm">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-medium text-[#2D2D2D] mb-3">
          Your payment has been{" "}
          <span className="text-[#78A962]">received !</span>
        </h2>
        <p className="text-[#555555] text-sm mb-10">
          Please check your email for a payment confirmation & invoice.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-8 py-3 rounded-md font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-all"
        >
          Continue Shopping <span>›</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F2E6D9] min-h-screen py-16 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h1 className="text-4xl font-normal text-[#1A1A1A] mb-12">Checkout</h1>

        <div className="flex flex-col lg:flex-row items-start gap-10">
          {/* --- Left Side: Form (image_4e56c0.png) --- */}
          <div className="flex-1 bg-white p-10 rounded-sm shadow-sm">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-8">
              Shipping Information
            </h2>
            <form onSubmit={handleOrder} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">
                    First name
                  </label>
                  <input
                    name="firstName"
                    required
                    onChange={handleChange}
                    className="border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">
                    Last name
                  </label>
                  <input
                    name="lastName"
                    required
                    onChange={handleChange}
                    className="border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                    className="border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">
                    Phone
                  </label>
                  <input
                    name="phone"
                    required
                    onChange={handleChange}
                    className="border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">
                  Apartment, suite, etc. (optional)
                </label>
                <input
                  name="address"
                  required
                  onChange={handleChange}
                  className="border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">
                    City
                  </label>
                  <input
                    name="city"
                    required
                    onChange={handleChange}
                    className="border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">
                    State / Province
                  </label>
                  <select
                    name="state"
                    onChange={handleChange}
                    className="border border-[#E5E5E5] p-3 rounded-md bg-white text-gray-500 appearance-none focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="dhaka">Dhaka</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">
                    Postal Code
                  </label>
                  <input
                    name="postalCode"
                    required
                    onChange={handleChange}
                    className="border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">
                  Country
                </label>
                <select
                  name="country"
                  className="border border-[#E5E5E5] p-3 rounded-md bg-white text-gray-500 appearance-none focus:outline-none"
                >
                  <option value="">Country</option>
                  <option value="bd">Bangladesh</option>
                </select>
              </div>

              {/* Shipping Method Section */}
              <div className="pt-8">
                <h2 className="text-lg font-bold text-[#1A1A1A] mb-6">
                  Shipping Method
                </h2>
                <div className="space-y-4">
                  <div className="border border-[#E5E5E5] p-5 rounded-lg flex justify-between items-center bg-white">
                    <div className="flex items-center gap-4">
                      <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center p-[2px]">
                        <div className="w-full h-full bg-black rounded-full" />
                      </div>
                      <span className="text-[13px] font-medium text-[#1A1A1A]">
                        Standard Shipping (5-7 business days)
                      </span>
                    </div>
                    <span className="font-bold text-[13px] text-[#1A1A1A]">
                      $5.99
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-10">
                <button
                  type="submit"
                  className="bg-black text-white px-10 py-3 rounded-md font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:opacity-90"
                >
                  Order <span>›</span>
                </button>
              </div>
            </form>
          </div>

          {/* --- Right Side: Order Summary (image_4e56c0.png) --- */}
          <div className="w-full lg:w-[420px] bg-white p-8 rounded-sm shadow-sm self-start">
            <h2 className="font-bold text-sm text-[#1A1A1A] mb-6">
              Order Summary
            </h2>
            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-[#F9F9F9] flex items-center justify-center border border-[#EEE] rounded-md overflow-hidden">
                    <img
                      src={item.thumbnail}
                      className="w-12 h-12 object-contain"
                      alt={item.name}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[13px] font-bold text-[#1A1A1A]">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#888] font-medium uppercase mt-1">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="text-[13px] font-bold text-[#1A1A1A]">
                    ${item.salePrice}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-[#F0F0F0] pt-6">
              <div className="flex justify-between text-[13px]">
                <span className="text-[#888] font-medium">Subtotal</span>
                <span className="font-bold text-[#1A1A1A]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-[#888] font-medium">Shipping</span>
                <span className="font-bold text-[#1A1A1A]">
                  ${shippingCost}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-4 border-t border-[#F0F0F0] mt-4">
                <span className="text-[#1A1A1A]">Total</span>
                <span className="text-[#1A1A1A]">${totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
