import toast from 'react-hot-toast';
import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login endpoint
    login: builder.mutation({
      query: (data) => ({
        url: 'users/login',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // setting logged data to redux state
          dispatch(
            userLoggedIn({
              user: result.data.user,
            })
          );

          toast.success(result.data.message);
        } catch (error: any) {
          const errorMessage = error?.error?.data?.message || error.message;
          toast.error(errorMessage);
        }
      },
    }),

    // logout endpoint
    logout: builder.mutation({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          toast.success(result.data.message);
        } catch (error: any) {
          toast.error(error?.error?.data?.message || error.message);
        }
      },
    }),

    // sign-up endpoint
    signUp: builder.mutation({
      query: (data) => ({
        url: 'users/register',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // setting logged data to redux state
          dispatch(
            userLoggedIn({
              user: result.data.user,
            })
          );

          toast.success(result.data.message);
        } catch (error: any) {
          const errorMessage = error?.error?.data?.message || error.message;
          toast.error(errorMessage);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useSignUpMutation } =
  authApi;
