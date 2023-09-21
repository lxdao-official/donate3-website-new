import { Box, Typography } from '@mui/material';
import React from 'react';
import { PartnerCard } from './PartnerCard';

export function SectionPartner() {
  const partnerInfo = [
    {
      icon: '/icons/ldxdaologowhole.svg',
      url: 'lxdao.io',
    },
    {
      icon: '/icons/consensys.svg',
      url: 'consensys.io',
    },
    {
      icon: '/icons/infula.svg',
      url: 'infura.io',
    },
    {
      icon: '/icons/linea.svg',
      url: 'linea.build',
    },
    {
      icon: '/icons/EAS.svg',
      url: 'easscan.org',
    },
  ];

  return (
    <Box
      bgcolor="#F8FAFC"
      sx={{
        display: 'flex',
        alignItems: 'center',
        background: '#F8FAFC',
        minHeight: { xs: 'calc(60vh)', md: 'calc(60vh)' },
        flexDirection: { xs: 'column', lg: 'column' },
        justifyContent: { xs: 'center', lg: 'center' },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 800,
          fontSize: { xs: '40px', sm: '54px', md: '72px' },
          lineHeight: { xs: '37px', md: '64px' },
          color: '#000000',
          textAlign: { xs: 'center', lg: 'center' },
          minWidth: '100%',
        }}
      >
        Supportors
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: { xs: '48px', lg: '96px' },
          maxWidth: '100%',
          marginLeft: { xs: '-15px', sm: '-15px', lg: '0px' },
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: { xs: 'center', lg: 'center' },
        }}
      >
        {partnerInfo?.map((item) => {
          return <PartnerCard info={item} key={item?.url} />;
        })}
      </Box>
    </Box>
  );
}
