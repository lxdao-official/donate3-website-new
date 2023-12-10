'use client';

import type { NextPage } from 'next';
import { Box } from '@mui/material';

import { Layout } from '@/components/Layout';
import { DEFAULT_ADDRESS } from '@/utils/const';
import { useEffect, useState } from 'react';
import { useEnsAddress } from 'wagmi';

const Demo: NextPage = () => {
  const [queryAddress, setQueryAddress] = useState<string | null>();
  const [ensAddress, setEnsAddress] = useState<string | null>();
  const { data: address } = useEnsAddress({
    name: ensAddress,
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // browser code

      const paramArr = new URLSearchParams(window.location.search);
      const address = paramArr.get('address') || DEFAULT_ADDRESS;
      if (address.includes('.eth')) {
        setEnsAddress(address);
      } else {
        setQueryAddress(address);
      }
    }
  }, []);

  return (
    <Layout style={{ maxWidth: '1512px' }}>
      <div
        style={{
          padding: '20px 0',
        }}
      >
        <Box
          sx={{
            pt: { xs: '65px', md: '0px' },
            display: 'flex',
            flexDirection: { xs: 'column-reverse', md: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '400px',
            height: '800px',
            frameBorder: '0',
            borderRadius: '22px',
            margin: '0 auto',
          }}
        >
          {(address ?? queryAddress) && <div data-donate3-address={address ?? queryAddress}></div>}
        </Box>
      </div>
    </Layout>
  );
};

export default Demo;
