import React from "react";
import { ExchangeItemType, ExchangeReviewModalProps } from "@/types/global";
import { truncateToFourDecimals } from "@/lib/utils";
import { TokenResponse } from "@/actions/common";
import Image from "next/image";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

type BridgetContentProps = Omit<ExchangeReviewModalProps, "isOpen" | "onClose">;

const ExchangeSwapModal: React.FC<ExchangeReviewModalProps> = ({
  isOpen = false,
  onClose,
  ...props
}) => {
  // const { isExchangeReviewOpen } = useAppSelector((state) => state.global);
  // const dispatch = useAppDispatch();

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      {/*       <DialogTrigger asChild>{children}</DialogTrigger> */}
      <DialogContent className="w-[calc(100%-16px)] overflow-auto scrollbar mx-auto lg:w-full max-w-[646px] max-h-[90svh]">
        <DialogTitle className="text-center">Review Swap</DialogTitle>
        <BridgetContent {...props} />
      </DialogContent>
    </Dialog>
  );
};

const BridgetContent: React.FC<BridgetContentProps> = ({
  exchangeFrom,
  exchangeTo,
  exchangeAmount,
  exchangeOutAmount,
  slippage,
  executeSwap,
}) => {
  //   const color = '#ffffff';
  //   const [hasShownError, setHasShownError] = useState(false);

  //   const {
  //     exchangeFrom,
  //     exchangeTo,
  //     exchangeAmount,
  //     exchangeOutAmount,
  //     selectedRoute,
  //     slippage,
  //   } = useAppSelector((state) => state.send);

  //   const { isSuccess, error, execute, isLoading, hash } = useSwapOrBridge({
  //     tokenIn: exchangeFrom?.id as `0x${string}`,
  //     tokenOut: exchangeTo?.id as `0x${string}`,
  //     amount: exchangeAmount ? exchangeAmount.toString() : '0',
  //     isNativeTokenIn: exchangeFrom ? isNative(exchangeFrom, 'token') : false,
  //     chainIn: exchangeFrom ? exchangeFrom?.chain : '',
  //     plat: selectedRoute?.bridgeRoute?.bridgeInfo?.code,
  //     route: selectedRoute,
  //     chainOut: exchangeTo ? exchangeTo?.chain : '',
  //     fromDecimal: exchangeFrom?.decimal?.toString() ?? '0',
  //   });

  //   const dispatch = useAppDispatch();

  //   const confirmSendToken = useCallback(async () => {
  //     if (
  //       !isLoading &&
  //       isSuccess &&
  //       exchangeFrom &&
  //       exchangeTo &&
  //       exchangeAmount &&
  //       exchangeOutAmount
  //     ) {
  //       await createExchangeActivity({
  //         slippage: parseFloat(slippage),
  //         txHash: hash as string,
  //         from: {
  //           name: exchangeFrom?.name ?? '',
  //           symbol: exchangeFrom?.symbol ?? '',
  //           amount: {
  //             value: exchangeAmount ?? 0,
  //             amountInUsd: exchangeAmount * exchangeFrom?.price,
  //           },
  //           chainId: exchangeFrom?.chain,
  //           address: exchangeFrom?.id,
  //         },
  //         to: {
  //           name: exchangeTo?.name,
  //           symbol: exchangeTo?.symbol,
  //           amount: {
  //             value: exchangeOutAmount,
  //             amountInUsd: exchangeOutAmount * exchangeTo?.price,
  //           },
  //           chainId: exchangeTo?.chain,
  //           address: exchangeTo?.id,
  //         },
  //       });

  //       toast.success('Transaction Successful');

  //       dispatch(setExchangeReviewOpen(false));
  //       dispatch(setExchangeSuccessModalOpen(true));
  //     }
  //   }, [
  //     isSuccess,
  //     isLoading,
  //     dispatch,
  //     exchangeAmount,
  //     exchangeTo,
  //     hash,

  //     exchangeFrom,
  //     slippage,
  //     exchangeOutAmount,
  //   ]);

  //   useEffect(() => {
  //     if (error && !isLoading && !hasShownError) {
  //       toast.error(`Something went wrong`);
  //       setHasShownError(true);
  //     }
  //   }, [error, isLoading, hasShownError]);

  //   useEffect(() => {
  //     if (!isLoading && isSuccess) {
  //       confirmSendToken();
  //     }
  //   }, [isLoading, isSuccess, confirmSendToken]);

  return (
    <div>
      <div>
        <SwapItem
          exchangeItem={exchangeFrom}
          exchangeType="From"
          inAmount={exchangeAmount}
          outAmount={exchangeOutAmount}
        />
        <div className="w-full border separator max-w-[587px] my-[20px] mb-4 shrink-0" />
        <SwapItem
          exchangeItem={exchangeTo as TokenResponse}
          exchangeType="To"
          inAmount={exchangeAmount as number}
          outAmount={exchangeOutAmount as number}
        />
      </div>
      <div className="w-full p-4 mt-5 rounded-[10px] border border-border">
        <div className="flex justify-between text-lg font-medium opacity-50">
          <span>Slippage</span>
          <span>{slippage}%</span>
        </div>

        <div className="flex-center text-lg font-medium opacity-50 p-4 mt-4 bg-accent rounded-[10px]">
          Swapping From {exchangeFrom?.name} to {exchangeTo?.name}
        </div>
      </div>
      <Button
        className="text-base lg:text-xl text-white font-medium block mx-auto max-w-[646px] w-full
      h-[52px] lg:h-[67px] rounded-[10px] mt-4"
        onClick={() => {
          executeSwap();
          // dispatch(setExchangeSuccessModalOpen(true));
        }}
      >
        Confirm Swap
      </Button>
    </div>
  );
};

const SwapItem = ({
  exchangeType,
  exchangeItem,
  inAmount,
  outAmount,
}: {
  exchangeType: ExchangeItemType["exchangeType"];
  exchangeItem: TokenResponse;
  inAmount: number;
  outAmount: number;
}) => {
  return (
    <div>
      <span className="text-lg opacity-50 font-medium">
        {exchangeType === "From" ? "From" : "To"}
      </span>
      <div className="mt-3 flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-5xl font-medium leading-none">
            {exchangeType === "From"
              ? `${inAmount} ${exchangeItem?.symbol}`
              : `${outAmount} ${exchangeItem?.symbol}`}
          </span>
          <span className="text-sm font-medium opacity-50 mt-1 ml-1">
            $
            {exchangeType === "From"
              ? truncateToFourDecimals(
                  parseFloat(((exchangeItem?.price ?? 0) * inAmount).toString())
                )
              : truncateToFourDecimals(
                  parseFloat(
                    ((exchangeItem?.price ?? 0) * outAmount).toString()
                  )
                )}
          </span>
        </div>
        <div className="relative cursor-pointer">
          <div className="relative ">
            <Image
              alt="bot"
              className="bg-white w-[40px] h-[40px] lg:w-[55px] lg:h-[55px] rounded-[30px]"
              height={32}
              src={exchangeItem.logoUrl}
              width={32}
            />
            <Image
              alt="bot"
              className=" w-[18px] lg:w-[25px] h-[18px] lg:h-[25px] absolute -bottom-1 -right-[8px]"
              height={32}
              src={exchangeItem.chainLogoUrl}
              width={32}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeSwapModal;
