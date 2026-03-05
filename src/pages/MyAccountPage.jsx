import React, { useState } from "react";
import { IoPersonOutline, IoBagHandleOutline, IoCameraOutline } from "react-icons/io5";

const MyAccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="bg-white min-h-screen py-16 font-raleway">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-medium text-[#1A1A1A] mb-10">My Account</h1>

        {/* Tab Buttons */}
        <div className="flex gap-4 mb-12">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === "profile" ? "bg-black text-white" : "bg-white text-black border border-gray-200"
            }`}
          >
            <IoPersonOutline className="text-sm" /> Profile
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === "orders" ? "bg-black text-white" : "bg-white text-black border border-gray-200"
            }`}
          >
            <IoBagHandleOutline className="text-sm" /> Order History
          </button>
        </div>

        {activeTab === "profile" && (
          <div className="space-y-16">
            {/* --- User Information Section --- */}
            <section>
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-8">User Information</h2>
              
              {/* Profile Image Upload */}
              <div className="relative w-32 h-32 mb-10">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="User"
                  className="w-full h-full object-cover rounded-full"
                />
                <label className="absolute bottom-1 right-1 bg-black text-white p-2 rounded-full cursor-pointer hover:scale-110 transition-transform">
                  <IoCameraOutline size={16} />
                  <input type="file" className="hidden" />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">First name</label>
                  <input type="text" className="border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400" placeholder="Full name" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">Last name</label>
                  <input type="text" className="border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400" placeholder="Last name" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">Email</label>
                  <input type="email" className="border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">Phone</label>
                  <input type="text" className="border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400" />
                </div>
              </div>
              <button className="mt-8 bg-black text-white px-8 py-3 rounded-md font-bold text-[10px] uppercase tracking-widest hover:opacity-90">
                Update Profile
              </button>
            </section>

            {/* --- Shipping Address Section --- */}
            <section>
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-8">Shipping Address</h2>
              <div className="space-y-6 max-w-4xl">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">Apartment, suite, etc. (optional)</label>
                  <input type="text" className="w-full border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">City</label>
                    <input type="text" className="border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">State/Province</label>
                    <select className="border border-[#E5E5E5] p-3 rounded-md bg-white text-gray-500 appearance-none focus:outline-none">
                      <option>Select</option>
                      <option>Dhaka</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">Postal Code</label>
                    <input type="text" className="border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">Country</label>
                  <select className="border border-[#E5E5E5] p-3 rounded-md bg-white text-gray-500 appearance-none focus:outline-none">
                    <option>Country</option>
                    <option>Bangladesh</option>
                  </select>
                </div>
                <button className="bg-black text-white px-8 py-3 rounded-md font-bold text-[10px] uppercase tracking-widest hover:opacity-90">
                  Update Shipping Address
                </button>
              </div>
            </section>

            {/* --- Change Password Section --- */}
            <section>
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-8">Change Password</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">Current Password</label>
                  <input type="password" placeholder="••••••••••••••••" className="border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">New Password</label>
                  <input type="password" placeholder="••••••••••••••••" className="border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#333]">Confirm New Password</label>
                  <input type="password" placeholder="••••••••••••••••" className="border border-[#E5E5E5] p-3 rounded-md focus:outline-none focus:border-gray-400" />
                </div>
              </div>
              <button className="mt-8 bg-black text-white px-8 py-3 rounded-md font-bold text-[10px] uppercase tracking-widest hover:opacity-90">
                Change Password
              </button>
            </section>

            {/* Logout */}
            <div className="pt-10">
                <button className="text-red-500 border border-red-500 px-8 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-red-50 transition-all">
                    Log Out
                </button>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="py-10 text-center text-gray-400 italic">
            Your order history will appear here.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccountPage;