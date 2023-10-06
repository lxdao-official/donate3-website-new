'use client'; // This is a client component 👈🏽

import React, { FC } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const ConnectBtn: FC = () => {
  return <WalletMultiButton />;
};

export default ConnectBtn;
