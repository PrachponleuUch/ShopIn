import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    // builder.query for GET req, builder.mutation for CUD req
    getProducts: builder.query({ // Get all products
      query: (params) => ({
        url: "/products",
        params: {
          page: params?.page
        }
      }),
      keepUnusedDataFor: 60
    }),
    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, useGetProductDetailsQuery } = productApi;