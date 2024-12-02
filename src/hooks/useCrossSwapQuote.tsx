import { useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { ooCrossChainSwap } from "@/actions/exchange";
export const useCrossSwapQuote = (
  plat: string,
  route: any,
  primaryWallet: string | null | undefined
) => {
  const [quoteData, setQuoteData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchSwapQuote = useCallback(async () => {
    setError(null); // Reset error before fetching
    if (!plat || !route || !primaryWallet) {
      setQuoteData(null);
      return;
    }

    setIsLoading(true);
    try {
      const quote = await ooCrossChainSwap({
        plat,
        account: primaryWallet as `0x${string}`,
        route,
      });

      setQuoteData(quote);
    } catch (err) {
      setError(
        err instanceof Error
          ? new Error(`Error fetching quote: ${err.message}`)
          : new Error("Unexpected error fetching the quote.")
      );
      setQuoteData(null);
    } finally {
      setIsLoading(false);
    }
  }, [plat, route, primaryWallet]);

  const query = useQuery({
    queryKey: ["crossSwapQuote", plat, route, primaryWallet],
    queryFn: fetchSwapQuote,
    enabled: false, // Ensure it runs only when conditions are met
    refetchOnWindowFocus: false,
  });

  return {
    ...query, // Includes isLoading, isError, data, and other states
    quoteData,
    isLoading,
    error,
  };
};
