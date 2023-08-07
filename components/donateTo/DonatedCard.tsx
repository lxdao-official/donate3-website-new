import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import API from '@/common/API';

const DonatedCard = () => {
  const getRankingList = async () => {
    API.get('/donates/ranking', {
      params: {
        chainId: 137,
        address: '0xe395B9bA2F93236489ac953146485C435D1A267B',
      },
      baseURL: process.env.NEXT_PUBLIC_BACKEND_API_NEW,
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      debugger;
    });
  };

  useEffect(() => {
    // getRankingList();
  }, []);

  return (
    <Box>
      <div>DonatedCard</div>
    </Box>
  );
};
export default React.memo(DonatedCard);
