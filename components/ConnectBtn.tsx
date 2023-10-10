'use client'; // This is a client component 👈🏽

import React, { FC } from 'react';
import dynamic from 'next/dynamic';
const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);
const ConnectBtn: FC = () => {
  return <WalletMultiButton />;
};

export default ConnectBtn;
