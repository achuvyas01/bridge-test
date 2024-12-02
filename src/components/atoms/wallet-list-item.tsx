'use client';
import { cn, maskWalletAddress } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import { EllipsisVertical, Link2Off, WalletMinimal } from 'lucide-react';
import WalletListMenu from '../wallet-dropdown/wallet-list-menu';
import { WalletItemProps } from '@/types/global';
import Image from 'next/image';
import { Tooltip } from '../ui/tooltip';
import {
  useDynamicContext,
  useSwitchWallet,
} from '@dynamic-labs/sdk-react-core';
import { toast } from 'react-toastify';

const WalletListItem: React.FC<WalletItemProps> = ({
  address,
  walletInfo,
  isPrimary = false,
  type = 'wallet',
  disabled,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { handleUnlinkWallet } = useDynamicContext();
  const switchWallet = useSwitchWallet();

  // Handle clicks outside the component to close the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div
      className={cn(
        'flex  shadow-lg rounded-lg',
        'w-full h-[50px] max-w-full',
        'border border-border items-center justify-between px-[10px] rounded-[4px]',
        isPrimary ? 'bg-muted' : 'bg-secondary-background'
      )}
      ref={ref}
    >
      <div className='flex items-center '>
        <div className='relative mr-[12px]'>
          <Image
            alt='bot'
            className='w-[30px] h-[30px]'
            height={30}
            src={
              walletInfo && walletInfo?.key === 'rabby'
                ? '/img/rabby.png'
                : walletInfo && walletInfo?.key === 'metamask'
                  ? '/img/metamask.png'
                  : '/temp/ethereum.png'
            }
            width={30}
          />
        </div>
        <span className='text-sm font-bold max-w-[125px]'>
          {address && maskWalletAddress(address)}
        </span>
      </div>

      <div className='relative'>
        {isPrimary ? (
          <span className='text-xs text-muted-foreground font-light max-w-[125px]'>
            Primary
          </span>
        ) : type === 'chat' ? (
          <div className='flex space-x-6'>
            <Tooltip content='Select Wallet'>
              <button
                disabled={disabled}
                onClick={async () => {
                  await switchWallet(walletInfo?.id);
                  toast.success(
                    `Switched primary wallet to ${walletInfo.connector.name}`
                  );
                }}
              >
                <WalletMinimal
                  className='stroke-muted-foreground w-[20px] h-[20px]'
                  key='wallet-icon'
                />
              </button>
            </Tooltip>

            <Tooltip content='Unlink Wallet'>
              <button
                disabled={disabled}
                onClick={async () => {
                  await handleUnlinkWallet(walletInfo?.id);
                  toast.success(
                    `Successfully unlinked ${walletInfo.connector.name} wallet`
                  );
                }}
              >
                <Link2Off
                  className='stroke-muted-foreground w-[20px] h-[20px]'
                  key='link-icon'
                />
              </button>
            </Tooltip>
          </div>
        ) : (
          <button
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <EllipsisVertical className='stroke-muted-foreground w-[20px] h-[20px]' />
          </button>
        )}

        {showMenu && (
          <div className='absolute -bottom-[60px] right-5 mt-2'>
            <WalletListMenu
              disabled={disabled}
              hideMenu={() => {
                setShowMenu(false);
              }}
              walletInfo={walletInfo}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletListItem;
