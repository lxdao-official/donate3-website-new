import Image from 'next/image';
import {Inter} from 'next/font/google';
import {Container, Button, Box, Typography, CssBaseline, Link, Divider, List} from '@mui/material';

import React from 'react';
import {DonateOverview} from "../components/DonateOverview1";


export function SectionClient() {
    const donateData = [
        {
            avatarSrc: "/test/themonkey.png",
            name: "Bogdan Krivenchenko",
            website: "www.example.com",
            description: "This is a introduction of this creator.This is a introduction of this creator.This is a introduction of this creator.This is a blabla...",
            donationCount: 198
        },
        {
            avatarSrc: "/test/themonkey.png",
            name: "Bogdan Krivenchenko",
            website: "www.example.org",
            description: "This is a introduction of this creator.This is a introduction of this creator.This is a introduction of this creator.This is a blabla...",
            donationCount: 150
        },
        // Add one more data entry as needed
        {
            avatarSrc: "/test/themonkey.png",
            name: "Bogdan Krivenchenko",
            website: "www.example.net",
            description: "This is a introduction of this creator.This is a introduction of this creator.This is a introduction of this creator.This is a blabla...",
            donationCount: 75
        }
    ];


    return (

        <Box
            sx={{
                display: 'flex',
                flexDirection: {xs: 'column', lg: 'column'},
                justifyContent: {xs: 'center', lg: 'center'},
                alignItems: 'center',
                minHeight: {xs: '100vh', md: 'calc(100vh )'},
            }}
        >


            <Typography
                variant="h1"

                sx={{
                    fontWeight: 800,
                    fontSize: {xs: '50px', sm: '54px', md: '56px'},
                    lineHeight: {xs: '37px', md: '64px'},
                    color: '#0F172A',
                    textAlign: {xs: 'center', lg: 'center'},
                    mt: {xs: '30px', lg: '86'},
                    mb: {xs: '30px', lg: '61px'},
                }}
            >
                Our client

            </Typography>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Box>
                    <img src="/client.png" alt="Left Image"/>
                </Box>
                <Box sx={{width: "65px"}}/>
                <Box>
                    <Box ml={2}>
                        <Typography variant="h3" sx={{
                            fontWeight: 700,
                            fontSize: {xs: '28px', sm: '54px', md: '28px'},
                            lineHeight: {xs: '37px', md: 'px'},
                            padding: {xs: '10px', sm: '30px', md: 0},
                            color: '#0F172A',
                            textAlign: {xs: 'left  ', lg: 'left'},
                            maxWidth: {xs: '800px', sm: '1300px'},
                            mt: {xs: '30px', lg: '0'},
                            mb: {xs: '30px', lg: '23px'},
                        }}>Public good</Typography>
                        <Typography variant="subtitle1"
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: {xs: '20px', sm: '20px', md: '20px'},
                                        lineHeight: {xs: '36px', md: '36 px'},
                                        color: '#334155',
                                        textAlign: {xs: 'left ', lg: 'left'},
                                        maxWidth: {xs: '150px', sm: '680px'},
                                        mt: {xs: '30px', lg: '23'},
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
                    fontSize: {xs: '28px', sm: '28px', md: '28px'},
                    lineHeight: {xs: '30px', md: '56px'},
                    padding: {xs: '10px', sm: '30px', md: 0},
                    color: '#000000',
                    textAlign: {xs: 'center', lg: 'center'},
                    maxWidth: {xs: '273px', sm: '273px'},
                    mt: {xs: '30px', lg: '119px'},
                }}
            >
                Creator
            </Typography>

            <Box sx={{
                display: 'flex',
                mt: {xs: '30px', lg: '105px'},
                mb: {xs: '30px', lg: '139px'},
                alignItems: 'center',

            }}>
                {donateData.map((data, index) => (
                    <DonateOverview key={index} data={data}/>
                ))}
            </Box>


        </Box>

    );
};


