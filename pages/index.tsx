import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Container, Button, Box, Typography, CssBaseline, Link, Divider, List } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { Layout } from '../components/Layout';
import {SectionHero} from '../sections/SectionHero'
import {SectionClient} from '../sections/SectionClient'
import {SectionFeacture} from "../sections/SectionFeatrues";
import {SectionPartner} from "../sections/SectionPartner";
import {SectionTest} from  "../sections/SectionTest";
export default function Home() {
  const router = useRouter();
  return (
    <Layout>
        {/*<SectionTest/>*/}
        <SectionHero/>
        <SectionClient/>
        <SectionFeacture/>
        <SectionPartner/>

    </Layout>
  );
}
