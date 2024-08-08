import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define an API slice with endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['Users', 'User', 'Movies'],
  endpoints: () => ({}),
});
