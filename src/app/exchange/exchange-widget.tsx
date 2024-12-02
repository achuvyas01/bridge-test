import { SendTxnIcon } from "@/lib/index-icons";
import { Settings } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ExchangeItem from "./exchange-item";
import { Button } from "@/components/ui/button";
import ExchangeSwapModal from "@/components/modals/exchange-swap.modal";
import ExchangeAdvanceSettingModal from "@/components/modals/exchange-advance-setting.modal";
import ExchangeRoutesModal from "@/components/modals/exchange-routes.modal";
import { TokenResponse } from "@/actions/common";
import {
  setExchangeAmount,
  setExchangeFrom,
  setExchangeOutAmount,
  setExchangeTo,
  setSelectedModalType,
} from "@/redux/slices/send.slice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-provider";
import SelectTokenModal from "@/components/modals/select-token.modal";
import {
  setExchangeSuccessModalOpen,
  setSelectTokenOpen,
} from "@/redux/slices/global.slice";
import { getNetwork, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  checkIfSameChain,
  isNative,
  toBigIntAmount,
  truncateToFourDecimals,
} from "@/lib/utils";
import { fourDecimalPointRegex } from "@/lib/constants";
import { toast } from "react-toastify";
import { getNetworks, GetNetworksResponse } from "@/actions/network";
import ContainerWrapper from "@/components/atoms/container-wrapper";
import { getTokens, getTokensByChain } from "@/actions/token";
import { useDebounceValue } from "usehooks-ts";
import { useFetchQuote } from "@/hooks/useQuoteData";
import FadeLoader from "react-spinners/FadeLoader";
import { useFetchSwapQuote } from "@/hooks/useSwapQuoteData";
import { useCrossSwapQuote } from "@/hooks/useCrossSwapQuote";
import { useSwapApprove } from "@/hooks/useSwapAction";
import { useExecuteContract } from "@/hooks/useExecuteContract";

// import { createExchangeActivity } from "../actions/exchange";

const ExchangeWidget = () => {
  const [amountInput, setAmountInput] = useState(0);
  const [searchTokenInput, setSearchTokenInput] = useState("");
  const [nestedNetworkMenuOpen, setNestedNetworkMenuOpen] = useState(false);
  const [networks, setNetworks] = useState<GetNetworksResponse | null>();
  const [selectedNetwork, setSelectedNetwork] = useState<
    number | string | null
  >(null);
  const { isSelectTokenOpen } = useAppSelector((state) => state.global);
  const [isTokensLoading, setTokensLoading] = useState<boolean>(false);
  const [tokens, setTokens] = useState<TokenResponse[] | []>([]);
  const [debouncedSearchTokenInput] = useDebounceValue(searchTokenInput, 300);
  const [debouncedAmountInput] = useDebounceValue(amountInput, 300);

  const [triggeredNativeSwap, setTriggeredNativeSwap] = useState(false);
  const [triggeredNativeCrossSwap, setTriggeredNativeCrossSwap] =
    useState(false);
  const [triggeredTheFlow, setTriggeredTheFlow] = useState(false);
  const [triggeredCrossSwapFlow, setTriggeredCrossSwapFlow] = useState(false);
  const [hasApprovalStarted, setHasApprovalStarted] = useState(false);
  const [hasWriteStarted, setHasWriteStarted] = useState(false);

  // const [processLoading, setProcessLoading] = useState(false);

  const [hasTransactionRecorded, setHasTransactionRecorded] = useState(false);

  const color = "#ffffff";

  //review modal state
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);

  const closeReviewModal = () => {
    setReviewModalOpen(false);
  };

  const { selectedModalType, exchangeFrom, exchangeTo, slippage } =
    useAppSelector((state) => state.send);

  const { primaryWallet } = useDynamicContext();

  // const networkMenuRef = useRef<HTMLDivElement | null>(null);

  function toggleNestedNetworkMenu() {
    setNestedNetworkMenuOpen(!nestedNetworkMenuOpen);
  }

  function closeTokensModal() {
    dispatch(setSelectTokenOpen(false));
  }

  const onNetworkClick = (chainId: string | number) => {
    setSelectedNetwork(chainId);
    setNestedNetworkMenuOpen(false);
  };

  function selectToken(token: TokenResponse) {
    if (selectedModalType === "from") {
      setSearchTokenInput("");
      dispatch(setExchangeFrom(token));
      setAmountInput(0);
      setNestedNetworkMenuOpen(false);
      dispatch(setSelectTokenOpen(false));
    } else if (selectedModalType === "to") {
      setSearchTokenInput("");
      dispatch(setExchangeTo(token));
      dispatch(setSelectTokenOpen(false));
      setNestedNetworkMenuOpen(false);
    }
  }

  const fetchTokens = useCallback(async () => {
    // Only fetch if modal is open
    if (!isSelectTokenOpen) return;

    setTokensLoading(true);
    try {
      let response;
      if (selectedModalType === "to") {
        response = await getTokensByChain({
          chainId: selectedNetwork as string,
          searchParam: debouncedSearchTokenInput,
        });
      } else {
        response = await getTokens({
          searchParam: debouncedSearchTokenInput,
          address: primaryWallet?.address,
          chainId: selectedNetwork as number,
        });
      }

      console.log("response", response);
      setTokens(response);
    } catch {
      toast.error("Failed to fetch tokens.");
    } finally {
      setTokensLoading(false);
    }
  }, [
    primaryWallet?.address,
    selectedNetwork,
    selectedModalType,
    debouncedSearchTokenInput,
    isSelectTokenOpen,
  ]);

  const fetchNetworks = useCallback(async () => {
    const data = await getNetworks();
    if (!data) {
      throw new Error("Failed to fetch tokens");
    }
    setNetworks(data);
  }, []);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const {
    refetch: fetchQuote,
    routesData,
    outTokenAmount,
    isLoading,
    // error,
    quoteData: firstQuote,
  } = useFetchQuote(
    amountInput,
    exchangeFrom,
    exchangeTo,
    slippage,
    primaryWallet?.address
  );

  // useEffect(() => {
  //   // console.log(routesData, 'routesData');
  //   // console.log('firstQuote', firstQuote);
  //   if (routesData) {
  //     // console.log('routesData', routesData);
  //   }
  // }, [routesData, firstQuote]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setAmountInput(0);
      return;
    }

    // Check if the value matches the pattern
    if (fourDecimalPointRegex.test(value)) {
      const parsedValue = parseFloat(value);
      // Prevent setting NaN or invalid numbers
      setAmountInput(parsedValue);
      debouncedFetchQuote(parsedValue);
    }
  };

  const handleOnSelectMax = () => {
    if (exchangeFrom) {
      setAmountInput(truncateToFourDecimals(exchangeFrom.amount));
    } else {
      toast.warn("Select a token to set amount");
    }
  };

  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^a-zA-Z0-9 ]/g, "");
    setSearchTokenInput(filteredValue);
  }

  function openExchangeFromModal() {
    dispatch(setSelectedModalType("from"));
    dispatch(setSelectTokenOpen(true));
  }
  function openExchangeToModal() {
    dispatch(setSelectedModalType("to"));
    dispatch(setSelectTokenOpen(true));
  }

  const dispatch = useAppDispatch();

  const selectTokenFrom = (token: TokenResponse) => {
    setTokensLoading(true);
    setTokens([]);
    dispatch(setSelectedModalType("from"));
    dispatch(setExchangeFrom(token));
  };

  const selectTokenTo = (token: TokenResponse) => {
    setTokensLoading(true);
    setTokens([]);
    setTokens([]);
    dispatch(setSelectedModalType("to"));
    dispatch(setExchangeTo(token));
  };

  const onSwapClick = async () => {
    // console.log('onSwapClick');
    setReviewModalOpen(true);
  };

  const {
    isLoading: isSwapQuoteLoading,
    quoteData: swapQuoteData,
    refetch: refetchSwapQuote,
    // isSuccess: swapQuoteSuccess,
  } = useFetchSwapQuote(
    debouncedAmountInput,
    exchangeFrom,
    exchangeTo,
    slippage,
    primaryWallet?.address
  );

  // useEffect(() => {
  //   if (swapQuoteData) {
  //     console.log('swapQuoteData', swapQuoteData);
  //   }
  // }, [swapQuoteData]);

  const {
    quoteData: crossSwapQuote,
    isLoading: isCrossSwapLoading,
    refetch: refetchCrossSwapQuote,
  } = useCrossSwapQuote(
    routesData?.bridgeRoute?.bridgeInfo.code,
    routesData,
    primaryWallet?.address
  );

  // useEffect(() => {
  //   if (crossSwapQuote) {
  //     console.log('crossSwapQuote', crossSwapQuote);
  //   }
  // }, [crossSwapQuote]);

  const isSameChain =
    exchangeFrom && exchangeTo
      ? checkIfSameChain(exchangeFrom?.chain, exchangeTo?.chain)
      : false;

  const {
    execute: approveToken,
    isSuccess: isApproveSuccess,
    simulateApproval,
    error: approveError,
    isLoading: approveLoading,
    isSimulateLoading: isSimulateLoading,
    isSimulateSuccess,
    simulateError,
    hash: approveHash,
  } = useSwapApprove({
    spender: isSameChain
      ? (swapQuoteData?.to as `0x${string}`)
      : (routesData?.allowanceTarget as `0x${string}`),
    amount: toBigIntAmount(amountInput, exchangeFrom?.decimal),
    tokenAddress: exchangeFrom?.id as `0x${string}`,
    enableSimulation: swapQuoteData ? true : false,
  });

  const executeSwap = async () => {
    const sameChain = checkIfSameChain(
      exchangeFrom?.chain as string,
      exchangeTo?.chain as string
    );

    // console.log('exchangeFrom', isNative(exchangeFrom, 'token'));
    setReviewModalOpen(false);
    try {
      if (isNative(exchangeFrom, "token")) {
        if (sameChain) {
          setTriggeredNativeSwap(true);
          await refetchSwapQuote();
        } else {
          // console.log('triggerd native cross swap');
          setTriggeredNativeCrossSwap(true);
          await refetchCrossSwapQuote();
        }
      } else {
        if (sameChain) {
          setTriggeredTheFlow(true);
          await refetchSwapQuote();
        } else {
          setTriggeredCrossSwapFlow(true);
          await refetchCrossSwapQuote();
        }
      }
    } catch (error) {
      // console.error('Error during swap sequence:', error);
    }
  };

  const debouncedFetchQuote = useCallback(
    (value: number) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        // console.log('Calling API with value:', value);
        fetchQuote();
      }, 300);
    },
    [fetchQuote]
  );

  const {
    execute: executeContract,
    isLoading: executeLoading,
    isSuccess: executeSuccess,
    error: executeError,
    hash: executeHash,
  } = useExecuteContract({
    to: isSameChain
      ? (swapQuoteData?.to as `0x${string}`)
      : (crossSwapQuote?.to as `0x${string}`),
    data: isSameChain
      ? (swapQuoteData?.data as string)
      : (crossSwapQuote?.data as string),
    value: isSameChain
      ? (swapQuoteData?.value as string)
      : (crossSwapQuote?.value as string),
    isNativeTokenIn: exchangeFrom ? isNative(exchangeFrom, "token") : false,
  });

  // useEffect(() => {
  //   console.log('executeSuccess', executeSuccess);
  //   console.log('executeLoading', executeLoading);
  //   if (executeSuccess && !executeLoading) {
  //     console.log('executeSuccess', executeSuccess);
  //     console.log('executeHash', executeHash);
  //   } else if (executeError) {
  //     console.log('executeError', executeError);
  //   }
  // }, [executeSuccess, executeLoading, executeError, executeHash]);

  useEffect(() => {
    if (swapQuoteData && triggeredNativeSwap && !isSwapQuoteLoading) {
      setTriggeredNativeSwap(false);
      setHasTransactionRecorded(false);
      executeContract();
    }
  }, [swapQuoteData, triggeredNativeSwap, executeContract, isSwapQuoteLoading]);

  useEffect(() => {
    // console.log(
    //   crossSwapQuote,
    //   triggeredNativeCrossSwap,
    //   isCrossSwapLoading,
    //   'status here'
    // );
    if (crossSwapQuote && triggeredNativeCrossSwap && !isCrossSwapLoading) {
      setTriggeredNativeCrossSwap(false);
      setHasTransactionRecorded(false);
      executeContract();
    }
  }, [
    crossSwapQuote,
    triggeredNativeCrossSwap,
    executeContract,
    isCrossSwapLoading,
  ]);

  useEffect(() => {
    if (swapQuoteData && triggeredTheFlow && !isSwapQuoteLoading) {
      setHasApprovalStarted(false);
      setTriggeredTheFlow(false);
      simulateApproval();
    }
  }, [swapQuoteData, simulateApproval, triggeredTheFlow, isSwapQuoteLoading]);

  useEffect(() => {
    if (crossSwapQuote && triggeredCrossSwapFlow && !isCrossSwapLoading) {
      setHasApprovalStarted(false);
      setTriggeredTheFlow(false);
      simulateApproval();
    }
  }, [
    crossSwapQuote,
    simulateApproval,
    triggeredCrossSwapFlow,
    isCrossSwapLoading,
  ]);

  useEffect(() => {
    if (isSimulateSuccess && !isSimulateLoading && !hasApprovalStarted) {
      setHasApprovalStarted(true);
      approveToken();
    } else if (simulateError) {
      // console.log('approveToken error', simulateError);
    }
  }, [
    isSimulateLoading,
    simulateError,
    isSimulateSuccess,
    approveToken,
    hasApprovalStarted,
  ]);

  // Trigger executeContract when approval is confirmed
  useEffect(() => {
    if (isApproveSuccess && !approveLoading && !hasWriteStarted) {
      setHasTransactionRecorded(false);
      executeContract();
      setHasWriteStarted(true);
    } else if (approveError && !approveLoading) {
      // console.log('approveError', approveError);
    }
  }, [
    isApproveSuccess,
    executeContract,
    approveLoading,
    approveError,
    hasWriteStarted,
    approveHash,
  ]);

  useEffect(() => {
    const fetchCurrentNetwork = async () => {
      if (primaryWallet) {
        const walletConnector = primaryWallet.connector;
        try {
          const network = await getNetwork(walletConnector);
          if (network) {
            setSelectedNetwork(network);
          }
        } catch {
          toast.error("failed to fetch current network");
        }
      }
    };

    fetchNetworks();
    fetchCurrentNetwork();
  }, [primaryWallet, fetchNetworks]);

  useEffect(() => {
    if (isSelectTokenOpen && primaryWallet?.address && selectedNetwork) {
      fetchTokens();
    }
  }, [isSelectTokenOpen, primaryWallet?.address, selectedNetwork, fetchTokens]);

  const confirmSendToken = useCallback(async () => {
    if (hasTransactionRecorded) {
      return;
    }
    setHasTransactionRecorded(true);
    // const res = await createExchangeActivity({
    //   slippage: parseFloat(slippage),
    //   txHash: executeHash as string,
    //   from: {
    //     name: exchangeFrom?.name ?? "",
    //     symbol: exchangeFrom?.symbol ?? "",
    //     amount: {
    //       value: amountInput ?? 0,
    //       amountInUsd: amountInput * (exchangeFrom?.price ?? 0),
    //     },
    //     chainId: exchangeFrom?.chain ?? "",
    //     address: exchangeFrom?.id ?? "",
    //   },
    //   to: {
    //     name: exchangeTo?.name ?? "",
    //     symbol: exchangeTo?.symbol ?? "",
    //     amount: {
    //       value: outTokenAmount,
    //       amountInUsd: outTokenAmount * (exchangeTo?.price ?? 0),
    //     },
    //     chainId: exchangeTo?.chain ?? "",
    //     address: exchangeTo?.id ?? "",
    //   },
    // });

    // console.log('res', res);

    toast.success("Transaction Successful");

    dispatch(setExchangeAmount(amountInput));
    dispatch(setExchangeOutAmount(outTokenAmount));
    dispatch(setExchangeSuccessModalOpen(true));
  }, [
    executeHash,
    exchangeFrom,
    exchangeTo,
    amountInput,
    outTokenAmount,
    slippage,
    dispatch,
    hasTransactionRecorded,
  ]);

  useEffect(() => {
    if (executeSuccess && !executeLoading && executeHash) {
      confirmSendToken();
    }
  }, [executeSuccess, executeLoading, executeHash, confirmSendToken]);

  return (
    <>
      <ContainerWrapper className="mt-5">
        <div className="flex justify-between items-center">
          <span className="text-base lg:text-lg font-bold ml-2">Exchange</span>
          <div className="flex gap-x-3">
            <ExchangeAdvanceSettingModal>
              <Settings className="w-[25px] lg:w-[30px] h-auto text-accent hover:text-white/30 cursor-pointer" />
            </ExchangeAdvanceSettingModal>
            <ExchangeRoutesModal>
              <SendTxnIcon className="w-[20px] lg:w-[25px] h-auto text-accent hover:text-white/30 cursor-pointer" />
            </ExchangeRoutesModal>
          </div>
        </div>

        <div className="exchangeContent">
          <ExchangeItem
            amountInput={amountInput}
            exchangeType="From"
            handleAmountChange={handleAmountChange}
            onSelectMax={handleOnSelectMax}
            openTokenModal={openExchangeFromModal}
            selectToken={selectTokenFrom}
            selectedToken={exchangeFrom}
          />
          <ExchangeItem
            amountInput={outTokenAmount}
            disabled={true}
            exchangeType="To"
            isAmountLoading={isLoading}
            openTokenModal={openExchangeToModal}
            selectToken={selectTokenTo}
            selectedToken={exchangeTo}
          />
        </div>
        <div className="flex items-center justify-between mt-3 px-2">
          <span className="text-sm font-medium opacity-50">Slippage</span>
          <span className="text-sm h-[34px] font-medium flex-center text-white/40 bg-accent rounded-[20px] px-5">
            {slippage} %
          </span>
        </div>
      </ContainerWrapper>

      <SelectTokenModal
        closeTokensModal={closeTokensModal}
        handleSearchInput={handleSearchInput}
        isLoading={isTokensLoading}
        isNetworkMenuOpen={nestedNetworkMenuOpen}
        isOpen={isSelectTokenOpen}
        networks={networks}
        onNetworkClick={onNetworkClick}
        searchInput={searchTokenInput}
        selectToken={selectToken}
        selectedNetwork={selectedNetwork}
        showAllTokens={selectedModalType === "to" ? true : false}
        switchWalletNetworkAlso={selectedModalType === "to" ? true : false}
        toggleNetworkMenu={toggleNestedNetworkMenu}
        tokens={tokens}
      />
      <Button
        className="text-base lg:text-xl text-white font-medium block
        mx-auto max-w-[646px] w-full h-[52px] lg:h-[67px] rounded-[10px] mt-5"
        onClick={onSwapClick}
      >
        {!isLoading ? (
          "Swap"
        ) : (
          <div className="flex items-center justify-center lg:mt-4 mt-1">
            <FadeLoader
              color={color}
              height={window.innerWidth < 640 ? 5 : 10} // Smaller height for small screens
              margin={window.innerWidth < 640 ? -8 : -6}
              radius={0.5}
              width={window.innerWidth < 640 ? 2 : 3} // Smaller width for small screens
            />
          </div>
        )}
      </Button>
      {exchangeFrom && exchangeTo && amountInput > 0 && outTokenAmount > 0 && (
        <ExchangeSwapModal
          exchangeAmount={amountInput}
          exchangeFrom={exchangeFrom}
          exchangeOutAmount={outTokenAmount}
          exchangeTo={exchangeTo}
          executeSwap={executeSwap}
          isOpen={isReviewModalOpen}
          onClose={closeReviewModal}
          slippage={slippage}
        />
      )}
    </>
  );
};

export default ExchangeWidget;
