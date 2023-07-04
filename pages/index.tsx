import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Container, Button, Box, Typography, CssBaseline, Link, Divider, List } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { Layout } from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] })
enum supportList {
  ethereum = 'ethereum',
  polygon = 'polygon',
  // optimism = 'optimism',
  // gnosis = 'gnosis',
  // avalanche = 'avalanche',
  // fantom = 'fantom',
  // arbitrum = 'arbitrum',
  // bsc = 'bsc',
}

export default function Home() {
  const router = useRouter();
  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', lg: 'row' },
          justifyContent: { xs: 'center', lg: 'space-between' },
          alignItems: 'center',
          minHeight: { xs: '100vh', md: 'calc(100vh - 130px)' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: { xs: 'center', lg: 'start' },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '20px', sm: '24px', md: '30px' },
              lineHeight: { xs: '30px', md: '56px' },
              padding: { xs: '10px', sm: '30px', md: 0 },
              color: '#000000',
              textAlign: { xs: 'center', lg: 'left' },
              maxWidth: { xs: '300px', sm: '500px' },
              mt: { xs: '30px', lg: '0' },
              mb: { xs: '30px', lg: '100px' },
            }}
          >
            Create a piece of code, or a link, posted anywhere, anyone can
            initiate a donation to you through any EVM compatibility chain
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: "column", lg: "row" }, gap: { xs: 1, md: 3 } }}>
            <Button
              onClick={() => {
                router.push('/donate');
              }}
              sx={{
                width: '208px',
                height: '48px',
                background: '#ccff00',
                border: '1px solid #283231',
                boxShadow: '4px 4px 0px rgba(186, 206, 204, 0.9)',
                borderRadius: '5px',
                color: '#44443f',
                fontWeight: '600',
                fontSize: '20px',
                lineHeight: '24px',
                textAlign: 'center',
              }}
            >
              Create One
            </Button>
            <Button
              onClick={() => { window.location.href = '/demo' }}
              sx={{
                width: '208px',
                height: '48px',
                background: '#ccff00',
                border: '1px solid #283231',
                boxShadow: '4px 4px 0px rgba(186, 206, 204, 0.9)',
                borderRadius: '5px',
                color: '#44443f',
                fontWeight: '600',
                fontSize: '20px',
                lineHeight: '24px',
                textAlign: 'center',
              }}
            >
              Demo
            </Button>
          </Box>

          <Box sx={{ mt: '25px' }}>
            <Typography
              sx={{
                fontSize: '11px',
                color: '#6F9492',
                fontWeight: '500',
              }}
            >
              Support:
            </Typography>
            <List sx={{ display: 'flex', flexDirection: 'row' }}>
              {Object.keys(supportList).map((item) => {
                return (
                  <Box
                    key={item}
                    component="img"
                    title={item}
                    src={`icons/support/${item}.svg`}
                    sx={{ mr: 1 }}
                  />
                );
              })}
            </List>
          </Box>
        </Box>

        <Box
          component="img"
          src="/demo.png"
          sx={{
            width: { xs: '300px', sm: '420px', md: '700px' },
            height: { xs: '212px', sm: '310px', md: '580px' },
          }}
        />


      </Box>
    </Layout>
  )
}
