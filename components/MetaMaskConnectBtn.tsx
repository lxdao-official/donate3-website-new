import { useMemo } from 'react';

import Donate3Btn from './Donate3Btn';
import { useMetaMask } from '@/utils/hooks/useMataMask';

export const MetaMaskConnectBtn = () => {
  const { wallet, hasProvider, connectMetaMask } = useMetaMask();

  const memoBtnText = useMemo(() => {
    if (!hasProvider) {
      return '';
    }
    if (wallet?.accounts?.length > 0) {
      const account = wallet?.accounts[0];
      return `${account.slice(0, 4)}...${account.slice(-5)}`;
    }
    return 'Connect MetaMask';
  }, [wallet, hasProvider]);
  return (
    <Donate3Btn sx={{ weight: '600', height: '43px', fontsize: '14px', width: 'auto', marginRight: '20px' }} onClick={connectMetaMask}>
      {memoBtnText}
    </Donate3Btn>
  );
};
