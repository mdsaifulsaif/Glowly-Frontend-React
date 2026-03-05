// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import axios from "axios";
// import { FaStar, FaMinus, FaPlus } from "react-icons/fa";
// import { BASE_URL } from "../helper/config";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [mainImage, setMainImage] = useState("");
//   const [quantity, setQuantity] = useState(1);

//   // Review Form State
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   useEffect(() => {
//     const fetchFullDetails = async () => {
//       try {
//         setLoading(true);
//         // 1. Fetch Product Data
//         const res = await axios.get(`${BASE_URL}/product/${id}`);

//         // 2. Fetch Reviews Data
//         const revRes = await axios.get(`${BASE_URL}/review/${id}`,);

//         if (res.data.success) {
//           setProduct(res.data.data);
//           setMainImage(res.data.data.thumbnail);
//         }

//         // Fix: Ensure reviews is always an array
//         // Jodi API response format { success: true, data: [] } hoy
//         const reviewData = revRes.data?.data || revRes.data;
//         console.log("product riii",reviewData)
//         setReviews(Array.isArray(reviewData) ? reviewData : []);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setReviews([]); // Error hole empty array set koro
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFullDetails();
//     window.scrollTo(0, 0);
//   }, [id]);

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${BASE_URL}/review/add`, {
//         productId: id,
//         rating,
//         comment,
//       },{
//         withCredentials: true
//       });
//       if (res.status === 200 || res.data.success) {
//         alert("Review added successfully!");
//         setComment("");
//         setRating(5);
//         // Optional: List refresh korar jonno abar fetch korte paro
//       }
//     } catch (err) {
//       alert("Error adding review");
//     }
//   };

//   if (loading)
//     return (
//       <div className="h-screen flex justify-center items-center font-bold text-gray-400 italic">
//         Loading details...
//       </div>
//     );
//   if (!product)
//     return (
//       <div className="h-screen flex justify-center items-center text-red-500">
//         Product not found!
//       </div>
//     );

//   return (
//     <div className="bg-white">
//       <div className="container mx-auto px-4 py-6 md:py-10">
//         {/* TOP SECTION: Gallery & Info */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
//           {/* Left: Image Gallery */}
//           <div className="flex flex-col-reverse md:flex-row gap-4">
//             {/* Thumbnails */}
//             <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
//               {[product.thumbnail, ...product.images].map((img, i) => (
//                 <img
//                   key={i}
//                   src={img}
//                   alt="thumbnail"
//                   className={`w-16 h-16 md:w-20 md:h-20 object-cover cursor-pointer border-2 transition-all ${mainImage === img ? "border-black shadow-md" : "border-transparent opacity-70"}`}
//                   onClick={() => setMainImage(img)}
//                 />
//               ))}
//             </div>
//             {/* Main Image */}
//             <div className="flex-1 bg-[#F9F9F9] flex justify-center items-center p-4 md:p-8 rounded-lg">
//               <img
//                 src={mainImage}
//                 alt={product.name}
//                 className="max-h-[350px] md:max-h-[500px] w-full object-contain"
//               />
//             </div>
//           </div>

//           {/* Right: Product Info */}
//           <div className="flex flex-col">
//             <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
//               {product.name}
//             </h1>
//             <div className="flex items-center gap-2 mb-4 md:mb-6 text-sm">
//               <div className="flex text-black">
//                 <FaStar />
//                 <FaStar />
//                 <FaStar />
//                 <FaStar />
//                 <FaStar />
//               </div>
//               <span className="text-gray-500 font-medium">
//                 ({reviews.length} reviews)
//               </span>
//             </div>

//             <div className="text-2xl md:text-3xl font-bold mb-1">
//               ${product.salePrice}
//               <span className="text-gray-400 text-lg md:text-xl line-through ml-3">
//                 ${product.regularPrice}
//               </span>
//             </div>
//             <p className="text-green-600 text-xs md:text-sm font-semibold mb-6 md:mb-8 italic">
//               Save ${product.regularPrice - product.salePrice} right now
//             </p>

//             <div className="space-y-6 mb-8 border-t border-gray-100 pt-6">
//               <div>
//                 <h4 className="font-bold text-xs uppercase tracking-widest mb-2">
//                   Description
//                 </h4>
//                 <p className="text-gray-600 text-sm leading-relaxed">
//                   {product.description}
//                 </p>
//               </div>
//               <div>
//                 <h4 className="font-bold text-xs uppercase tracking-widest mb-2">
//                   Straight Up:
//                 </h4>
//                 <p className="text-gray-600 text-sm italic">
//                   "{product.straight_up}"
//                 </p>
//               </div>
//               <div>
//                 <h4 className="font-bold text-xs uppercase tracking-widest mb-2">
//                   The Lowdown:
//                 </h4>
//                 <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
//                   {product.lowdown?.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Quantity & Add to Cart */}
//             <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
//               <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-full sm:w-auto justify-between">
//                 <button
//                   onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <FaMinus size={12} />
//                 </button>
//                 <span className="px-6 font-bold text-lg">{quantity}</span>
//                 <button
//                   onClick={() => setQuantity((q) => q + 1)}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <FaPlus size={12} />
//                 </button>
//               </div>
//               <button className="w-full flex-1 bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg active:scale-95">
//                 Add to Cart — ${(product.salePrice * quantity).toFixed(2)}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* MIDDLE SECTION: Ratings & Reviews */}
//         <div className="bg-[#F2E6D9] py-12 md:py-16 px-6 md:px-20 rounded-2xl mb-20">
//           <div className="flex flex-col lg:flex-row gap-12">
//             {/* Review Summary */}
//             <div className="lg:w-1/3 text-center lg:text-left">
//               <h2 className="text-2xl md:text-3xl font-bold mb-4">
//                 Ratings and Reviews
//               </h2>
//               <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
//                 <div className="flex text-black text-lg">
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                 </div>
//                 <span className="font-bold text-lg">
//                   {reviews.length} Reviews
//                 </span>
//               </div>
//               <button
//                 onClick={() =>
//                   document
//                     .getElementById("reviewForm")
//                     .scrollIntoView({ behavior: "smooth" })
//                 }
//                 className="bg-white px-10 py-3 rounded-full text-sm font-bold border border-gray-200 shadow-sm hover:bg-gray-50 transition-all"
//               >
//                 Write a Review
//               </button>
//             </div>

//             {/* Review List */}
//             <div className="lg:w-2/3 space-y-8 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
//               {reviews.length > 0 ? (
//                 reviews.map((rev, i) => (
//                   <div
//                     key={rev._id || i}
//                     className="border-b border-[#e5d8cb] pb-8 last:border-0"
//                   >
//                     <div className="flex gap-1 mb-2 text-black">
//                       {[...Array(5)].map((_, idx) => (
//                         <FaStar
//                           key={idx}
//                           size={14}
//                           className={
//                             idx < rev.rating ? "text-black" : "text-gray-300"
//                           }
//                         />
//                       ))}
//                     </div>
//                     <p className="text-gray-800 text-sm md:text-base mb-4 leading-relaxed font-medium">
//                       "{rev.comment}"
//                     </p>
//                     <div className="flex justify-between items-center text-xs md:text-sm">
//                       <span className="font-bold uppercase tracking-wider">
//                         Customer User
//                       </span>
//                       <span className="text-gray-500">
//                         {new Date(rev.createdAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-10 text-gray-500 italic">
//                   No reviews yet. Be the first to share your thoughts!
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Review Post Form */}
//           <div
//             id="reviewForm"
//             className="mt-16 bg-white p-6 md:p-10 rounded-2xl shadow-xl max-w-2xl mx-auto"
//           >
//             <h3 className="text-xl font-bold mb-6 text-center">
//               Share Your Experience
//             </h3>
//             <form onSubmit={handleReviewSubmit} className="space-y-5">
//               <div className="flex justify-center gap-3 mb-4">
//                 {[1, 2, 3, 4, 5].map((num) => (
//                   <FaStar
//                     key={num}
//                     size={28}
//                     className={`cursor-pointer transition-transform hover:scale-110 ${rating >= num ? "text-black" : "text-gray-200"}`}
//                     onClick={() => setRating(num)}
//                   />
//                 ))}
//               </div>
//               <textarea
//                 className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-black focus:outline-none transition-all resize-none"
//                 placeholder="What did you like or dislike? How does it feel on your skin?"
//                 rows="4"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 required
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-md"
//               >
//                 Post Review
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { FaStar, FaMinus, FaPlus } from "react-icons/fa";
import { BASE_URL } from "../helper/config";
import { useCartStore } from "../store/useCartStore"; // Zustand import
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart); // Zustand action

  // Mock login check (replace with your auth logic)
  const {user} = useAuth()

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
      const res = await axios.post(`${BASE_URL}/review/add`, {
        productId: id,
        rating,
        comment,
      },{
        withCredentials: true
      });
      if (res.data.success) {
        alert("Review added!");
        setComment("");
        // Reload reviews locally
        setReviews([{ rating, comment, createdAt: new Date() }, ...reviews]);
      }
    } catch (err) {
      alert("Failed to add review");
    }
  };

  if (loading || !product)
    return (
      <div className="h-screen flex justify-center items-center font-bold">
        Loading...
      </div>
    );

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-10">
        {/* SECTION 1: Product Gallery & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-3">
              {[product.thumbnail, ...product.images].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className={`w-20 h-20 object-cover cursor-pointer border ${mainImage === img ? "border-black" : "border-gray-200"}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
            <div className="flex-1 bg-[#F9F9F9] flex justify-center items-center p-8 rounded-lg">
              <img src={mainImage} className="max-h-[500px] object-contain" />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-black text-sm">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <span className="text-gray-400 text-sm">
                ({reviews.length} reviews)
              </span>
            </div>
            <div className="text-3xl font-bold mb-8">${product.salePrice}</div>

            <div className="space-y-6 mb-10 text-sm text-gray-600">
              <div>
                <h4 className="font-bold text-black mb-2 uppercase">
                  Straight Up:
                </h4>
                <p>{product.straight_up}</p>
              </div>
              <div>
                <h4 className="font-bold text-black mb-2 uppercase">
                  The Lowdown:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {product.lowdown?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-auto">
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-3">
                <button onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}>
                  <FaMinus size={12} />
                </button>
                <span className="px-8 font-bold">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>
                  <FaPlus size={12} />
                </button>
              </div>
              <button
                onClick={() => {
                  addToCart(product, quantity);
                //   toast.success("Added to cart!");
                }}
                className="flex-1 bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: Ratings and Reviews (Based on your Uploaded Image) */}
        <div className="bg-[#F2E6D9] py-16 px-6 md:px-20 rounded-3xl">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* LEFT SIDE: Review Form (Only if Logged In) */}
            <div className="lg:w-2/5">
              <h2 className="text-3xl font-bold mb-4">Ratings and Reviews</h2>
              <div className="flex items-center gap-2 mb-8">
                <div className="flex text-black">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
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
                      className="w-full border-gray-100 border-2 p-4 rounded-xl focus:outline-none"
                      rows="4"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-3 rounded-full font-bold uppercase text-sm"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-zinc-800 text-white p-6 rounded-2xl">
                  <p className="text-sm">
                    Please{" "}
                    <span className="underline font-bold cursor-pointer">
                      Login
                    </span>{" "}
                    to leave a review for this product.
                  </p>
                </div>
              )}
            </div>

            {/* RIGHT SIDE: Review List */}
            <div className="lg:w-3/5 space-y-10">
              {reviews.length > 0 ? (
                reviews.map((rev, i) => (
                  <div
                    key={i}
                    className="border-b border-[#e5d8cb] pb-8 last:border-0"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src="https://ui-avatars.com/api/?name=User&background=random"
                        className="w-10 h-10 rounded-full"
                        alt="user"
                      />
                      <div>
                        <div className="flex text-black text-xs mb-1">
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
                        <h5 className="font-bold text-sm">Verified Customer</h5>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-2">
                      "{rev.comment}"
                    </p>
                    <span className="text-gray-400 text-[10px]">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
