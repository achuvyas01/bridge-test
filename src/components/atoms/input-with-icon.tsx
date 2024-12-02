import * as React from 'react';
import { cn } from '@/lib/utils'; // Adjust the import path accordingly
import { Input } from '../ui/input';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';

type InputWithPrefixProps = React.InputHTMLAttributes<HTMLInputElement> & {
  prefixIcon?: React.ReactNode;
  register?: UseFormRegister<any>; // Register method from react-hook-form
  errors?: FieldErrors<any>; // Form validation errors
  name: string;
  validationSchema?: RegisterOptions;
};

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithPrefixProps>(
  ({ className, prefixIcon, ...props }, ref) => {
    return (
      <div className='relative flex items-center'>
        {/* Prefix Icon */}
        <span className='absolute left-3 text-muted-foreground'>
          {prefixIcon}
        </span>

        {/* Input Field */}
        <Input
          className={cn(
            'pl-10', // Add padding to the left to make space for the prefix icon
            className
          )}
          {...props}
          // {...register}
          // {...register(name, validationSchema)}
          ref={ref}
        />
      </div>
    );
  }
);

InputWithIcon.displayName = 'InputWithIcon';

export { InputWithIcon };
