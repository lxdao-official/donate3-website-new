'use client';

import type { NextPage } from 'next';
import { Box } from '@mui/material';

import { Layout } from '@/components/Layout';
import { DEFAULT_CID } from '@/utils/const';
import { use, useEffect, useState } from 'react';

const Demo: NextPage = () => {
  const [cid, setCid] = useState(DEFAULT_CID);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // browser code

      const paramArr = new URLSearchParams(window.location.search);
      const cid = paramArr.get('cid') || DEFAULT_CID;
      setCid(cid);
    }
  }, []);

  return (
    <Layout sx={{maxWidth:'1512px'}} >
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
          <div data-donate3-cid={cid}></div>
        </Box>
      </div>
    </Layout>
  );
};

export default Demo;
