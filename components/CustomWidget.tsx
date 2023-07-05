import { useEffect, useState } from 'react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';

import { Box, FormControl, InputBase, Radio, Tooltip, Typography, styled } from '@mui/material';

import Donate3Btn from './Donate3Btn';

function throttle<F extends (...args: any[]) => void>(func: F, wait: number): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timer: NodeJS.Timeout | null = null;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func.apply(context, args);
      timer = null;
    }, wait);
  };
}

const FormInput = ({ title, desc, error, children }: any) => {
  return (
    <FormControl variant="standard" fullWidth>
      <Box mb="12px">
        <Typography
          sx={{
            position: 'inherit',
            fontWeight: '600',
            fontSize: '14px',
            lineHeight: '17px',
            px: '5px',
            color: '#3e4343',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontWeight: '500',
            fontSize: '12px',
            lineHeight: '15px',
            px: '5px',
            mr: '3px',
            color: '#929f9e',
          }}
        >
          {desc}
        </Typography>
        <Typography
          sx={{
            fontWeight: '500',
            fontSize: '12px',
            lineHeight: '15px',
            px: '5px',
            mr: '3px',
            color: '#DC0202',
          }}
        >
          {error}
        </Typography>
      </Box>
      {children}
      {/* <InputBase sx={{ mt: 0 }} /> */}
    </FormControl>
  );
};

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 18,
  height: 18,
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f1f3f4',

  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#e4e4e5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#CCFF00',
  '&:before': {
    display: 'block',
    width: 18,
    height: 18,
    // backgroundImage: 'radial-gradient(#fff,#fff 33%,transparent 33%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#a5ce00',
  },
});

// Inspired by blueprintjs
function BpRadio(props: any) {
  return <Radio disableRipple color="default" checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} {...props} />;
}

function RadioBox({ onChange, value, title, imgurl, current }: any) {
  return (
    <Box
      onClick={() => {
        onChange(value);
      }}
      sx={{
        padding: '12px',
        bgcolor: 'background.paper',
        width: 200,
        height: 160,
        marginRight: '10px',
        marginBottom: '10px',
        border: value == current ? '3px solid #CCFF00' : '',
        borderRadius: '5px',
        cursor: 'pointer',
        color: value == current ? '#A9D300' : '#3E4343',
      }}
    >
      <BpRadio checked={value == current} size="small" />
      <span>{title}</span>
      <Box component={'img'} src={imgurl} sx={{ borderRadius: 2 }} />
    </Box>
  );
}

export default function CustomWidget() {
  const { address } = useAccount();

  // const [, user] = useUser(address as string);

  const {
    control,
    formState: { errors },
    setValue,
    setError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      type: 0,
      color: '#b7d844',
      name: 'Donate3',
      address: '0xe395B9bA2F93236489ac953146485C435D1A267B',
    },
  });
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState({
    type: 0,
    color: '#b7d844',
    name: 'Donate3',
    address: '0xe395B9bA2F93236489ac953146485C435D1A267B',
  });

  const setColorThrottle = throttle((color) => {
    setConfig((pre) => ({ ...pre, color: color }));
  }, 300);

  const [url, setUrl] = useState(
    `<div data-donate3-type="${config.type ? 'embed' : 'float'}" data-donate3-color="${config.color}" data-donate3-title="${config.name}" data-donate3-to-address="${config.address}"></div><script src="https://cdn.jsdelivr.net/npm/donate3-sdk@0.3.30/dist/webpack/bundle.js "></script>`
  );

  useEffect(() => {
    setUrl(`<div data-donate3-type="${config.type ? 'embed' : 'float'}" data-donate3-color="${config.color}" data-donate3-title="${config.name}" data-donate3-to-address="${config.address}"></div><script src="https://cdn.jsdelivr.net/npm/donate3-sdk@0.3.48/dist/webpack/bundle.js"></script>`);
  }, [config]);

  useEffect(() => {
    setValue('address', address as string);
    setConfig((pre) => ({
      ...pre,
      address: address ? address : '0xe395B9bA2F93236489ac953146485C435D1A267B',
    }));
  }, [address]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column-reverse', md: 'row' },
        justifyContent: { xs: 'start', md: 'space-between' },
        alignItems: { xs: 'center', md: 'start' },
        gap: 4,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <Box>
          <Typography variant="h4" color="#44443F">
            Create Custom Widget
          </Typography>
          <Typography variant="body1" color="#858686">
            Through simple settings, you can produce a piece of code and put the four seas, and anyone can send you a cross-chain cryptocurrency.
          </Typography>
        </Box>
        <Controller
          name={'type'}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <FormInput title="Stylein your website" error={errors.type?.type}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  <RadioBox
                    onChange={(e: number) => {
                      setConfig((pre) => ({
                        ...pre,
                        type: e,
                      }));
                      onChange(e);
                      // console.log({ donate3btn });
                      // donate3btn?.click();
                    }}
                    value={0}
                    current={value}
                    title="Floating button"
                    imgurl="../images/widget_button.jpg"
                  />
                  <RadioBox
                    onChange={(e: number) => {
                      setConfig((pre) => ({
                        ...pre,
                        type: e,
                      }));
                      onChange(e);
                    }}
                    value={1}
                    current={value}
                    title="Normal button"
                    imgurl="../images/widget_hyperlink.png"
                  />
                </Box>
              </FormInput>
            );
          }}
        />

        <Controller
          name={'color'}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <FormInput title="Primary color" error={errors.color?.type}>
                <InputBase
                  startAdornment={
                    <>
                      <Box sx={{ width: '24px', height: '24px', cursor: 'pointer', borderRadius: '3px', backgroundColor: value, marginRight: '10px' }} />
                    </>
                  }
                  sx={{
                    mt: 0,
                    backgroundColor: '#e6e7ea',
                    height: '40px',
                    paddingX: '10px',
                    borderRadius: '4px',
                  }}
                  value={value}
                  onChange={(e: any) => {
                    setConfig((pre) => ({
                      ...pre,
                      color: e.target.value,
                    }));
                    onChange(e);
                  }}
                />
              </FormInput>
            );
          }}
        />
        <Controller
          name={'name'}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <FormInput title="Nickname" error={errors.name?.type}>
                <InputBase
                  sx={{
                    mt: 0,
                    backgroundColor: '#e6e7ea',
                    height: '40px',
                    paddingX: '10px',
                    borderRadius: '4px',
                  }}
                  value={value}
                  onChange={(e: any) => {
                    setConfig((pre) => ({
                      ...pre,
                      name: e.target.value,
                    }));
                    onChange(e);
                  }}
                />
              </FormInput>
            );
          }}
        />
        <Controller
          name={'address'}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <FormInput
                title="Receive address"
                // desc="默认收款地址是钱包登录地址"
                error={errors.address?.type}
              >
                <InputBase
                  sx={{
                    mt: 0,
                    backgroundColor: '#e6e7ea',
                    height: '40px',
                    paddingX: '10px',
                    borderRadius: '4px',
                  }}
                  value={value}
                  onChange={(e: any) => {
                    let address = e.target.value;
                    setError('address', {});
                    setConfig((pre) => ({
                      ...pre,
                      address: address,
                    }));
                    if (address.slice(0, 2) != '0x') {
                      setError('address', { type: 'not address' });
                    }
                    if (address.length != 42) {
                      setError('address', { type: 'too long or too short' });
                    }
                    onChange(e);
                  }}
                />
              </FormInput>
            );
          }}
        />
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
              {`<div data-donate3-type="${config.type ? 'embed' : 'float'}" data-donate3-color="${config.color}" data-donate3-title="${config.name}" data-donate3-to-address="${config.address}"></div><script src="https://cdn.jsdelivr.net/npm/donate3-sdk@0.3.48/dist/webpack/bundle.js"></script>`}
            </Box>
          </FormInput>
          <Box display="flex" gap={2}>
            <Tooltip title={copied && 'copied!'}>
              <Donate3Btn
                onClick={() => {
                  navigator.clipboard.writeText(url).then(
                    function () {
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 1000);
                    },
                    function (e) {
                      console.error(e);
                    }
                  );
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
              {`https://donate3.xyz/donateTo?address=${config.address}&color=${config.color.split('#')[1]}&title=${config.name}`}
            </Box>
          </FormInput>
          <Box display="flex" gap={2}>
            <Tooltip title={copied && 'copied!'}>
              <Donate3Btn
                onClick={() => {
                  const link = `https://donate3.xyz/donateTo?address=${config.address}&color=${config.color.split('#')[1]}&title=${config.name}`;
                  navigator.clipboard.writeText(link).then(
                    function () {
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 1000);
                    },
                    function (e) {
                      console.error(e);
                    }
                  );
                }}
              >
                <Box component={'img'} src="/icons/copy2.svg" mr="15px"></Box>
                Copy Link
              </Donate3Btn>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      <Box sx={{ position: 'relative', minWidth: { xs: '280px', sm: '400px' }, height: { xs: '490px', sm: '700px' } }}>
        <Box
          component="iframe"
          sx={{
            top: { xs: '-105px', sm: 0 },
            left: { xs: '-60px', sm: 0 },
            border: '2px solid #929F9E',
            mx: 'auto',
            minWidth: '400px',
            height: '700px',
            borderRadius: '22px',
            position: 'absolute',
            scale: { xs: '0.7', sm: '1' },
          }}
          srcDoc={`<html><head></head><body style="padding-top: 30px;"><div 
          data-donate3-demo="true"
          data-donate3-type="${config.type ? 'embed' : 'float'}" data-donate3-color="${config.color}" data-donate3-title="${config.name}" data-donate3-to-address="${config.address}"></div><script src="https://cdn.jsdelivr.net/npm/donate3-sdk@0.3.48/dist/webpack/bundle.js"></script></body></html>`}
        ></Box>
      </Box>
    </Box>
  );
}
