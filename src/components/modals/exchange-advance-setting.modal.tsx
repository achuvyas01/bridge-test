'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import Pill from '../atoms/pill';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/redux-provider';
import { setSlippage } from '@/redux/slices/send.slice';
import { toast } from 'react-toastify';

const ExchangeAdvanceSettingModal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { slippage } = useAppSelector((state) => state.send);
  const [localSlippage, setLocalSlippage] = useState(slippage); // Track input value
  const [customSlippage, setCustomSlippage] = useState(''); // Track input value

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomSlippage(value);
    if (value === '') {
      setLocalSlippage(value);
    }
  };

  const handleCustomSlippageSubmit = () => {
    // Update slippage based on custom input
    if (customSlippage) {
      dispatch(setSlippage(customSlippage));
    }
  };

  function onSaveCllick() {
    dispatch(setSlippage(customSlippage ? customSlippage : localSlippage));
    toast.success('Slippage updated');
  }

  const dispatch = useAppDispatch();

  return (
    <Dialog onOpenChange={() => {}}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='w-[calc(100%-16px)] overflow-auto scrollbar mx-auto lg:w-full max-w-[646px] max-h-[90svh]'>
        <DialogTitle className='text-center'>Advance Settings</DialogTitle>
        <div>
          <span className='text-sm'>Slippage</span>
          <div className='mt-4 flex justify-between gap-x-2 items-center'>
            <Pill
              active={localSlippage === '0.5'}
              onClick={() => {
                setLocalSlippage('0.5');
                setCustomSlippage('');
              }}
              value='0.5%'
            />
            <Pill
              active={localSlippage === '1'}
              onClick={() => {
                setLocalSlippage('1');
                setCustomSlippage('');
              }}
              value='1%'
            />
            <Pill
              active={localSlippage === '3'}
              onClick={() => {
                setLocalSlippage('3');
                setCustomSlippage('');
              }}
              value='3%'
            />
            <span className='text-sm font-medium opacity-50'>OR</span>
            <Input
              className={`w-full max-w-[250px] h-[50px] border rounded-full ${
                customSlippage ? 'border-primary' : 'border-border'
              }`}
              onBlur={handleCustomSlippageSubmit} // You can submit when the user leaves the input
              onChange={handleInputChange}
              placeholder='Add a custom percentage'
              value={customSlippage}
            />
          </div>
          <div className='text-end mt-7'>
            <DialogClose asChild>
              <span className='text-sm font-medium opacity-50 cursor-pointer'>
                Cancel
              </span>
            </DialogClose>
            <Button
              className='w-[85px] h-[45px] ml-4 cursor-pointer'
              onClick={onSaveCllick}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExchangeAdvanceSettingModal;
