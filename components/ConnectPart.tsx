'use client'; // This is a client component 👈🏽

import { Box } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';

import { MetaMaskConnectBtn } from './MetaMaskConnectBtn';
import { ConnectBtn } from './ConnectBtn';
import { useMetaMask } from '@/utils/hooks/useMataMask';

const ConnectPart = () => {
  const { address, isConnecting, isDisconnected, status } = useAccount();
  const { wallet: metaMaskWallet, hasProvider: metaMaskProvider } = useMetaMask();

  const memoBtnNodes = useMemo(() => {
    // preliminary scheme

    // 1: connected：only show MetaMask Connect Btn

    // 2: not connected
    // 2.1: installed MetaMask plugin，show both MetaMask Connect Btn and rainbow-me Connect Btn
    // 2.2：not install MetaMask plugin，only show rainbow-me Connect Btn

    if (address) {
      return <ConnectBtn />;
    }

    if (metaMaskWallet?.accounts?.length > 0) {
      return <MetaMaskConnectBtn />;
    } else {
      const mmBtn = metaMaskProvider ? <MetaMaskConnectBtn /> : <></>;
      return (
        <>
          {mmBtn}
          <ConnectBtn />
        </>
      );
    }
  }, [metaMaskProvider, metaMaskWallet, address]);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '400px',
        justifyContent: 'flex-end',
      }}
    >
      {memoBtnNodes}
    </Box>
  );
};
export default ConnectPart;
