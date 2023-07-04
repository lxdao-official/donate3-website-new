import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Container, Box, Typography, CssBaseline, Link, Divider } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { Layout } from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  return (
    <Layout>
      123
    </Layout>
  )
}
