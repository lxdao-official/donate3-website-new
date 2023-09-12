import React, { useMemo } from 'react';
import { Box, Button, Typography, SvgIcon } from '@mui/material';
import Image from 'next/image';

import { ICustomWidget } from '../CustomWidget';
import { DEFAULT_CREATE_CONFIG } from '@/utils/const';
import IPFSAvatar, { TIPFSSrc } from '../IPFSAvatar/IPFSAvatar';

import CopyIcon from '@/public/icons/copy3.svg';

interface IPersonalDetailsProps {
  info: Pick<ICustomWidget, 'avatar' | 'name' | 'twitter' | 'telegram' | 'address' | 'accountType'>;
  onDonate: () => void;
  handleCopy: (text: string) => void;
}

const PersonalDetails = ({ info = DEFAULT_CREATE_CONFIG, onDonate, handleCopy }: IPersonalDetailsProps) => {
  const { name, twitter = '', telegram = '', accountType, address } = info;

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

    twitter && medias.push(twitterInfo);
    telegram && medias.push(telegramInfo);
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
        <Box ml={2}>
          <Typography variant="h6" color="rgba(15, 23, 42, 1)" fontWeight={600} lineHeight={'28px'}>
            {name || ''}
          </Typography>
          {!!(accountType === 0 && address) && (
            <Typography onClick={() => handleCopy(address)} component={Box} mt={1} variant="body1" fontWeight={400} color={'var(--gray-600, #64748B)'} sx={{ cursor: 'pointer' }}>
              {address.substring(0, 6)}...{address.substring(38)} <SvgIcon sx={{ ml: 0.5 }} component={CopyIcon} />
            </Typography>
          )}
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
                display: 'inline-block',
              }}
              onClick={() => handleClickMediaIcon(link)}
            ></Image>
          );
        })}
      </Box>

      <Button
        variant="contained"
        style={{
          backgroundColor: '#0F172A',
          fontSize: '20px',
          fontWeight: '600',
          textTransform: 'none',
          marginTop: '24px',
        }}
        onClick={onDonate}
      >
        Donate3 to me
      </Button>
    </Box>
  );
};
export default React.memo(PersonalDetails);
