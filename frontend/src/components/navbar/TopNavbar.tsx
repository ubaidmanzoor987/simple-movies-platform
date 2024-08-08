import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { LogoutIcon, PlusIcon } from '@/assets/svgs';
import { getAuthDataSelector } from '@/store/features/auth/authSelector';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { useLogoutMutation } from '@/store/features/auth/authApi';
import { userLoggedOut } from '@/store/features/auth/authSlice';
import { loginUrl, moviesUrl } from '@/configs/constants';
import { ILayoutProps } from '@/lib/types';

interface ITopNavbar extends ILayoutProps {}

const TopNavbar = ({ showAdd, title }: ITopNavbar) => {
  // redux
  const { user } = useAppSelector(getAuthDataSelector);
  //   rtq
  const [logout, { isLoading, isSuccess }] = useLogoutMutation();

  const router = useRouter();

  const dispatch = useAppDispatch();

  // handlers
  const handleLogout = useCallback(async () => {
    try {
      logout({});
      dispatch(userLoggedOut());
      router.push(loginUrl);
    } catch (error) {
      router.push(loginUrl);
      console.error('Failed to logout:', error);
    }
  }, [logout, dispatch, router]);

  const handleClickCreate = () => {
    router.push(`${moviesUrl}create`);
  };

  return (
    <div className="flex w-full items-center justify-end ">
      <div className="flex flex-row gap-x-2 items-center justify-center  w-full">
        <div className="py-4 flex flex-row justify-between items-center w-full  ">
          <div className="flex gap-x-4 items-center justify-center">
            <p className="text-3xl md:text-5xl tracking-normal leading text-headingColor font-semibold">
              {title}
            </p>
            {showAdd && (
              <PlusIcon
                onClick={handleClickCreate}
                className="cursor-pointer"
              />
            )}
          </div>

          <div className="flex gap-x-2 cursor-pointer items-center justify-center" onClick={handleLogout}>
            <p className="text-sm md:text-2xl hidden md:flex tracking-normal leading text-headingColor font-semibold">
              Logout
            </p>
            <LogoutIcon  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
