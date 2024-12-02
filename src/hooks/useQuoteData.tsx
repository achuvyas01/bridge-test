import { TokenResponse } from "@/actions/common";

import { getCrossChainQuote, getGasPrice, getQuote } from "@/actions/exchange";
import { wrappedTokenData } from "@/helpers/chain";
import { checkIfSameChain, truncateToFourDecimals } from "@/lib/utils";
import { useAppDispatch } from "@/redux/redux-provider";
import { setRoutes } from "@/redux/slices/send.slice";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { formatUnits } from "viem";

export const useFetchQuote = (
  debouncedAmountInput: number,
  exchangeFrom: TokenResponse | null,
  exchangeTo: TokenResponse | null,
  slippage: string,
  primaryWallet: string | null | undefined
) => {
  const dispatch = useAppDispatch();

  const [outTokenAmount, setOutTokenAmount] = useState<number>(0);
  const [routesData, setRoutesData] = useState<any>(null);
  const [quoteData, setQuoteData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchQuote = useCallback(async () => {
    setError(null); // Reset error state before fetching
    if (!debouncedAmountInput) {
      setOutTokenAmount(0);
      return;
    }
    if (debouncedAmountInput && exchangeFrom && exchangeTo) {
      setIsLoading(true);

      const isSameChain = checkIfSameChain(
        exchangeFrom?.chain,
        exchangeTo?.chain ?? ""
      );

      try {
        if (isSameChain) {
          const { debankChainId } = wrappedTokenData({
            chain:
              exchangeFrom.chain === "matic"
                ? "polygon-pos"
                : exchangeFrom?.chain,
          });

          const gasPriceData = await getGasPrice(exchangeFrom?.chain);
          const quoteDataRes = await getQuote({
            chain: debankChainId,
            inTokenAddress: exchangeFrom?.id,
            outTokenAddress: exchangeTo?.id,
            amount: debouncedAmountInput.toString(),
            slippage: slippage,
            gasPrice: gasPriceData?.fast,
            account: primaryWallet as `0x${string}`,
          });

          setQuoteData(quoteDataRes);
          setOutTokenAmount(
            truncateToFourDecimals(
              parseFloat(
                formatUnits(
                  quoteDataRes?.outAmount,
                  quoteDataRes?.outToken?.decimals
                )
              )
            )
          );
        } else {
          const formattedAmount = (
            BigInt(debouncedAmountInput) * BigInt(10 ** exchangeFrom?.decimal)
          ).toString();

          const crossChainQuote = await getCrossChainQuote({
            fromChainId: exchangeFrom.chain,
            toChainId: exchangeTo.chain,
            fromSymbol: exchangeFrom.symbol,
            toSymbol: exchangeTo.symbol,
            amount: formattedAmount,
          });

          setQuoteData(crossChainQuote);

          if (crossChainQuote?.routes?.length > 0) {
            const validRoutes = crossChainQuote.routes.filter(Boolean);

            dispatch(setRoutes(validRoutes));
            if (validRoutes.length > 0) {
              const validRoute = validRoutes.find(
                (route: any) => route !== null
              );

              setRoutesData(validRoute);

              const amount = validRoute?.bridgeRoute?.outputAmount;
              const decimal = validRoute?.bridgeRoute?.toAsset?.decimals;
              setOutTokenAmount(
                truncateToFourDecimals(
                  parseFloat(
                    (Number(amount) / Math.pow(10, decimal)).toFixed(decimal)
                  )
                )
              );

              // dispatch(setRoutes(validRoutes));
            } else {
              setRoutesData(null);
            }
          } else {
            setRoutesData(null);
          }
        }
      } catch (err) {
        setError(err as Error); // Capture error
        setRoutesData(null);
        setQuoteData(null);
      } finally {
        setIsLoading(false);
      }
    }
  }, [
    debouncedAmountInput,
    exchangeFrom,
    exchangeTo,
    primaryWallet,
    slippage,
    dispatch,
  ]);

  const query = useQuery({
    queryKey: [
      "quote",
      debouncedAmountInput,
      exchangeFrom,
      exchangeTo,
      slippage,
      primaryWallet,
    ],
    queryFn: fetchQuote,
    enabled: false,
    refetchOnWindowFocus: false, // Optional: Prevent auto-refetch on window focus
  });

  return {
    ...query,
    quoteData,
    routesData,
    outTokenAmount,
    isLoading,
    error,
  };
};

// const fetchQuote = useCallback(async () => {
//   if (!debouncedAmountInput) {
//     return setOutTokenAmount(0);
//   }
//   if (debouncedAmountInput && exchangeFrom && exchangeTo) {
//     setIsLoading(true);
//     const isSameChain = checkIfSameChain(
//       exchangeFrom?.chain,
//       exchangeTo?.chain ?? ''
//     );
//     try {
//       if (isSameChain) {
//         const { debankChainId } = wrappedTokenData({
//           chain:
//             exchangeFrom.chain === 'matic'
//               ? 'polygon-pos'
//               : exchangeFrom?.chain,
//         });

//         const gasPriceData = await getGasPrice(debankChainId as string);
//         const quoteData = await getQuote({
//           chain: debankChainId,
//           inTokenAddress: exchangeFrom?.id,
//           outTokenAddress: exchangeTo?.id,
//           amount: debouncedAmountInput.toString(),
//           slippage: slippage,
//           gasPrice: gasPriceData?.fast,
//           account: primaryWallet?.address as `0x${string}`,
//         });

//         setOutTokenAmount(
//           truncateToFourDecimals(
//             parseFloat(
//               formatUnits(quoteData?.outAmount, quoteData?.outToken?.decimals)
//             )
//           )
//         );
//       } else {
//         const formattedAmount = (
//           BigInt(debouncedAmountInput) * BigInt(10 ** exchangeFrom?.decimal)
//         ).toString();

//         const quoteData = await getCrossChainQuote({
//           fromChainId: exchangeFrom.chain,
//           toChainId: exchangeTo.chain,
//           fromSymbol: exchangeFrom.symbol,
//           toSymbol: exchangeTo.symbol,
//           amount: formattedAmount,
//         });

//         if (quoteData?.routes?.length > 0) {
//           const validRoutes = quoteData.routes.filter(Boolean);

//           if (validRoutes.length > 0) {
//             dispatch(setRoutes(validRoutes));
//           } else {
//             return null;
//           }
//         } else {
//           return null;
//         }
//       }
//     } catch {
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   }
// }, [exchangeFrom, exchangeTo, primaryWallet, slippage, debouncedAmountInput]);
