'use client';
import React from 'react';

import AppLayout from '@/components/layouts/AppLayout';
import MoviesForm from '../form';

export default function PartialAddMovies() {
  return (
    <AppLayout title="Create a new movie">
      <div className="z-50 flex  min-h-screen w-full  h-full ">
        <div className="mt-10 w-full md:w-3/4 ">
          <MoviesForm />
        </div>
      </div>
    </AppLayout>
  );
}
