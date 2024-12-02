import { cn, maskWalletAddress } from '@/lib/utils';
import { setWalletWidgetOpen } from '@/redux/slices/global.slice';
import React from 'react';
import AvatarWithInitials from './avatar-with-initials';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useAppDispatch } from '@/redux/redux-provider';

const UserInfo = ({ className }: { className?: string }) => {
  const { user, isAuthenticated } = useDynamicContext();
  const { primaryWallet } = useDynamicContext();

  const dispatch = useAppDispatch();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex items-center gap-x-1 lg:gap-3 justify-end px-[10px] border border-border rounded-[5px] lg:w-[197px] h-[45px] lg:h-[50px]',
        className
      )}
    >
      <span className='text-[8px] lg:text-sm font-bold max-w-[125px] truncate'>
        {maskWalletAddress((primaryWallet?.address as string) ?? '')}
      </span>

      <button
        onClick={() => {
          dispatch(setWalletWidgetOpen(true));
        }}
      >
        {user?.firstName && user?.lastName && (
          <AvatarWithInitials name={`${user?.firstName} ${user?.lastName}`} />
        )}
      </button>
    </div>
  );
};

export default UserInfo;
