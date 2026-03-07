

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IoSearchOutline,
  IoCartOutline,
  IoTimeOutline,
  IoCheckmarkCircleOutline,
  IoStatsChartOutline,
} from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import toast from "react-hot-toast";

import { useOrderStore } from "../store/useOrderStore";
import OrderModal from "../components/modals/OrderModal";
import { BASE_URL } from "../helper/config";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { openModal, updateSelectedOrderStatus } = useOrderStore();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/all-orders?page=${currentPage}&search=${searchTerm}`,
        { withCredentials: true },
      );
      if (response.data.success) {
        setOrders(response.data.orders);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Order Fetch Error:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    const loadId = toast.loading(`Updating status to ${newStatus}...`);
    try {
      const response = await axios.put(
        `${BASE_URL}/update-status/${orderId}`,
        { status: newStatus },
        { withCredentials: true },
      );

      if (response.data.success) {
        toast.success(`Order ${newStatus} successfully!`, { id: loadId });

        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: newStatus } : o,
          ),
        );

        updateSelectedOrderStatus(newStatus);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed", {
        id: loadId,
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, searchTerm]);

  const getStatusBadge = (status) => {
    const styles = {
      Pending: "bg-yellow-50 text-yellow-600 border-yellow-100",
      Processing: "bg-blue-50 text-blue-600 border-blue-100",
      Shipped: "bg-purple-50 text-purple-600 border-purple-100",
      Delivered: "bg-green-50 text-green-600 border-green-100",
      Cancelled: "bg-red-50 text-red-600 border-red-100",
    };
    return (
      <span
        className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border whitespace-nowrap ${styles[status] || "bg-gray-50 text-gray-600"}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 font-sans pb-10 w-full overflow-x-hidden">
      {/* Zustand Modal */}
      <OrderModal onStatusUpdate={handleUpdateStatus} />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 italic">
          Manage Orders
        </h2>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          label="Total Order"
          value={pagination.totalOrders || 0}
          icon={<IoCartOutline />}
        />
        <StatCard
          label="Processing"
          value={orders.filter((o) => o.status === "Processing").length}
          icon={<IoTimeOutline />}
        />
        <StatCard
          label="Pending"
          value={orders.filter((o) => o.status === "Pending").length}
          icon={<IoStatsChartOutline />}
        />
        <StatCard
          label="Delivered"
          value={orders.filter((o) => o.status === "Delivered").length}
          icon={<IoCheckmarkCircleOutline />}
        />
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:max-w-md">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search by Customer or Order ID..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:bg-white focus:border-gray-200 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Orders Table Container */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {loading && orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-20 text-gray-400 italic font-medium"
                  >
                    Loading Orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-20 text-gray-400 italic font-medium"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50/50 transition-colors whitespace-nowrap"
                  >
                    <td className="px-6 py-4 font-medium text-gray-400 text-xs uppercase tracking-tighter">
                      #{order._id.slice(-6)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800">
                          {order.firstName} {order.lastName}
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-tighter truncate max-w-[150px]">
                          {order.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(order.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-600">
                      {order.cartItems?.length || 0} Items
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {order.totalAmount.toString().startsWith("$")
                        ? order.totalAmount
                        : `$${order.totalAmount}`}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => openModal(order)}
                        className="bg-black text-white text-[10px] px-5 py-2.5 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-800 active:scale-95 transition-all shadow-sm"
                      >
                        View & Update
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination - Responsive */}
        <div className="p-6 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 italic">
            Showing Page{" "}
            <span className="font-bold text-gray-800">
              {pagination.currentPage}
            </span>{" "}
            of{" "}
            <span className="font-bold text-gray-800">
              {pagination.totalPages}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={!pagination.hasPrevPage}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm"
            >
              <FiChevronLeft />
            </button>
            <button
              disabled={!pagination.hasNextPage}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow w-full">
    <div className="flex justify-between items-center text-gray-400">
      <p className="text-[10px] font-bold uppercase tracking-wider">{label}</p>
      <span className="text-xl text-black">{icon}</span>
    </div>
    <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{value}</h3>
  </div>
);

export default OrderPage;
