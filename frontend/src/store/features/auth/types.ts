import { User } from '@/lib/types';

export interface IInitialState {
  user: User | null | undefined;
  isAuthenticated: boolean;
}
