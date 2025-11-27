import  React  from 'react'
import  ReactDOM  from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './components/AuthPages/Login.jsx'
import Signup from './components/AuthPages/Signup.jsx'
import ForgotPwd from './components/AuthPages/ForgotPwd'
import ResetPwd from './components/AuthPages/ResetPwd'
import Home from './components/Common/Home.jsx'
import Navbar from './components/Common/Navbar'
import AboutUs from './components/Common/AboutUs.jsx'
import ProductList from './components/Common/ProductList'
import ShowProduct from './components/Common/ShowProduct'
import ProductDetails from './components/Common/ProductDetails'
import AddtoCart from './components/Common/AddtoCart'
import CheckoutPage from './components/Common/CheckOut'
import StripePaymentForm from './components/Common/Payment'
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'
import UserReviews from './components/Customer/UserReviews'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserReview from './components/Customer/UserReviews'
const router=createBrowserRouter([
  
  { path: '/', element: (
      <>
        <Navbar />
        <Home />
      </>
    ) 
  },
   {
  path:'/about',
  element:<AboutUs/>
  },
  {
  path:'/login',
  element:<Login/>
  },
   {
  path:'/forgot',
  element:<ForgotPwd/>
  },
   {
  path:'/reset',
  element:<ResetPwd/>
  },
  {
  path:'/ureview',
  element:<UserReview/>
  },
        
  {
  path:'/signup',
  element:<Signup/>
  },
   {
  path:'/products',
  element:<ProductList/>
  },
  {
  path:'/showpro',
  element:<ShowProduct/>
  },
    {
  path:'/proinfo/:id',
  element:<ProductDetails/>
  },
  {
  path:'/checkout',
  element:<CheckoutPage/>
  },
   {
  path:'/addcart',
  element:<AddtoCart/>
  },
  {
  path:'/review/:email',
  element:<UserReviews/>
  },
  {
  path:'/payment',
  element:<StripePaymentForm/>
  },
   {
  path:'/user/*',
  element:<UserRoutes/>
  },
   {
    path: '/admin/*',      // <- Add /* so nested routes inside AdminRoutes work
    element: <AdminRoutes />
  },
  
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
