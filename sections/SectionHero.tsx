import { Button, Box, Typography, List } from '@mui/material';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import React from 'react';
import MultiLine from '@/components/MultiLine';

const CircleBg = styled(Box)`
  position: absolute;

  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: linear-gradient(142.97deg, #d3ff25 32%, #4bb5f7 10%);
  opacity: 0.2;
  filter: blur(5vw);
  pointer-events: none;
  z-index: 0;
  @media (max-width: 600px) {
    top: 90%;
    width: 40%;
    height: 20%;
  }

  @media (min-width: 601px) {
    top: 40%;
    width: 60%;
    height: 50%;
  }
`;
const CircleBgg = styled(Box)`
  position: absolute;

  left: 10%;
  bottom: 0;
  border-radius: 50%;
  background: linear-gradient(10.97deg, #d3ff25 32%, #11d6c3 10%);
  opacity: 0.25;
  filter: blur(5vw);
  pointer-events: none;
  z-index: 0;
  @media (max-width: 600px) {
    top: 92%;
    width: 30%;
    height: 20%;
  }

  @media (min-width: 601px) {
    top: 66%;
    width: 30%;
    height: 40%;
  }
`;
const StyledButton = styled(Button)`
  &.MuiButton-root {
    width: 208px;
    height: 48px;
    background: #feffe8;
    border: 1px solid #283231;
    box-shadow: 4px 4px 0px #ccff00;
    border-radius: 5px;
    color: #44443f;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-transform: none;
    text-align: center;

    &:hover {
      background: #ccff00;
      box-shadow: 4px 4px 0px rgba(186, 206, 204, 0.9);
    }

    &:focus {
      background: #ccff00;
      box-shadow: 4px 4px 0px rgba(186, 206, 204, 0.9);
    }
  }
`;
const StyledButton2 = styled(Button)`
  &.MuiButton-root {
    width: 208px;
    height: 48px;
    background: #ccff00;
    border: 1px solid #283231;
    box-shadow: 4px 4px 0px rgba(186, 206, 204, 0.9);
    border-radius: 5px;
    color: #44443f;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-transform: none;
    text-align: center;

    &:focus {
      background: #feffe8;
      box-shadow: 4px 4px 0px #ccff00;
    }

    &:hover {
      background: #feffe8;
      box-shadow: 4px 4px 0px #ccff00;
    }
  }
`;

enum supportList {
  ethereum = 'ethereum',
  polygon = 'polygon',
  optimism = 'optimism',
  // gnosis = 'gnosis',
  // avalanche = 'avalanche',
  // fantom = 'fantom',
  arbitrum = 'arbitrum',
  // bsc = 'bsc',
  linea = 'linea',
  goerli = 'goerli',
}

export function SectionHero() {
  const router = useRouter();
  return (
    <Box

      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'column' },
        justifyContent: { xs: 'center', lg: 'center' },
        alignItems: 'center',
        minHeight: { xs: '100vh', md: 'calc(100vh )' },
        mt: { xs: '30px', lg: '94px' },
          //zIndex:-1,
      }}

    >
      <CircleBg />
      <CircleBgg />
      <Typography
        variant="h1"
        sx={{
          fontWeight: 800,
          fontSize: { xs: '30px', sm: '54px', md: '72px' },
          lineHeight: { xs: '37px', md: '64px' },
          color: '#000000',
          textAlign: { xs: 'center', lg: 'center' },
          maxWidth: { xs: '100%', sm: '1240px' },
            zIndex:2,
        }}
      >
        Easy <MultiLine >donation</MultiLine>, More connection.
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontWeight: 600,
          fontSize: { xs: '15px', sm: '15px', md: '20px' },
          lineHeight: { xs: '30px', md: '36px', lg: '36px' },
          padding: { xs: '10px', sm: '30px', md: 0 },
          color: '#64748B',
          textAlign: { xs: 'center', lg: 'center' },
          maxWidth: { xs: '100%', sm: '900px' },
          mt: { xs: '30px', lg: '50px' },
        }}
      >
        Donate3 is a web3 donation tool. It enables public goods and creators to set up donations in just 5 minutes.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: { xs: 1, md: 3 },
          mt: { xs: '30px', lg: '30px' },
        }}
      >
        <StyledButton2 onClick={() => router.push('/create')}>Set up now</StyledButton2>

        <StyledButton onClick={() => (window.location.href = `${window.location.origin}/demo`)}>Demo</StyledButton>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: '27px' }}>
        <Typography
          sx={{
            fontSize: '11px',
            color: '#6F9492',
            fontWeight: '500',
            padding: '5px',
          }}
        >
          Support:
        </Typography>
        <List sx={{ display: 'flex', flexDirection: 'row' }}>
          {Object.keys(supportList).map((item) => {
            return <Box key={item} component="img" title={item} src={`icons/support/${item}.svg`} sx={{ mr: 1 }} />;
          })}
        </List>
      </Box>

      <Box sx={{ height: '52px' }} />
      <Box sx={{ position: 'relative' }}>
        <Box
          style={{
            position: 'absolute',
            width: '300px',
            height: '349px',
            borderRadius: '50% / 40%',
            backgroundImage: 'linear-gradient(to bottom right, rgb(195, 255, 54), #94dffc)',
            opacity: 1,
            filter: 'blur(180px)',
            zIndex: -2,
          }}
        />
        <Box
          component="img"
          src="/images/heroShow.png"
          sx={{
            zIndex: 0,
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        />
      </Box>
    </Box>
  );
}
