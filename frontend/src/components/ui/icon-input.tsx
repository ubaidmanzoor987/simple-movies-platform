import * as React from 'react';

import { cn } from '@/lib/cn';
import { IconType } from '@/lib/types';

import { Input, InputProps } from './input';

export interface IconInputProps extends InputProps {
  icon?: IconType;
  rightIcon?: IconType;
  error?: boolean;
  iconClassName?: string;
  showIcon?: boolean;
  showRightIcon?: boolean;
  onClickIcon?: () => void;
  onClickRightIcon?: () => void;
  inputClassName?: string;
}

const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  (
    {
      icon: Icon,
      rightIcon: RightIcon = Icon, // Default to icon if rightIcon is not provided
      error,
      className,
      iconClassName,
      showIcon = true,
      showRightIcon = false,
      onClickIcon,
      onClickRightIcon,
      inputClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          'group flex w-full gap-1.5 px-3 pt-5 pb-2 mt-3 !font-medium rounded-xl border ',
          error
            ? 'border-destructive'
            : 'focus-within:border-brand focus-within:!bg-brand-medium',
          'border-solid  ',
          className
        )}
      >
        {showIcon && Icon && (
          <Icon
            className={cn(
              'group-focus-within:text-brand text-brand-dark text-2xl mr-2',
              iconClassName
            )}
            onClick={onClickIcon}
          />
        )}
        <Input ref={ref} extraClass={inputClassName} {...props} />
        {showRightIcon && RightIcon && (
          <RightIcon
            className={cn(
              'group-focus-within:text-brand text-brand-dark text-2xl ml-auto mr-2',
              iconClassName
            )}
            onClick={onClickRightIcon}
          />
        )}
      </div>
    );
  }
);

IconInput.displayName = 'IconInput';

export { IconInput };
