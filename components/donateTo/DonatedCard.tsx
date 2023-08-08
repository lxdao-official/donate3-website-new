import React, { use, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import API from '@/common/API';
import Avatars from './Avatars';

const MAX_COUNT = 10;

interface IRankingItem {
  address: `0x${string}`;
  totaldonation: string;
  top: string;
}

const DonatedCard = () => {
  const [ranking, setRanking] = useState<IRankingItem[]>([]);

  const getRankingList = async () => {
    API.get('/donates/ranking', {
      params: {
        chainId: 137,
        address: '0xe395B9bA2F93236489ac953146485C435D1A267B',
      },
      baseURL: process.env.NEXT_PUBLIC_BACKEND_API_NEW,
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      setRanking(res?.data?.data || []);
    });
  };

  useEffect(() => {
    getRankingList();
  }, []);

  const memoLeastTenList = useMemo(() => {
    let finalRankings = ranking;
    const length = ranking?.length || 0;
    if (length > MAX_COUNT) {
      finalRankings = ranking?.slice(0, MAX_COUNT);
    }
    return finalRankings!.map(({ address }) => address);
  }, [ranking]);

  const memoUnDisplayCount = useMemo(() => {
    const count = (ranking || [])?.length || 0;
    return count <= MAX_COUNT ? 0 : count - MAX_COUNT;
  }, [ranking]);

  return (ranking || [])?.length > 0 ? (
    <Box
      sx={{
        padding: '60px 40px 40px 40px',
        borderRadius: '8px',
        width: '344px',
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          fontSize: '56px',
          fontWeight: 800,
          lineHeight: '64px',
          marginBottom: '13px',
          color: 'rgba(15, 23, 42, 1)',
        }}
      >
        {ranking?.length}
      </Box>
      <Box
        sx={{
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '28px',
          color: 'rgba(100, 116, 139, 1)',
          marginBottom: '24px',
        }}
      >
        people have donated
      </Box>

      <Box>
        <Avatars list={memoLeastTenList} unDisplayCount={memoUnDisplayCount} />
      </Box>
    </Box>
  ) : (
    <></>
  );
};
export default React.memo(DonatedCard);
