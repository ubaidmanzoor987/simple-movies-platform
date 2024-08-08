'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import AppLayout from '@/components/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { moviesUrl } from '@/configs/constants';
import { useFetchMoviesQuery } from '@/store/features/movies/moviesApi';

import MyMovies from './MyMovies';

export default function PartialMovies() {
  const router = useRouter();

  // Fetch movies
  const { data: movies = [], error, isLoading } = useFetchMoviesQuery();

  const handleAddMovie = () => {
    router.push(`${moviesUrl}create`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading movies</div>;
  }

  if (movies.length === 0) {
    return (
      <AppLayout title="Movies List">
        <div className="z-50 flex flex-col h-[70vh] 2xl:h-[60vh] gap-y-6 items-center justify-center">
          <p className="mt-20 mb-2 text-2xl md:text-5xl tracking-normal leading-8 text-center text-headingColor font-bold">
            Your movie list is empty
          </p>
          <Button
            onClick={handleAddMovie}
            className="w-full md:w-1/6 cursor-pointer"
          >
            Add a new movie
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Movies List" showAdd>
      <div className="z-50 flex  min-h-screen w-full  ">
        <MyMovies movies={movies} />
      </div>
    </AppLayout>
  );
}
