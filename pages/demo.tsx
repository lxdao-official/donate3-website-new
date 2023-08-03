import type { NextPage } from 'next';
import { Box } from '@mui/material';

import { Layout } from '@/components/Layout';
import { DEFAULT_CID } from '@/utils/const';
import { getDonateSrcDoc } from '@/utils/common';

const Demo: NextPage = () => {
  return (
    <Layout>
      <div
        style={{
          padding: '20px 0',
        }}
      >
        <Box
          component="iframe"
          sx={{
            pt: { xs: '65px', md: '0px' },
            display: 'flex',
            flexDirection: { xs: 'column-reverse', md: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '400px',
            height: '800px',
            frameBorder: '0',
            border: '2px solid var(--gray-300, #E2E8F0);',
            borderRadius: '22px',
            margin: '0 auto',
          }}
          srcDoc={getDonateSrcDoc(DEFAULT_CID)}
        ></Box>
      </div>
    </Layout>
  );
};

export default Demo;
