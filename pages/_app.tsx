import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, sepolia, WagmiConfig } from 'wagmi';
import { mainnet, polygon, polygonMumbai, goerli, optimism, arbitrum, zora, arbitrumGoerli, optimismGoerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Script from 'next/script';
import { DONATE_SDK_URL } from '@/utils/const';
import { Linea } from '@/utils/linea';

const { chains, publicClient } = configureChains(
  [mainnet, optimism, Linea, polygon, arbitrum, goerli, polygonMumbai, sepolia],
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
    fontFamily: ['inter', 'sans-serif'].join(','),
    /*Arial, sans-serif', */
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
          {/*<CssBaseline />*/}
          <Component {...pageProps} />
          <Script src={DONATE_SDK_URL} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}
