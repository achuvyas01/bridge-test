import { useState, useCallback, useEffect } from "react";
import {
  useWaitForTransactionReceipt,
  usePrepareTransactionRequest,
  useSendTransaction,
  useAccount,
} from "wagmi";

//TODO - add gas for swap

export function useExecuteContract({
  to,
  data,
  value,
}: // isNativeTokenIn,
{
  to: `0x${string}`;
  data: any;
  // gasPrice: any;
  // gasLimit: any;
  value: any;
  isNativeTokenIn?: boolean;
}) {
  const { address } = useAccount();
  const [localError, setLocalError] = useState<Error | null>(null);

  // console.log(address, 'address');

  // useEffect(() => {
  //   console.table({
  //     account: address,
  //     to: to,
  //     data: data,
  //     value: value,
  //   });
  // }, [address, to, data, value]);

  const {
    refetch: prepareTransaction,
    error: prepareError,
    status: prepareStatus,
  } = usePrepareTransactionRequest({
    account: address,
    to,
    data,
    value,

    // ...(isNativeTokenIn && { value }),
  });

  // useEffect(() => {
  //   // console.log("prepareError", prepareError);
  // }, [prepareError]);

  const {
    data: dataHash,
    isSuccess: isSendSuccess,
    sendTransactionAsync,
    error: sendError,
    isPending: isSendPending,
  } = useSendTransaction();

  const { status: waitForTransactionStatus, error: transactionError } =
    useWaitForTransactionReceipt({
      confirmations: 2,
      hash: dataHash,
    });

  const isLoading =
    prepareStatus === "pending" ||
    isSendPending ||
    waitForTransactionStatus === "pending";

  // Combined error state
  const error = prepareError || sendError || transactionError || localError;

  const isSuccess = isSendSuccess || waitForTransactionStatus === "success";

  const execute = useCallback(async () => {
    try {
      const { data: preparedData } = await prepareTransaction();

      if (preparedData) {
        await sendTransactionAsync({
          account: preparedData.account,
          to: preparedData.to as `0x${string}`,
          data: preparedData.data,
          gasPrice: BigInt(Number(preparedData.gasPrice ?? 0)),
          value: BigInt(Number(preparedData.value ?? 0)),
          gas: BigInt(Number(preparedData.gas ?? 0)),
          nonce: preparedData.nonce,
        });
      } else {
        throw new Error("Failed to prepare the transaction.");
      }
    } catch (err) {
      setLocalError(err as Error);
    }
  }, [prepareTransaction, sendTransactionAsync]);

  return {
    isSuccess,
    isLoading,
    error,
    hash: dataHash,
    execute,
    prepareTransaction,
    prepareError,
  };
}
