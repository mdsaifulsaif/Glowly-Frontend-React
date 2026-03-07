

import React, { useEffect, useState } from "react";
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

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      if (response.data.success) setCategories(response.data.data);
    } catch (error) {
      console.error("Category Error:", error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: { popup: "rounded-2xl" },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${BASE_URL}/product-delete/${id}`,
            { withCredentials: true },
          );
          if (response.data.success) {
            Swal.fire({
              title: "Deleted!",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            fetchProducts();
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
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
    const style =
      "text-[10px] px-2 py-1 rounded-full font-bold uppercase whitespace-nowrap";
    if (stock === 0)
      return (
        <span className={`${style} bg-red-50 text-red-600`}>Out of Stock</span>
      );
    if (stock < 10)
      return (
        <span className={`${style} bg-yellow-50 text-yellow-600`}>
          Low Stock
        </span>
      );
    return (
      <span className={`${style} bg-green-50 text-green-600`}>Active</span>
    );
  };

  return (
    <div
      className="space-y-6 font-sans pb-10 w-full"
      onClick={() => setActiveMenu(null)}
    >
      <AddProductModal
        categories={categories}
        refreshProducts={fetchProducts}
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-gray-800">Manage Products</h2>
        <button
          onClick={openModal}
          className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
        >
          <IoAdd className="text-xl" /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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

      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4 justify-between">
        <div className="relative w-full lg:max-w-md">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full lg:w-auto bg-white border border-gray-100 rounded-lg px-4 py-2 text-sm outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[800px]">
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
                  <tr key={product._id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <img
                        src={product.thumbnail}
                        className="w-12 h-12 rounded-lg object-cover "
                        alt=""
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
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <IoEllipsisHorizontal />
                      </button>
                      {activeMenu === product._id && (
                        <div className="absolute right-6 top-12 w-32 bg-white  shadow-xl rounded-lg z-50">
                          <button className="w-full px-4 py-2 text-left text-xs flex items-center gap-2 hover:bg-gray-50">
                            <IoPencilOutline /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="w-full px-4 py-2 text-left text-xs text-red-500 flex items-center gap-2 hover:bg-red-50"
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

        <div className="p-6 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            Showing {products.length} of {totalProducts}
          </p>
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 border rounded-lg disabled:opacity-30"
            >
              <FiChevronLeft />
            </button>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold ${currentPage === i + 1 ? "bg-[#F3E8EC] text-[#8B3D52]" : "text-gray-400"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 border rounded-lg disabled:opacity-30"
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
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4 w-full">
    <div className="flex justify-between items-center text-gray-400">
      <p className="text-[10px] font-bold uppercase tracking-wider">{label}</p>
      <span className="text-xl">{icon}</span>
    </div>
    <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
  </div>
);

export default ProductPage;
