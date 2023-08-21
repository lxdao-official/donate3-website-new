import React from 'react';
import {Box, Typography} from '@mui/material';

export function DonateOverview({data}: { data: { avatarSrc: string, name: string, website: string, description: string, donationCount: number, avatarSrcArray: string[] } }) {
    const {avatarSrc, name, website, description, donationCount} = data;

    return (
        <Box
            sx={{
                width: {xs: '360px', md: '360px', sm: '392px'},
                height: '380px',
                /*marginLeft:{xs:'3px',md:'3px',sm:'41px'},*/
                display: 'flex',
                flexDirection: 'column',
                padding: '35px',
                boxShadow: 'none',
                borderRadius: '3%',
                border: '0.5px solid',
                borderColor: '#E2E8F0',
                backgroundColor:'#FFFFFF',
                marginLeft: {md: '41px'},
                transition: 'box-shadow 0.3s', // 添加过渡效果
                mt: {xs: '20px', lg: '0px'},
                '&:hover': {
                    boxShadow: '0px 20px 50px 0px #1D50751F',
                },
            }}
        >
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Box
                    component="img"
                    src={avatarSrc}
                    alt="Avatar"
                    style={{
                        borderRadius: '50%',
                        width: '80px',
                        height: '80px',
                        border: '0.5px solid #E2E8F0'
                    }}
                />
                <Box ml={2} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
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
                        href={`https://${website}`} // 在href属性中添加'https://'前缀
                        target="_blank"
                        rel="noopener noreferrer"

                        sx={{
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '28px',
                            color: '#64748B',
                            textDecoration: 'none'
                        }} // 设置 color 属性的值为 '#64748B'
                    >
                        {website}
                    </Typography>

                </Box>
            </Box>
            <Typography variant="h3" sx={{
                fontWeight: 400,
                fontSize: {xs: '20px', sm: '20px', md: '20px'},
                lineHeight: {xs: '36px', md: '36px'},
                color: '#64748B',
                textAlign: {xs: 'left', lg: 'left'},
                minWidth: {xs: '321px', sm: '321px'},
                minHeight: {xs: '144px', sm: '144px', lg: '144px'},
                mt: {xs: '5px', md: '32px', sm: '37px'},
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'normal',

            }}>
                {description}
            </Typography>

            <Box sx={{
                mt: {xs: '25px', sm: '25px', md: '25px'},
                display: 'flex',
                alignItems: 'center',
                mb: {xs: '32px', sm: '32px', md: '32px'}
            }}>
                {data.avatarSrcArray.slice(0, 4).map((src, index) => (
                    <img
                        key={`avatar-${index}`}
                        src={src}
                        alt={`Avatar ${index + 1}`}
                        style={{
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            marginLeft: index > 0 ? '-10px' : '0'
                        }}
                    />
                ))}
                {donationCount > 0 && (
                    <Box
                        sx={{
                            position: 'relative',
                            marginLeft: '-10px',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                        }}
                    >
                        <img
                            src={data.avatarSrcArray[data.avatarSrcArray.length - 1]}
                            alt={`Avatar ${data.avatarSrcArray.length}`}
                            style={{borderRadius: '50%', width: '100%', height: '100%'}}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                borderRadius: '50%',

                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: {xs: '14px', sm: '14px', md: '14px'},
                                    lineHeight: {xs: '26px', md: '26px'},
                                    color: '#FFFFFF',
                                }}
                            >
                                {donationCount}
                            </Typography>
                        </Box>
                    </Box>
                )}
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 400,
                        fontSize: {xs: '14px', sm: '14px', md: '14px'},
                        lineHeight: {xs: '26px', md: '26px'},
                        color: '#475569',
                        marginLeft: '12px',
                        textAlign: {xs: 'left', lg: 'left'},
                        //maxHeight:'30px'
                        whiteSpace: 'nowrap',
                    }}
                >
                    {donationCount} people have donated
                </Typography>
            </Box>

        </Box>
    );
}
