'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { cn } from '@/lib/utils';
import Pill from '../atoms/pill';
import { useAppDispatch, useAppSelector } from '@/redux/redux-provider';
import Image from 'next/image';
import { setSelectedRoute } from '@/redux/slices/send.slice';
import { toast } from 'react-toastify';

const ExchangeRoutesModal = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { routes, selectedRoute } = useAppSelector((state) => state.send);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='w-[calc(100%-16px)] mx-auto lg:w-full max-w-[600px] max-h-[80svh]'>
        <DialogTitle>Routes</DialogTitle>
        <div className=''>
          {routes.map((route, index) => (
            <BridgeItem
              best={index === 0} // Pass `best` as true for the first item
              key={index}
              onClick={() => {
                dispatch(setSelectedRoute(route));
                toast.success('You have changed your selected route');
              }}
              route={route}
              selected={
                selectedRoute?.bridgeRoute?.bridgeId ===
                route?.bridgeRoute?.bridgeId
              }
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const BridgeItem = ({
  best,
  route,
  selected,
  onClick,
}: {
  best?: boolean;
  route: any;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={cn(
        'flex items-center mt-4 justify-between w-full h-[77px] rounded-[10px] border border-border px-5',
        selected && 'border-primary'
      )}
      onClick={onClick}
      role='button'
    >
      <div className='flex items-center gap-x-3 text-lg font-medium'>
        {best && (
          <Pill
            className='bg-primary text-sm font-semibold rounded-[5px] w-[57px] h-[30px] border-none'
            value='Best'
          />
        )}
        <div>
          <span className='text-white/50'>Value</span>
          <span className='text-white ml-2.5'>
            {route?.bridgeRoute?.outputAmount}
          </span>
        </div>
      </div>
      <div className='flex items-center gap-x-2.5 text-white/50'>
        <Image
          alt='bot'
          className='w-[25px] h-[25px]'
          height={32}
          src={route?.bridgeRoute?.bridgeInfo?.icon}
          width={32}
        />

        {route?.bridgeRoute?.bridgeInfo?.displayName}
      </div>
    </div>
  );
};

export default ExchangeRoutesModal;
