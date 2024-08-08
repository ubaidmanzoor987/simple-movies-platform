'use client';
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

import AppLayout from '@/components/layouts/AppLayout';
import MoviesForm from '../form';
import { useFetchMovieByIdQuery } from '@/store/features/movies/moviesApi';
import { moviesUrl } from '@/configs/constants';

export default function PartialEditMovies() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // Fetch the movie by id
  const {
    data: movie,
    error,
    isLoading,
  } = useFetchMovieByIdQuery(id || '', {
    skip: !id, // Skip the query if id is not provided
  });

  // Redirect to movies page if movie not found or on error
  useEffect(() => {
    if (error) {
      toast.error('Movie not found');
      router.push(moviesUrl);
    }
  }, [error, router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <AppLayout title="Edit">
      <div className="z-50 flex  min-h-screen w-full  h-full ">
        <div className="mt-10 w-full md:w-3/4 ">
          {movie && <MoviesForm movie={movie} />}
        </div>
      </div>
    </AppLayout>
  );
}
