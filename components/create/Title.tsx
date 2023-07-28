import { Box, Typography } from '@mui/material';
import React from 'react';

const Title = () => {
  return (
    <Box>
      <Typography variant="h4" color="rgba(15, 23, 42, 1)" fontWeight="600" fontSize="36px" lineHeight="44px" marginBottom="10px">
        Get Widget
      </Typography>
      <Typography variant="body1" color="rgba(100, 116, 139, 1)" fontWeight="400" fontSize="14px" lineHeight="26px">
        With a simple setup, you can produce a piece of code, put it anywhere, and anyone can send you cross-chain cryptocurrencies.{' '}
      </Typography>
    </Box>
  );
};

export default React.memo(Title);
