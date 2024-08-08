import { cn } from '@/lib/cn';

export const TickIcon = ({
  className,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      className={cn('h-8 w-8 group-focus-within:text-brand', className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M50 15L22.5 42.5L10 30"
        stroke="url(#paint0_linear_1332_1526)"
        stroke-width="6"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1332_1526"
          x1="47.3492"
          y1="5.02156"
          x2="19.2296"
          y2="47.9783"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2BD17E" />
          <stop offset="0.568499" stopColor="#2BD17E" />
          <stop offset="1" stopColor="#2BD17E" />
        </linearGradient>
      </defs>
    </svg>
  );
};
