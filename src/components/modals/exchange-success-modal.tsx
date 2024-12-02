import { useAppDispatch, useAppSelector } from '@/redux/redux-provider';
import { Dialog, DialogContent } from '../ui/dialog';
import { setExchangeSuccessModalOpen } from '@/redux/slices/global.slice';
import { Button } from '../ui/button';
import {
  setExchangeAmount,
  setExchangeFrom,
  setExchangeOutAmount,
  setExchangeTo,
} from '@/redux/slices/send.slice';
import Image from 'next/image';
import RoundedImg from '../atoms/rounded-img';

const ExhchangeSuccessModal = () => {
  const dispatch = useAppDispatch();

  const { isExchangeSuccessModalOpen } = useAppSelector(
    (state) => state.global
  );

  const { exchangeFrom, exchangeTo, exchangeAmount, exchangeOutAmount } =
    useAppSelector((state) => state.send);

  return (
    <Dialog
      onOpenChange={() => {
        dispatch(setExchangeFrom(null));
        dispatch(setExchangeTo(null));
        dispatch(setExchangeSuccessModalOpen(false));
        dispatch(setExchangeAmount(null));
        dispatch(setExchangeOutAmount(null));
      }}
      open={isExchangeSuccessModalOpen}
    >
      <DialogContent className='w-[calc(100%-16px)] mx-auto lg:w-full max-w-[646px] max-h-[80svh] '>
        <div className='flex'>
          <span className='text-lg font-bold mb-[4px]'>
            Swap was successful
          </span>
        </div>
        <div>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-y-2'>
              <span className='text-2xl lg:text-[37px] font-medium leading-none'>
                {exchangeAmount} {exchangeFrom?.name}
              </span>
              <span className='text-xs lg:text-sm font-medium opacity-50'>
                ${' '}
                {exchangeAmount && exchangeAmount * (exchangeFrom?.price ?? 0)}
              </span>
            </div>
            <div className='relative'>
              {exchangeFrom?.logoUrl ? (
                <Image
                  alt='token'
                  className='w-[50px] h-[50px]  lg:w-[70px] lg:h-[70px] rounded-[30px]'
                  height={60}
                  src={exchangeFrom.logoUrl}
                  width={60}
                />
              ) : (
                <RoundedImg
                  className='w-[40px] h-[40px] lg:w-[55px] lg:h-[55px]'
                  quality={100}
                  src='/img/empty-token-logo.png'
                />
              )}

              {exchangeFrom?.chainLogoUrl ? (
                <Image
                  alt='bot'
                  className='w-[35px] h-[35px] absolute -bottom-1 -right-[10px]'
                  height={32}
                  src={exchangeFrom.chainLogoUrl}
                  width={32}
                />
              ) : (
                <RoundedImg
                  className='w-[25px] h-[25px] absolute -bottom-1 -right-[10px]'
                  src='/img/empty-token-logo.png'
                />
              )}
            </div>
          </div>
          <div className='flex justify-between mt-10'>
            <span className='opacity-50 text-xl  '>To</span>
            <div className='flex flex-col gap-y-2'>
              <span className='text-2xl lg:text-[37px] font-medium leading-none'>
                {exchangeOutAmount} {exchangeFrom?.name}
              </span>
              <span className='text-xs lg:text-sm font-medium opacity-50'>
                $
                {exchangeOutAmount &&
                  exchangeOutAmount * (exchangeTo?.price ?? 0)}
              </span>
            </div>
            <div className='relative'>
              {exchangeTo?.logoUrl ? (
                <Image
                  alt='token'
                  className='w-[50px] h-[50px]  lg:w-[70px] lg:h-[70px] rounded-[30px]'
                  height={60}
                  src={exchangeTo.logoUrl}
                  width={60}
                />
              ) : (
                <RoundedImg
                  className='w-[40px] h-[40px] lg:w-[55px] lg:h-[55px]'
                  quality={100}
                  src='/img/empty-token-logo.png'
                />
              )}

              {exchangeTo?.chainLogoUrl ? (
                <Image
                  alt='bot'
                  className='w-[35px] h-[35px] absolute -bottom-1 -right-[10px]'
                  height={32}
                  src={exchangeTo?.chainLogoUrl}
                  width={32}
                />
              ) : (
                <RoundedImg
                  className='w-[25px] h-[25px] absolute -bottom-1 -right-[10px]'
                  src='/img/empty-token-logo.png'
                />
              )}
            </div>
          </div>
        </div>
        <Button className='border border-border h-[45px] rounded-[6px] bg-primary w-full mt-[10px] text-foreground'>
          Swap Successful
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ExhchangeSuccessModal;
