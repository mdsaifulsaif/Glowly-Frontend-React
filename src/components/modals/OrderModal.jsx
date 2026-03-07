import React from "react";
import { useOrderStore } from "../../store/useOrderStore";
import { IoCloseOutline } from "react-icons/io5";

const OrderModal = ({ onStatusUpdate }) => {
  const { isModalOpen, closeModal, selectedOrder } = useOrderStore();

  if (!isModalOpen || !selectedOrder) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 transition-all">
      {/* Modal Container */}
      <div className="bg-white w-[95%] sm:w-full max-w-2xl mx-auto  shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom sm:zoom-in duration-300 max-h-[90vh] sm:max-h-[85vh] flex flex-col mb-4 sm:mb-0">
        {/* Header - Sticky */}
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-5 sm:p-6 border-b">
          <div className="flex flex-col">
            <h3 className="text-lg sm:text-xl font-bold italic text-gray-800 uppercase tracking-tighter">
              Order Details
            </h3>
            <span className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              ID: #{selectedOrder._id?.slice(-8).toUpperCase()}
            </span>
          </div>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-all group active:scale-90"
          >
            <IoCloseOutline
              size={24}
              className="group-hover:rotate-90 transition-transform duration-200"
            />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto overflow-x-hidden">
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-widest">
                Customer Info
              </p>
              <p className="font-bold text-gray-800 text-sm sm:text-base leading-none">
                {selectedOrder.firstName} {selectedOrder.lastName}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1.5 break-all">
                {selectedOrder.email}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {selectedOrder.phone}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 mb-2 tracking-widest">
                Shipping Address
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {selectedOrder.address}, {selectedOrder.city}, <br />
                {selectedOrder.state} - {selectedOrder.postalCode},{" "}
                {selectedOrder.country}
              </p>
            </div>
          </div>

          {/* Items Section */}
          <div className="mb-6 sm:mb-8">
            <p className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 mb-3 tracking-widest">
              Order Items ({selectedOrder.cartItems?.length || 0})
            </p>
            <div className="space-y-3">
              {selectedOrder.cartItems?.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 sm:gap-4 bg-white p-2.5 sm:p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <img
                    src={item.thumbnail}
                    className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg border border-gray-50 flex-shrink-0"
                    alt={item.name}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-gray-800 leading-tight mb-1 truncate">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-tighter">
                      {item.category || "General"}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">
                      ${item.salePrice}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase">
                      Qty: {item.qty}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Update Status Section - Optimized for Mobile Width */}
          <div className="bg-[#ffeef3] p-4 sm:p-6 rounded-2xl shadow-sm border border-[#fcdce4] mb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#d6336c] opacity-80">
                Update Status
              </p>
              <span className="text-[9px] sm:text-[10px] bg-white px-3 py-1 rounded-full border border-[#fcdce4] font-bold uppercase tracking-widest text-[#d6336c]">
                Current: {selectedOrder.status}
              </span>
            </div>

            <div className="relative w-full">
              <select
                value={selectedOrder.status}
                onChange={(e) =>
                  onStatusUpdate(selectedOrder._id, e.target.value)
                }
                className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl py-3.5 pl-4 pr-10 outline-none focus:ring-2 focus:ring-[#fcdce4] cursor-pointer font-bold text-sm transition-all appearance-none block"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Returned">Returned</option>
              </select>
              {/* Dropdown Arrow Icon - Positioning fix */}
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
