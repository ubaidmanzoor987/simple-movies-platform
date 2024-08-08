'use client';

import { ILayoutProps } from '@/lib/types';
import { cn } from '@/lib/cn';

const AuthLayout = ({ children, ...props }: ILayoutProps) => {

  return (
    <div className="w-full min-h-screen bg-background relative">
      <div className="flex background_mask w-full min-h-screen absolute bottom-0" />
      <div className="flex flex-col w-full">
        <div className={cn('flex flex-col ')}>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
