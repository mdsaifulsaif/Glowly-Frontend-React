import React, { useState } from "react";
import axios from "axios";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link } from "react-router";
import { BASE_URL } from "../helper/config";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { setUser, loginUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        // 1️ Update context
        loginUser(response.data.data);

        // 2️ Toast
        toast.success("Login Successful!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9E4CB] flex flex-col items-center justify-center py-12 px-4 font-raleway">
      <div className="global-container max-w-[500px]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-normal text-gray-800 mb-2">
            Sign in to your account
          </h1>
          <p className="text-sm text-gray-600">
            Or{" "}
            <Link
              to="/register"
              className="font-bold text-black border-b border-black"
            >
              create a new account
            </Link>
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 md:p-10 shadow-sm rounded-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-black transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={18} />
                  ) : (
                    <IoEyeOutline size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 accent-black"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-[12px] text-gray-600 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <a
                href="/forgot-password"
                shaking
                className="text-[12px] font-bold text-black border-b border-black"
              >
                Forgot your password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-4 mt-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-gray-900 transition-all"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Bottom Policy Text */}
        <div className="text-center mt-10">
          <p className="text-[12px] text-gray-500 leading-relaxed">
            By signing in, you agree to our <br className="md:hidden" />
            <span className="font-bold text-black underline mx-1 cursor-pointer">
              Terms of Service
            </span>
            and
            <span className="font-bold text-black underline mx-1 cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
