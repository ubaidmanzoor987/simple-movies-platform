import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ICustomError } from './types';

export const getRandomInt = (min: number = 1, max: number = 10000000) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export function isFetchBaseQueryError(
  error: any
): error is FetchBaseQueryError & { data: ICustomError['data'] } {
  return (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    'data' in error &&
    typeof (error as FetchBaseQueryError & { data: ICustomError['data'] }).data
      .message === 'string'
  );
}
