import React from 'react';

import { Box, Grid, Link, Typography, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import CommunityLinkGroup from './CommunityLinkGroup';
// import Container from './Container';


const NavList = ({ title, items }: { title: string, items: { name: string, link: string }[] }) => (
    <Box display="flex" flexDirection="column">
        <Typography variant="h6" lineHeight="58px" color="black" fontWeight={700}>
            {title}
        </Typography>
        {items.map((item, index) => {
            return (
                <Link target="_blank" href={item.link} sx={{ textDecoration: 'none' }} key={index}>
                    <Typography color="#646F7C" variant="body1" lineHeight="40px" fontWeight={400}>
                        {item.name}
                    </Typography>
                </Link>
            );
        })}
    </Box>
);

const LXDAOFooter = () => {
    const theme = useTheme();
    return (
        // <Box sx={{ background: '#ffffff', }} width="100%">
        <Container maxWidth={false} sx={{ maxWidth: '1370px', paddingY: { md: '50px', xs: '44px' } }}>
            <Box display="flex" flexDirection={{ lg: 'row', md: 'column', xs: 'column' }}>
                <Grid container spacing={{ lg: 6, md: 8 }} flex={2}>
                    <Grid item lg={4} md={4} xs={6}>
                        <NavList
                            title="LX Projects"
                            items={[
                                {
                                    name: 'My First NFT',
                                    link: 'https://myfirstnft.info/',
                                },
                                {
                                    name: 'My First Layer2',
                                    link: 'https://layer2.myfirst.io/',
                                },
                                {
                                    name: 'EIPs.Fun',
                                    link: 'https://eips.fun/',
                                },
                            ]}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} xs={6}>
                        <NavList
                            title="Buidl Together"
                            items={[
                                { name: 'Join Us', link: 'https://lxdao.notion.site/All-you-need-to-know-93ba53c2651f4284ac088eb787642168?pvs=4' },
                                {
                                    name: 'Github',
                                    link: 'https://github.com/lxdao-official/donate3-sdk',
                                },
                                {
                                    name: 'Donate',
                                    link: '/demo',
                                },
                            ]}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} xs={6}>
                        <NavList
                            title="About Us"
                            items={[
                                { name: 'Telegram', link: 'https://t.me/+lEe31QZahGhkYmM1' },
                                {
                                    name: 'Twitter',
                                    link: 'https://twitter.com/donate3official',
                                },
                                { name: 'Forum', link: 'https://forum.lxdao.io/c/projects/006-donate3/24' },
                            ]}
                        />
                    </Grid>
                </Grid>
                <Box display="flex" gap="24px" flexDirection="column" marginTop={{ lg: 0, xs: 4 }} flex={1}>
                    <Box>
                        <Typography variant="h6" lineHeight="58px" color="black" fontWeight={700}>
                            Product of
                        </Typography>
                        <Box width="147px" height="58px" component={'img'} src={'/icons/lxdao-logo.svg'} />
                    </Box>

                    <Typography variant="body1" lineHeight="24px" fontWeight={400} color="#666F85" textTransform="uppercase">
                        LXDAO is an <span style={{ color: '#3C7AFF' }}>R&D</span>
                        -focused DAO in Web3
                    </Typography>
                    <CommunityLinkGroup marginBottom={0} />
                </Box>
            </Box>
        </Container>
        // </Box>
    );
};

export default LXDAOFooter;
