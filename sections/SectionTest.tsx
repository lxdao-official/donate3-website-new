
import { Button, Box, Typography, List} from '@mui/material';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import React from 'react';


/*
const CircleBg = styled(Box)`
  position: absolute;
  width: 100%;
  height: 35%;
  left: 0;
  bottom: 0;
  border-radius: 50%;
  top:75%;
  background: linear-gradient(142.97deg, #D3FF2552, #94dffc);
  opacity: 0.7;
  filter: blur(5vw);
  pointer-events: none;
  z-index: 0; /!* 可以根据需要调整 z-index 值 *!/

`;

*/


export function SectionTest() {
    const router = useRouter();
    return (

        <Box

            sx={{

                display: 'flex',
                flexDirection: {xs: 'column', lg: 'column'},
                justifyContent: {xs: 'center', lg: 'center'},
                alignItems: 'center',
                minHeight: {xs: '100vh', md: 'calc(100vh )'},
                mt: {xs: '30px', lg: '188px'},

            }}
        >

           {/*<HeartBg/>*/}
            <HeartShape/>
        </Box>

    );
};
const HeartShape = styled('div')`
  position: absolute;
  width: 100%;
  height: 35%;
  left: 0;
  bottom: 0;
  top: 75%;
  opacity: 0.7;
  pointer-events: none;
  z-index: 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -25px;
    width: 52px;
    height: 72px;
    background-color: #D3FF25;
    border-radius: 50px 50px 0 0;
  }

  &::before {
    transform: rotate(-45deg);
    left: calc(50% - 26px);
  }

  &::after {
    transform: rotate(45deg);
    right: calc(50% - 40px);
  }
`;


const HeartBg = styled(Box)`
  position: absolute;
  width: 100%;
  height: 35%;
  left: 0;
  bottom: 0;
  top: 75%;
  opacity: 0.7;
  pointer-events: none;
  z-index: 0;

  &::after,
  &::before {
    position: absolute;
    content: '';
    left: 50%;
    top: 0;
    width: 52px;
    height: 80px;
    background: linear-gradient(142.97deg, #D3FF2552, #94dffc);
    border-radius: 50px 50px 0 0;
    transform: translateX(-50%) rotate(45deg);
    transform-origin: 0 100%;
  }

  &::before {
    transform: translateX(-50%) rotate(-45deg);
  }
`;
