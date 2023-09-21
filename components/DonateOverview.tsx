import React from 'react';
import { Box, Typography } from '@mui/material';

export function DonateOverview({ data }: { data: { avatarSrc: string; name: string; website: string; description: string; url: string } }) {
  const { avatarSrc, name, website, description, url } = data;

  const handleClickOverviewCard = () => {
    website && window.open(`https://${url}`, '_blank');
  };

  return (
    <Box
      sx={{
        width: { xs: '360px', md: '360px', sm: '392px' },
        height: '436px',
        display: 'flex',
        flexDirection: 'column',
        padding: '35px',
        boxShadow: 'none',
        borderRadius: '3%',
        border: '0.5px solid',
        borderColor: '#E2E8F0',
        backgroundColor: '#FFFFFF',
        marginLeft: { md: '41px' },
        transition: 'box-shadow 0.3s', // 添加过渡效果
        mt: { xs: '20px', lg: '0px' },
        '&:hover': {
          boxShadow: '0px 20px 50px 0px #1D50751F',
        },
        cursor: 'pointer',
      }}
      onClick={handleClickOverviewCard}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          component="img"
          src={avatarSrc}
          alt="Avatar"
          style={{
            borderRadius: '50%',
            width: '80px',
            height: '80px',
            border: '0.5px solid #E2E8F0',
          }}
        />
        <Box ml={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '20px', sm: '20px', md: '20px' },
              lineHeight: { xs: '28px', md: '28px' },
              padding: { xs: '10px', sm: '30px', md: 0 },
              color: '#000000',
              textAlign: { xs: 'left', lg: 'left' },
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body1"
            rel="noopener noreferrer"
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '28px',
              color: '#64748B',
              textDecoration: 'none',
            }}
          >
            {website}
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 400,
          fontSize: { xs: '20px', sm: '20px', md: '20px' },
          lineHeight: { xs: '36px', md: '36px' },
          color: '#64748B',
          textAlign: { xs: 'left', lg: 'left' },
          minWidth: { xs: '321px', sm: '321px' },
          minHeight: { xs: '100px', sm: '100px', lg: '144px' },
          mt: { xs: '5px', md: '32px', sm: '37px' },
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}
