import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  IoSearchOutline,
  IoAdd,
  IoEllipsisHorizontal,
  IoCubeOutline,
  IoWarningOutline,
  IoBanOutline,
  IoTrendingUpOutline,
  IoTrashOutline,
  IoPencilOutline,
} from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BASE_URL } from "../helper/config";
import toast from "react-hot-toast";
import { useProductStore } from "../store/useProductStore";
import AddProductModal from "../components/modals/AddProductModal";
import Swal from "sweetalert2";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeMenu, setActiveMenu] = useState(null); 

  const { openModal } = useProductStore();

  
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/products?page=${currentPage}&search=${searchTerm}&category=${selectedCategory}`,
      );
      if (response.data.success) {
        setProducts(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalProducts(response.data.totalProducts);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // category fetch
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      if (response.data.success) setCategories(response.data.data);
    } catch (error) {
      console.error("Category Error:", error);
    }
  };

  const handleDelete = async (id) => {
    // SweetAlert2 set
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000", 
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      padding: "2em",
      customClass: {
        popup: "rounded-2xl", 
        confirmButton: "rounded-lg px-5 py-2.5",
        cancelButton: "rounded-lg px-5 py-2.5",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${BASE_URL}/product-delete/${id}`,
            {
              withCredentials: true,
            },
          );

          if (response.data.success) {
            
            Swal.fire({
              title: "Deleted!",
              text: "Your product has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
              customClass: {
                popup: "rounded-2xl",
              },
            });
            fetchProducts(); 
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong while deleting.",
            icon: "error",
            confirmButtonColor: "#000",
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [currentPage, searchTerm, selectedCategory]);

  const getStatusBadge = (stock) => {
    if (stock === 0)
      return (
        <span className="text-[10px] px-2 py-1 bg-red-50 text-red-600 rounded-full font-bold uppercase">
          Out of Stock
        </span>
      );
    if (stock < 10)
      return (
        <span className="text-[10px] px-2 py-1 bg-yellow-50 text-yellow-600 rounded-full font-bold uppercase">
          Low Stock
        </span>
      );
    return (
      <span className="text-[10px] px-2 py-1 bg-green-50 text-green-600 rounded-full font-bold uppercase">
        Active
      </span>
    );
  };

  return (
    <div
      className="space-y-6 font-sans pb-10"
      onClick={() => setActiveMenu(null)}
    >
      <AddProductModal
        categories={categories}
        refreshProducts={fetchProducts}
      />
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Manage Products</h2>
        <button
          onClick={openModal}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-800 transition-all"
        >
          <IoAdd className="text-xl" /> Add Product
        </button>
      </div>

      {/* Stats Cards - Real Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Products"
          value={totalProducts}
          icon={<IoCubeOutline />}
        />
        <StatCard
          label="Low Stock"
          value={products.filter((p) => p.stock < 10 && p.stock > 0).length}
          icon={<IoWarningOutline />}
        />
        <StatCard
          label="Out of Stock"
          value={products.filter((p) => p.stock === 0).length}
          icon={<IoBanOutline />}
        />
        <StatCard
          label="Revenue"
          value="$91,526"
          icon={<IoTrendingUpOutline />}
        />
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="relative w-full max-w-md">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:bg-white focus:border-gray-200 outline-none transition-all"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-gray-100 rounded-lg px-4 py-2 text-sm text-gray-600 outline-none cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                <th className="px-6 py-4">Thumbnails</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-20 text-gray-400">
                    Fetching Data...
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={product.thumbnail}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover bg-gray-50 border border-gray-100"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-800">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.categoryID?.name}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      ${product.salePrice}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(product.stock)}
                    </td>
                    <td className="px-6 py-4 text-center relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenu(
                            activeMenu === product._id ? null : product._id,
                          );
                        }}
                        className="text-gray-400 hover:text-black transition-colors p-2 rounded-full hover:bg-gray-100"
                      >
                        <IoEllipsisHorizontal className="text-xl" />
                      </button>

                      {/* Action Dropdown Menu */}
                      {activeMenu === product._id && (
                        <div className="absolute right-10 top-12 w-32 bg-white border border-gray-100 shadow-xl rounded-lg z-50 overflow-hidden">
                          <button className="w-full px-4 py-2 text-left text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                            <IoPencilOutline /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="w-full px-4 py-2 text-left text-xs font-medium text-red-500 hover:bg-red-50 flex items-center gap-2"
                          >
                            <IoTrashOutline /> Delete
                          </button>
                        </div>
                      )}
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
            Showing{" "}
            <span className="font-bold text-gray-800">{products.length}</span>{" "}
            of <span className="font-bold text-gray-800">{totalProducts}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-30"
            >
              <FiChevronLeft />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-xs font-bold ${currentPage === i + 1 ? "bg-[#F3E8EC] text-[#8B3D52]" : "text-gray-400 hover:bg-gray-50"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
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

export default ProductPage;
