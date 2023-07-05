import type { NextPage } from 'next';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';

import { Layout } from '@/components/Layout';
import { useRouter } from 'next/router';
interface Config {
  address: string;
  color: string;
  title: string;
}

const Test: NextPage = () => {
  const router = useRouter();
  const { address, color, title } = router.query;
  // const [config, setConfig] = useState<{
  //   address: string,
  //   color: string,
  //   title: string
  // }>({
  //   address: "0xe395B9bA2F93236489ac953146485C435D1A267B",
  //   color: "b7d844",
  //   title: "Donate3"
  // })

  // useEffect(() => {
  //   setConfig({

  //   })
  // }, [config])

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
        <div data-donate3-type="embed" data-donate3-color={'#' + color} data-donate3-title={title} data-donate3-to-address={address}></div>
      </Box>
    </Layout>
  );
};

export default Test;
