'use client';

import { ILayoutProps } from '@/lib/types';
import { cn } from '@/lib/cn';

import TopNavbar from '../navbar/TopNavbar';

const AppLayout = ({ children, ...props }: ILayoutProps) => {
  return (
    <div className=" w-full min-h-screen background_mask">
      <div className="flex flex-col w-full">
        <div
          className={cn(
            'px-6 md:px-[120px] mt-20 flex flex-col md:mb-44 '
          )}
        >
          <TopNavbar {...props} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
