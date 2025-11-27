import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
 import { FaLeaf } from "react-icons/fa";
 import { FaShoppingCart } from "react-icons/fa";
 import { FaHeart } from "react-icons/fa";
 import { Link, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import videoBg from "../../assets/vdo.mp4";

 function ProductList() {
 // const {email}=useParams()
 const location=useLocation();
 const email=location.state?.email || '';
  const [cartCount,setCartCount]=useState(0)
  const [wishlistCount,setWishlistCount]=useState(0)
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchCount=async()=>{
      try{
      const [cartres,wishlistres]=await Promise.all([
        axios.get(`${API_BASE_URL}/${API_ENDPOINTS.CART_COUNT}`, {params:{email}}),
        axios.get(`${API_BASE_URL}/${API_ENDPOINTS.WISH_COUNT}`,{params:{email}})
      ])
      setCartCount(cartres.data.count || 0)
      setWishlistCount(wishlistres.data.count || 0)
    }catch(err){}
    }
    fetchCount();
  },[email])
  const beautyproducts = [
  {
  name: "Facewash",
  image: "https://m.media-amazon.com/images/I/71Wun0udLPL.jpg",
  },
  {
  name: "Shampoo",
  image:
  "https://www.vilvahstore.com/cdn/shop/files/Vilvah_herbal_shampoo.jpg?v=1750662731",
  },
  {
  name: "Soap",
  image:
  "https://cdn.dotpe.in/longtail/store-items/7489682/HwvqRA5u.webp",
  },
  {
  name: "Face Packs",
  image:
  "https://haappyherbs.com/cdn/shop/products/dtancream39-1_0b1fa7b9-eb2c-42aa-9484-c8ab263c4b7c.png?v=1754278463&width=320",
  },
  {
  name: "Sunscreen",
  image:
  "https://5.imimg.com/data5/RN/QV/ZE/SELLER-3074232/herbal-sunscreen-cream-lotion-500x500.jpg",
  },
  {
  name: "Hair Oil",
  image:
  "https://images-static.nykaa.com/media/catalog/product/f/8/f80b2f9IL00103_2011_1.jpg",
  },
  {
  name: "Cream",
  image:
  "https://i.herbalreality.com/wp-content/uploads/2023/04/21123131/how-to-make-your-own-herbal-cream-scaled.jpg",
  },
  {
  name: "Perfume",
  image:
  "https://images-static.nykaa.com/media/catalog/product/3/2/325ceac8906107058802_1.jpg?tr=w-500",
  },
  {
  name: "Kajal and Eyeliner",
  image:
  "https://m.media-amazon.com/images/I/71FuwxwgHOL._UF1000,1000_QL80_.jpg",
  },
  {
  name: "Powders",
  image:
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZd8QSFqku4yAJxxIcwp1tA6rEQDAq488_Yg&s",
  },
  {
  name: "Lipstick",
  image:
  "https://m.media-amazon.com/images/I/71EvhM74TkL._UF1000,1000_QL80_.jpg",
  },
  {
  name: "Toner and Cleansing",
  image:
  "https://m.media-amazon.com/images/I/61FdiNoQGwL.jpg",
  },
  ];
 

  const medicineproducts = [
  {
  name: "Tablets",
  image:
  "https://avedaayur.com/wp-content/uploads/2024/08/herbal-tablet-thumb.webp",
  },
  {
  name: "Syrups and Tonics",
  image:
  "https://tiimg.tistatic.com/fp/1/007/526/200-ml-liver-with-benefits-of-enzyme-herbal-tonic-syrup-094.jpg",
  },
  {
  name: "Oinment",
  image:
  "https://m.media-amazon.com/images/I/61MPYzpybVL._UF1000,1000_QL80_.jpg",
  },
  {
  name: "Decoction",
  image:
  "https://earthsongseeds.co.uk/wp-content/uploads/2023/01/1-2.png",
  },
  {
  name: "Drop",
  image:
  "https://5.imimg.com/data5/SELLER/Default/2024/8/444290845/HX/OX/FH/42135092/panch-tulsi-drop-500x500.jpg",
  },
   {
  name: "Antiseptic",
  image:
  "https://content.jdmagicbox.com/quickquotes/images_main/boro-plus-healthy-skin-antiseptic-cream-40-ml-172838486-6ulu9.jpg?impolicy=queryparam&im=Resize=(360,360),aspect=fit",
  },
  {
  name: "Toothpaste",
  image:
  "https://m.media-amazon.com/images/I/5144aFVtQ6L._UF1000,1000_QL80_.jpg",
  },
  {
  name: "Inhalant",
  image:
  "https://cdn01.pharmeasy.in/dam/products_otc/Q03192/green-herb-brand-inhalant-2-in-1-inhaler-6.2-1671741883.jpg",
  },
  {
  name: "Balm",
  image:
  "https://m.media-amazon.com/images/I/61xxHrmqNUL._UF1000,1000_QL80_.jpg",
  },
  {
  name: "Baby Care Products",
  image:
  "https://s.alicdn.com/@sc04/kf/H6f320cd40bdb496cbcc9787cad8ede819.jpg",
  },
  ];
 const foodproducts = [
  {
  name: "Tea",
  image:
  "https://edexec.co.uk/wp-content/uploads/2022/01/iStock-597657478.jpg",
  },
  {
  name: "Juice",
  image:
  "https://tiimg.tistatic.com/fp/1/005/383/organic-herbal-juice-962.jpg",
  },
  {
  name: "Drinks",
  image:
  "https://blog.fantasticgardeners.co.uk/wp-content/uploads/2015/07/herb_drinks.jpg",
  },
  {
  name: "Sweetener",
  image:
  "https://images.jdmagicbox.com/quickquotes/images_main/future-organics-jams-honey-and-spreads-16-12-2020-052-219921846-27oqf.jpg",
  },
  {
  name: "Cookies",
  image:
  "https://butterflyayurveda.com/cdn/shop/files/02_02b03985-e642-44ea-862d-42d69c05ca23.jpg?v=1702295118&width=1000",
  },
  ];
 
const nutriproducts = [
 
  {
  name: "Dietary Supplements",
  image:
  "https://naturesbounty.com/cdn/shop/collections/natures-bounty-womens-health-bg_16dedc05-1c47-4a3a-bcad-0d474891d2f2.png?v=1672852890&width=750",
  },
  {
  name: "Antioxidant Immunity Booster",
  image:
  "https://5.imimg.com/data5/SELLER/Default/2024/7/434564742/EI/BG/OF/196283858/protein-250x250.jpg",
  },
  {
  name: "Weight Management Products",
  image:
  "https://5.imimg.com/data5/SELLER/Default/2024/1/381353756/EC/OI/JE/26464105/shape-king-weight-loss-powder-500x500.jpg",
  },
  {
  name: "Anti-Stress Cognitive Enhancers",
  image:
  "https://5.imimg.com/data5/SELLER/Default/2023/12/370748046/SB/SX/UM/124318711/1.jpg",
  },
 
  {
  name: "Probiotics and Prebiotics",
  image:
  "https://rukminim2.flixcart.com/image/704/844/xif0q/ayurvedic/2/o/q/-original-imagpguwbsvgrhru.jpeg?q=90&crop=false",
  },
  
  ];

  const houseproducts = [
  {
  name: "Homecare Products",
  image:
  "https://m.media-amazon.com/images/I/510okjRTkjL.jpg",
  },
  {
  name: "Hygienic Products",
  image:
  "https://herbalstrategi.com/cdn/shop/products/HBH34-1.jpg?v=1639130261&width=1214",
  },
  {
  name: "Aromatherapy",
  image:
  "https://houseofaroma.in/wp-content/uploads/2023/10/ROSEMARY-MINT-candle1.webp",
  },
  
  ];

  const agriproducts = [
  {
  name: "Fertilizer",
  image:
  "https://m.media-amazon.com/images/I/61rwkP+qXcL._UF1000,1000_QL80_.jpg",
  },
  {
  name: "Biopestisides",
  image:
  "https://m.media-amazon.com/images/I/91lpu15k1nL.jpg",
  },
  {
  name: "Growth Promoters",
  image:
  "https://5.imimg.com/data5/SELLER/Default/2022/9/DS/EC/FY/106745873/grofort-herbal-growth-promoter.jpg",
  },
  {
  name: "Weed Controller",
  image:
  "https://m.media-amazon.com/images/I/61iGjcMAjsL.jpg",
  },
  {
  name: "Animal Feed Supplements",
  image:
  "https://5.imimg.com/data5/SELLER/Default/2024/3/400847018/LR/MM/KE/10784120/herbal-feed-supplement-for-fish-aqua-species-500x500.jpg",
  },
 
 
  
  ];

  return (
  <div className="min-h-screen  font-sans antialiased">
  {/* Combined Header & Hero Div */}
  <div className="relative w-full h-[900px] ">
    <video
    className="absolute w-full h-[850px] inset-0 object-cover"
    src={videoBg}
    autoPlay
    loop
    muted
    playsInline
  ></video>
  {/* Transparent Header */}
   <header className="absolute top-0 w-full z-10 bg-transparent text-white">
  <div className="bg-transparent py-3 shadow-md">
    <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-12 flex-wrap">

      {/* Left Section */}
      <div className="flex items-center space-x-3 sm:space-x-4 mb-2 sm:mb-0">
        <FaLeaf className="text-green-950 text-3xl sm:text-5xl animate-pulse" />
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-green-950">
          <span className="text-green-900">Green</span>Remedy
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4 sm:space-x-6 relative">

        {/* Wishlist Icon */}
        <button
          onClick={() => navigate('/user/wishlist')}
          className="relative text-white hover:text-green-700 transition-colors duration-300"
        >
          <FaHeart size={20} className="sm:hidden" />
          <FaHeart size={24} className="hidden sm:block" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-red-500 text-white text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded-full">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Cart Icon */}
        <button
          onClick={() => navigate('/addcart', { state: { email } })}
          className="relative text-white hover:text-green-700 transition-colors duration-300"
        >
          <FaShoppingCart size={20} className="sm:hidden" />
          <FaShoppingCart size={24} className="hidden sm:block" />
          {cartCount > 0 && (
            <span className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-green-500 text-white text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </button>

        {/* Logout Button */}
        <button
          onClick={() => navigate("/user")}
          className="bg-white text-green-950 font-bold py-1.5 px-3 sm:py-2 sm:px-4 rounded-full shadow-lg transition-colors duration-300 hover:bg-green-800 hover:text-white text-sm sm:text-base"
        >
          LOGOUT
        </button>
      </div>
    </div>
  </div>
</header>

  </div>
 

  {/* Full-width Divs Section */}
  <h2 className="text-4xl font-extrabold tracking-tighter text-gray-800 text-center mb-10 mt-10">
  <span className="text-green-700">Product</span> Category
</h2>

<section className="py-5 px-20">
  <div className="max-w-8xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
    
    {/* beauty */}
    <div className="relative h-40 bg-cover bg-center rounded-lg shadow-lg overflow-hidden group 
                    bg-[url('https://img1.exportersindia.com/product_images/bc-full/2021/8/9166733/herbal-cosmetic-products-1628275686-5930570.jpeg')]">
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300"></div>
      <span className="absolute top-3 right-3 bg-green-100 text-green-950 px-3 py-1 rounded-lg text-lg font-semibold shadow-md">
        Beauty Products
      </span>
    </div>

    {/* mwdicine */}
    <div className="relative h-40 bg-cover bg-center rounded-lg shadow-lg overflow-hidden group 
                    bg-[url('https://static.vecteezy.com/system/resources/previews/002/044/805/large_2x/herbal-medicine-on-white-background-free-photo.jpg')]">
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300"></div>
      <span className="absolute top-3 right-3 bg-green-100 text-green-950 px-3 py-1 rounded-lg text-lg font-semibold shadow-md">
        Herbal Medicines
      </span>
    </div>

    {/* food */}
    <div className="relative h-40 bg-cover bg-center rounded-lg shadow-lg overflow-hidden group 
                    bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvxkIJXBRF3PtKcDNMgJAQcJTxZwaqIQ7zSg&s')]">
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300"></div>
      <span className="absolute top-3 right-3 bg-green-100 text-green-950 px-3 py-1 rounded-lg text-lg font-semibold shadow-md">
        Food & Beverages
      </span>
    </div>

    {/* nutri */}
    <div className="relative h-40 bg-cover bg-center rounded-lg shadow-lg overflow-hidden group 
                    bg-[url('https://www.herbalife.com/dmassets/regional-reusable-assets/apac/images/li-herbalife-nutrition-products-healthy-meal-apac.jpg')]">
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300"></div>
      <span className="absolute top-3 right-3 bg-green-100 text-green-950 px-3 py-1 rounded-lg text-lg font-semibold shadow-md">
        Nutraceuticals
      </span>
    </div>

    {/* house */}
    <div className="relative h-40 bg-cover bg-center rounded-lg shadow-lg overflow-hidden group 
                    bg-[url('https://hygieneforall.com/wp-content/uploads/2024/02/DIYairfreshener.jpg')]">
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300"></div>
      <span className="absolute top-3 right-3 bg-green-100 text-green-950 px-3 py-1 rounded-lg text-lg font-semibold shadow-md">
        Household Products
      </span>
    </div>

    {/* agri */}
    <div className="relative h-40 bg-cover bg-center rounded-lg shadow-lg overflow-hidden group 
                    bg-[url('https://pavitramenthe.com/wp-content/uploads/2025/04/BENEFITS-OF-CROP-ROTATION-13-2-1024x576-1.jpg')]">
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300"></div>
      <span className="absolute top-3 right-3 bg-green-100 text-green-950 px-3 py-1 rounded-lg text-lg font-semibold shadow-md">
        Agricultural Products
      </span>
    </div>

  </div>
</section>

 <hr className="my-10 border-green-900" />

  {/* Products Section */}
  {/* beauty */}
  <main className="max-w-7xl mx-auto py-5 px-10 lg:px-12">
  <h2 className="text-4xl font-extrabold tracking-tighter text-gray-800 text-center mb-10">
  <span className="text-green-700">Beauty</span> Products
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
  {beautyproducts.map((product, index) => (
  <div
  key={index}
  className="bg-white hover:bg-green-50 hover:border-2 hover:border-green-900 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
  >
  <div className="relative p-0">
  <img
  src={product.image}
  alt={product.name}
  className="w-full h-45 object-cover"
  />
  <div className="absolute top-4 right-4"></div>
  </div>
  <div className="p-2 flex flex-col items-center text-center">
  <h2 className="text-2xl font-bold text-gray-800 mb-2">
  {product.name}
  </h2>
 
  <button className="bg-yellow-600 mb-2 hover:bg-green-700 text-white hover:text-white font-bold px-6 py-3 rounded-full shadow-lg transition-colors duration-300 flex items-center gap-2">
  <FaShoppingCart />
 <Link to={`/showpro?proname=${encodeURIComponent(product.name)}`} state={{email}}>
    View Stock
  </Link>
  </button>
  </div>
  </div>
  ))}
  </div>
 

  <hr className="my-10 border-gray-300" />
  {/* medicine */}

  <h2 className="text-4xl font-extrabold tracking-tighter text-gray-800 text-center mb-10">
  <span className="text-green-700">Herbal</span> Medicines
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
  {medicineproducts.map((product, index) => (
  <div
  key={index}
  className="bg-white hover:bg-green-50 hover:border-2 hover:border-green-900 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
  >
  <div className="relative p-0">
  <img
  src={product.image}
  alt={product.name}
  className="w-full h-50 object-cover"
  />
  <div className="absolute top-4 right-4"></div>
  </div>
  <div className="p-2 flex flex-col items-center text-center">
  <h2 className="text-2xl font-bold text-gray-800 mb-2">
  {product.name}
  </h2>
 
  <button className="bg-yellow-600 mb-2 hover:bg-green-700 text-white hover:text-white font-bold px-6 py-3 rounded-full shadow-lg transition-colors duration-300 flex items-center gap-2">
  <FaShoppingCart />
   <Link to={`/showpro?proname=${encodeURIComponent(product.name)}`} state={{email}}>
    View Stock
  </Link>
  </button>
  </div>
  </div>
  ))}
  </div>
  <hr className="my-10 border-green-900" />

 {/* food */}

  <h2 className="text-4xl font-extrabold tracking-tighter text-gray-800 text-center mb-10">
  <span className="text-green-700">Food &</span> Beverages
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
  {foodproducts.map((product, index) => (
  <div
  key={index}
  className="bg-white hover:bg-green-50 hover:border-2 hover:border-green-900 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
  >
  <div className="relative p-0">
  <img
  src={product.image}
  alt={product.name}
  className="w-full h-50 object-cover"
  />
  <div className="absolute top-4 right-4"></div>
  </div>
  <div className="p-2 flex flex-col items-center text-center">
  <h2 className="text-2xl font-bold text-gray-800 mb-2">
  {product.name}
  </h2>
 
  <button className="bg-yellow-600 mb-2 hover:bg-green-700 text-white hover:text-white font-bold px-6 py-3 rounded-full shadow-lg transition-colors duration-300 flex items-center gap-2">
  <FaShoppingCart />
 <Link to={`/showpro?proname=${encodeURIComponent(product.name)}`} state={{email}}>
    View Stock
  </Link>
  </button>
  </div>
  </div>
  ))}
  </div>

  <hr className="my-10 border-gray-300" />
 
  {/* nutrition */}

  <h2 className="text-4xl font-extrabold tracking-tighter text-gray-800 text-center mb-10">
  <span className="text-green-700">Herbal</span> Nutraceuticals
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
  {nutriproducts.map((product, index) => (
  <div
  key={index}
  className="bg-white hover:bg-green-50 hover:border-2 hover:border-green-900 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
  >
  <div className="relative p-0">
  <img
  src={product.image}
  alt={product.name}
  className="w-full h-50 object-cover"
  />
  <div className="absolute top-4 right-4"></div>
  </div>
  <div className="p-2 flex flex-col items-center text-center">
  <h2 className="text-2xl font-bold text-gray-800 mb-2">
  {product.name}
  </h2>
 
  <button className="bg-yellow-600 mb-2 hover:bg-green-700 text-white hover:text-white font-bold px-6 py-3 rounded-full shadow-lg transition-colors duration-300 flex items-center gap-2">
  <FaShoppingCart />
 <Link to={`/showpro?proname=${encodeURIComponent(product.name)}`} state={{email}}>
    View Stock
  </Link>
  </button>
  </div>
  </div>
  ))}
  </div>

  <hr className="my-10 border-gray-300" />
 
 {/* household */}

  <h2 className="text-4xl font-extrabold tracking-tighter text-gray-800 text-center mb-10">
  <span className="text-green-700">Household</span> Products
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-10">
  {houseproducts.map((product, index) => (
  <div
  key={index}
  className="bg-white hover:bg-green-50 hover:border-2 hover:border-green-900 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
  >
  <div className="relative p-0">
  <img
  src={product.image}
  alt={product.name}
  className="w-full h-50 object-cover"
  />
  <div className="absolute top-4 right-4"></div>
  </div>
  <div className="p-2 flex flex-col items-center text-center">
  <h2 className="text-2xl font-bold text-gray-800 mb-2">
  {product.name}
  </h2>
 
  <button className="bg-yellow-600 mb-2 hover:bg-green-700 text-white hover:text-white font-bold px-6 py-3 rounded-full shadow-lg transition-colors duration-300 flex items-center gap-2">
  <FaShoppingCart />
 <Link to={`/showpro?proname=${encodeURIComponent(product.name)}`} state={{email}}>
    View Stock
  </Link>
  </button>
  </div>
  </div>
  ))}
  </div>

<hr className="my-10 border-gray-300" />
 
  {/* agriculture */}

  <h2 className="text-4xl font-extrabold tracking-tighter text-gray-800 text-center mb-10">
  <span className="text-green-700">Agricultural</span> Products
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
  {agriproducts.map((product, index) => (
  <div
  key={index}
  className="bg-white hover:bg-green-50 hover:border-2 hover:border-green-900 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
  >
  <div className="relative p-0">
  <img
  src={product.image}
  alt={product.name}
  className="w-full h-50 object-cover"
  />
  <div className="absolute top-4 right-4"></div>
  </div>
  <div className="p-2 flex flex-col items-center text-center">
  <h2 className="text-2xl font-bold text-gray-800 mb-2">
  {product.name}
  </h2>
 
  <button className="bg-yellow-600 mb-2 hover:bg-green-700 text-white hover:text-white font-bold px-6 py-3 rounded-full shadow-lg transition-colors duration-300 flex items-center gap-2">
  <FaShoppingCart />
 <Link to={`/showpro?proname=${encodeURIComponent(product.name)}`} state={{email}}>
    View Stock
  </Link>
  </button>
  </div>
  </div>
  ))}
  </div>

  </main>
 
<hr className="my-10 border-gray-300" />

<div className="w-full h-[500px] bg-cover bg-center bg-[url('https://biharcollegeofpharmacy.com/wp-content/uploads/2022/04/Herbal-Garden.jpg')] flex flex-col justify-end">
  {/* Footer */}
  <footer className="bg-white backdrop-blur-xl text-green-950 font-bold text-xl text-center py-5">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <p className="text-xl font-medium mb-2">
        &copy; {new Date().getFullYear()} GreenRemedy. All rights reserved.
      </p>
      <p className="text-sm">
        Made with <span className="text-red-400">❤️</span> and nature's finest ingredients.
      </p>
    </div>
  </footer>
</div>

  </div>
  );
 }
 

 export default ProductList;