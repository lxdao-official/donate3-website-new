import { Box, Tooltip } from '@mui/material';
import React from 'react';

import FormInput from './FormInput';
import Donate3Btn from '../Donate3Btn';

interface ICodeRegionProps {
  code: string;
  link: string;
}

const CodeRegion = ({ code, link }: ICodeRegionProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '41px 32px 32px 32px',
        borderRadius: '4px',
        background: '#FFF',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
        <FormInput
          title="Integrate into your code?"
          style={{
            marginBottom: '0px',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '263px',
              border: '1px dashed var(--gray-400, #CBD5E1)',
              borderRadius: '4px',
              wordBreak: 'break-all',
              color: '#929F9E',
              background: 'var(--gray-200, #F1F5F9)',
              padding: '12px 10px',
              fontSize: '16px',
              fontWeight: '500',
              position: 'relative',
              boxSizing: 'border-box',
            }}
          >
            {code}

            <Tooltip
              title={'copied!'}
              // title={copied && 'copied!'}
            >
              <Donate3Btn
                style={{ width: '136px', height: '40px', color: 'var(--gray-1000, #0F172A)', position: 'absolute', bottom: '10px', left: '10px' }}
                onClick={() => {
                  // navigator.clipboard.writeText(url).then(
                  //   function () {
                  //     setCopied(true);
                  //     setTimeout(() => {
                  //       setCopied(false);
                  //     }, 1000);
                  //   },
                  //   function (e) {
                  //     console.error(e);
                  //   }
                  // );
                }}
              >
                <Box component={'img'} src="/images/copyGroup.png" mr="15px"></Box>
                Copy code
              </Donate3Btn>
            </Tooltip>
          </Box>
        </FormInput>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
        <FormInput
          style={{
            marginBottom: '0px',
          }}
          title="Need a link to accept donations?"
        >
          <Box
            sx={{
              width: '100%',
              height: '263px',
              border: '1px dashed var(--gray-400, #CBD5E1)',
              borderRadius: '4px',
              wordBreak: 'break-all',
              color: '#929F9E',
              background: 'var(--gray-200, #F1F5F9)',
              padding: '12px 10px',
              fontSize: '16px',
              fontWeight: '500',
              position: 'relative',
              boxSizing: 'border-box',
            }}
          >
            {link}

            <Tooltip
              // title={copied && 'copied!'}
              title={'copied!'}
            >
              <Donate3Btn
                style={{ width: '136px', height: '40px', color: 'var(--gray-1000, #0F172A)', position: 'absolute', bottom: '10px', left: '10px' }}
                onClick={() => {
                  // const link = `https://donate3.xyz/donateTo?address=${config.address}&color=${config.color.split('#')[1]}&title=${config.name}&avatar=${avatar}`;
                  // navigator.clipboard.writeText(link).then(
                  //   function () {
                  //     setCopied(true);
                  //     setTimeout(() => {
                  //       setCopied(false);
                  //     }, 1000);
                  //   },
                  //   function (e) {
                  //     console.error(e);
                  //   }
                  // );
                }}
              >
                <Box component={'img'} src="/images/copyLink.png" mr="15px"></Box>
                Copy Link
              </Donate3Btn>
            </Tooltip>
          </Box>
        </FormInput>
      </Box>
    </div>
  );
};
export default CodeRegion;
