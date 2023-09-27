'use client'; // This is a client component 👈🏽
import Donate3Btn from './Donate3Btn';
import { Box } from '@mui/material';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from 'petra-plugin-wallet-adapter';

const ConnectBtn = () => {
  const { disconnect, connect, isLoading, connected, account } = useWallet();
  return (
    <div>
      {(() => {
        if (!connected) {
          return (
            <Donate3Btn
              sx={{ weight: '600', height: '43px', fontsize: '14px' }}
              onClick={() => {
                connect(new PetraWallet().name);
              }}
            >
              <Box>Connect Wallet</Box>
            </Donate3Btn>
          );
        }
        // if (chain.unsupported) {
        //   return (
        //     <Donate3Btn sx={{ height: '43px' }} onClick={openChainModal}>
        //       <Box>Wrong network</Box>
        //     </Donate3Btn>
        //   );
        // }
        return (
          <div style={{ display: 'flex', gap: 12 }}>
            {/* <Donate3Btn
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    {
                    chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      > 
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Donate3Btn> */}
            <Donate3Btn
              sx={{ height: '43px' }}
              onClick={() => {
                disconnect();
              }}
            >
              {account ? `${account.address.slice(0, 4)}...${account.address.slice(-4)}` : ''}
              {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''} */}
            </Donate3Btn>
          </div>
        );
      })()}
    </div>
  );
};

export default ConnectBtn;
