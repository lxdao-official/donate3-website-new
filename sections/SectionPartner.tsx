import Image from 'next/image';
import {Inter} from 'next/font/google';
import {Container, Button, Box, Typography, CssBaseline, Link, Divider, List} from '@mui/material';
import {useRouter} from 'next/router';
import React from 'react';
import {DonateOverview} from "../components/DonateOverview1";
import styled from "styled-components";

const inter = Inter({subsets: ['latin']});

export function SectionPartner() {


    const router = useRouter();
    return (

        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                background: '#F8FAFC',
                height: "700px",
                marginLeft: '-16px',
                marginRight: '-16px',
                flexDirection: {xs: 'column', lg: 'column'},
                justifyContent: {xs: 'center', lg: 'center'},
            }}
        >
            <Typography
                variant="h1"

                sx={{
                    fontWeight: 800,
                    fontSize: {xs: '40px', sm: '54px', md: '72px'},
                    lineHeight: {xs: '37px', md: '64px'},
                    color: '#000000',
                    textAlign: {xs: 'center', lg: 'center'},
                    minWidth: '100%'

                }}
            >
                Our partners

            </Typography>


            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mt: '96px',
                maxWidth: '100%',
                marginLeft: {xs: '-15px', sm: '-15px', lg: '0px'},
                flexDirection: {xs: 'column', lg: 'row'},
                justifyContent: {xs: 'center', lg: 'center'},

            }}>


                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '180px',
                        height: '70px',
                        border: '1px solid',
                        borderColor: '#E2E8F0',
                        borderRadius: '3%',
                        marginLeft: '24px',
                        mt:'5px'
                    }}
                >
                    <Box
                        component="img"
                        src="/icons/pLxdao.svg"
                        sx={{
                            marginLeft: '20px',
                            maxWidth: '32px',

                        }}
                    >


                    </Box>
                    <Typography
                        variant="h3"

                        sx={{
                            fontWeight: 600,
                            fontSize: {xs: '23px', sm: '23px', md: '23px'},
                            lineHeight: {xs: '36px', md: '36px'},
                            color: '#000000',
                            textAlign: {xs: 'center', lg: 'center'},
                            marginLeft: {lg: '8px'}
                        }}
                    >
                        LXDAO

                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '180px',
                        height: '70px',
                        border: '1px solid',
                        borderColor: '#E2E8F0',
                        borderRadius: '3%',
                        marginLeft: '24px',
                        mt:'5px'
                    }}
                >
                    <Box
                        component="img"
                        src="/icons/pLxdao.svg"
                        sx={{
                            marginLeft: '20px',
                            maxWidth: '32px',

                        }}
                    >


                    </Box>
                    <Typography
                        variant="h3"

                        sx={{
                            fontWeight: 600,
                            fontSize: {xs: '23px', sm: '23px', md: '23px'},
                            lineHeight: {xs: '36px', md: '36px'},
                            color: '#000000',
                            textAlign: {xs: 'center', lg: 'center'},
                            marginLeft: {lg: '8px'}
                        }}
                    >
                        LXDAO

                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '180px',
                        height: '70px',
                        border: '1px solid',
                        borderColor: '#E2E8F0',
                        borderRadius: '3%',
                        marginLeft: '24px',
                        mt:'5px'
                    }}
                >
                    <Box
                        component="img"
                        src="/icons/pLxdao.svg"
                        sx={{
                            marginLeft: '20px',
                            maxWidth: '32px',

                        }}
                    >


                    </Box>
                    <Typography
                        variant="h3"

                        sx={{
                            fontWeight: 600,
                            fontSize: {xs: '23px', sm: '23px', md: '23px'},
                            lineHeight: {xs: '36px', md: '36px'},
                            color: '#000000',
                            textAlign: {xs: 'center', lg: 'center'},
                            marginLeft: {lg: '8px'}
                        }}
                    >
                        LXDAO

                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '180px',
                        height: '70px',
                        border: '1px solid',
                        borderColor: '#E2E8F0',
                        borderRadius: '3%',
                        marginLeft: '24px',
                        mt:'5px'
                    }}
                >
                    <Box
                        component="img"
                        src="/icons/pLxdao.svg"
                        sx={{
                            marginLeft: '20px',
                            maxWidth: '32px',

                        }}
                    >


                    </Box>
                    <Typography
                        variant="h3"

                        sx={{
                            fontWeight: 600,
                            fontSize: {xs: '23px', sm: '23px', md: '23px'},
                            lineHeight: {xs: '36px', md: '36px'},
                            color: '#000000',
                            textAlign: {xs: 'center', lg: 'center'},
                            marginLeft: {lg: '8px'}
                        }}
                    >
                        LXDAO

                    </Typography>
                </Box>
                <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '180px',
                    height: '70px',
                    border: '1px solid',
                    borderColor: '#E2E8F0',
                    borderRadius: '3%',
                    marginLeft: '24px',
                    mt:'5px'
                }}
            >
                <Box
                    component="img"
                    src="/icons/pLxdao.svg"
                    sx={{
                        marginLeft: '20px',
                        maxWidth: '32px',

                    }}
                >


                </Box>
                <Typography
                    variant="h3"

                    sx={{
                        fontWeight: 600,
                        fontSize: {xs: '23px', sm: '23px', md: '23px'},
                        lineHeight: {xs: '36px', md: '36px'},
                        color: '#000000',
                        textAlign: {xs: 'center', lg: 'center'},
                        marginLeft: {lg: '8px'}
                    }}
                >
                    LXDAO

                </Typography>
            </Box>



            </Box>


        </Box>

    );
};


