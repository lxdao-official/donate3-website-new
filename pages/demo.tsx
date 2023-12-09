'use client';

import type { NextPage } from 'next';
import { Box } from '@mui/material';

import { Layout } from '@/components/Layout';
import { DEFAULT_ADDRESS } from '@/utils/const';
import { useEffect, useState } from 'react';

const Demo: NextPage = () => {
  const [address, setAddress] = useState(DEFAULT_ADDRESS);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // browser code

      const paramArr = new URLSearchParams(window.location.search);
      const cid = paramArr.get('address') || DEFAULT_ADDRESS;
      setAddress(cid);
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
          <div data-donate3-address={address}></div>
        </Box>
      </div>
    </Layout>
  );
};

export default Demo;
