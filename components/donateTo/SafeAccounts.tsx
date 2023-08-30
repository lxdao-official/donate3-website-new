import React, { ElementType } from 'react';
import { Box, Typography, SvgIcon, Link } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { mainnet, goerli, optimism, optimismGoerli, arbitrum, polygon, linea } from 'wagmi/chains';

import { SafeAccount } from '@/utils/const';
import Arbitrum from '@/public/icons/networks/arbitrum.svg';
import Ethereum from '@/public/icons/networks/ethereum.svg';
import Goerli from '@/public/icons/networks/goerli.svg';
import Linea from '@/public/icons/networks/linea.svg';
import Optimism from '@/public/icons/networks/optimism.svg';
// import Pgn from '@/public/icons/networks/pgn.svg';
import Polygon from '@/public/icons/networks/polygon.svg';

const SafeAccounts = ({ accounts, handleCopy }: { accounts: SafeAccount[] | undefined; handleCopy: (text: string) => void }) => {
  // Check if accounts array is empty
  if (!accounts || !accounts.length) {
    return null;
  }

  // Create a map of icons and their corresponding element types
  const icons: { [key: string]: ElementType } = {
    '1': Ethereum,
    '5': Goerli,
    '10': Optimism,
    '42161': Arbitrum,
    '137': Polygon,
    '59144': Linea,
    '420': Optimism,
    // {  '424': Pgn },
  };

  const getUrl = ({ networkId, address }: SafeAccount) => {
    const networks = [mainnet, goerli, optimism, optimismGoerli, arbitrum, polygon, linea];
    const url = networks.find(({ id }) => id === networkId)?.blockExplorers?.default.url;
    return `${url}/address/${address}`;
  };

  // Return a list of accounts with a SVG icon and address
  return (
    <Box width={'100%'} mt={6.25} mb={5} p={4} border={1} borderColor={'var(--divider, rgba(15, 23, 42, 0.16))'} borderRadius={2}>
      <Typography variant="h4" fontSize={28} lineHeight={'36px'} fontWeight={600} mb={1.5}>
        Address list
      </Typography>

      <Box sx={{ '&::after': { content: '""', display: 'table', clear: 'both' } }}>
        {accounts.map((item) => (
          <Box sx={{ float: 'left', lineHeight: '28px', '&:nth-of-type(2n)': { marginLeft: 4 } }} my={1.125} display={'flex'} width={'47%'} key={item.networkId}>
            <SvgIcon sx={{ mt: 0.125, mr: 1, cursor: 'pointer' }} component={icons[item.networkId]} onClick={() => item.address && handleCopy(item.address)} />
            <Typography flex={1} display={'inline-block'} variant="body1" lineHeight={'28px'}>
              <span style={{ cursor: 'pointer' }} onClick={() => item.address && handleCopy(item.address)}>
                {item.address?.substring(0, 6)}...{item.address?.substring(38)}
              </span>
            </Typography>
            <Link underline="none" color={'var(--gray-1000, #0F172A)'} href={getUrl(item)} target="_blank">
              View
              <KeyboardArrowRightIcon sx={{ fontSize: 18, color: '#0F172A' }} />
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default React.memo(SafeAccounts);
