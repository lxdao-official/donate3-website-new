import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Layout } from '@/components/Layout';
import { title } from 'process';
import CustomWidget from '../components/CustomWidget';
import SettingLayout from '../components/SettingLayout';

export default function Create() {
  return (
    <SettingLayout>
      <CustomWidget />
    </SettingLayout>
  );
}
