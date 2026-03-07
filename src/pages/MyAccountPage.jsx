import React, { useState, useEffect } from "react";
import {
  IoPersonOutline,
  IoBagHandleOutline,
  IoCameraOutline,
} from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../helper/config";
import { useNavigate } from "react-router";

const MyAccountPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]); // অর্ডারের জন্য স্টেট
  const [orderLoading, setOrderLoading] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    profileImage: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  // ১. প্রোফাইল লোড করা
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/auth/profile`, {
          withCredentials: true,
        });
        if (data.success) {
          const user = data.data;
          setUserData((prev) => ({
            ...prev,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phone: user.phone || "",
            addressLine: user.shippingAddress?.addressLine || "",
            city: user.shippingAddress?.city || "",
            state: user.shippingAddress?.state || "",
            postalCode: user.shippingAddress?.postalCode || "",
            country: user.shippingAddress?.country || "",
            profileImage: user.profileImage,
          }));
        }
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  // ২. অর্ডার হিস্ট্রি ফেচ করা (Pagination সহ)
  useEffect(() => {
    if (activeTab === "orders") {
      const fetchOrders = async () => {
        setOrderLoading(true);
        try {
          const { data } = await axios.get(
            `${BASE_URL}/getUserOrders?page=1&limit=10`,
            { withCredentials: true },
          );
          if (data.success) {
            setOrders(data.data);
          }
        } catch (err) {
          toast.error("Failed to load orders");
        } finally {
          setOrderLoading(false);
        }
      };
      fetchOrders();
    }
  }, [activeTab]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const updateProfileRequest = async (payload) => {
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/auth/update-profile`,
        payload,
        { withCredentials: true },
      );
      if (data.success) toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleUserInfoUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);
    if (selectedFile) formData.append("profileImage", selectedFile);
    updateProfileRequest(formData);
  };

  const handleAddressUpdate = (e) => {
    e.preventDefault();
    updateProfileRequest({
      addressLine: userData.addressLine,
      city: userData.city,
      state: userData.state,
      postalCode: userData.postalCode,
      country: userData.country,
    });
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (userData.newPassword !== userData.confirmPassword)
      return toast.error("New passwords do not match!");
    updateProfileRequest({
      currentPassword: userData.currentPassword,
      newPassword: userData.newPassword,
    });
  };

  return (
    <div className="bg-white min-h-screen py-16 font-raleway">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-medium text-[#1A1A1A] mb-10 italic">
          My Account
        </h1>

        {/* Tab Buttons */}
        <div className="flex gap-4 mb-12">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "profile" ? "bg-black text-white" : "bg-white text-black border border-gray-200"}`}
          >
            <IoPersonOutline /> Profile
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "orders" ? "bg-black text-white" : "bg-white text-black border border-gray-200"}`}
          >
            <IoBagHandleOutline /> Order History
          </button>
        </div>

        {/* PROFILE TAB CONTENT */}
        {activeTab === "profile" && (
          <div className="space-y-16">
            <section>
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-8">
                User Information
              </h2>
              <div className="relative w-32 h-32 mb-10">
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : userData.profileImage ||
                        "https://via.placeholder.com/150"
                  }
                  alt="User"
                  className="w-full h-full object-cover rounded-full border border-gray-100"
                />
                <label className="absolute bottom-1 right-1 bg-black text-white p-2 rounded-full cursor-pointer hover:scale-110 transition-transform">
                  <IoCameraOutline size={16} />
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase">
                    First name
                  </label>
                  <input
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    type="text"
                    className="border border-[#E5E5E5] p-3 rounded-md outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase">
                    Last name
                  </label>
                  <input
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    type="text"
                    className="border border-[#E5E5E5] p-3 rounded-md outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase">
                    Email
                  </label>
                  <input
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    type="email"
                    className="border border-[#E5E5E5] p-3 rounded-md outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    type="text"
                    className="border border-[#E5E5E5] p-3 rounded-md outline-none"
                  />
                </div>
              </div>
              <button
                onClick={handleUserInfoUpdate}
                disabled={loading}
                className="mt-8 bg-black text-white px-8 py-3 rounded-md font-bold text-[10px] uppercase tracking-widest"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-8">
                Shipping Address
              </h2>
              <div className="space-y-6 max-w-4xl">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase">
                    Address Line
                  </label>
                  <input
                    name="addressLine"
                    value={userData.addressLine}
                    onChange={handleChange}
                    type="text"
                    className="w-full border border-[#E5E5E5] p-3 rounded-md outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase">
                      City
                    </label>
                    <input
                      name="city"
                      value={userData.city}
                      onChange={handleChange}
                      type="text"
                      className="border border-[#E5E5E5] p-3 rounded-md outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase">
                      State
                    </label>
                    <input
                      name="state"
                      value={userData.state}
                      onChange={handleChange}
                      type="text"
                      className="border border-[#E5E5E5] p-3 rounded-md outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase">
                      Postal Code
                    </label>
                    <input
                      name="postalCode"
                      value={userData.postalCode}
                      onChange={handleChange}
                      type="text"
                      className="border border-[#E5E5E5] p-3 rounded-md outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddressUpdate}
                  className="bg-black text-white px-8 py-3 rounded-md font-bold text-[10px] uppercase tracking-widest"
                >
                  Update Address
                </button>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-8">
                Change Password
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase">
                    Current Password
                  </label>
                  <input
                    name="currentPassword"
                    value={userData.currentPassword}
                    onChange={handleChange}
                    type="password"
                    placeholder="••••••••"
                    className="border border-[#E5E5E5] p-3 rounded-md outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase">
                    New Password
                  </label>
                  <input
                    name="newPassword"
                    value={userData.newPassword}
                    onChange={handleChange}
                    type="password"
                    placeholder="••••••••"
                    className="border border-[#E5E5E5] p-3 rounded-md outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase">
                    Confirm Password
                  </label>
                  <input
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    type="password"
                    placeholder="••••••••"
                    className="border border-[#E5E5E5] p-3 rounded-md outline-none"
                  />
                </div>
              </div>
              <button
                onClick={handlePasswordUpdate}
                className="mt-8 bg-black text-white px-8 py-3 rounded-md font-bold text-[10px] uppercase tracking-widest"
              >
                Update Password
              </button>
            </section>
          </div>
        )}

        {/* ORDER HISTORY TAB CONTENT (Design অনুযায়ী) */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {orderLoading ? (
              <p className="text-center py-10">Loading orders...</p>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="border border-gray-100 rounded-lg p-8 bg-white shadow-sm"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-[#1A1A1A]">
                        Order ORD-{order._id.slice(-5).toUpperCase()}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-[11px] font-bold uppercase px-3 py-1 rounded-full ${order.status === "Delivered" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"}`}
                      >
                        {order.status}
                      </span>
                      <p className="text-lg font-bold text-[#1A1A1A] mt-2">
                        {order.totalAmount}
                      </p>
                    </div>
                  </div>

                  {/* Product List Inside Order */}
                  <div className="space-y-4 mb-8">
                    {order.cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm text-gray-600"
                      >
                        <span>
                          {item.name} x {item.qty}
                        </span>
                        <span className="font-medium">
                          ${item.salePrice.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate(`/order-details/${order._id}`)}
                    className="w-full border border-gray-200 py-3 rounded-md text-[11px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                  >
                    View Order Details
                  </button>
                  {/* <button className="w-full border border-gray-200 py-3 rounded-md text-[11px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                    View Order Details
                  </button> */}
                </div>
              ))
            ) : (
              <p className="text-center py-10 text-gray-400">
                No orders found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccountPage;
