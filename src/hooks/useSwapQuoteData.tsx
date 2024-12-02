import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { getGasPrice, ooSwap } from "@/actions/exchange";
import { TokenResponse } from "@/actions/common";
import { wrappedTokenData } from "@/helpers/chain";
import { isNative } from "@/lib/utils";

export const useFetchSwapQuote = (
  debouncedAmountInput: number,
  exchangeFrom: TokenResponse | null,
  exchangeTo: TokenResponse | null,
  slippage: string,
  primaryWallet: string | null | undefined
) => {
  const [quoteData, setQuoteData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchSwapQuote = useCallback(async () => {
    setError(null);
    if (!debouncedAmountInput || !exchangeFrom || !exchangeTo) {
      setQuoteData(null);
      return;
    }

    setIsLoading(true);

    try {
      const { debankChainId, nativeAddress } = wrappedTokenData({
        chain:
          exchangeFrom.chain === "matic" ? "polygon-pos" : exchangeFrom?.chain,
      });

      // Fetch gas price
      // console.log("fetching gas price");
      const gasPriceData = await getGasPrice(exchangeFrom?.chain);
      if (!gasPriceData) {
        throw new Error("Failed to fetch gas price data.");
      }

      // Determine token addresses
      const inTokenAddress = isNative(exchangeFrom, "token")
        ? nativeAddress
        : exchangeFrom.id;
      const outTokenAddress = isNative(exchangeTo, "token")
        ? nativeAddress
        : exchangeTo.id;

      // Fetch the quote
      const quote = await ooSwap({
        chain: debankChainId,
        inTokenAddress,
        outTokenAddress,
        amount: debouncedAmountInput.toString(),
        slippage,
        gasPrice: gasPriceData?.fast,
        account: primaryWallet as `0x${string}`,
      });

      setQuoteData(quote);
    } catch (err) {
      setError(err as Error);
      setQuoteData(null);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedAmountInput, exchangeFrom, exchangeTo, slippage, primaryWallet]);

  const query = useQuery({
    queryKey: [
      "swapQuote",
      debouncedAmountInput,
      exchangeFrom?.id,
      exchangeTo?.id,
      slippage,
      primaryWallet,
    ],
    queryFn: fetchSwapQuote,
    enabled: false,
  });

  return {
    ...query, // Includes isLoading, isError, data, and other states
    quoteData,
    isLoading,
    error,
  };
};
