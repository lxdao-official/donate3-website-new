import Head from 'next/head';
import { Box, Container, CssBaseline, Divider, Typography, Link, Stack } from '@mui/material';
import { useRouter } from 'next/router';

import LXDAOFooter from './LXDAOFooter';
import ConnectBtn from './ConnectBtn';

function MyContainer({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <Container maxWidth={false} style={style}>
      {children}
    </Container>
  );
}

function Header() {
  const router = useRouter();
  return (
    <MyContainer>
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} height={{ md: '130px', xs: '65px' }} mb={{ xs: '20px', md: '0px' }}>
        <Box
          onClick={() => {
            router.push(`/`);
          }}
          sx={{ cursor: 'pointer', width: '150px' }}
          display="flex"
        >
          <Box component="img" src="/logo.svg" />
          <Typography
            variant="h5"
            paddingLeft="14px"
            sx={{
              lineHeight: { xs: '50px', lg: '50px' },
              fontSize: { xs: '20px', lg: '26px' },
              fontWeight: 600,
              ':hover': {
                textShadow: '2px 2px  #bdd75d',
              },
            }}
          >
            Donate3
          </Typography>
        </Box>

        <Box sx={{ width: '200px', textAlign: 'right' }}>
          <ConnectBtn />
        </Box>
      </Box>
    </MyContainer>
  );
}

const Footer = () => (
  <MyContainer>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100px',
      }}
    >
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
          <Link key={index} color={'#929F9E'} href={val.href} target="_blank" underline="none" sx={{ cursor: 'pointer' }}>
            <Typography fontSize={{ xs: '12px', md: '16px' }} lineHeight={{ xs: '12px', md: '16px' }}>
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
  </MyContainer>
);

export function Layout({ style, children, title = 'Donate3 - Make donate in web3 so easy', bgColor = 'linear-gradient(180deg, #FDFAF8 0%, #FDFAF8 49.35%, #D8E0E0 72.79%, #A8C4C2 100%);' }: { style?: React.CSSProperties; children: React.ReactNode; title?: string; bgColor?: string }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="icon" href="/icons/favicon.png" />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>
      <Box
        sx={{
          background: bgColor,
          zIndex: 1,
        }}
      >
        <Header />
        <CssBaseline />
        <MyContainer style={style}>{children}</MyContainer>
        <Divider />
        <LXDAOFooter />
      </Box>
    </>
  );
}
