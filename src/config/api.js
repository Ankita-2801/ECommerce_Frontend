export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: 'auth/login',
  REGISTER: 'auth/signup',
  FORGOTPASSWORD: 'auth/forgot-password',
  VERIFYOTP: 'auth/verify-otp',
  RESETPASSWORD: 'auth/reset-password',
  GOOGLELOGIN: "auth/google-login",
  
  // Admin endpoints
   ADMIN: "admin",
  ADD_PRODUCTS: "admin/products",
  USER_DETAILS: "admin/users",
  ADMIN_METRICS: "admin/metrics",
  SALES_CHART: "admin/sales-chart",
  ADMIN_PROFILE: "admin/profile",
  USER_PROFILE: "admin/user-details",
  ORDER_DETAILS: "orders",
  ORDER_SEARCH: "admin/orders",
  ORDER_STATUS: "orders",
  ADMIN_SEARCH: "admin/search",
  BULK_EMAIL_SEND: "admin/send-bulk-email",
  
  // User profile endpoint (ADD THIS)
  PROFILE_ME: "user/profile",
  USER_REVIEW: "reviews",
  WISHLIST: "wishlist",
  USER_ORDER: "orders/history",

  
  //products
  CHECKOUT_ORDER: "user/create-orders",
  CHECK_USER: "user/check",
  EDIT_USER: "user/edit",
  STOCK_UPDATE: "user/stock",
  WISHLIST_ADD: "user/addwish",
  WISHLIST_DELETE: "user/delwish",
  WISHLIST_FETCH: "user/wish",
  CART_ADD: "user/addcart",
  FETCH_CART: "user/getcart",
  DELETE_CART: "user/delcart",
  CART_COUNT: "user/countcart",
  WISH_COUNT: "user/countwish",
  DELETE_ALLCART: "user/delallcart",
  CHECK_CART: "user/checkcart",
  FETCH_REVIEW: "user/review",
  DELIVERY_DATE: "user/date"
}