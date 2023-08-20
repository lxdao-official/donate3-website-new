'use client'; // This is a client component 👈🏽

import { MetaMaskSDK, SDKProvider } from '@metamask/sdk';
import { EventType, ServiceStatus } from '@metamask/sdk-communication-layer';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

const ConnectBtn = dynamic(() => import('./ConnectBtn'), { ssr: false });
const Donate3Btn = dynamic(() => import('./Donate3Btn'), { ssr: false });

export default function SDKContainer() {
  const [sdk, setSDK] = useState<MetaMaskSDK>();
  const [chain, setChain] = useState('');
  const [account, setAccount] = useState<string>();
  const [response, setResponse] = useState<any>('');
  const [connected, setConnected] = useState(false);
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>();
  const [activeProvider, setActiveProvider] = useState<SDKProvider>();
  const { address, isConnecting, isDisconnected, status } = useAccount();

  const connect = () => {
    if (!window.ethereum) {
      throw new Error(`invalid ethereum provider`);
    }

    window.ethereum
      .request({
        method: 'eth_requestAccounts',
        params: [],
      })
      .then((accounts: string[]) => {
        if (accounts) {
          console.debug(`connect:: accounts result`, accounts);
          setAccount((accounts as string[])[0]);
          setConnected(true);
        }
      })
      .catch((e: any) => console.log('request accounts ERR', e));
  };

  useEffect(() => {
    const doAsync = async () => {
      const clientSDK = new MetaMaskSDK({
        useDeeplink: false,
        communicationServerUrl: process.env.NEXT_PUBLIC_COMM_SERVER_URL,
        checkInstallationImmediately: false,
        dappMetadata: {
          name: 'NEXTJS demo',
          url: window.location.host,
        },
        logging: {
          developerMode: false,
        },
        storage: {
          enabled: true,
        },
      });
      await clientSDK.init();
      setSDK(clientSDK);
    };
    doAsync();
  }, []);

  useEffect(() => {
    if (!sdk || !activeProvider) {
      return;
    }

    // activeProvider is mapped to window.ethereum.
    console.debug(`App::useEffect setup active provider listeners`);
    if (window.ethereum?.selectedAddress) {
      console.debug(`App::useEffect setting account from window.ethereum `);
      setAccount(window.ethereum?.selectedAddress);
      setConnected(true);
    } else {
      setConnected(false);
    }

    const onChainChanged = (chain: unknown) => {
      console.log(`App::useEfect on 'chainChanged'`, chain);
      setChain(chain as string);
      setConnected(true);
    };

    const onInitialized = () => {
      console.debug(`App::useEffect on _initialized`);
      setConnected(true);
      if (window.ethereum?.selectedAddress) {
        setAccount(window.ethereum?.selectedAddress);
      }

      if (window.ethereum?.chainId) {
        setChain(window.ethereum.chainId);
      }
    };

    const onAccountsChanged = (accounts: unknown) => {
      console.log(`App::useEfect on 'accountsChanged'`, accounts);
      setAccount((accounts as string[])?.[0]);
      setConnected(true);
      sdk?.terminate();
    };

    const onConnect = (_connectInfo: unknown) => {
      console.log(`App::useEfect on 'connect'`, _connectInfo);
      setConnected(true);
    };

    const onDisconnect = (error: unknown) => {
      console.log(`App::useEfect on 'disconnect'`, error);
      setConnected(false);
      setChain('');
    };

    const onServiceStatus = (_serviceStatus: ServiceStatus) => {
      console.debug(`sdk connection_status`, _serviceStatus);
      setServiceStatus(_serviceStatus);
    };

    window.ethereum?.on('chainChanged', onChainChanged);

    window.ethereum?.on('_initialized', onInitialized);

    window.ethereum?.on('accountsChanged', onAccountsChanged);

    window.ethereum?.on('connect', onConnect);

    window.ethereum?.on('disconnect', onDisconnect);

    sdk.on(EventType.SERVICE_STATUS, onServiceStatus);

    return () => {
      console.debug(`App::useEffect cleanup activeprovider events`);
      window.ethereum?.removeListener('chainChanged', onChainChanged);
      window.ethereum?.removeListener('_initialized', onInitialized);
      window.ethereum?.removeListener('accountsChanged', onAccountsChanged);
      window.ethereum?.removeListener('connect', onConnect);
      window.ethereum?.removeListener('disconnect', onDisconnect);
      sdk.removeListener(EventType.SERVICE_STATUS, onServiceStatus);
    };
  }, [activeProvider]);

  useEffect(() => {
    if (!sdk?.isInitialized()) {
      return;
    }

    const onProviderEvent = (accounts?: string[]) => {
      if (accounts?.[0]?.startsWith('0x')) {
        setConnected(true);
        setAccount(accounts?.[0]);
      } else {
        setConnected(false);
        setAccount(undefined);
      }
      setActiveProvider(sdk.getProvider());
    };
    // listen for provider change events
    sdk.on(EventType.PROVIDER_UPDATE, onProviderEvent);
    return () => {
      sdk.removeListener(EventType.PROVIDER_UPDATE, onProviderEvent);
    };
  }, [sdk]);

  const eth_signTypedData_v4 = async () => {
    const msgParams = JSON.stringify({
      domain: {
        // Defining the chain aka Rinkeby testnet or Ethereum Main Net
        chainId: parseInt(window.ethereum?.chainId ?? '', 16),
        // Give a user friendly name to the specific contract you are signing for.
        name: 'Ether Mail',
        // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        // Just let's you know the latest version. Definitely make sure the field name is correct.
        version: '1',
      },

      // Defining the message signing data content.
      message: {
        /*
         - Anything you want. Just a JSON Blob that encodes the data you want to send
         - No required fields
         - This is DApp Specific
         - Be as explicit as possible when building out the message schema.
        */
        contents: 'Hello, Bob!',
        attachedMoneyInEth: 4.2,
        from: {
          name: 'Cow',
          wallets: ['0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF'],
        },
        to: [
          {
            name: 'Bob',
            wallets: ['0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57', '0xB0B0b0b0b0b0B000000000000000000000000000'],
          },
        ],
      },
      // Refers to the keys of the *types* object below.
      primaryType: 'Mail',
      types: {
        // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        // Not an EIP712Domain definition
        Group: [
          { name: 'name', type: 'string' },
          { name: 'members', type: 'Person[]' },
        ],
        // Refer to PrimaryType
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person[]' },
          { name: 'contents', type: 'string' },
        ],
        // Not an EIP712Domain definition
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallets', type: 'address[]' },
        ],
      },
    });

    const from = window.ethereum?.selectedAddress;

    console.debug(`sign from: ${from}`);
    try {
      if (!from || from === null) {
        alert(`Invalid account -- please connect using eth_requestAccounts first`);
        return;
      }

      const params = [from, msgParams];
      const method = 'eth_signTypedData_v4';
      console.debug(`ethRequest ${method}`, JSON.stringify(params, null, 4));
      console.debug(`sign params`, params);
      const resp = (await window.ethereum?.request({
        method,
        params,
      })) as string;
      setResponse(resp);
    } catch (e) {
      console.log(e);
    }
  };

  const terminate = () => {
    sdk?.terminate();
  };

  return (
    <Box
      style={{
        display: 'flex',
      }}
    >
      {address ? (
        <Box>
          <ConnectBtn />
        </Box>
      ) : connected ? (
        <Box>
          <Donate3Btn sx={{ weight: '600', height: '43px', fontsize: '14px', width: 'auto', marginRight: '20px' }}>{`${account!.slice(0, 4)}...${account!.slice(-5)}`}</Donate3Btn>
        </Box>
      ) : (
        <Box
          style={{
            display: 'flex',
          }}
        >
          <Donate3Btn sx={{ weight: '600', height: '43px', fontsize: '14px', width: 'auto', marginRight: '20px' }} onClick={connect}>
            Connect MetaMask
          </Donate3Btn>
          <ConnectBtn />
        </Box>
      )}
    </Box>
  );
}
