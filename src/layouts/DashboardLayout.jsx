import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";

import {
  IoGridOutline,
  IoCubeOutline,
  IoCartOutline,
  IoPeopleOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  console.log("admin", user);

  const menuItems = [
    { name: "Products", icon: <IoCubeOutline />, path: "/dashboard/products" },
    { name: "Orders", icon: <IoCartOutline />, path: "/dashboard/orders" },
    { name: "Customers", icon: <IoPeopleOutline />, path: "/dashboard/customers" },
    { name: "Settings", icon: <IoSettingsOutline />, path: "/dashboard/settings" },
  ];

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#F9F3F5] p-6">
      {/* Logo Section */}
      <div className="mb-10 flex justify-center">
        <Link to={"/"}>
          <img
            src="/assets/logo.png"
            alt="Seoul Mirage"
            className="w-32 h-auto"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-black text-white shadow-md"
                  : "text-gray-600 hover:bg-white/50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 px-4 py-3 w-full border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all"
      >
        <IoLogOutOutline className="text-lg" />
        Logout
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#FDFCFD] font-sans">
      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden lg:block w-64 fixed inset-y-0 left-0 z-50">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-2xl p-1"
              onClick={() => setIsSidebarOpen(true)}
            >
              <IoMenuOutline />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-xl text-gray-500 hover:text-black relative">
              <IoNotificationsOutline />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 border-l pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                  Super Admin
                </p>
              </div>
              {/* <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-50 overflow-hidden">
                <img
                  src=" https://ui-avatars.com/api/?name=Admin"
                  alt="profile"
                />
              </div> */}
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-50 overflow-hidden">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={`https://ui-avatars.com/api/?name=${user?.firstName || "Admin"}&background=random`}
                    alt="default profile"
                  />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Pages Content */}
        <main className="p-4 md:p-8  mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-2xl animate-slide-in">
            <button
              className="absolute top-4 right-4 text-2xl"
              onClick={() => setIsSidebarOpen(false)}
            >
              <IoCloseOutline />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
