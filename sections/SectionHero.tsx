import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Container, Button, Box, Typography, CssBaseline, Link, Divider, List } from '@mui/material';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';
import React from 'react';
const inter = Inter({ subsets: ['latin'] });
const GlowingCircle = styled(Box)`
  position: absolute;
  width: 300px;
  height: 349px;
  left: 730px;
  top: -300px;
  border-radius: 50% / 40%;
  background-image: linear-gradient(to bottom right, rgb(195, 255, 54), #94dffc);
  opacity: 1;
  filter: blur(180px);
  z-index: 0;
`;

const GlowingCircleAroundleft = styled(Box)`
  position: absolute;
  width: 300px;
  height: 349px;
  left: -200px;
  top: -100px;
  border-radius: 50% / 40%;
  background-image: linear-gradient(to bottom right, rgb(195, 255, 54), #94dffc);
  opacity: 1;
  filter: blur(180px);
  z-index: 0;
`;


enum supportList {
    ethereum = 'ethereum',
    polygon = 'polygon',
    // optimism = 'optimism',
    // gnosis = 'gnosis',
    // avalanche = 'avalanche',
    // fantom = 'fantom',
    // arbitrum = 'arbitrum',
    // bsc = 'bsc',
}
export  function  SectionHero (){
    const router = useRouter();
    return (

        <Box
            sx={{
                fontFamily: inter,
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'column' },
                justifyContent: { xs: 'center', lg: 'center' },
                alignItems: 'center',
                minHeight: { xs: '100vh', md: 'calc(100vh )'},
                mt: { xs: '30px', lg: '188px' },
            }}
        >


            <Typography
                variant="h1"

                sx={{
                    fontWeight: 800,
                    fontSize: { xs: '50px', sm: '54px', md: '72px' },
                    lineHeight: { xs: '37px', md: '64px' },
                    color: '#000000',
                    textAlign: { xs: 'center', lg: 'center' },
                    maxWidth: { xs: '800px', sm: '1240px' },
                }}
            >
                Easy donation, More connection.

            </Typography>

            <Typography
                variant="h2"
                sx={{
                    fontWeight: 600,
                    fontSize: { xs: '20px', sm: '18px', md: '20px' },
                    lineHeight: { xs: '30px', md: '56px' },
                    padding: { xs: '10px', sm: '30px', md: 0 },
                    color: '#64748B',
                    textAlign: { xs: 'center', lg: 'center' },
                    maxWidth: { xs: '300px', sm: '900px' },
                    mt: { xs: '30px', lg: '50px' },
                }}
            >
                Donate3 is a web3 donation infrastructure for public good and creator.Let's accept donations from supporters with 5 minutes.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: { xs: 1, md: 3 },mt: { xs: '30px', lg: '30px' }, }}>
                <Button
                    onClick={() => {
                        router.push('/create');
                    }}
                    sx={{
                        width: '208px',
                        height: '48px',
                        background: '#ccff00',
                        border: '1px solid #283231',
                        boxShadow: '4px 4px 0px rgba(186, 206, 204, 0.9)',
                        borderRadius: '5px',
                        color: '#44443f',
                        fontWeight: '600',
                        fontSize: '20px',
                        lineHeight: '24px',
                        textAlign: 'center',
                    }}
                >
                    Create One
                </Button>

                <Button
                    onClick={() => {
                        window.location.href = '/demo';
                    }}
                    sx={{
                        width: '208px',
                        height: '48px',
                        background: '#FEFFE8',
                        border: '1px solid #283231',
                        boxShadow: '4px 4px 0px #CCFF00',
                        borderRadius: '5px',
                        color: '#44443f',
                        fontWeight: '600',
                        fontSize: '20px',
                        lineHeight: '24px',
                        textAlign: 'center',
                    }}
                >
                    Demo
                </Button>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center',  mt: '27px' }}>
                <Typography
                    sx={{
                        fontSize: '11px',
                        color: '#6F9492',
                        fontWeight: '500',
                        padding:'5px'
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

            <Box sx={{ height: '52px' }}/>
            <Box sx={{ position: 'relative',
                minHeight: { xs: '100vh', md: 'calc(100vh - 86px)' }}} >
           {/*     <GlowingCircle/>
                <GlowingCircleAroundleft/>*/}
                <Box
                    style={{
                        position: 'absolute',
                        width: '300px',
                        height: '349px',
                        left: '730px',
                        top: '-300px',
                        borderRadius: '50% / 40%',
                        backgroundImage: 'linear-gradient(to bottom right, rgb(195, 255, 54), #94dffc)',
                        opacity: 1,
                        filter: 'blur(180px)',
                        zIndex: 0,
                    }}
                />
                <Box
                    style={{
                        position: 'absolute',
                        width: '300px',
                        height: '349px',
                        left: '-200px',
                        top: '-100px',
                        borderRadius: '50% / 40%',
                        backgroundImage: 'linear-gradient(to bottom right, rgb(195, 255, 54), #94dffc)',
                        opacity: 1,
                        filter: 'blur(180px)',
                        zIndex: 0,
                    }}
                />
                <Box
                    component="img"
                    src="/images/demo1.png"
                    zIndex={-1}
                />
                <Box
                    component="img"
                    src="/right.png"
                    sx={{
                        position: 'absolute',
                        top: -100,
                        left: 650,
                        zIndex: 1,
                    }}
                />

            </Box>


        </Box>

    );
};


