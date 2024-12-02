import { cn } from '@/lib/utils';
import { PillType } from '@/types/global';
import React from 'react';

const Pill = ({ active, value, className, onClick }: PillType) => {
  return (
    <div
      className={cn(
        'flex-center text-white w-fit bg-container cursor-pointer border border-border rounded-full py-2 px-4',
        active && 'bg-primary',
        className
      )}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export default Pill;
