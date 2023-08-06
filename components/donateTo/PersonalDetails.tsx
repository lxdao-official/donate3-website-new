import React, { useMemo } from 'react';
import { Box, Button } from '@mui/material';
import Image from 'next/image';

import { ICustomWidget } from '../CustomWidget';
import { DEFAULT_CREATE_CONFIG } from '@/utils/const';
import IPFSAvatar, { IIPFSAvatarProps, TIPFSSrc } from '../IPFSAvatar/IPFSAvatar';

interface IPersonalDetailsProps {
  info: Pick<ICustomWidget, 'avatar' | 'name' | 'twitter' | 'telegram' | 'address'>;
}

const PersonalDetails = ({ info = DEFAULT_CREATE_CONFIG }: IPersonalDetailsProps) => {
  const { name, twitter = '', telegram = '' } = info;

  const memoMedias = useMemo(() => {
    const medias = [];
    const telegramInfo = {
      src: './icons/donateTo/TelegramSvg.svg',
      alt: 'Telegram',
      link: telegram,
    };
    const twitterInfo = {
      src: './icons/donateTo/TwitterSvg.svg',
      alt: 'Twitter',
      link: twitter,
    };

    twitter && medias.push(telegramInfo);
    telegram && medias.push(twitterInfo);
    return medias;
  }, [twitter, telegram]);

  const handleClickMediaIcon = (link: string) => {
    window.open(link, 'target');
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <IPFSAvatar ipfsSrc={info?.avatar as TIPFSSrc} address={info?.address as `0x${string}`} />
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
        {memoMedias.map(({ src, alt, link }) => {
          return (
            <Image
              src={src}
              alt={alt}
              width="32"
              height="32"
              key={src}
              style={{
                marginRight: '32px',
                cursor: 'pointer',
              }}
              onClick={() => handleClickMediaIcon(link)}
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
