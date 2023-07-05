import type { NextPage } from 'next';
import { Box } from '@mui/material';

import { Layout } from '@/components/Layout';

const Demo: NextPage = () => {

  return (
    <Layout>
      <Box
        sx={{
          pt: { xs: '65px', md: '0px' },
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          height: { xs: '100vh', md: 'calc(100vh - 230px)' },
        }}
      >
        <div
          data-donate3-type="embed"
          data-donate3-color="#b7d844"
          data-donate3-title="Donate3"
          data-donate3-to-address="0xe395B9bA2F93236489ac953146485C435D1A267B"
        ></div>
      </Box>
    </Layout>
  );
};

export default Demo;
