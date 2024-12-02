import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { TooltipProps as RadixTooltipProps } from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

// Define the props interface for your Tooltip component
interface TooltipProps extends RadixTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  defaultOpen,
  onOpenChange,
  open,
  ...props
}) => {
  return (
    <TooltipPrimitive.Root
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      open={open}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        align='center'
        side='bottom'
        {...props}
        className={cn(
          'rounded-[5px]  bg-muted  text-xs font-light px-[8px] text-white py-[8px] shadow-md border border-border' // Grey background and small text
        )}
      >
        {content}
        <TooltipPrimitive.Arrow height={5} width={11} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  );
};
