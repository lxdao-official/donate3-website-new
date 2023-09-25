import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import FeatureAni from './FeatureAni';

export function FeaturesDetail({ data }: { data: { iconSrc: string; title: string; description: string } }) {
  const { iconSrc, title, description } = data;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <Box
      className=""
      sx={{
        position: 'relative',
        width: { xs: '318px', sm: '318px', md: '392px' },
        height: { xs: '380px', sm: '380px', md: '360px' },
        margin: { xs: '20px', lg: '0px' },
        background: 'conic-gradient(from 0deg, #bffa2c, #4caddf, 180deg, #4caddf, 225deg, #bffa2c)',
        border: 0,
        borderRadius: '3%',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <FeatureAni show={isHovered} />
      <Box
        className={isHovered ? 'border_ani' : 'border_ani_start'}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: '50%',
          top: '50%',
          // bgcolor: '#282e3e',
          zIndex: 5,
          transform: 'translate(-50%,-50%)',
        }}
      />

      <Box
        sx={{
          height: 'calc(100% - 4px)',
          margin: '2px',
          zIndex: 6,
          background: '#272e3f',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          borderRadius: '2%',
          padding: '20px',
          position: 'absolute', // Added for absolute positioning of pseudo-element
        }}
      >
        <Box
          component="img"
          src={iconSrc}
          alt="Icon"
          sx={{
            width: '48px',
            height: '48px',
            mt: '23px',
            marginLeft: { xs: '13px', lg: '13px' },
          }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '24px', sm: '24px', md: '28px' },
            lineHeight: { xs: '36px', md: '36px' },
            color: '#FFFFFF',
            textAlign: { xs: 'left', lg: 'left' },
            mt: { xs: '30px', lg: '38px' },
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 400,
            fontSize: { xs: '20px', sm: '20px', md: '20px' },
            lineHeight: { xs: '36px', md: '36px' },
            color: '#FFFFFF',
            textAlign: { xs: 'left', lg: 'left' },
            maxWidth: { xs: '537px', sm: '537px' },
            mt: { xs: '15px', lg: '20px' },
          }}
        >
          {description}
        </Typography>
        <style jsx>{`
          .border-animation {
            animation-name: borderGrow;
            animation-duration: 100ms;
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            animation-fill-mode: forwards;
            position: relative;
          }

          @keyframes borderGrow {
            0% {
              border-top: 2px solid #ccff00;
              border-right: none;
              border-bottom: none;
              border-left: none;
            }
            25% {
              border-top: 2px solid #ccff00;
              border-right: 2px solid #ccff00;
              border-bottom: none;
              border-left: none;
            }
            50% {
              border-top: 2px solid #ccff00;
              border-right: 2px solid #ccff00;
              border-bottom: 2px solid #ccff00;
              border-left: none;
            }
            75% {
              border-top: 2px solid #ccff00;
              border-right: 2px solid #ccff00;
              border-bottom: 2px solid #ccff00;
              border-left: 2px solid #ccff00;
            }
            100% {
              border: 2px solid #ccff00;
            }
          }
        `}</style>
      </Box>
    </Box>
  );
}
