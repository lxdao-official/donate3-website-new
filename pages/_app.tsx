// import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, polygonMumbai, goerli, optimism, arbitrum, zora } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Script from 'next/script';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const { chains, publicClient } = configureChains(
  [goerli, polygon, polygonMumbai],
  // [mainnet, polygon, optimism, arbitrum, zora],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Donate3',
  projectId: '489bba152ca535ae826ee62070ffcdfc',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const theme = createTheme({
  typography: {
    fontFamily: inter,
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        // maxWidthMd: {
        //   maxWidth: 320,
        // },
        maxWidthLg: {
          maxWidth: '1300px',
        },
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          {/* <CssBaseline /> */}
          <Component {...pageProps} />
          <Script src="https://cdn.jsdelivr.net/npm/donate3-sdk@1.0.5/dist/webpack/bundle.js" />
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}
