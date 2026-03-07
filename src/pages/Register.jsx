import React, { useState } from "react";
import axios from "axios";
import { Link, Links } from "react-router";
import { BASE_URL } from "../helper/config";
import toast from "react-hot-toast";

const Register = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Axios API Call


  // ... existing code

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password matching check (Optional but good)
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    const loadId = toast.loading("Creating your account..."); // Loading state

    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, formData, {
        withCredentials: true,
      });

      console.log("API Response:", response.data);

      // Success Toast
      toast.update(loadId, {
        render: "Account Created Successfully! ",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Error calling API:", error.message);

      // Error Message Backend theke anar chesta koro
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";

      // Error Toast
      toast.update(loadId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9E4CB] flex flex-col items-center justify-center py-12 px-4 font-raleway">
      <div className="global-container max-w-[500px]">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-normal text-gray-800 mb-2">
            Create your account
          </h1>
          <p className="text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-bold text-black border-b border-black"
            >
              sign in
            </Link>{" "}
            to your existing account
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 md:p-10 shadow-sm rounded-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold">
                Full name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors"
                required
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors"
                required
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center gap-3 mt-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 accent-black"
                required
              />
              <label className="text-[12px] text-gray-600">
                I agree to the{" "}
                <span className="font-bold text-black underline cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="font-bold text-black underline cursor-pointer">
                  Privacy Policy
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-4 mt-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-gray-900 transition-all"
            >
              Create Account
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold border-b-2 border-black pb-0.5"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
