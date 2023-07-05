import type { NextPage } from 'next';
import { Box } from '@mui/material';

import { Layout } from '@/components/Layout';
import { useRouter } from 'next/router';

const Test: NextPage = () => {
  const router = useRouter();
  const config = router.query as {
    address: string,
    color: string,
    title: string
  }

  return (
    <Layout>
      <Box
        sx={{
          pt: { xs: '65px', md: '0px' },
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          height: { xs: '100vh' },
        }}
      >
        <div
          data-donate3-type="embed"
          data-donate3-color={"#" + config.color}
          data-donate3-title={config.title}
          data-donate3-to-address={config.address}
        ></div>
      </Box>
    </Layout>
  );
};

export default Test;
