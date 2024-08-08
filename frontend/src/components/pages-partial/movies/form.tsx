import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { IMovie } from '@/lib/types';

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FileDropzone from '@/components/common/FileDropZone';
import { moviesUrl } from '@/configs/constants';
import {
  useCreateMovieMutation,
  useUpdateMovieMutation,
} from '@/store/features/movies/moviesApi';
import LoadingDots from '@/components/common/loading-dots';

const movieSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  image: z
    .instanceof(File, { message: 'Image is required' })
    .refine(
      (file) => file.size < 2 * 1024 * 1024,
      'File size must be less than 2MB'
    ),
  publishingYear: z.string().min(1, 'Publishing Year is required'),
});

interface MoviesFormProps {
  movie?: IMovie;
}

type FormFields = z.infer<typeof movieSchema>;

export default function MoviesForm({ movie }: MoviesFormProps) {
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const form = useForm<FormFields>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: movie?.title || '',
      image: undefined,
      publishingYear: movie?.publishingYear?.toString() || '',
    },
  });

  const router = useRouter();

  const [createMovie, { isLoading: isCreating }] = useCreateMovieMutation();
  const [updateMovie, { isLoading: isUpdating }] = useUpdateMovieMutation();

  const onSubmit = async (vals: FormFields) => {
    const formData = new FormData();
    formData.append('title', vals.title);
    formData.append('publishingYear', vals.publishingYear);
    if (vals.image) {
      formData.append('poster', vals.image);
    }

    try {
      if (movie && movie.id) {
        await updateMovie({ id: movie.id, data: formData }).unwrap();
      } else {
        await createMovie(formData).unwrap();
      }
      router.push(moviesUrl);
    } catch (error) {
      console.error('Failed to save movie:', error);
    }
  };

  const handleCancel = () => {
    router.push(moviesUrl);
  };

  useEffect(() => {
    if (movie) {
      form.reset({
        title: movie.title,
        image: undefined,
        publishingYear: movie.publishingYear?.toString(),
      });
      if (movie.poster) {
        setFileUrl(`data:image/png;base64,${movie.poster}`);
      }
    }
  }, [movie, form]);

  const isLoading = isCreating || isUpdating;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-y-10 md:gap-y-0 md:gap-x-24"
      >
        <div className="col-span-6 hidden md:flex flex-col gap-y-8 h-[500px] ">
          <Controller
            name="image"
            control={form.control}
            render={({ field }) => {
              return (
                <FileDropzone
                  onFileUpload={(file) => {
                    field.onChange(file);
                    setFileUrl(URL.createObjectURL(file));
                  }}
                  fileUrl={fileUrl}
                />
              );
            }}
          />
          {form.formState.errors.image && (
            <FormMessage className="text-destructive -mt-6 ml-4">
              {form.formState.errors.image.message}
            </FormMessage>
          )}
        </div>
        <div className="col-span-12 md:col-span-6 flex flex-col ">
          <div className="grid grid-cols-12 gap-y-6">
            <div className="col-span-12">
              <FormField
                control={form.control}
                name={'title'}
                render={({ field: formField }) => (
                  <>
                    <FormControl>
                      <Input
                        {...formField}
                        type="text"
                        id={'title'}
                        aria-label={'title'}
                        label={'Title'}
                        error={!!form.formState.errors['title']}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive -mt-6 ml-4">
                      {form.formState.errors['title']?.message}
                    </FormMessage>
                  </>
                )}
              />
            </div>
            <div className="mt-2 col-span-12 md:col-span-8">
              <FormField
                control={form.control}
                name={'publishingYear'}
                render={({ field: formField }) => (
                  <>
                    <FormControl>
                      <Input
                        {...formField}
                        type="text"
                        id={'publishingYear'}
                        aria-label={'publishingYear'}
                        label={'Publishing Year'}
                        error={!!form.formState.errors['publishingYear']}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive -mt-6 ml-4">
                      {form.formState.errors['publishingYear']?.message}
                    </FormMessage>
                  </>
                )}
              />
            </div>
          </div>
          <div className="hidden md:flex col-span-12 mt-10 gap-x-4">
            <Button
              variant="outline"
              className="w-1/2"
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </Button>
            <Button className="w-1/2" type="submit">
              {isLoading ? <LoadingDots /> : 'Submit'}
            </Button>
          </div>
        </div>
        <div className="col-span-12 flex md:hidden flex-col gap-y-8 h-[500px] ">
          <Controller
            name="image"
            control={form.control}
            render={({ field }) => (
              <FileDropzone
                onFileUpload={(file) => {
                  field.onChange(file);
                  setFileUrl(URL.createObjectURL(file));
                }}
                fileUrl={fileUrl}
              />
            )}
          />
        </div>

        <div className="flex md:hidden col-span-12 gap-x-4 ">
          <Button
            variant="outline"
            className="w-1/2 "
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </Button>
          <Button className="w-1/2" type="submit">
            {isLoading ? <LoadingDots /> : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
