'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from '@/components/ui/form';

import { loginUrl, moviesUrl } from '@/configs/constants';
import AuthLayout from '@/components/layouts/AuthLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  useLoginMutation,
  useSignUpMutation,
} from '@/store/features/auth/authApi';
import LoadingDots from '@/components/common/loading-dots';
import Link from 'next/link';

const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type FormFields = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  // form
  const form = useForm<FormFields>({
    resolver: zodResolver(signUpSchema),
  });

  const [signup, { isLoading, isSuccess }] = useSignUpMutation();

  const router = useRouter();

  // states

  // handlers
  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    signup(values);
  };

  const formFields: Array<{
    name: keyof FormFields;
    label: string;
    type: string;
  }> = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
    },
    {
      name: 'password',
      label: 'Enter your password',
      type: 'password',
    },
  ];

  // if api call success then redirect to dashboard
  useEffect(() => {
    if (isSuccess) {
      router.push(moviesUrl);
    }
  }, [isSuccess]);

  return (
    <div className="flex flex-col h-full  w-full md:w-1/3">
      <p className="mt-20 mb-2 text-6xl tracking-normal leading-8 text-center text-headingColor font-bold">
        Sign Up
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full mt-11 gap-y-8"
        >
          <div className="w-full flex flex-col gap-y-8">
            {formFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <>
                    <FormControl>
                      <Input
                        {...formField}
                        type={field.type}
                        id={field.label.replace(/\s+/g, '-').toLowerCase()}
                        aria-label={field.label}
                        label={field.label}
                        error={!!form.formState.errors[field.name]}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive text-xs font-normal -mt-6 ml-4">
                      {form.formState.errors[field.name]?.message}
                    </FormMessage>
                  </>
                )}
              />
            ))}
          </div>
          <Button
            variant="default"
            type="submit"
            className="w-full mt-2"
            disabled={isLoading}
          >
            {isLoading ? <LoadingDots /> : 'Signup'}
          </Button>
          <p className="mt-4 mb-2 text-sm tracking-normal leading-8 text-center text-headingColor font-normal">
            Do you have already an account ?
            <Link href={loginUrl} className="ml-2 text-primary cursor-pointer">
              Sign In
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default function PartialSignUp() {
  return (
    <AuthLayout>
      <div className="z-50 flex flex-col items-center justify-center min-h-screen w-full p-4 h-full ">
        <SignUpForm />
      </div>
    </AuthLayout>
  );
}
