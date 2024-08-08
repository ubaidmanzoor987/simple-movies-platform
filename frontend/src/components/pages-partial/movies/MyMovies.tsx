'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { IMovie } from '@/lib/types';
import MovieCard from '@/components/common/MovieCard';
import PaginationControls from '@/components/common/Pagination';
import { moviesUrl } from '@/configs/constants';

interface IMyMovies {
  movies: IMovie[];
}

export default function MyMovies({ movies }: IMyMovies) {
  // router
  const router = useRouter();
  // states
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // Calculate the current page's movie list
  const currentMovies = movies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // handlers
  const handleClickMovie = (id?: string) => {
    router.push(`${moviesUrl}edit?id=${id}`);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="mt-10 grid grid-cols-12 gap-4">
        {currentMovies.map((movie) => (
          <div
            className="col-span-6 md:col-span-3 2xl:col-span-2 cursor-pointer"
            key={movie.id}
            onClick={() => handleClickMovie(movie.id)}
          >
            <MovieCard {...movie} />
          </div>
        ))}
      </div>
      {movies.length > itemsPerPage && (
        <div className="w-full flex items-center justify-center relative mt-16">
          <PaginationControls
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalRows={movies.length}
          />
        </div>
      )}
    </div>
  );
}
