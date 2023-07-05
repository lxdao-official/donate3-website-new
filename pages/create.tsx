import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Layout } from '@/components/Layout';
import { title } from 'process';
// import CustomWidget from '@/components/CustomWidget';

function MyTab({ title, icon, active, onClick }: { title: string, icon: string, active?: boolean, onClick?: () => void }) {
    return <Box onClick={onClick} sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100px',
        gap: 1,
        py: 2,
        cursor: 'pointer',
        fontBold: 600,
        bgcolor: active ? '#fcfede' : 'transparent',
    }}><Box component={'img'} src={icon} />
        {title}</Box>
}

export default function Create() {
    const [value, setValue] = React.useState(0);



    return <Layout bgColor='#fdfaf8'>
        <Box sx={{
            display: 'flex',
            gap: 10,
            minHeight: { xs: '100vh', md: 'calc(100vh - 130px)' },
            pb: 10,
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: "174px", gap: 2 }}>
                {[{ title: 'Dashboard', icon: '/icons/dashboard.svg' }, { title: 'Create', icon: '/icons/gear.svg' }].map((val, index) => <MyTab
                    key={index} active={value == index} title={val.title} icon={val.icon} onClick={() => { setValue(index) }} />)}

            </Box>
            <Box sx={{ width: "100%" }}>
                {/* <CustomWidget /> */}
            </Box>
        </Box>
    </Layout>
}