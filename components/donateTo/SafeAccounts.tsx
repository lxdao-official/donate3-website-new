import React, { ElementType } from 'react';
import { Box, Typography } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';

import { SafeAccount } from '@/utils/const';
import Arbitrum from '@/public/icons/networks/arbitrum.svg';
import Ethereum from '@/public/icons/networks/ethereum.svg';
import Goerli from '@/public/icons/networks/goerli.svg';
import Linea from '@/public/icons/networks/linea.svg';
import Optimism from '@/public/icons/networks/optimism.svg';
// import Pgn from '@/public/icons/networks/pgn.svg';
import Polygon from '@/public/icons/networks/polygon.svg';

const SafeAccounts = ({ accounts }: { accounts: SafeAccount[] | undefined }) => {
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

  // Return a list of accounts with a SVG icon and address
  return (
    <Box my={2}>
      {accounts.map((item) => (
        <Box key={item.networkId} my={1}>
          <SvgIcon sx={{ mr: 1.25 }} component={icons[item.networkId]} />
          <Typography display={'inline-block'} variant="body1">
            {item.address}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default React.memo(SafeAccounts);
