

import React, { useState } from "react";
import { useProductStore } from "../../store/useProductStore";
import {
  IoCloseOutline,
  IoCloudUploadOutline,
  IoTrashOutline,
  IoAdd,
} from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../helper/config";

const AddProductModal = ({ categories, refreshProducts }) => {
  const { isModalOpen, closeModal } = useProductStore();
  const [loading, setLoading] = useState(false);

  const [previews, setPreviews] = useState({
    thumbnail: null,
    gallery: [],
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    salePrice: "",
    costPrice: "",
    categoryID: "",
    stock: "",
    thumbnail: null,
    images: [],
  });

  if (!isModalOpen) return null;

  // thumbnail handler
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, thumbnail: file });
      setPreviews({ ...previews, thumbnail: URL.createObjectURL(file) });
    }
  };

  // gallery handler
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews({
      ...previews,
      gallery: [...previews.gallery, ...filePreviews],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) => data.append("images", file));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const res = await axios.post(`${BASE_URL}/create-product`, data, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Product Added!");
        refreshProducts();
        closeModal();
      }
    } catch (err) {
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-2 sm:p-4">
      <div className="bg-white w-full max-w-2xl  shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-lg sm:text-xl font-bold italic">
              Add New Product
            </h2>
            <p className="text-[10px] sm:text-xs text-gray-400">
              Create a new product in your catalog
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1"
        >
          {/* Product Name */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">
              Product Name
            </label>
            <input
              required
              type="text"
              className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-black transition-all text-sm"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">
                Category
              </label>
              <select
                required
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none text-sm cursor-pointer"
                onChange={(e) =>
                  setFormData({ ...formData, categoryID: e.target.value })
                }
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">
                Stock Quantity
              </label>
              <input
                required
                type="number"
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none text-sm"
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Cost Price */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">
                Cost Price ($)
              </label>
              <input
                required
                type="number"
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none text-sm"
                onChange={(e) =>
                  setFormData({ ...formData, costPrice: e.target.value })
                }
              />
            </div>
            {/* Sale Price */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">
                Sale Price ($)
              </label>
              <input
                required
                type="number"
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none text-sm"
                onChange={(e) =>
                  setFormData({ ...formData, salePrice: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">
              Description
            </label>
            <textarea
              className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none min-h-[100px] text-sm"
              placeholder="Tell us about the product..."
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></textarea>
          </div>

          {/* Image Upload Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Main Thumbnail */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-700 uppercase">
                Main Thumbnail
              </label>
              <div className="relative group overflow-hidden rounded-xl border-2 border-dashed border-gray-200 hover:border-black transition-all h-32 flex items-center justify-center bg-gray-50 cursor-pointer">
                {previews.thumbnail ? (
                  <img
                    src={previews.thumbnail}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <IoCloudUploadOutline size={24} />
                    <span className="text-[10px] mt-1 font-medium">
                      Upload Cover
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                />
              </div>
            </div>

            {/* Gallery Images */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-700 uppercase">
                Gallery Images
              </label>
              <div className="flex flex-wrap gap-2 min-h-[128px] p-2 bg-gray-50 border border-gray-100 rounded-xl">
                {previews.gallery.map((src, i) => (
                  <div
                    key={i}
                    className="w-14 h-14 relative rounded-lg overflow-hidden border border-white shadow-sm"
                  >
                    <img
                      src={src}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                ))}
                <label className="w-14 h-14 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg text-gray-300 hover:text-black hover:border-black transition-all cursor-pointer bg-white">
                  <IoAdd size={20} />
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    accept="image/*"
                    onChange={handleGalleryChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </form>

        {/* Footer Buttons */}
        <div className="p-4 sm:p-6 border-t flex flex-col sm:flex-row gap-3 bg-white">
          <button
            disabled={loading}
            type="submit"
            onClick={handleSubmit}
            className="w-full sm:flex-1 bg-black text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 disabled:bg-gray-400 transition-all text-sm order-1 sm:order-2"
          >
            {loading ? "Processing..." : "Save Product"}
          </button>
          <button
            onClick={closeModal}
            className="w-full sm:flex-1 border border-gray-200 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm order-2 sm:order-1 text-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
