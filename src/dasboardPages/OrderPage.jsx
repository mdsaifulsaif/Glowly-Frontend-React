import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  IoSearchOutline, 
  IoEllipsisHorizontal, 
  IoCartOutline, 
  IoTimeOutline, 
  IoCheckmarkCircleOutline, 
  IoStatsChartOutline 
} from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BASE_URL } from "../helper/config";


const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/all-orders?page=${currentPage}&search=${searchTerm}`);
      if (response.data.success) {
        setOrders(response.data.orders);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Order Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, searchTerm]);


  const getStatusBadge = (status) => {
    const styles = {
      Pending: "bg-yellow-50 text-yellow-600",
      Processing: "bg-blue-50 text-blue-600",
      Shipped: "bg-purple-50 text-purple-600",
      Delivered: "bg-green-50 text-green-600",
      Cancelled: "bg-red-50 text-red-600",
    };
    return (
      <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${styles[status] || "bg-gray-50 text-gray-600"}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 font-sans pb-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 italic">Manage Orders</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Order" value={pagination.totalOrders || 0} icon={<IoCartOutline />} />
        <StatCard label="Processing" value={orders.filter(o => o.status === 'Processing').length} icon={<IoTimeOutline />} />
        <StatCard label="Pending Payments" value={orders.filter(o => o.status === 'Pending').length} icon={<IoStatsChartOutline />} />
        <StatCard label="Revenue" value="$91,526" icon={<IoCheckmarkCircleOutline />} />
      </div>

      {/* Search & Filter */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="relative w-full max-w-md">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search by Customer or Order ID..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:bg-white focus:border-gray-200 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {loading ? (
                <tr><td colSpan="8" className="text-center py-20 text-gray-400">Loading Orders...</td></tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-400 text-xs">#{order._id.slice(-6)}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">
                      {order.customerInfo?.firstName || order.firstName} {order.customerInfo?.lastName || order.lastName}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{order.customerInfo?.email || order.email}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-600">
                      {(order.cartItems?.length || order.items?.length)} Items
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {order.totalAmount.toString().startsWith('$') ? order.totalAmount : `$${order.totalAmount}`}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-gray-400 hover:text-black transition-colors p-2 rounded-full hover:bg-gray-100">
                        <IoEllipsisHorizontal className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Showing Page <span className="font-bold text-gray-800">{pagination.currentPage}</span> of <span className="font-bold text-gray-800">{pagination.totalPages}</span>
          </p>
          <div className="flex items-center gap-2">
            <button 
              disabled={!pagination.hasPrevPage}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-30"
            >
              <FiChevronLeft />
            </button>
            <button 
              disabled={!pagination.hasNextPage}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-30"
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
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4">
    <div className="flex justify-between items-center text-gray-400">
      <p className="text-[10px] font-bold uppercase tracking-wider">{label}</p>
      <span className="text-xl">{icon}</span>
    </div>
    <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
  </div>
);

export default OrderPage;