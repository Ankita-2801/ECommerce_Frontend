import React, { useState, useEffect } from 'react';
import { ImagePlus, Check, X } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api.js';

const ProductForm = ({ onClose, productToEdit, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Beauty Products',
    subcategory: 'Facewash',
    price: '',
    stock: '',
    gst: '', //  Added GST field
    discount: '', //Discount field
    description: '',
    image: null,
    imageUrl: '',
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        category: productToEdit.category,
        subcategory: productToEdit.subcategory,
        price: productToEdit.price,
        stock: productToEdit.stock,
        gst: productToEdit.gst || '', //  load existing GST if editing
        discount: productToEdit.discount || '', //  load discount if editing
        description: productToEdit.description || '',
        image: null,
        imageUrl: productToEdit.imageUrl || '',
      });
      setPreview(productToEdit.imageUrl || null);
    }
  }, [productToEdit]);

  const categories = [
    'Beauty Products',
    'Herbal Medicines',
    'Food & Beverages',
    'Herbal Nutraceuticals',
    'Household Products',
    'Agricultural Products',
  ];

  const subcategories = {
    "Beauty Products": ["Facewash", "Lipstick", "Cream", "Perfume",
      "Shampoo", "Soap", "Face Packs", "Sunscreen", "Hair Oil", "Powders",
      "Kajal and Eyeliner", "Nail Polish", "Toner and Cleansing"],
    "Herbal Medicines": ["Tablets", "Oinment", "Syrups and Tonics","Drop",
      "Inhalant", "Toothpaste", "Decoction", "Antiseptic", "Balm","Baby Care Products"],
    "Food & Beverages": ["Tea", "Juice", "Drinks", "Sweetener", "Cookies"],
    "Herbal Nutraceuticals": ["Dietary Supplements", "Antioxidant Immunity Booster", "Weight Management Products", "Anti-Stress Cognitive Enhancers", "Probiotics and Prebiotics"],
    "Household Products": ["Homecare Products", "Hygienic Products", "Aromatherapy"],
    "Agricultural Products": ["Fertilizer", "Biopestisides", "Growth Promoters",
      "Weed Controller", "Animal Feed Supplements"]
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreview(file ? URL.createObjectURL(file) : null);
    } else if (name === 'imageUrl') {
      setFormData({ ...formData, imageUrl: value });
      setPreview(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to perform this action.");
      return;
    }

    try {
      let finalImageUrl = formData.imageUrl;

      if (formData.image instanceof File) {
        const data = new FormData();
        data.append('file', formData.image);
        data.append('upload_preset', 'ecommerce_products');

        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/dotqd2elu/image/upload',
          data
        );

        if (!res.data.secure_url) {
          throw new Error('Image upload failed');
        }

        finalImageUrl = res.data.secure_url;
      }

      const payload = {
        name: formData.name,
        category: formData.category,
        subcategory: formData.subcategory,
        price: Number(formData.price),
        stock: Number(formData.stock),
        gst: Number(formData.gst), //  include GST in payload
        discount: Number(formData.discount) || 0, //  Added discount
        description: formData.description,
        imageUrl: finalImageUrl,
      };

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (productToEdit?._id) {
        await axios.put(`${API_BASE_URL}/${API_ENDPOINTS.ADD_PRODUCTS}/${productToEdit._id}`, payload, config);
      } else {
        await axios.post(`${API_BASE_URL}/${API_ENDPOINTS.ADD_PRODUCTS}`, payload, config);
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Save Product Error:', error.response?.data || error.message || error);
      alert(`Error saving product: ${error.response?.data?.message || error.message || 'Check console for details'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {productToEdit ? 'Edit Product' : 'Add New Product'}
      </h3>

      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {/* Price & Stock */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
          {/*  Discount */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
          <input
            type="number"
            name="discount"
            min="0"
            max="100"
            value={formData.discount}
            onChange={handleChange}
            placeholder="e.g. 20"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
    
      </div>
            {/*  Show final discounted price */}
      {formData.price && formData.discount > 0 && (
        <p className="text-sm text-green-700 mt-1">
          <strong>Discounted Price:</strong> ₹
          {(Number(formData.price) - (Number(formData.price) * Number(formData.discount)) / 100).toFixed(2)}
        </p>
      )}

{/*  GST Field + Auto Total Calculation */}
<div>
  <label className="block text-sm font-medium text-gray-700">GST (%)</label>
  <input
    type="number"
    name="gst"
    value={formData.gst}
    onChange={handleChange}
    placeholder="Enter GST percentage"
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
  />
{/*  Calculations Section */}
  {formData.price && (
    <div className="mt-2 text-sm space-y-1 text-gray-700">
      {/* Step 1: Discounted Price */}
      {formData.discount > 0 && (
        <p className="text-green-700">
          <strong>Discounted Price:</strong> ₹
          {(Number(formData.price) - (Number(formData.price) * Number(formData.discount)) / 100).toFixed(2)}
        </p>
      )}

      {/* Step 2: Price + GST only */}
      {formData.gst > 0 && formData.discount == 0 && (
        <p>
          <strong>Total with GST:</strong> ₹
          {(Number(formData.price) + (Number(formData.price) * Number(formData.gst)) / 100).toFixed(2)}
        </p>
      )}

      {/* Step 3: Discount + GST combined */}
      {formData.discount > 0 && formData.gst > 0 && (
        <p className="text-emerald-700 font-medium">
          <strong>Final Price (After Discount + GST):</strong> ₹
          {(
            (Number(formData.price) - (Number(formData.price) * Number(formData.discount)) / 100) *
            (1 + Number(formData.gst) / 100)
          ).toFixed(2)}
        </p>
      )}
    </div>
  )}
  </div>
      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Sub-Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Sub-Category</label>
        <select
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          required
          disabled={!formData.category}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select a sub-category</option>
          {subcategories[formData.category]?.map((sub) => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Image</label>
        <div className="mt-1 flex flex-col items-center rounded-lg border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 hover:border-indigo-400">
          <div className="space-y-1 text-center">
            <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600 space-x-2">
              <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                <span>Upload a file</span>
                <input
                  type="file"
                  name="image"
                  className="sr-only"
                  onChange={handleChange}
                />
              </label>
              <input
                type="text"
                placeholder="Or paste image URL"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-1 flex-1"
              />
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 h-32 w-32 object-cover rounded-md border"
            />
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="pt-4 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md flex items-center space-x-2 hover:bg-indigo-700"
        >
          <X className="h-4 w-4" />
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-emerald-900 text-white rounded-md flex items-center space-x-2 hover:bg-emerald-950"
        >
          <Check className="h-4 w-4" />
          <span>{productToEdit ? 'Save Changes' : 'Add Product'}</span>
        </button>
      </div>
    </form>
  );
};

export default ProductForm;