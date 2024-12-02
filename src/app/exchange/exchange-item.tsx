'use client';
import React from 'react';
import RoundedImg from '@/components/atoms/rounded-img';
import { Button } from '@/components/ui/button';
import { ExchangeItemType } from '@/types/global';
import Image from 'next/image';
import { truncateToFourDecimals } from '@/lib/utils';
import FadeLoader from 'react-spinners/FadeLoader';

const ExchangeItem: React.FC<ExchangeItemType> = ({
  disabled,
  exchangeType,
  isAmountLoading = false,
  selectedToken,
  amountInput,
  handleAmountChange,
  onSelectMax,
  openTokenModal,
}) => {
  // const { isSendHistoryOpen } = useAppSelector((state) => state.global);
  // const [amount, setAmount] = useState(0);
  // const [dollarValue, setDollarValue] = useState(0);

  // const dispatch = useAppDispatch();

  // const { exchangeTo, exchangeFrom } = useAppSelector((state) => state.send);

  // const handleSelectTokenModal = () => {
  //   dispatch(setSelectTokenOpen(!isSendHistoryOpen));
  //   dispatch(setSelectedModalType(exchangeType === 'From' ? 'from' : 'to'));
  // };

  // const selectedToken = exchangeType === 'From' ? exchangeFrom : exchangeTo;

  // const handleChange = (e: { target: { value: string } }) => {
  //   const value = e.target.value;
  //   // Check if the value matches the pattern
  //   if (fourDecimalPointRegex.test(value)) {
  //     setAmount(parseFloat(value) ?? '');
  //     dispatch(setExchangeAmount(parseFloat(e.target.value)));
  //   }
  // };

  // useEffect(() => {
  //   if (selectedToken && amount >= 0) {
  //     const calculatedValue = (selectedToken?.price ?? 0) * amount;
  //     setDollarValue(parseFloat(calculatedValue.toFixed(4)));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [amount, selectedToken?.price]);

  // // useEffect to update `amount` whenever `outAmount` changes
  // useEffect(() => {
  //   if (outAmount !== undefined && outAmount !== null) {
  //     setAmount(outAmount);
  //   }
  // }, [outAmount]);

  return (
    <>
      <div className='exchangeItem flex h-[168px] bg-background rounded-[10px] mt-[10px]'>
        <div className='flex flex-col gap-y-5 items-center justify-center w-[123px] rounded-l-[10px] bg-secondary-background'>
          <span className='text-lg font-medium text-white/50'>
            {exchangeType}
          </span>
          <div className='relative cursor-pointer' onClick={openTokenModal}>
            {selectedToken ? (
              <div className='relative '>
                <Image
                  alt='bot'
                  className='bg-white w-[40px] h-[40px] lg:w-[55px] lg:h-[55px] rounded-[30px]'
                  height={32}
                  src={selectedToken.logoUrl}
                  width={32}
                />
                <Image
                  alt='bot'
                  className=' w-[18px] lg:w-[25px] h-[18px] lg:h-[25px] absolute -bottom-1 -right-[10px]'
                  height={32}
                  src={selectedToken.chainLogoUrl}
                  width={32}
                />
              </div>
            ) : (
              <div className='relative'>
                <RoundedImg quality={100} />
                <RoundedImg className='bg-[#494E59] w-[18px] lg:w-[25px] h-[18px] lg:h-[25px] absolute -bottom-1 -right-[10px]' />
              </div>
            )}
          </div>
        </div>
        {isAmountLoading ? (
          <div className='w-full'>
            <div className='w-full h-full flex justify-center items-center'>
              <FadeLoader
                color={'#A3A3A3'}
                height={15}
                margin={4}
                radius={8}
                width={4}
              />
            </div>
          </div>
        ) : (
          <div className='relative bg-transparent flex-center pr-5 pb-5'>
            <div className='w-full'>
              <input
                className='w-full text-[40px] lg:text-[52px] text-center block font-medium bg-transparent outline-none 
              ring-offset-0 placeholder:text-[52px] leading-none placeholder:opacity-50'
                disabled={disabled}
                min={0}
                onChange={handleAmountChange}
                placeholder='0.00'
                step='0.0001'
                type='number'
                value={amountInput === 0 ? '' : amountInput}
              />

              <span className='text-lg text-center inline-block mt-2 lg:mt-3.5 font-medium opacity-50 w-full ring-0'>
                ${selectedToken ? amountInput * selectedToken.price : 0}
              </span>
            </div>

            <div className=' absolute bottom-4 right-4 flex gap-y-2 flex-col items-end'>
              {!disabled && (
                <Button
                  className='w-[57px] h-[32px] rounded-[5px]'
                  onClick={onSelectMax}
                >
                  Max
                </Button>
              )}
              <span className='text-lg font-medium text-white/50'>
                Balance :
                {selectedToken
                  ? truncateToFourDecimals(selectedToken?.amount)
                  : 0}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ExchangeItem;
