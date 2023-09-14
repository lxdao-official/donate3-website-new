import { Box } from '@mui/material';
import React from 'react';

interface IPartnerCardProps {
  info: { icon: string; url: string };
}
export const PartnerCard = ({ info }: IPartnerCardProps) => {
  const handleClickPartCard = () => {
    info?.url && window.open(`https://${info?.url}`, '_blank');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '180px',
        height: '70px',
        borderRadius: '3%',
        mt: '5px',
        marginRight: '24px',
        justifyContent: 'center',
        backgroundColor: '#fff',
        cursor: 'pointer',
      }}
      onClick={handleClickPartCard}
    >
      <Box
        component="img"
        src={info?.icon}
        sx={{
          marginTop: '19px',
          marginBottom: '19px',
          backgroundColor: '#fff',
        }}
      ></Box>
    </Box>
  );
};
