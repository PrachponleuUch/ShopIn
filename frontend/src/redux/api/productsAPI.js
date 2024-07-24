import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    // builder.query for GET req, builder.mutation for CUD req
    getProducts: builder.query({ // Get all products
      query: (params) => ({
        url: "/products",
        params: {
          page: params?.page,
          keyword: params?.keyword,
          "price[gte]": params?.min,
          "price[lte]": params?.max,
          category: params?.category,
          "ratings[gte]": params?.ratings,
        }
      }),
      keepUnusedDataFor: 60
    }),
    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ['Product']
    }),
    submitReview: builder.mutation({
      query(body) {
        return {
          url: '/reviews',
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['Product']
    }),
    canUserReview: builder.query({
      query: (productId) => `/can_review/?productId=${productId}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, useGetProductDetailsQuery, useSubmitReviewMutation, useCanUserReviewQuery } = productApi;