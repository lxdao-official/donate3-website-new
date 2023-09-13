import { Box } from '@mui/material';
import React from 'react';

interface IPartnerCardProps {
  info: { icon: string; url: string };
}
export const PartnerCard = ({ info }: IPartnerCardProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '180px',
        height: '70px',
        border: '1px solid',
        borderColor: '#E2E8F0',
        borderRadius: '3%',
        mt: '5px',
        marginRight: '24px',
      }}
    >
      <Box
        component="img"
        src={info?.icon}
        sx={{
          marginLeft: '36px',
          marginTop: '19px',
          marginBottom: '19px',
        }}
      ></Box>
    </Box>
  );
};
