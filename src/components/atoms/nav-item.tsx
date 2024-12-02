import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavItem = ({
  link,
  children,
  label,
  className,
  textClass,
}: {
  link: string;
  children: React.ReactSVGElement | React.ReactNode;
  label: string;
  className?: string;
  textClass?: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname.includes(link);
  return (
    <Link className='lg:block lg:w-full lg:mt-2 first:mt-0' href={`/${link}`}>
      <div
        className={cn(
          'lg:w-full lg:h-[46px] flex items-center justify-start flex-col lg:flex-row lg:px-4 rounded-[5px] bg-transparent group lg:hover:bg-[#292C32]',
          isActive && 'lg:bg-[#292C32]',
          className
        )}
      >
        <div className={cn('lg:w-[40px] group', isActive && 'active')}>
          {children}
        </div>{' '}
        <span
          className={cn(
            'text-[10px] lg:text-sm mt-2 lg:mt-0 font-bold truncate text-white group-hover:opacity-100 opacity-50',
            isActive && 'opacity-100',
            textClass
          )}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

export default NavItem;
