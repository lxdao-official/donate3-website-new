import React from 'react';
import {Box, Typography} from '@mui/material';

export function DonateOverview({data}: {data:{ avatarSrc: string, name: string, website: string, description: string, donationCount: number }}) {
    const {avatarSrc, name, website, description, donationCount} = data;

    return (
        <Box
            sx={{
                width: '392px',
                height: '380px',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                boxShadow: 'none',
                borderRadius:'3%',
                transition: 'box-shadow 0.3s', // 添加过渡效果
                mt:{xs:'20px' , lg:'0px'},
                '&:hover': {
                    boxShadow: '0px 20px 50px 0px #1D50751F',
                },
            }}
        >
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Box>
                    <img src={avatarSrc} alt="Avatar" style={{borderRadius: '50%', width: '80px', height: '80px'}}/>
                </Box>
                <Box ml={2}>
                    <Typography variant="h3" sx={{
                        fontWeight: 700,
                        fontSize: {xs: '20px', sm: '20px', md: '20px'},
                        lineHeight: {xs: '28px', md: '28px'},
                        padding: {xs: '10px', sm: '30px', md: 0},
                        color: '#000000',
                        textAlign: {xs: 'left', lg: 'left'},

                    }}>{name}</Typography>
                    <Typography
                        variant="body1"
                        component="a"
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"

                        sx={{color: '#64748B', textDecoration: 'none'}} // 设置 color 属性的值为 '#64748B'
                    >
                        {website}
                    </Typography>

                </Box>
            </Box>
            <Box sx={{height: '37px'}}/>
            <Typography variant="h3" sx={{
                fontWeight: 400,
                fontSize: {xs: '20px', sm: '20px', md: '20px'},
                lineHeight: {xs: '36px', md: '36px'},
                padding: {xs: '10px', sm: '30px', md: 0},
                color: '#64748B',
                textAlign: {xs: 'left', lg: 'left'},
                maxWidth: {xs: '400px', sm: '400px'},
            }}>
                {description}
            </Typography>
            <Box sx={{marginTop: 'auto', display: 'flex', alignItems: 'center'}}>
                <img src="/test/mypng.png" alt="Avatar 1" style={{borderRadius: '50%', width: '30px', height: '30px'}}/>
                <img src="/test/mypng.png" alt="Avatar 2"
                     style={{borderRadius: '50%', width: '30px', height: '30px', marginLeft: '-10px'}}/>
                <img src="/test/mypng.png" alt="Avatar 3"
                     style={{borderRadius: '50%', width: '30px', height: '30px', marginLeft: '-10px'}}/>
                <img src="/test/mypng.png" alt="Avatar 4"
                     style={{borderRadius: '50%', width: '30px', height: '30px', marginLeft: '-10px'}}/>
                <img src="/test/mypng.png" alt="Avatar 5"
                     style={{borderRadius: '50%', width: '30px', height: '30px', marginLeft: '-10px'}}/>
                <img src="/test/mypng.png" alt="Avatar 6"
                     style={{borderRadius: '50%', width: '30px', height: '30px', marginLeft: '-10px'}}/>
                <Typography variant="body2" sx={{
                    fontWeight: 700,
                    fontSize: {xs: '14px', sm: '14px', md: '14px'},
                    lineHeight: {xs: '26px', md: '26px'},
                    padding: {xs: '10px', sm: '30px', md: 0},
                    color: '#475569',
                    textAlign: {xs: 'left', lg: 'left'},
                }}>{donationCount} people have donated</Typography>
            </Box>
        </Box>
    );
}
