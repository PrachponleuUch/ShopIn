import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setIsAuthenticated, setLoading, setUser } from '../features/userSlice';

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
          dispatch(setLoading(false))
        } catch (error) {
          dispatch(setLoading(false))
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
    }),
    uploadAvatar: builder.mutation({
      query(body) {
        return {
          url: '/me/upload_avatar',
          method: 'PUT',
          body
        }
      },
      invalidatesTags: ['User'] // Make getMe to get user info again
    }),
    updatePassword: builder.mutation({
      query(body) {
        return {
          url: '/password/update',
          method: 'PUT',
          body
        }
      },
    }),
    forgotPassword: builder.mutation({
      query(body) {
        return {
          url: '/password/forgot',
          method: 'POST',
          body
        }
      },
    }),
  }),
});

export const { 
  useGetMeQuery, 
  useUpdateUserMutation, 
  useUploadAvatarMutation, 
  useUpdatePasswordMutation,
  useForgotPasswordMutation
} = userApi;