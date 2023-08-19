import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import {Box, InputBase, Typography} from '@mui/material';
import { Layout } from '@/components/Layout';
import { useRouter } from 'next/router';

import DonatedCard from '@/components/donateTo/DonatedCard';
import PersonalDetails from '@/components/donateTo/PersonalDetails';
import PersonalIntroduction from '@/components/donateTo/PersonalIntroduction';
import { getFasterIpfsLink } from '@/utils/ipfsTools';
import { ICustomWidget } from '@/components/CustomWidget';
import API from "@/common/API";
import DonatedCardWithProgress from "@/components/donateTo/DonatedCardWithProgress";



const DonateTo: NextPage = () => {
  const router = useRouter();
  const cid = router.query?.cid as string;
  const [info, setInfo] = useState<Partial<ICustomWidget>>();
    const [showProgress, setShowProgress] = useState(1);
  // If specified, use the gateway
  const getInfoFromIpfs = async (cid: string) => {
    try {
      const info = await getFasterIpfsLink({
        ipfs: `https://nftstorage.link/ipfs/${cid}`,
        timeout: 4000,
      });
      setInfo(info);
      /*设置progress卡片渲染*/
        if (info && 'progressType' in info) {
            setShowProgress(info.progressType as number);
        }
      //console.log(info?.progressType);
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

            {showProgress === 0 ? (
                <DonatedCardWithProgress
                    info={{
                        address: info?.address!,
                        safeAccounts: info?.safeAccounts!,
                        accountType: info?.accountType!,
                        fundsGoal: info?.fundsGoal!,
                        startTime: info?.startTime!,
                        endTime: info?.endTime!,
                        reason: info?.reason!
                    }}
                />
            ) : (
                <DonatedCard
                    info={{
                        address: info?.address!,
                        safeAccounts: info?.safeAccounts!,
                        accountType: info?.accountType!,
                    }}
                />
            )}

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
