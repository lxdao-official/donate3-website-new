import Image from 'next/image';
import { Container, Button, Box, Typography, CssBaseline, Link, Divider, List } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { DonateOverview } from "../components/DonateOverview1";


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
            avatarSrc: "/test/themonkey.png",
            name: "Bogdan Krivenchenko",
            website: "www.example.com",
            description: "This is a introduction of this creator.This is a introduction of this creator.This is a introduction of this creator.This is a blabla...",
            donationCount: 198,
            avatarSrcArray: [
                '/test/mypng.png',
                '/test/mypng.png',
                '/test/mypng.png',
                '/test/mypng.png',
                '/test/mypng.png',
                '/test/mypng.png'
            ]
        },
        {
            avatarSrc: "/test/themonkey.png",
            name: "Bogdan Krivenchenko",
            website: "www.example.org",
            description: "This is a introduction of this creator.This is a introduction of this creator.This is a introduction of this creator.This is a blabla...",
            donationCount: 150,
            avatarSrcArray: [
                '/test/mypng.png',
                '/test/mypng.png',
                '/test/mypng.png',
                '/test/mypng.png',
                '/test/mypng.png',
                '/test/mypng.png'
            ]
        },
        // Add one more data entry as needed
        {
            avatarSrc: "/test/themonkey.png",
            name: "Bogdan Krivenchenko",
            website: "www.example.net",
            description: "This is a introduction of this creator.This is a introduction of this creator.This is a introduction of this creator.This is a blabla...",
            donationCount: 75,
            avatarSrcArray: [
                '/test/mypng.png',
                '/test/mypng.png',
                '/test/mypng.png',
                '/test/mypng.png',
                '/test/mypng.png',
                '/test/mypng.png'
            ]
        }
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
                    fontWeight: 800,
                    fontSize: { xs: '50px', sm: '54px', md: '56px' },
                    lineHeight: { xs: '37px', md: '64px' },
                    color: '#0F172A',
                    textAlign: { xs: 'center', lg: 'center' },
                    mt: { xs: '30px', lg: '86' },
                    mb: { xs: '30px', lg: '61px' },
                }}
            >
                Use cases

            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%', maxHeight: '100%', flexDirection: { xs: 'column', lg: 'row' }, }}>
                {/*  <Box>
                    <img src="/client.png" alt="Left Image"/>
                </Box>*/}
                <Box
                    component="img"
                    src="/images/client.png"
                    sx={{
                        width: { xs: '300px', sm: '420px', md: '510px' },
                        height: { xs: '300px', sm: '420px', md: '510px' },
                    }}
                />

                <Box sx={{ width: "65px" }} />
                <Box sx={{ display: 'flex', maxWidth: '100%', maxHeight: '100%' }}>
                    <Box ml={2}>
                        <Typography variant="h3" sx={{
                            fontWeight: 700,
                            fontSize: { xs: '28px', sm: '54px', md: '28px' },
                            lineHeight: { xs: '37px', md: 'px' },
                            padding: { xs: '10px', sm: '30px', md: 0 },
                            color: '#0F172A',
                            textAlign: { xs: 'center  ', lg: 'left' },
                            mt: { xs: '30px', lg: '0' },
                            mb: { xs: '30px', lg: '23px' },
                        }}>Get funded as public goods</Typography>
                        <Typography variant="subtitle1"
                            sx={{
                                fontWeight: 400,
                                fontSize: { xs: '20px', sm: '20px', md: '20px' },
                                lineHeight: { xs: '36px', md: '36 px' },
                                color: '#334155',
                                textAlign: { xs: 'left ', lg: 'left' },
                                maxWidth: { xs: '100%', sm: '680px' },
                                mt: { xs: '30px', lg: '23' },
                            }}>
                            In the real world, public goods like trees, museums, and parks are supported by governments
                            or public agencies, enhancing the beauty and charm of a city. However, in the web3 world, we
                            encounter numerous public goods that bring us joy but lack an equivalent role of government
                            or public agency to sustain and support them.
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Typography
                variant="h1"
                sx={{
                    fontWeight: 700,
                    fontSize: { xs: '25px', sm: '28px', md: '28px' },
                    lineHeight: { xs: '30px', md: '56px' },
                    padding: { xs: '10px', sm: '30px', md: 0 },
                    color: '#000000',
                    textAlign: { xs: 'center', lg: 'center' },
                    //maxWidth: {xs: '100%', sm: '400px',lg:'600px'},
                    mt: { xs: '30px', lg: '119px' },
                }}
            >
                Get supported as creators
            </Typography>

            <Box sx={{
                display: 'flex',
                mt: { xs: '30px', lg: '105px' },
                mb: { xs: '30px', lg: '139px' },
                alignItems: 'center',

                flexDirection: { xs: 'column', lg: 'row' },
                //margin:'37px'
            }}>

                {donateData.map((data, index) => (
                    <DonateOverview key={index} data={data} />
                ))}

            </Box>


        </Box>

    );
};


