import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setIsAuthenticated, setUser } from '../features/userSlice';

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `/me`,
      transformResponse: (response) => response.user, // Transform response to response.user
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data)) // setUser to response.user
          dispatch(setIsAuthenticated(true))
        } catch (error) {
          console.log(error)
        }
      },
      providesTags: ['User']
    }),
    updateUser: builder.mutation({
      query(body) {
        return {
          url: '/me/update',
          method: 'PUT',
          body
        }
      },
      invalidatesTags: ['User'] // Make getMe to get user info again
    })
  }),
});

export const { useGetMeQuery, useUpdateUserMutation } = userApi;