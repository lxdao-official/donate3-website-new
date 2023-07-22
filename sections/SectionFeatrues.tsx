import Image from 'next/image';
import {Container, Button, Box, Typography, CssBaseline, Link, Divider, List} from '@mui/material';
import React from 'react';
import {DonateOverview} from "../components/DonateOverview1";
import {BigFeaturesDetail} from "../components/BigFeaturesDetail";
import {FeaturesDetail} from "../components/FeaturesDetail";

export function SectionFeacture() {


    return (

        <Box

            sx={{
                display: 'flex',
                flexDirection: {xs: 'column', lg: 'column'},
                justifyContent: {xs: 'center', lg: 'center'},
                alignItems: 'center',
                minHeight: {xs: '100vh', md: 'calc(100vh)'},
                background: '#0F172A',


            }}

        >


            <Typography
                variant="h1"

                sx={{
                    fontWeight: 800,
                    fontSize: {xs: '56px', sm: '54px', md: '56px'},
                    lineHeight: {xs: '37px', md: '64px'},
                    padding: {xs: '10px', sm: '30px', md: 0},
                    color: '#FFFFFF',
                    textAlign: {xs: 'center', lg: 'center'},
                    mt: {xs: '30px', lg: '86px'},
                }}
                fontWeight={700}
            >
                Featrues

            </Typography>
            <Box

                sx={
                    {
                  /*  display:'flex',*/
                        mt: {xs: '72px', lg: '72px'},
                        maxWidth: '1258px',

                    }}>

                <Box display='flex'>

                    <BigFeaturesDetail data={{
                        iconSrc: "/feacturesIcons/icon-2.png",
                        title: "Multi-chain and multi-coin",
                        description: "Donate3 utilizes Infura's RPC endpoints to access mainstream EVM chains, supporting multiple token donations to enrich your funding sources."
                    }}/>
                    <Box sx={{width: '48px'}}/>
                    <BigFeaturesDetail data={{
                        iconSrc: "/feacturesIcons/icon-1.png",
                        title: "Donation certificate ",
                        description: "Donate3 improves data security by employing a decentralized storage approach and generating an EAS certificate for every donation."
                    }}/>

                </Box>

                <Box sx={{height: '52px'}}/>

                <Box display='flex'>

                    <FeaturesDetail data={{
                        iconSrc: "/feacturesIcons/icon-3.png",
                        title: "Easy integration",
                        description: "Creating your own beautiful donation link/widget takes just 5 minutes."
                    }}/>

                    <Box sx={{width: '41px'}}/>

                    <FeaturesDetail data={{
                    iconSrc: "/feacturesIcons/icon-4.png",
                    title: "Data analysis",
                    description: "Using Donate3, you can track your income and easily see your supporters, allowing you to give back to them."
                }}/>

                    <Box sx={{width: '41px'}}/>

                    <FeaturesDetail data={{
                    iconSrc: "/feacturesIcons/icon-5.png",
                    title: "Smooth experience",
                    description: "The seamless connection between PC and mobile wallets in Donate3 enables smooth and unhindered donation experiences."
                }}/>
                </Box>
            </Box>

            {/* 新的底部背景色空白 */}
            <Box sx={{ height: '126px', background: '#0F172A' }} />
        </Box>

    );
};


