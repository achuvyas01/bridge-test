'use client';
import MainTitle from '@/components/atoms/main-title';
import React from 'react';
import ExchangeWidget from './exchange-widget';
import ExhchangeSuccessModal from '@/components/modals/exchange-success-modal';

const IndexClients = () => {
  return (
    <div className='px-4 pt-4 pb-[30vh] lg:px-[30px]'>
      <MainTitle caption='Swap and Bridge Tokens' title='Exchange' />
      <ExchangeWidget />
      <ExhchangeSuccessModal />
    </div>
  );
};

export default IndexClients;
