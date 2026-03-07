import React, { useState, useEffect } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../helper/config";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState("summary");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/getOrderById/${id}`, {
          withCredentials: true,
        });
        if (data.success) setOrder(data.data);
      } catch (err) {
        console.error("Error fetching order details");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (!order) return <div className="py-20 text-center">Order not found.</div>;

  return (
    <div className="bg-[#F3E6D5] min-h-screen py-10 md:py-20 px-6 font-raleway">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest mb-10"
        >
          <IoArrowBackOutline size={16} /> Back to Account
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
                Order ORD-{order._id.slice(-5).toUpperCase()}
              </h1>
              <p className="text-gray-400 mt-2">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <span className="bg-[#E2F0E9] text-[#54A37A] text-[10px] font-bold uppercase px-4 py-1 rounded-full">
              {order.status}
            </span>
          </div>

          {/* Sub Tabs */}
          <div className="flex gap-4 mb-10">
            <button
              onClick={() => setActiveSubTab("summary")}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeSubTab === "summary" ? "bg-black text-white" : "bg-white text-black border border-gray-100"}`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveSubTab("shipping")}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeSubTab === "shipping" ? "bg-black text-white" : "bg-white text-black border border-gray-100"}`}
            >
              Shipping
            </button>
          </div>

          {activeSubTab === "summary" ? (
            <div className="space-y-10">
              {/* Order Items */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest mb-6">
                  Order Items
                </h2>
                <div className="space-y-6">
                  {order.cartItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between border-b border-gray-50 pb-6 last:border-0"
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-bold text-[#1A1A1A]">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1">
                            Quantity: {item.qty}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-[#1A1A1A]">
                        ${item.salePrice}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Calculation */}
              <div className="border-t border-gray-100 pt-10 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-widest mb-6">
                  Shipping Information
                </h2>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 italic">Subtotal</span>
                  <span className="font-bold text-[#1A1A1A]">
                    $
                    {(
                      parseFloat(order.totalAmount.replace("$", "")) - 5.99
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 italic text-green-600">
                    Discount (10%)
                  </span>
                  <span className="font-bold text-green-600">-$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 italic">Shipping</span>
                  <span className="font-bold text-[#1A1A1A]">
                    ${order.shippingMethod}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-6">
                  <span className="font-bold uppercase text-sm">Total</span>
                  <span className="font-bold text-xl text-[#1A1A1A]">
                    {order.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-6">
                Delivery Address
              </h2>
              <div className="text-gray-600 space-y-2 text-sm leading-relaxed">
                <p className="font-bold text-black">
                  {order.firstName} {order.lastName}
                </p>
                <p>{order.address}</p>
                <p>
                  {order.city}, {order.state} {order.postalCode}
                </p>
                <p>{order.country}</p>
                <p className="pt-4">
                  <span className="font-bold text-black">Phone:</span>{" "}
                  {order.phone}
                </p>
                <p>
                  <span className="font-bold text-black">Email:</span>{" "}
                  {order.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
