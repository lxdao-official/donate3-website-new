import React, { useMemo } from 'react';
import { Box, Button } from '@mui/material';
import Image from 'next/image';

import { ICustomWidget } from '../CustomWidget';
import { DEFAULT_CREATE_CONFIG } from '@/utils/const';

interface IPersonalDetailsProps {
  info: Pick<ICustomWidget, 'avatar' | 'name' | 'twitter' | 'telegram'>;
}

const PersonalDetails = ({ info = DEFAULT_CREATE_CONFIG }: IPersonalDetailsProps) => {
  const { name, twitter = '', telegram = '' } = info;

  const memoMedias = useMemo(() => {
    const medias = [];
    const telegramInfo = {
      src: './icons/donateTo/TelegramSvg.svg',
      alt: 'Telegram',
    };
    const twitterInfo = {
      src: './icons/donateTo/TwitterSvg.svg',
      alt: 'Twitter',
    };

    twitter && medias.push(telegramInfo);
    telegram && medias.push(twitterInfo);
    return medias;
  }, [twitter, telegram]);

  const medias = [
    {
      src: './icons/donateTo/TelegramSvg.svg',
      alt: 'Telegram',
    },
    {
      src: './icons/donateTo/TwitterSvg.svg',
      alt: 'Twitter',
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Image src="/images/RadioButtonUncheckedFilled.png" alt="personal" width="88" height="88"></Image>
        <Box
          sx={{
            fontSize: '20px',
            fontWeight: '600',
            lineHeight: '28px',
            marginLeft: '16px',
            color: 'rgba(15, 23, 42, 1)',
          }}
        >
          {name || ''}
        </Box>
      </Box>

      <Box
        sx={{
          fontSize: '36px',
          fontWeight: '600',
          lineHeight: '44px',
          color: 'rgba(15, 23, 42, 1)',
          paddingTop: '24px',
        }}
      >
        Hello and welcome.
      </Box>

      <Box
        sx={{
          paddingTop: '24px',
        }}
      >
        {medias.map(({ src, alt }) => {
          return (
            <Image
              src={src}
              alt={alt}
              width="32"
              height="32"
              key={src}
              style={{
                marginRight: '32px',
              }}
            ></Image>
          );
        })}
      </Box>

      <Button
        variant="contained"
        href="#contained-buttons"
        style={{
          backgroundColor: '#0F172A',
          fontSize: '20px',
          fontWeight: '600',
          textTransform: 'none',
          marginTop: '24px',
        }}
      >
        Donate3 to me
      </Button>
    </Box>
  );
};
export default React.memo(PersonalDetails);
