import { Donate3 } from 'donate3-sdk';
import { useEffect, useState } from 'react';

function Demo2() {
  const [config, setConfig] = useState<any>();

  useEffect(() => {
    const dconfig = {
      type: 'embed', // 0 Float mode，1 Normal mode float\embed
      cid: 'bafkreibnfk3tnrmqpgn2b3ynqo7lp7wcolrynuspq54o2dwp25dshmmmou',
      color: '#666',
      title: 'Donate3',
      accountType: 1, // 账户类型 0： EOA， 1：safe account
      toAddress: '0xe395B9bA2F93236489ac953146485C435D1A267B',
      // avatar:'https://nftstorage.link/ipfs/bafkreidovf46msp6yqpsbfbl2n6whvdyfsupwwpucdguvkgt2isdnbac2i',
      avatar: '',
      safeAccounts: [{ networkId: 5, address: '0xe395B9bA2F93236489ac953146485C435D1A267B' }], // [{networkId: 5, address: '0xd2567eb0893c8b5de7deac1cb66d8d60178767e8'}]
      demo: false,
    };
    setConfig(dconfig);
  }, []);

  return (
    <div
      style={{
        padding: '20px 0',
      }}
    >
      <Donate3
        config={{
          type: 'embed', // 0 Float mode，1 Normal mode float\embed
          cid: 'bafkreibnfk3tnrmqpgn2b3ynqo7lp7wcolrynuspq54o2dwp25dshmmmou',
          color: '#666',
          title: 'Donate3',
          accountType: 1, // 账户类型 0： EOA， 1：safe account
          toAddress: '0xe395B9bA2F93236489ac953146485C435D1A267B',
          // avatar:'https://nftstorage.link/ipfs/bafkreidovf46msp6yqpsbfbl2n6whvdyfsupwwpucdguvkgt2isdnbac2i',
          avatar: '',
          safeAccounts: [{ networkId: 5, address: '0xe395B9bA2F93236489ac953146485C435D1A267B' }], // [{networkId: 5, address: '0xd2567eb0893c8b5de7deac1cb66d8d60178767e8'}]
          demo: false,
        }}
      />
    </div>
  );
}

export default Demo2;
