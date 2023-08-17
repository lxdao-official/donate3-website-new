import React, { use, useCallback, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useAccount, useNetwork } from 'wagmi';

import API from '@/common/API';
import Avatars from './Avatars';
import { ICustomWidget } from '../CustomWidget';
import { AccountType } from '@/utils/const';

const MAX_COUNT = 10;

interface IRankingItem {
  address: `0x${string}`;

}

interface IRankingParams {
  chainId: number;
  address: `0x${string}`;
}

interface IDonatedCardProps {
  info: Pick<ICustomWidget, 'address' | 'safeAccounts' | 'accountType'>;
}

const DonatedCard = ({ info }: IDonatedCardProps) => {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const [ranking, setRanking] = useState<IRankingItem[]>([]);

  const queryDonatesRanking = (params: IRankingParams) => {
    API.get('/donates/ranking', {
      params,
      baseURL: process.env.NEXT_PUBLIC_BACKEND_API_NEW,
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      setRanking(res?.data?.data || []);
    });
  };

  const genDonatesRankingParamsCB = useCallback((): IRankingParams | null => {
    const currentChainId = chain?.id!;

    if (info?.accountType == AccountType.safeAccount) {
      // safeAccount
      // safeAccount账户需要取当前网络的链ID对应的safeAccount，如果没有则返回null
      const selectedSafeAccount = info?.safeAccounts?.filter((item) => item?.networkId == currentChainId)?.[0];

      if (selectedSafeAccount?.address) {
        return {
          chainId: currentChainId,
          address: selectedSafeAccount?.address as `0x${string}`,
        };
      } else {
        return null;
      }
    } else {
      // EOA
      // EOA账户直接取
      return {
        chainId: currentChainId,
        address: info?.address! as `0x${string}`,
      };
    }
  }, [chain, info]);

  const getRankingListCallBack = useCallback(() => {
    const params = genDonatesRankingParamsCB();
    if (params?.address && params?.chainId) {
      queryDonatesRanking(params!);
    }
  }, [genDonatesRankingParamsCB]);

  useEffect(() => {
    if (isConnected && info) {
      getRankingListCallBack();
    }
  }, [getRankingListCallBack, isConnected, info]);

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
return(<Box
    sx={{
        position: 'relative',
    }}
>
    <Box
        sx={{
            padding: '60px 40px 40px 40px',
            borderRadius: '8px',
            width: '344px',
            boxSizing: 'border-box',
            textAlign: 'center',
            backgroundColor: '#fff',
            position: 'relative',
            zIndex: 1,
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
    {/* mask */}
    <Box
        sx={{
            width: '92%',
            height: '92%',
            backgroundColor: '#CCFF00',
            borderRadius: '8px',
            position: 'absolute',
            bottom: '-10px',
            right: '-10px',
            zIndex: 0,
        }}
    ></Box>
</Box>)
  /*return (ranking || [])?.length > 0 ? (

  ) : (
    <></>
  );*/
};
export default React.memo(DonatedCard);
