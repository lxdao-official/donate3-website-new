
import { useRouter } from 'next/router';
import React from 'react';
import { Layout } from '../components/Layout';
import { SectionHero } from '../sections/SectionHero'
import { SectionClient } from '../sections/SectionClient'
import { SectionFeacture } from "../sections/SectionFeatrues";
import { SectionPartner } from "../sections/SectionPartner";
export default function Home() {
  const router = useRouter();
  return (
    <Layout>
      <SectionHero />
      <SectionClient />
      <SectionFeacture />
      <SectionPartner />

    </Layout>
  );
}
