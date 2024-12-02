import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CircleCheck } from 'lucide-react';
import {
  getNetwork,
  useDynamicContext,
  useSwitchNetwork,
} from '@dynamic-labs/sdk-react-core';
import { NetworkItemProps } from '@/types/global';
import { cn } from '@/lib/utils';
import { toast } from 'react-toastify';

const NetworkListItem: React.FC<NetworkItemProps> = ({
  network,
  className,
  disabled = false,
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState<
    number | string | null
  >(null);

  const { primaryWallet } = useDynamicContext();
  const switchNetwork = useSwitchNetwork();

  useEffect(() => {
    const fetchCurrentNetwork = async () => {
      if (primaryWallet) {
        const walletConnector = primaryWallet.connector;
        try {
          const network = await getNetwork(walletConnector);
          // Handle the network data here
          if (network) {
            setSelectedNetwork(network);
          }
        } catch {
          toast.error('failed to fetch current network');
        }
      }
    };

    fetchCurrentNetwork();
  }, [primaryWallet]);

  const handleNetworkSwitch = async () => {
    try {
      if (primaryWallet) {
        await switchNetwork({
          wallet: primaryWallet,
          network: network.chainId,
        });
      }
    } catch {
      toast.error('failed to switch network');
    }
  };

  return (
    <button
      className={cn(
        'flex w-full items-center justify-between h-[53px] rounded-[5px] focus:outline-none p-2 px-3 cursor-pointer hover:bg-blue-100/10',
        className
      )}
      disabled={disabled}
      key={network.chainId}
      onClick={handleNetworkSwitch}
      type='button'
    >
      <div className='flex items-center space-x-3'>
        <Image
          alt={network.name}
          className='w-[30px] h-[30px]'
          height={30}
          src={network.logoUrl}
          width={30}
        />
        <span className='text-sm text-normal'>{network.name}</span>
      </div>

      {network.chainId === selectedNetwork && (
        <div className='flex items-center'>
          <CircleCheck className='stroke-foreground w-[18px] h-[18px] mr-[10px]' />
        </div>
      )}
    </button>
  );
};

export default NetworkListItem;
