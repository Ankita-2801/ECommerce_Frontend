import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api.js";
import ProductDetails from "./ProductDetails.jsx";
import { ShoppingCart, Heart } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ShowProduct = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const pronm = query.get("proname");
 // const email = query.get("email");
  const location = useLocation();
const email = location.state?.email || new URLSearchParams(location.search).get('email') || '';

  const [wishlistItem, setWishlistItem] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isInCart, setIsInCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const [quantity, setQuantity] = useState({});
  const handleQuantity = (productId, quantity) => {
    setQuantity((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const [wishlistCount, setWishlistCount] = useState(0);
  useEffect(() => {
    const fetchCartWishlist = async () => {
      try {
        const [wishres, cartres] = await Promise.all([
          axios.get(`${API_BASE_URL}/${API_ENDPOINTS.WISHLIST_FETCH}`, {
            params: { email },
          }),
          axios.get(`${API_BASE_URL}/${API_ENDPOINTS.FETCH_CART}`, {
            params: { email },
          }),
        ]);
        const wishes = wishres.data.items.map((item) => item.name);
        setWishlistItem(wishes);
        const carts = cartres.data.items.map((item) => item.name);
        setCartItems(carts);
      } catch (err) {}
    };
    fetchCartWishlist();
  }, [email]);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const [cartres, wishlistres] = await Promise.all([
          axios.get(`${API_BASE_URL}/${API_ENDPOINTS.CART_COUNT}`, {
            params: { email },
          }),
          axios.get(`${API_BASE_URL}/${API_ENDPOINTS.WISH_COUNT}`, {
            params: { email },
          }),
        ]);
        setCartCount(cartres.data.count || 0);
        setWishlistCount(wishlistres.data.count || 0);
      } catch (err) {}
    };
    fetchCount();
  }, [email]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          ` ${API_BASE_URL}/${API_ENDPOINTS.ADD_PRODUCTS}/${pronm}`,
          {
            headers: { Authorization: ` Bearer ${token}` },
          }
        );
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("No products found or failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [pronm]);

  useEffect(() => {
    let updatedProducts = [...products];

    if (searchTerm) {
      updatedProducts = updatedProducts.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceRange) {
      if (priceRange === "0-500")
        updatedProducts = updatedProducts.filter((p) => p.price <= 500);
      else if (priceRange === "500-1000")
        updatedProducts = updatedProducts.filter(
          (p) => p.price > 500 && p.price <= 1000
        );
      else if (priceRange === "1000+")
        updatedProducts = updatedProducts.filter((p) => p.price > 1000);
    }

    if (sortOption === "low-high")
      updatedProducts.sort((a, b) => a.price - b.price);
    else if (sortOption === "high-low")
      updatedProducts.sort((a, b) => b.price - a.price);
    else if (sortOption === "stock")
      updatedProducts.sort((a, b) => b.stock - a.stock);

    setFilteredProducts(updatedProducts);
  }, [searchTerm, priceRange, sortOption, products]);

  const handleProductClick = (product) => setSelectedProduct(product);
  const handleCloseModal = () => setSelectedProduct(null);

  const fetchCart = async () => {
    if (!email) return;
    try {
      const [res, cartres] = await Promise.all([
        axios.get(`${API_BASE_URL}/${API_ENDPOINTS.CART_COUNT}`, {
          params: { email },
        }),
        axios.get(`${API_BASE_URL}/${API_ENDPOINTS.FETCH_CART}`, {
          params: { email },
        }),
      ]);
      setCartCount(res.data.count);
      const carts = cartres.data.items.map((item) => item.name);
      setCartItems(carts);
    } catch (err) {}
  };

  const gotoCart = async (e, product) => {
    e.stopPropagation();
    const selectedQuantity = quantity[product._id] || 1;
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${API_ENDPOINTS.CART_ADD}`,
        {
          productId: product._id,
          email: email,
          productname: product.name,
          quantity: selectedQuantity,
        }
      );

      toast.success(`${selectedQuantity} of ${product.name} is added to cart!`);

      await fetchCart();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to add product to cart");
      }
      console.error(err);
      console.log(err);
    }
  };

  const fetchWish = async () => {
    if (!email) return;
    try {
      const [res, wishres] = await Promise.all([
        axios.get(`${API_BASE_URL}/${API_ENDPOINTS.WISH_COUNT}`, {
          params: { email },
        }),
        axios.get(`${API_BASE_URL}/${API_ENDPOINTS.WISHLIST_FETCH}`, {
          params: { email },
        }),
      ]);
      setWishlistCount(res.data.count);
      const wishes = wishres.data.items.map((item) => item.name);
      setWishlistItem(wishes);
    } catch (err) {}
  };

  
  const addToWishlist = async (e, product) => {
    e.stopPropagation();

    setWishlistItem((prev) => [...prev, product.name]);
    setWishlistCount((prev) => prev + 1);

    try {
      const wishres = await axios.post(
        "http://localhost:5000/api/user/addwish", // <-- URL fixed here
        { productId: product._id, email: email, productname: product.name }
      );

      toast.success(`${product.name} is added to wishlist!`);

      await fetchWish();
    } catch (err) {
      toast.error(`${product.name} is already in wishlist! Tap on the icon to remove it`);
      console.log(err);
      setWishlistItem((prev) => prev.filter((name) => name !== product.name));
      setWishlistCount((prev) => prev - 1);
    }
  };

  // CHANGED: Fixed DELETE endpoint URL
  const removeFromWishlist = async (e, product) => {
    e.stopPropagation();

    setWishlistItem((prev) => prev.filter((name) => name !== product.name));
    setWishlistCount((prev) => prev - 1);

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/user/delwish`, // <-- URL fixed here
        {
          data: { productname: product.name, email: email },
        }
      );

      toast.success(`${product.name} is removed from wishlist!`);

      await fetchWish();
    } catch (err) {
      console.log(err);
      setWishlistItem((prev) => [...prev, product.name]);
      setWishlistCount((prev) => prev + 1);
      toast.error("Failed to remove from wishlist");
    }
  };

  const handleWishlist = async () => {
    navigate("/user/wishlist");
  };

  return (
    <div className="min-h-screen bg-white relative">
    <div className="bg-green-700 p-3 mb-8 sticky top-0 z-10 shadow-md 
    flex flex-col md:flex-row md:items-center md:justify-between gap-4">

  {/* Left Section: Brand + Search */}
  <div className="w-full md:flex-1 flex flex-col sm:flex-row sm:items-center gap-3">

    <span className="text-white text-2xl font-bold whitespace-nowrap">
      🌱 GreenRemedy
    </span>

    {/* Search Bar */}
    <div className="relative w-full sm:w-72 md:w-96 lg:w-[500px]">
      <input
        type="text"
        placeholder="Search Products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-green-50 px-4 py-2 pl-10 shadow-md 
                   focus:outline-none text-green-900 rounded-md"
      />
      <span className="absolute left-3 top-2.5 text-green-900">🔍</span>
    </div>

  </div>

  {/* Right Section: Icons + Logout */}
  <div className="flex items-center gap-5 w-full md:w-auto mr-100
     justify-end flex-nowrap">


    {/* Cart */}
    <div className="relative">
      <button
        onClick={() => navigate("/addcart", { state: { email: email } })}
        className="text-white hover:text-yellow-200 transition-colors"
        title="View Cart"
      >
        <ShoppingCart size={20} className="sm:hidden" />
        <ShoppingCart size={24} className="hidden sm:block" />
      </button>
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full px-1.5 py-0.5">
          {cartCount}
        </span>
      )}
    </div>

    {/* Wishlist */}
    <div className="relative">
      <button
        onClick={handleWishlist}
        className="text-white hover:text-red-400 transition-colors"
        title="Wishlist"
      >
        <Heart size={20} className="sm:hidden" />
        <Heart size={24} className="hidden sm:block" />
      </button>
      {wishlistCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full px-1.5 py-0.5">
          {wishlistCount}
        </span>
      )}
    </div>

    {/* Logout button */}
    <button
      onClick={() => navigate('/products', { state: { email: email } })}
      className="bg-white px-4 py-2 rounded-xl text-green-900 font-semibold 
                 text-sm sm:text-base hover:bg-yellow-200 transition"
    >
      Log Out
    </button>

  </div>
</div>


      <h1 className="text-3xl font-bold text-center text-green-700 mb-3">
        {pronm || "Our Products"}
      </h1>
      <h2 className="text-lg text-center text-black font-semibold mb-6">(Click on the product's image to check details)</h2>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loading && (
        <p className="text-center text-gray-500">Loading products...</p>
      )}
      {error && !loading && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg p-3 hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer relative"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-50 object-cover"
                onClick={() => handleProductClick(product)}
              />
              <h2 className="text-lg font-semibold mt-4">{product.name}</h2>
              <p className="text-yellow-600 font-semibold mt-1">
                ₹{product.price}
              </p>

              {product.stock > 0 && (
                <div className="mt-2">
                  <label className="text-lg text-green-600 mr-2">
                    Quantity:
                  </label>
                  <select
                    value={quantity[product._id] || 1}
                    onChange={(e) =>
                      handleQuantity(product._id, Number(e.target.value))
                    }
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
                  >
                    {[...Array(product.stock).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {(() => {
                const currentStock =
                  product.stock - (quantity[product._id] || 0);
                return (
                  <p
                    className={`mt-1 ${
                      currentStock > 0 ? "text-blue-800" : "text-red-500 font-semibold text-lg"
                    }`}
                  >
                    {currentStock > 0
                      ? `${currentStock} in stock`
                      : "Out of stock"}
                  </p>
                );
              })()}

              {/* CHANGED - Surya: Fixed the heart icon to show filled when in wishlist */}
              <button
                onClick={(e) => {
                  if (wishlistItem.includes(product.name)) {
                    removeFromWishlist(e, product);
                  } else {
                    addToWishlist(e, product);
                  }
                }}
                className="absolute top-2 right-2 text-xl transition"
                title={
                  wishlistItem.includes(product.name)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"
                }
              >
                <Heart
                  size={20}
                  className={
                    wishlistItem.includes(product.name)
                      ? "fill-red-600 text-red-600"
                      : "fill-white"
                  }
                />
              </button>

             {cartItems.includes(product.name) ? (
  <button
    onClick={() =>
      navigate('/addcart',{state:{email:email}} )
    }
    className="mt-4 w-full border-2 text-lg font-bold border-green-600 bg-white text-green-600 px-4 py-2 hover:opacity-90 transition"
  >
    Go to Cart
  </button>
) : (
  <button
    onClick={(e) => gotoCart(e, product)}
    disabled={product.stock === 0}
    className={`mt-4 w-full text-lg font-bold px-4 py-2 transition ${
      product.stock === 0
        ? "bg-gray-500 cursor-not-allowed text-white"
        : "bg-green-600 text-white hover:opacity-90"
    }`}
  >
    {product.stock === 0 ? "Add to Cart" : "Add to Cart"}
  </button>
)}
            </div>
          ))}
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No products available in this category.
        </p>
      )}

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          useremail={email}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ShowProduct;
