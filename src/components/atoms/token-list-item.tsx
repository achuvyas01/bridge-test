import React from 'react';
import RoundedImg from './rounded-img';
import { TokensListItemProps } from '@/types/global';
import Image from 'next/image';

const TokenListItem: React.FC<TokensListItemProps> = ({
  token,
  hideValue = false,
}) => {
  return (
    <li className='flex items-center justify-between mt-3 hover:bg-accent px-2 py-2 hover:rounded-[10px] first-of-type:mt-0'>
      <div className='flex'>
        <div className='relative'>
          {token?.logoUrl ? (
            <Image
              alt='bot'
              className='w-[40px] h-[40px]  lg:w-[50px] lg:h-[50px] rounded-[30px]'
              height={32}
              src={token.logoUrl}
              width={32}
            />
          ) : (
            <RoundedImg
              className='w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]'
              quality={100}
              src='/img/empty-token-logo.png'
            />
          )}

          {token?.chainLogoUrl ? (
            <Image
              alt='bot'
              className='w-[25px] h-[25px] absolute -bottom-1 -right-[10px]'
              height={32}
              src={token.chainLogoUrl}
              width={32}
            />
          ) : (
            <RoundedImg
              className='w-[25px] h-[25px] absolute -bottom-1 -right-[10px]'
              src='/img/empty-token-logo.png'
            />
          )}
        </div>
        <div className='flex flex-col justify-between text-sm lg:text-lg ml-6 leading-none py-0.5'>
          <span className='font-bold'>{token?.name}</span>
          <span className='font-medium opacity-50'>{token?.symbol}</span>
        </div>
      </div>
      {!hideValue && (
        <span className='text-sm lg:font-medium opacity-50'>
          {token?.amount}
        </span>
      )}
    </li>
  );
};

export default TokenListItem;
