import type { NextPage } from 'next';
import { Box } from '@mui/material';

import { Layout } from '@/components/Layout';
import { DEFAULT_CID } from '@/utils/const';

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
        <div data-donate3-cid={DEFAULT_CID}></div>
      </Box>
    </Layout>
  );
};

export default Demo;
