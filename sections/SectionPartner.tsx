import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Container, Button, Box, Typography, CssBaseline, Link, Divider, List } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import {DonateOverview} from "../components/DonateOverview1";
import styled from "styled-components";
const inter = Inter({ subsets: ['latin'] });
const GlowingCircle = styled(Box)`
  position: absolute;
  width: 300px;
  height: 349px;
  left: 730px;
  //top: 1000px;
  border-radius: 50% / 40%;
  background-image: linear-gradient(to bottom right, rgba(205, 253, 4, 0.32), #3fcaff);
  opacity: 1;
  filter: blur(180px);
  z-index: 0;
`;

export  function  SectionPartner (){


    const router = useRouter();
    return (

        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'column' },
                justifyContent: { xs: 'center', lg: 'center' },
                alignItems: 'center',
                background: '#F8FAFC',
                height:"700px"
            }}
        >
<GlowingCircle/>

{/*
            <Typography
                variant="h1"

                sx={{
                    fontWeight: 800,
                    fontSize: { xs: '56px', sm: '56px', md: '56px' },
                    lineHeight: { xs: '64px', md: '64px' },
                    color: '#0F172A',
                    textAlign: { xs: 'center', lg: 'center' },
                    mt: { xs: '30px', lg: '86' },
                }}
                fontWeight={700}
            >
               Pulic Good Partner

            </Typography>
*/}



        </Box>

    );
};


