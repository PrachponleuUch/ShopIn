import { configureStore } from '@reduxjs/toolkit'
import { productApi } from './api/productsAPI'
import { authApi } from './api/authAPI'

// import rootReducer from './reducers'

export const store = configureStore({ 
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([productApi.middleware, authApi.middleware])
},)
// The store now has redux-thunk added and the Redux DevTools Extension is turned on