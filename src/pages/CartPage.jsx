import React from "react";
import { useCartStore } from "../store/useCartStore";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { Link } from "react-router";

const CartPage = () => {
  const { cart, addToCart, removeFromCart } = useCartStore();

  // সাবটোটাল ক্যালকুলেশন
  const subtotal = cart.reduce((acc, item) => acc + item.salePrice * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  const handleQuantity = (item, type) => {
    if (type === "inc") {
      addToCart(item, 1);
    } else {
      if (item.quantity > 1) {
        addToCart(item, -1);
      }
    }
  };

  if (cart.length === 0) {
    return (
      <div className="h-screen flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl font-bold">আপনার কার্ট খালি!</h2>
        <Link to="/" className="bg-black text-white px-6 py-2 rounded-full font-bold uppercase text-sm">
          শপিং শুরু করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <h1 className="text-5xl font-medium mb-16">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* left item list*/}
        <div className="flex-1 space-y-8">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center gap-6 border-b border-gray-100 pb-8 relative">
              <div className="w-24 h-24 bg-[#F9F9F9]  ">
                <img src={item.thumbnail} alt={item.name} className="w-full h-full object-contain" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                  <p className="font-bold text-lg">${item.salePrice}</p>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">Quantity: {item.quantity}</p>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg px-3 py-1 gap-4">
                    <button onClick={() => handleQuantity(item, "dec")} className="text-gray-500 hover:text-black">
                      <FaMinus size={10} />
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                    <button onClick={() => handleQuantity(item, "inc")} className="text-gray-500 hover:text-black">
                      <FaPlus size={10} />
                    </button>
                  </div>
                </div>

                {/* ডিলিট বাটন */}
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="absolute right-0 bottom-8 text-red-400 hover:text-red-600 transition-colors"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          ))}

          <Link to="/" className="inline-block mt-8 border border-gray-200 px-8 py-3 rounded-lg font-bold text-sm hover:bg-gray-50 transition-all">
            Continue Shopping
          </Link>
        </div>

        {/* right side order  */}
        <div className="lg:w-[400px]">
          <div className="bg-[#F2E6D9] p-10 ">
            <h2 className="font-bold text-lg mb-8">Order Summary</h2>
            
            <div className="space-y-4 text-gray-700 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-[#e5d8cb]">
                <span className="text-sm font-medium">Shipping</span>
                <span className="font-bold">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-black pt-2">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-xl">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <input 
                type="text" 
                placeholder="Promo Code" 
                className="flex-1 bg-white px-4 py-3 rounded-lg text-sm focus:outline-none"
              />
              <button className="bg-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-gray-100">
                Apply
              </button>
            </div>

            <button className="w-full bg-black text-white py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-all shadow-lg">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;