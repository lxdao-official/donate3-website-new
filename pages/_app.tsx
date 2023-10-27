import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DefaultSeo } from 'next-seo';

import '@rainbow-me/rainbowkit/styles.css';
import { connectorsForWallets, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, sepolia, WagmiConfig } from 'wagmi';
import { JoyIdWallet } from '@joyid/rainbowkit';
import { mainnet, polygon, polygonMumbai, goerli, optimism, arbitrum, zora, arbitrumGoerli, optimismGoerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Script from 'next/script';
import { DONATE_SDK_URL } from '@/utils/const';
import { Linea } from '@/utils/linea';

const { chains, publicClient } = configureChains(
  [mainnet, optimism, Linea, polygon, arbitrum, goerli, polygonMumbai, sepolia, optimismGoerli],
  // [mainnet, polygon, optimism, arbitrum, zora],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider(),
  ]
);

const wallet = getDefaultWallets({
  appName: 'Donate3',
  projectId: '489bba152ca535ae826ee62070ffcdfc',
  chains,
}).connectors();

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    ...wallet,
    ...connectorsForWallets([
      {
        groupName: 'Recommended',
        wallets: [
          JoyIdWallet({
            chains,
            options: {
              name: 'Donate3',
              logo: 'https://fav.farm/🆔',
            },
          }),
        ],
      },
    ])(),
  ],
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
    <>
      <ThemeProvider theme={theme}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <DefaultSeo
              title="Donate3 - Make donate in web3 so easy"
              description="Donate3 is a web3 donation tool. It enables public goods and creators to set up donations in just 5 minutes."
              canonical="https://www.donate3.xyz/donate3"
              openGraph={{
                url: 'https://www.donate3.xyz/donate3',
                title: 'Donate3 - Make donate in web3 so easy',
                description: 'Donate3 is a web3 donation tool. It enables public goods and creators to set up donations in just 5 minutes.',
                siteName: 'Donate3',
                images: [
                  {
                    url: ' https://www.donate3.xyz/logo.svg',
                    alt: 'Donate3 logo',
                    width: 46,
                    height: 46,
                  },
                ],
              }}
              twitter={{
                handle: '@donate3official',
                site: '@Donate3',
                cardType: 'summary_large_image',
              }}
              additionalLinkTags={[
                {
                  rel: 'icon',
                  href: 'https://www.donate3.xyz/logo.svg',
                },
              ]}
            />
            <Component {...pageProps} />
            <Script src={DONATE_SDK_URL} />
          </RainbowKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </>
  );
}
