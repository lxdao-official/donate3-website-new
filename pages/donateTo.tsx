import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import { Layout } from '@/components/Layout';
import { useRouter } from 'next/router';
import { useLottie } from 'lottie-react';

import DonatedCard from '@/components/donateTo/DonatedCard';
import PersonalDetails from '@/components/donateTo/PersonalDetails';
import PersonalIntroduction from '@/components/donateTo/PersonalIntroduction';
import { getFasterIpfsLink } from '@/utils/ipfsTools';
import { ICustomWidget } from '@/components/CustomWidget';
import loadingAnimation from '../public/loading/donate3Loading.json';

const DonateTo: NextPage = () => {
  const router = useRouter();
  const cid = router.query?.cid as string;
  const [info, setInfo] = useState<Partial<ICustomWidget>>();
  const [loading, setLoading] = useState<boolean>(true);

  const options = {
    animationData: loadingAnimation,
    loop: true,
  };
  const { View } = useLottie(options, {
    width: '80px',
    height: '80px',
  });

  // If specified, use the gateway
  const getInfoFromIpfs = async (cid: string) => {
    try {
      const info = await getFasterIpfsLink({
        ipfs: `https://nftstorage.link/ipfs/${cid}`,
        timeout: 4000,
      });
      setInfo(info);
      info && setLoading(false);
    } catch (error) {
      console.error('error', 'getFasterIpfsLink-error');
    }
  };

  useEffect(() => {
    cid && getInfoFromIpfs(cid);
  }, [cid]);

  const handleDonateBtn = () => {
    window.location.href = `${window.location.origin}/demo?cid=${cid}`;
  };

  return (
    <Layout
      style={{
        backgroundColor: '#f9fafc',
      }}
    >
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        {View}
      </Backdrop>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '45px 200px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <PersonalDetails
            info={{
              name: info?.name!,
              avatar: info?.avatar!,
              twitter: info?.twitter!,
              telegram: info?.telegram!,
            }}
            onDonate={handleDonateBtn}
          />
          <DonatedCard
            info={{
              address: info?.address!,
              safeAccounts: info?.safeAccounts!,
              accountType: info?.accountType!,
            }}
          />
        </Box>

        <PersonalIntroduction
          info={{
            description: info?.description!,
          }}
        />
      </Box>
    </Layout>
  );
};

export default DonateTo;
