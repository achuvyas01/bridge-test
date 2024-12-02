'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/redux-provider';
import { setNetworkWidgetOpen } from '@/redux/slices/global.slice';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import NetworkList from './network-list';

const NetworkDrawer = () => {
  const { user } = useDynamicContext();
  const { isNetworkWidgetOpen } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  if (isNetworkWidgetOpen === false || window.innerWidth > 768 || !user) {
    return null;
  }
  return (
    <>
      <div
        className='fixed inset-0 bg-black/30 backdrop-blur-[10px] z-10'
        onClick={() => dispatch(setNetworkWidgetOpen(false))}
      />
      <AnimatePresence>
        <motion.div
          animate={{ bottom: 0 }}
          className='fixed w-full h-[620px] min-h-[430px] max-h-[90svh] overflow-y-auto bg-secondary rounded-t-[20px] border border-border   z-50'
          exit={{ bottom: '-430px' }}
          initial={{ bottom: '-430px' }}
        >
          <NetworkList />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default NetworkDrawer;
