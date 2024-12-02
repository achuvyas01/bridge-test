import React from 'react';
import RoundedImg from './rounded-img';
import { cn, maskWalletAddress } from '@/lib/utils';
import { CopyIcon } from 'lucide-react';
import { selectedContactItemType } from '@/types/global';

const SelectedContact: React.FC<selectedContactItemType> = ({
  rootClassName,
  contact,
}) => {
  return (
    <div
      className={cn(
        'flex-center gap-x-[18px] py-2 mt-5 mb-10 bg-secondary-background rounded-[5px]',
        rootClassName
      )}
    >
      <RoundedImg
        alt='currency'
        className='w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]'
        src='/temp/profile.png'
      />
      <div className='flex flex-col gap-y-2 lg:gap-y-1.5 justify-between text-xs lg:text-lg leading-none'>
        <span className='font-bold leading-none'>{contact?.name}</span>
        <span className='font-medium inline-flex text-[10px] lg:text-sm opacity-50'>
          {maskWalletAddress(contact?.walletAddress ?? '')}
          <CopyIcon className='w-[15px] h-auto text-white ml-2 active:scale-[0.9] cursor-pointer' />
        </span>
      </div>
    </div>
  );
};

export default SelectedContact;
