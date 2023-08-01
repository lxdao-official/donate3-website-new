import type { NextPage } from 'next';
import { Box } from '@mui/material';

import { Layout } from '@/components/Layout';
import { useRouter } from 'next/router'

const Test: NextPage = () => {
  const router = useRouter();
  const { cid } = router.query;

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
        <div data-donate3-cid={cid}></div>
      </Box>
    </Layout>
  );
};

export default Test;
