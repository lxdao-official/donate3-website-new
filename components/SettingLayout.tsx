import * as React from 'react';
import Box from '@mui/material/Box';
import { Layout } from '@/components/Layout';
import { useRouter } from 'next/router';

function MyTab({ title, icon, active, onClick }: { title: string; icon: string; active?: boolean; onClick?: () => void }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: { xs: '130px', md: '174px' },
        borderRadius: '100px',
        gap: 1,
        py: 2,
        cursor: 'pointer',
        fontBold: 600,
        color:"rgba(15, 23, 42, 1)",
        fontSize: '16px',
        bgcolor: active ? "rgba(204, 255, 0, 1)" : 'transparent',
      }}
    >
      <Box component={'img'} src={icon} />
      {title}
    </Box>
  );
}

export default function SettingLayout({ children }: { children: React.ReactNode }) {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  return (
    <Layout bgColor="#F8FAFC" style={{maxWidth:'1512px'}}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          minHeight: { xs: '100vh', md: 'calc(100vh - 130px)' },
          pb: 10,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', md: 'column' },
            justifyContent: { xs: 'center', md: 'flex-start' },
            width: { xs: 'auto', md: '174px' },
            gap: 2,
          }}
        >
          {[
            { title: 'Dashboard', icon: '/icons/dashboard.svg', path: '/dashboard' },
            { title: 'History', icon: '/icons/dashboard.svg', path: '/donateHistory' },
            { title: 'Widget', icon: '/icons/gear.svg', path: '/create' },
          ].map((val, index) => {
            return (
              <MyTab
                onClick={() => {
                  router.push(val.path);
                }}
                key={index}
                active={router.asPath.startsWith(val.path)}
                title={val.title}
                icon={val.icon}
              />
            );
          })}
        </Box>
        <Box sx={{ width: '100%' }}>{children}</Box>
      </Box>
    </Layout>
  );
}
