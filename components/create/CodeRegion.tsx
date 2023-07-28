import { Box, Tooltip } from '@mui/material';
import React from 'react';

import FormInput from './FormInput';
import Donate3Btn from '../Donate3Btn';

const CodeRegion = () => {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <FormInput title="Integrate into your code?">
          <Box
            sx={{
              height: 'auto',
              border: '2px dashed #EBEBEC',
              borderRadius: '4px',
              wordBreak: 'break-all',
              color: '#929F9E',
              backgroundColor: '#f0f0f0',
              padding: '12px 10px',
              fontSize: '16px',
              fontWeight: '500',
            }}
          >
            {/* {`<div data-donate3-type="${config.type ? 'embed' : 'float'}" data-donate3-color="${config.color}" data-donate3-title="${config.name}" data-donate3-to-address="${config.address}" data-donate3-avatar="${avatar}"></div><script src="${DONATE_SDK_URL}"></script>`} */}
          </Box>
        </FormInput>
        <Box display="flex" gap={2}>
          <Tooltip
            title={'copied!'}
            // title={copied && 'copied!'}
          >
            <Donate3Btn
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
              <Box component={'img'} src="/icons/copy2.svg" mr="15px"></Box>
              Copy code
            </Donate3Btn>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <FormInput title="Need a link to accept donations?">
          <Box
            sx={{
              height: 'auto',
              border: '2px dashed #EBEBEC',
              borderRadius: '4px',
              wordBreak: 'break-all',
              color: '#929F9E',
              backgroundColor: '#f0f0f0',
              padding: '12px 10px',
              fontSize: '16px',
              fontWeight: '500',
            }}
          >
            {/* {`https://donate3.xyz/donateTo?address=${config.address}&color=${config.color.split('#')[1]}&title=${config.name}&avatar=${avatar}`} */}
          </Box>
        </FormInput>
        <Box display="flex" gap={2}>
          <Tooltip
            // title={copied && 'copied!'}
            title={'copied!'}
          >
            <Donate3Btn
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
              <Box component={'img'} src="/icons/copy2.svg" mr="15px"></Box>
              Copy Link
            </Donate3Btn>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};
export default CodeRegion;
