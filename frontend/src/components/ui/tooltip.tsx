'use client';

/** This file is used to create and export a customized tooltip component
 * using the @radix-ui/react-tooltip package.
 * The Tooltip component is made up of several sub-components:
 * TooltipProvider: The context provider for all tooltips.
 * TooltipTrigger: The trigger element that will show the tooltip when interacted with.
 * TooltipContent: The content of the tooltip that will be shown.
 * The TooltipContent component is customized with additional styling and an animation. */

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/cn';

// The TooltipProvider component is imported from @radix-ui/react-tooltip package.
const TooltipProvider = TooltipPrimitive.Provider;

// The Tooltip component is imported from @radix-ui/react-tooltip package.
const Tooltip = TooltipPrimitive.Root;

// The TooltipTrigger component is imported from @radix-ui/react-tooltip package.
const TooltipTrigger = TooltipPrimitive.Trigger;

// The TooltipContent component is created using React.forwardRef to enable the use of ref.
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      // Default styling for the tooltip content, including border, background, padding,
      // text styling, shadow, and animation for different tooltip positions (top, right, bottom, left).
      'z-50 backdrop-blur-lg overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
      className
    )}
    {...props}
  />
));

// Setting the display name of the TooltipContent component to the display name of the TooltipPrimitive.Content component.
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Exporting the Tooltip, TooltipTrigger, TooltipContent, and TooltipProvider components for use in other files.
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
