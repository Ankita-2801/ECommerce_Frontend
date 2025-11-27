// src/components/Admin/Products.jsx
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/api.js';
import Table from '../ReuseNav/Table';
import Modal from '../ReuseNav/Modal';
import ProductForm from '../ReuseNav/ProductForm';
import { PlusCircle, Pencil, Trash, Eye } from 'lucide-react'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // New state for image preview
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  
  // Highlighted search 
  const [selectedProductId, setSelectedProductId] = useState(null);
  const location = useLocation();

  // Auto-remove highlight after 2 seconds
  useEffect(() => {
    const idFromSearch = localStorage.getItem("highlightId");
    if (idFromSearch) {
      setSelectedProductId(idFromSearch);

      const timer = setTimeout(() => {
        setSelectedProductId(null);
        localStorage.removeItem("highlightId");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [location]);

  // Highlight scroll effect
  useEffect(() => {
    if (selectedProductId) {
      const rowEl = document.getElementById(`row-${selectedProductId}`);
      if (rowEl) rowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedProductId]);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/${API_ENDPOINTS.ADD_PRODUCTS}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open Add/Edit Product Modal
  const handleOpenFormModal = (product = null) => {
    setEditingProduct(product);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingProduct(null);
  };

  // Delete flow
  const handleOpenDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const confirmDeleteProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/${API_ENDPOINTS.ADD_PRODUCTS}/${productToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Product '${productToDelete.name}' deleted successfully`);
      fetchProducts(); // refresh table
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete product');
    } finally {
      handleCloseDeleteModal();
    }
  };

  // Open preview modal
  const handlePreviewImage = (imageUrl) => {
    setPreviewImageUrl(imageUrl);
    setIsPreviewModalOpen(true);
  };

  const handleClosePreviewModal = () => {
    setIsPreviewModalOpen(false);
    setPreviewImageUrl(null);
  };

  // Table columns
  const columns = [
    { header: 'Product Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Sub-Category', accessor: 'subcategory' },
    { header: 'Price', accessor: 'price' },
    { header: 'GST (%)', accessor: 'gst' },
    { header: 'Discount (%)', accessor: 'discount' },
    { header: 'Total Price', accessor: 'totalPrice' },
    { header: 'Stock', accessor: 'stock' },
    { header: 'Description', accessor: 'description' },
  ];

  // Table actions
  const actions = (row) => (
    <div className="flex space-x-2 justify-end">
      {/* Preview button */}
      <button
        onClick={() => handlePreviewImage(row.imageUrl)}
        className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-full transition-colors"
        title="Preview"
      >
        <Eye className="h-5 w-5" />
      </button>

      <button
        onClick={() => handleOpenFormModal(row)}
        className="text-indigo-600 hover:text-indigo-800 p-2 hover:bg-gray-100 rounded-full transition-colors"
        title="Edit"
      >
        <Pencil className="h-5 w-5" />
      </button>

      <button
        onClick={() => handleOpenDeleteModal(row)}
        className="text-red-600 hover:text-red-800 p-2 hover:bg-gray-100 rounded-full transition-colors"
        title="Delete"
      >
        <Trash className="h-5 w-5" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6 p-4 md:p-8">
      {/* Header - Stack on mobile, row on desktop */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Product Management</h1>
        <button
          onClick={() => handleOpenFormModal()}
          className="w-full md:w-auto flex items-center justify-center space-x-2 px-4 py-3 md:py-2 bg-amber-950 text-white font-medium rounded-md shadow-md hover:bg-amber-950/80 transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Table / Loader */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-200 text-lg animate-pulse">Loading products...</p>
        </div>
      ) : (
        <div className="w-full">
            <Table 
                columns={columns} 
                data={products} 
                actions={actions} 
                selectedId={selectedProductId} 
                onRowClick={(id) => setSelectedProductId(id)} 
            />
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={isFormModalOpen} onClose={handleCloseFormModal}>
        <ProductForm
          productToEdit={editingProduct}
          onClose={handleCloseFormModal}
          onSave={fetchProducts} // Refresh table after save
        />
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        <div className="text-center p-6 w-full max-w-sm md:max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Confirm Deletion</h3>
          <p className="text-gray-700 mb-6 text-sm md:text-base">
            Are you sure you want to permanently delete{' '}
            <span className="font-semibold break-all">{productToDelete?.name}</span>? This action cannot be undone.
          </p>
          {/* Responsive button layout */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={confirmDeleteProduct}
              className="w-full sm:w-auto px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Yes, Delete
            </button>
            <button
              onClick={handleCloseDeleteModal}
              className="w-full sm:w-auto px-6 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            >
              No, Keep It
            </button>
          </div>
        </div>
      </Modal>

      {/* Image Preview Modal */}
      <Modal isOpen={isPreviewModalOpen} onClose={handleClosePreviewModal}>
        <div className="flex flex-col items-center p-2">
          {/* Constrain image height based on screen size so button is always visible */}
          <img 
            src={previewImageUrl} 
            alt="Product Preview" 
            className="w-full max-h-[50vh] md:max-h-[70vh] object-contain rounded-md" 
          />
          <button
            onClick={handleClosePreviewModal}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-full md:w-auto"
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Toasts */}
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
};

export default Products;