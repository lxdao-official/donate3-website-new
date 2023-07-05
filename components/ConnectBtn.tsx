import { ConnectButton } from '@rainbow-me/rainbowkit';
import Donate3Btn from './Donate3Btn';
export const ConnectBtn = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
                marginLeft: '10px',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Donate3Btn sx={{ height: '43px' }} onClick={openConnectModal}>
                    Connect Wallet
                  </Donate3Btn>
                );
              }
              if (chain.unsupported) {
                return (
                  <Donate3Btn sx={{ height: '43px' }} onClick={openChainModal}>
                    Wrong network
                  </Donate3Btn>
                );
              }
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
                  <Donate3Btn sx={{ height: '43px' }} onClick={openAccountModal}>
                    {account.displayName}
                    {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''} */}
                  </Donate3Btn>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
