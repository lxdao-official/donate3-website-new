import { Box, Container, CssBaseline, Divider, Typography, Link, Stack } from '@mui/material';
import { ConnectBtn } from '@/components/ConnectBtn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';

function MyContainer({ children }: { children: React.ReactNode }) {
    return < Container maxWidth={false} sx={{ maxWidth: '1320px' }}>
        {children}
    </Container >
}

function Header() {
    const router = useRouter();
    return <MyContainer>
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            height={{ md: '130px', xs: '65px' }}
        >
            <Box
                onClick={() => {
                    router.push(`/`);
                }}
                sx={{ cursor: 'pointer', width: '150px' }}
                display="flex"
            >
                <Box component="img" src="/logo.svg" />
                {/* <Image src="/logo.svg" alt='' width={50} height={50} /> */}
                <Typography
                    variant="h5"
                    paddingLeft="14px"
                    sx={{ lineHeight: '50px' }}
                >
                    Donate3
                </Typography>
            </Box>
            <Box sx={{ width: '200px', textAlign: 'right' }}>
                <ConnectBtn />
            </Box>
        </Box>
    </MyContainer>
}

const Footer = () => (
    <MyContainer >
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100px',
        }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: '10px', md: '60px' },
                }}
            >
                {[
                    { text: 'Bug/Feedback report', href: 'https://forms.gle/swWVREprKgkjh6Rf8' },
                    { text: 'More Info', href: 'https://lxdao.notion.site/All-you-need-to-know-93ba53c2651f4284ac088eb787642168?pvs=4' },
                    // { text: 'Status', href: '' },
                    { text: '©2022 Donate3.xyz', href: '' },
                ].map((val, index) => (
                    <Link key={index} color={'#929F9E'} href={val.href} target='_blank' underline="none" sx={{ cursor: 'pointer' }}>
                        <Typography
                            fontSize={{ xs: '12px', md: '16px' }}
                            lineHeight={{ xs: '12px', md: '16px' }}
                        >
                            {val.text}
                        </Typography>
                    </Link>
                ))}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: { xs: '6px', md: '44px' },
                }}
            >
                {[
                    { src: '/icons/twitter.svg', href: 'https://twitter.com/LXDAO_Official' },
                    { src: '/icons/discord.svg', href: 'https://discord.lxdao.io' },
                    { src: '/icons/github.svg', href: 'https://github.com/lxdao-official/donate3-sdk' },
                ].map((val, index) => (
                    <Link key={index} href={val.href}>
                        <Box component="img" src={val.src}></Box>
                    </Link>
                ))}
            </Box>
        </Box>

    </MyContainer >
);


export function Layout({ children, bgColor = 'linear-gradient(180deg, #FDFAF8 0%, #FDFAF8 49.35%, #D8E0E0 72.79%, #A8C4C2 100%);' }: { children: React.ReactNode, bgColor?: string }) {
    return <Box
        sx={{
            background: bgColor,
        }}
    >
        <Header />
        <CssBaseline />
        <MyContainer>
            {children}
        </MyContainer>
        <Divider />
        <Footer />
    </Box >

}