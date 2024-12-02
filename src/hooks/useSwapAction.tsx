import { ERC20_ABI } from '@/lib/constants';
import { useState, useCallback } from 'react';
import {
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

export const useSwapApprove = ({
  tokenAddress,
  amount,
  spender,
  // enableSimulation,
}: {
  spender: `0x${string}`;
  amount: bigint | null;
  tokenAddress: `0x${string}`;
  enableSimulation?: boolean;
}) => {
  const [localError, setLocalError] = useState<Error | null>(null);

  const {
    data: simulateData,
    error: simulateError,
    isSuccess: isSimulateSuccess,
    isLoading: isSimulateLoading,
    refetch: simulateApproval,
  } = useSimulateContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'approve',
    args: [spender, amount as bigint],
    query: {
      enabled: false,
    },
  });

  const {
    data: dataHash,
    isSuccess: isWriteSuccess,
    writeContractAsync,
    error: writeError,
    isPending: isWritePending,
  } = useWriteContract({});

  const {
    status: waitForTransactionStatus,
    error: transactionError,
    // isPending: waitingForTransactionReceiptLoading,
  } = useWaitForTransactionReceipt({
    confirmations: 1,
    hash: dataHash, // Ensure the hash comes from writeContractAsync
    query: {
      enabled: isWriteSuccess,
    },
  });

  const isLoading =
    isSimulateLoading ||
    isWritePending ||
    waitForTransactionStatus === 'pending';

  // Derived state: Compute `error` directly
  const error = simulateError || writeError || transactionError || localError;

  const isSuccess =
    isSimulateSuccess ||
    isWriteSuccess ||
    waitForTransactionStatus === 'success';

  const execute = useCallback(async () => {
    if (isSimulateSuccess && !isSimulateLoading && simulateData) {
      try {
        await writeContractAsync(simulateData.request);
      } catch (err) {
        setLocalError(err as Error);
      }
    } else if (!isSimulateSuccess) {
      setLocalError(new Error('Simulation failed. Cannot proceed.'));
    }
  }, [isSimulateSuccess, isSimulateLoading, simulateData, writeContractAsync]);

  return {
    isSuccess,
    isLoading,
    error,
    hash: dataHash,
    execute,
    simulateApproval,
    isSimulateLoading,
    isSimulateSuccess,
    simulateError,
  };
};
