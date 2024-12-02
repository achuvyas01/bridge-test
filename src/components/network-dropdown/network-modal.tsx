'use client';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useAppDispatch, useAppSelector } from '@/redux/redux-provider';
import { setNetworkWidgetOpen } from '@/redux/slices/global.slice';
import NetworkList from './network-list';
import {
  DropDownDialog,
  DropDownDialogContent,
  DropDownDialogOverlay,
} from '../ui/dropdown-dialog';

const NetworkModal = () => {
  const { user } = useDynamicContext();
  const { isNetworkWidgetOpen } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  if (isNetworkWidgetOpen === false || window.innerWidth < 768 || !user) {
    return null;
  }

  return (
    <DropDownDialog
      onOpenChange={() => {
        dispatch(setNetworkWidgetOpen(false));
      }}
      open={isNetworkWidgetOpen}
    >
      {/* Dialog Overlay */}
      <DropDownDialogOverlay className='hidden' />

      {/* Dialog Content */}
      <DropDownDialogContent
        className='fixed right-0 z-50 border border-border '
        style={{
          top: '65px',
          right: '220px',
          width: '230px',
          height: '480px',
          padding: 0,
        }}
      >
        <NetworkList />
      </DropDownDialogContent>
    </DropDownDialog>
  );
};

export default NetworkModal;
