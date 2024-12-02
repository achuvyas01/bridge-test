'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';

const DropDownDialog = DialogPrimitive.Root;

const DropDownDialogTrigger = DialogPrimitive.Trigger;

const DropDownDialogPortal = DialogPrimitive.Portal;

const DropDownDialogClose = DialogPrimitive.Close;

const DropDownDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-transaprent data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    ref={ref}
    {...props}
  />
));
DropDownDialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DropDownDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DropDownDialogPortal>
    <DropDownDialogOverlay />
    <DialogPrimitive.Content
      className={cn(
        'fixed  overflow-y-auto   z-50 grid w-full max-w-lg gap-4 border bg-secondary p-[16px] lg:p-[30px] shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-[6px]',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DropDownDialogPortal>
));

DropDownDialogContent.displayName = DialogPrimitive.Content.displayName;

const DropDownDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
);
DropDownDialogHeader.displayName = 'DialogHeader';

const DropDownDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
);
DropDownDialogFooter.displayName = 'DialogFooter';

const DropDownDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    ref={ref}
    {...props}
  />
));
DropDownDialogTitle.displayName = DialogPrimitive.Title.displayName;

const DropDownDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    className={cn('text-sm text-muted-foreground', className)}
    ref={ref}
    {...props}
  />
));
DropDownDialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  DropDownDialog,
  DropDownDialogPortal,
  DropDownDialogOverlay,
  DropDownDialogClose,
  DropDownDialogTrigger,
  DropDownDialogContent,
  DropDownDialogHeader,
  DropDownDialogFooter,
  DropDownDialogTitle,
  DropDownDialogDescription,
};
