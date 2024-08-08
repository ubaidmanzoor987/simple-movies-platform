import toast from 'react-hot-toast';
import { IMovie } from '@/lib/types';
import { apiSlice } from '../api/apiSlice';

export const moviesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all movies
    fetchMovies: builder.query<IMovie[], void>({
      query: () => ({
        url: 'movies',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Movies' as const, id })),
              { type: 'Movies', id: 'LIST' },
            ]
          : [{ type: 'Movies', id: 'LIST' }],
    }),

    // Fetch a single movie by ID
    fetchMovieById: builder.query<IMovie, string>({
      query: (id) => ({
        url: `movies/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Movies', id }],
    }),

    // Create a new movie
    createMovie: builder.mutation<IMovie, FormData>({
      query: (data) => ({
        url: 'movies',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Movies', id: 'LIST' }],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toast.success('Movie created successfully');
        } catch (error: any) {
          toast.error(error?.error?.data?.message || 'Failed to create movie');
        }
      },
    }),

    // Update an existing movie
    updateMovie: builder.mutation<IMovie, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `movies/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Movies', id }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Movie updated successfully');
        } catch (error: any) {
          toast.error(error?.error?.data?.message || 'Failed to update movie');
        }
      },
    }),

    // Delete a movie
    deleteMovie: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `movies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Movies', id }],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Movie deleted successfully');
        } catch (error: any) {
          toast.error(error?.error?.data?.message || 'Failed to delete movie');
        }
      },
    }),
  }),
});

export const {
  useFetchMoviesQuery,
  useFetchMovieByIdQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} = moviesApi;
