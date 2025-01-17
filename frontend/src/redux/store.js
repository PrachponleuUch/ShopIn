import { configureStore } from '@reduxjs/toolkit'
import { productApi } from './api/productsAPI'
import { authApi } from './api/authAPI'
import { userApi } from './api/userAPI'
import userReducer from './features/userSlice'
import cartReducer from './features/cartSlice'
import { orderApi } from './api/orderAPI'


// import rootReducer from './reducers'

export const store = configureStore({ 
  reducer: {
    auth: userReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    productApi.middleware, 
    authApi.middleware, 
    userApi.middleware,
    orderApi.middleware,
  ])
},)
// The store now has redux-thunk added and the Redux DevTools Extension is turned on