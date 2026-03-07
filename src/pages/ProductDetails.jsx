import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import { FaStar, FaMinus, FaPlus, FaSearchPlus } from "react-icons/fa";
import { BASE_URL } from "../helper/config";
import { useCartStore } from "../store/useCartStore";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import Handpicked from "../components/Handpicked";

const ProductDetails = () => {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodRes, revRes] = await Promise.all([
          axios.get(`${BASE_URL}/product/${id}`),
          axios.get(`${BASE_URL}/review/${id}`),
        ]);

        if (prodRes.data.success) {
          setProduct(prodRes.data.data);
          setMainImage(prodRes.data.data.thumbnail);
        }
        setReviews(
          Array.isArray(revRes.data?.data)
            ? revRes.data.data
            : revRes.data || [],
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/review/add`,
        { productId: id, rating, comment },
        { withCredentials: true },
      );
      if (res.data.success) {
        toast.success("Review added!");
        setComment("");
        setReviews([{ rating, comment, createdAt: new Date() }, ...reviews]);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  if (loading || !product)
    return (
      <div className="h-screen flex justify-center items-center font-bold">
        Loading...
      </div>
    );

  return (
    <div className="bg-white font-raleway">
      <div className="container mx-auto px-4 py-10 lg:py-20">
        {/* SECTION 1: Product Gallery & Info (Updated Image Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image Section: Mobile responsive layout */}
          <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[600px]">
            {/* Main Image Viewport (Now comes first in DOM for mobile, but controlled by flex order) */}
            <div className="flex-1 bg-[#F9F9F9] relative overflow-hidden group rounded-sm flex justify-center items-center h-[400px] md:h-full order-1 md:order-2">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-4 right-4 p-2 bg-white/80 rounded-full shadow-sm cursor-pointer">
                <FaSearchPlus className="text-gray-600" size={16} />
              </div>
            </div>

            {/* Thumbnails (Mobile: Bottom, Desktop: Left) */}
            <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar min-w-full md:min-w-[80px] order-2 md:order-1 pb-2 md:pb-0">
              {[product.thumbnail, ...product.images].map((img, i) => (
                <div
                  key={i}
                  className={`relative w-20 h-20 flex-shrink-0 cursor-pointer border rounded-sm overflow-hidden transition-all ${
                    mainImage === img
                      ? "border-black shadow-sm"
                      : "border-gray-100"
                  }`}
                  onClick={() => setMainImage(img)}
                >
                  <img
                    src={img}
                    alt={`thumb-${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-2 text-zinc-900">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-black text-xs gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="text-gray-400 text-sm">
                ({reviews.length} reviews)
              </span>
            </div>
            <div className="text-3xl font-bold mb-8 text-zinc-900">
              ${product.salePrice}
            </div>

            <div className="space-y-8 mb-10 text-sm text-gray-600 leading-relaxed">
              <div>
                <h4 className="font-bold text-black mb-3 uppercase tracking-wider text-xs">
                  Straight Up:
                </h4>
                <p className="max-w-md">{product.straight_up}</p>
              </div>
              <div>
                <h4 className="font-bold text-black mb-3 uppercase tracking-wider text-xs">
                  The Lowdown:
                </h4>
                <ul className="list-disc list-inside space-y-2">
                  {product.lowdown?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 mt-auto">
              <div className="flex items-center border border-zinc-200 rounded-full bg-zinc-50 px-4 py-3">
                <button onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}>
                  <FaMinus size={10} />
                </button>
                <span className="px-8 font-bold text-zinc-900 min-w-[80px] text-center">
                  {quantity}
                </span>
                <button onClick={() => setQuantity((q) => q + 1)}>
                  <FaPlus size={10} />
                </button>
              </div>
              <button
                onClick={() => {
                  addToCart(product, quantity);
                  toast.success(`${product.name} added to cart!`);
                }}
                className="flex-1 bg-black text-white py-4 rounded-full font-bold uppercase tracking-[0.15em] text-xs hover:bg-zinc-800 transition-all"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: Ratings and Reviews */}
        <div className="bg-[#F2E6D9] py-16 px-6 md:px-20 rounded-3xl">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-2/5">
              <h2 className="text-3xl font-bold mb-4">Ratings and Reviews</h2>
              <div className="flex items-center gap-2 mb-8">
                <div className="flex text-black">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <span className="font-bold">{reviews.length} Reviews</span>
              </div>

              {user ? (
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <h3 className="font-bold mb-4">Write a Review</h3>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="flex gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <FaStar
                          key={n}
                          onClick={() => setRating(n)}
                          className={`cursor-pointer text-xl ${rating >= n ? "text-black" : "text-gray-200"}`}
                        />
                      ))}
                    </div>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your experience..."
                      className="w-full border-zinc-100 border-2 p-4 rounded-xl focus:outline-none focus:border-zinc-300"
                      rows="4"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-3 rounded-full font-bold uppercase text-xs tracking-widest"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-zinc-800 text-white p-6 rounded-2xl">
                  <p className="text-sm">
                    Please{" "}
                    <Link to="/login" className="underline font-bold">
                      Login
                    </Link>{" "}
                    to leave a review.
                  </p>
                </div>
              )}
            </div>

            <div className="lg:w-3/5 space-y-10">
              {reviews.length > 0 ? (
                reviews.map((rev, i) => (
                  <div
                    key={i}
                    className="border-b border-[#e5d8cb] pb-8 last:border-0"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${rev.user?.firstName || "User"}&background=random`}
                        className="w-10 h-10 rounded-full"
                        alt="user"
                      />
                      <div>
                        <div className="flex text-black text-[10px] mb-1">
                          {[...Array(5)].map((_, idx) => (
                            <FaStar
                              key={idx}
                              className={
                                idx < rev.rating
                                  ? "text-black"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <h5 className="font-bold text-sm">
                          {rev.user?.firstName || "Verified Customer"}
                        </h5>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-2 italic">
                      "{rev.comment}"
                    </p>
                    <span className="text-gray-400 text-[10px]">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">
                  No reviews yet. Be the first to review!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Hand picked for you  */}
        <Handpicked/>
      </div>
    </div>
  );
};

export default ProductDetails;
