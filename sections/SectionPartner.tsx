import {Box, Typography} from '@mui/material';
import React from 'react';


export function SectionPartner() {

    return (

        <Box
            bgcolor='#F8FAFC'
            sx={{
                display: 'flex',
                alignItems: 'center',
                background: '#F8FAFC',
                minHeight: {xs: 'calc(60vh)', md: 'calc(60vh)'},
               // marginLeft: '-16px',
               // marginRight: '-16px',
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
                mt: {xs:'48px',lg:'96px'},
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
                        //marginLeft: '24px',
                        mt: '5px'
                    }}
                >

                    <Box
                        component="img"
                        src="/icons/ldxdaologowhole.svg"
                        sx={{

                            marginLeft: '36px',
                            marginTop: '19px',
                            marginBottom: '19px',

                        }}
                    >


                    </Box>


                </Box>


            </Box>


        </Box>

    );
};


