import { Box, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { DonateOverview } from '../components/DonateOverview';
import styled from 'styled-components';
import MultiLine from '@/components/MultiLine';

export function SectionClient() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);

    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  const donateData = [
    {
      avatarSrc: '/test/lxdao-logo.svg',
      name: 'LXDAO',
      website: 'lxdao.io',
      description: 'LXDAO is an R&D-focused DAO in Web3',
    },
    {
      avatarSrc: '/test/marry3-logo-rect.png',
      name: 'marry3',
      website: 'marry3.love',
      description: 'Witness your Love in Web3 and get the Soulbound NFT Certificate on the chain',
    },
    // Add one more data entry as needed
    {
      avatarSrc: '/test/mail3.svg',
      name: 'mail3',
      website: 'mail3.me',
      description: 'Web3 natives deserve a better mail',
    },
    {
      avatarSrc: '/test/GasLockR.svg',
      name: 'GasLockR',
      website: 'gaslockr.xyz',
      description: 'The first trustless GasFi protocol designed for EVM-based chains',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'column' },
        justifyContent: { xs: 'center', lg: 'center' },
        alignItems: 'center',
        minHeight: { xs: '100vh', md: 'calc(100vh )' },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 900,
          fontSize: { xs: '30px', sm: '54px', md: '56px' },
          lineHeight: { xs: '32px', md: '64px' },
          color: '#0F172A',
          textAlign: { xs: 'center', lg: 'center' },
          mt: { xs: '30px', lg: '86' },
          mb: { xs: '30px', lg: '61px' },
        }}
      >
        Use cases
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%', maxHeight: '100%', flexDirection: { xs: 'column', lg: 'row' }, mb: { xs: '30px', lg: '61px' } }}>
        <Box
          component="img"
          src="/images/client.png"
          sx={{
            width: { xs: '300px', sm: '420px', md: '510px' },
            height: { xs: '300px', sm: '420px', md: '510px' },
          }}
        />
        <Box sx={{ width: '65px' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%', maxHeight: '100%', zIndex: 2 }}>
          <Box ml={2}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '20px', sm: '20px', md: '28px' },
                lineHeight: { xs: '37px', md: '37px' },
                padding: { xs: '10px', sm: '30px', md: 0 },
                color: '#0F172A',
                textAlign: { xs: 'center  ', lg: 'left' },
                mt: { xs: '30px', lg: '0' },
                mb: { xs: '30px', lg: '23px' },
              }}
            >
              Get funded as <MultiLine>public goods</MultiLine>
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 400,
                fontSize: { xs: '20px', sm: '20px', md: '20px' },
                lineHeight: { xs: '36px', md: '36px' },
                color: '#334155',
                textAlign: { xs: 'left ', lg: 'left' },
                maxWidth: { xs: '100%', sm: '680px' },
                mt: { xs: '30px', lg: '23' },
              }}
            >
              In the real world, public goods like trees, museums, and parks are supported by governments or public agencies, enhancing the beauty and charm of a city. However, in the web3 world, we encounter numerous public goods that bring us joy but lack an equivalent role of government or public
              agency to sustain and support them.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography
        variant="h1"
        sx={{
          fontWeight: 900,
          fontSize: { xs: '30px', sm: '54px', md: '56px' },
          lineHeight: { xs: '32px', md: '64px' },
          color: '#0F172A',
          textAlign: { xs: 'center', lg: 'center' },
          mt: { xs: '30px', lg: '86' },
        }}
      >
        Example
      </Typography>

      <Box
        sx={{
          display: 'flex',
          mt: { xs: '30px', lg: '105px' },
          mb: { xs: '30px', lg: '139px' },
          alignItems: 'center',
          flexDirection: { xs: 'column', lg: 'row' },
          maxWidth: {
            lg: '100%',
          },
          overflowX: {
            lg: 'scroll',
          },
        }}
      >
        {donateData.map((data, index) => (
          <DonateOverview key={index} data={data} />
        ))}
      </Box>
    </Box>
  );
}
