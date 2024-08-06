import React from 'react'
import ProductDetails from '../../components/product/ProductDetails';
import Login from '../../components/auth/Login';
import Register from '../../components/auth/Register';
import Profile from '../../components/user/Profile';
import UpdateProfile from '../../components/user/UpdateProfile';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import UploadAvatar from '../../components/user/uploadAvatar';
import UpdatePassword from '../../components/user/UpdatePassword';
import ForgotPassword from '../../components/auth/ForgotPassword';
import ResetPassword from '../../components/auth/ResetPassword';
import Cart from '../../components/cart/Cart';
import Shipping from '../../components/cart/Shipping';
import ConfirmOrder from '../../components/cart/ConfirmOrder';
import PaymentMethod from '../../components/cart/PaymentMethod';
import MyOrders from '../../components/order/MyOrders';
import OrderDetails from '../../components/order/OrderDetails';
import Invoice from '../../components/invoice/Invoice';
import Home from '../../components/Home';
import { Route } from 'react-router-dom'

const userRoutes = () => {
  return (
    <>
      <Route path='/' element={<Home/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/me/profile' element={<ProtectedRoute> <Profile/> </ProtectedRoute>}/>
      <Route path='/me/update_profile' element={<ProtectedRoute> <UpdateProfile/> </ProtectedRoute>}/>
      <Route path='/me/upload_avatar' element={<ProtectedRoute> <UploadAvatar/> </ProtectedRoute>}/>
      <Route path='/me/update_password' element={<ProtectedRoute> <UpdatePassword/> </ProtectedRoute>}/>
      <Route path='/password/forgot' element={<ForgotPassword/>}/>
      <Route path='/password/reset/:token' element={<ResetPassword/>}/>
      <Route path='/cart' element={ <Cart/> }/>
      <Route path='/shipping' element={ <ProtectedRoute> <Shipping/> </ProtectedRoute> }/>
      <Route path='/confirm_order' element={ <ProtectedRoute> <ConfirmOrder/> </ProtectedRoute> }/>
      <Route path='/payment_method' element={ <ProtectedRoute> <PaymentMethod/> </ProtectedRoute> }/>
      <Route path='/me/orders' element={ <ProtectedRoute> <MyOrders/> </ProtectedRoute> }/>
      <Route path='/me/order/:id' element={ <ProtectedRoute> <OrderDetails/> </ProtectedRoute> }/>
      <Route path='/invoice/order/:id' element={ <ProtectedRoute> <Invoice /> </ProtectedRoute> }/>
    </>
  )
}

export default userRoutes