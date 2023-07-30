import { useEffect, useState } from 'react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import { CroppedFile, SelectedFile, UploadFile, UploadResult, Uploader3 } from '@lxdao/uploader3';
import { Icon } from '@iconify/react';
import { Box, InputAdornment, InputBase, Tooltip } from '@mui/material';
import Image from 'next/image';
import { AccountCircle } from '@mui/icons-material';

import Donate3Btn from './Donate3Btn';
import PreviewFile from './PreviewFile';
import PreviewWrapper from './PreviewWrapper';
import { DONATE_SDK_URL } from '@/utils/const';
import CreateTitle from './create/Title';
import { throttle } from '@/utils/common';
import FormInput from './create/FormInput';
import RadioBox from './create/RadioBox';
import Preview from './create/Preview';
import Card from './create/Card';
import CodeRegion from './create/CodeRegion';

export default function CustomWidget() {
  const { address } = useAccount();
  const [file, setFile] = React.useState<UploadResult | CroppedFile | UploadFile | SelectedFile | null>();
  const [avatar, setAvatar] = React.useState('');

  const {
    control,
    formState: { errors },
    setValue,
    setError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      type: 0,
      color: '#396AFF',
      name: 'Donate3',
      address: '0xe395B9bA2F93236489ac953146485C435D1A267B',
      avatar: '',
      description: '',
      twitter: '',
      telegram: '',
    },
  });
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState({
    type: 0,
    color: '#396AFF',
    name: 'Donate3',
    address: '0xe395B9bA2F93236489ac953146485C435D1A267B',
  });

  const setColorThrottle = throttle((color) => {
    setConfig((pre) => ({ ...pre, color: color }));
  }, 300);

  const [url, setUrl] = useState(`<div data-donate3-type="${config.type ? 'embed' : 'float'}" data-donate3-color="${config.color}" data-donate3-title="${config.name}" data-donate3-to-address="${config.address}" data-donate3-avatar="${avatar}"></div><script src="${DONATE_SDK_URL}"></script>`);

  useEffect(() => {
    setUrl(`<div data-donate3-type="${config.type ? 'embed' : 'float'}" data-donate3-color="${config.color}" data-donate3-title="${config.name}" data-donate3-to-address="${config.address}" data-donate3-avatar="${avatar}"></div><script src="${DONATE_SDK_URL}"></script>`);
  }, [avatar, config]);

  useEffect(() => {
    setValue('address', address as string);
    setConfig((pre) => ({
      ...pre,
      address: address ? address : '0xe395B9bA2F93236489ac953146485C435D1A267B',
    }));
  }, [address, setValue]);

  return (
    <>
      {/* title */}
      <CreateTitle />

      {/* center info */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          justifyContent: { xs: 'start', md: 'space-between' },
          alignItems: { xs: 'center', md: 'start' },
          gap: 4,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }} flex={1}>
          {/* Style in your website */}
          <Card title="Style in your website">
            <Controller
              name={'type'}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <FormInput title="" error={errors.type?.type}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      <RadioBox
                        onChange={(e: number) => {
                          setConfig((pre) => ({
                            ...pre,
                            type: e,
                          }));
                          onChange(e);
                        }}
                        value={0}
                        current={value}
                        title="Floating button"
                        imgUrl="../images/widget_button.jpg"
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
                        imgUrl="../images/widget_hyperlink.png"
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
                        backgroundColor: 'var(--gray-300, #E2E8F0)',
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
          </Card>

          {/* Profile settings */}
          <Card
            hasBorder={false}
            title="Profile settings"
            style={{
              paddingTop: '24px',
            }}
          >
            <Controller
              name={'avatar'}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <FormInput title="" error={errors.color?.type}>
                    <Uploader3
                      api={'/api/upload/file?name=your-name'}
                      headers={{
                        'x-token': 'abcd',
                      }}
                      multiple={false}
                      crop={true} // use default crop options
                      onChange={(files) => {
                        setFile(files[0]);
                      }}
                      onUpload={(file) => {
                        setFile(file);
                      }}
                      onComplete={(file) => {
                        setFile(file);
                      }}
                      onCropCancel={(file) => {
                        setFile(null);
                      }}
                      onCropEnd={(file) => {
                        setFile(file);
                      }}
                    >
                      <PreviewWrapper style={{ height: '98px', width: '98px' }}>{file ? <PreviewFile file={file} setAvatar={setAvatar} /> : <Icon icon={'material-symbols:cloud-upload'} color={'#65a2fa'} fontSize={60} />}</PreviewWrapper>
                    </Uploader3>
                  </FormInput>
                );
              }}
            />

            {/* Name */}
            <Controller
              name={'name'}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <FormInput title="Name" error={errors.name?.type}>
                    <InputBase
                      sx={{
                        mt: 0,
                        backgroundColor: 'var(--gray-300, #E2E8F0)',
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

            {/* About me */}
            <Controller
              name={'description'}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <FormInput title="About me" error={errors.name?.type}>
                    <InputBase
                      sx={{
                        mt: 0,
                        backgroundColor: 'var(--gray-300, #E2E8F0)',
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

            {/* Social media */}
            <Controller
              name={'twitter'}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <FormInput
                    title="Social media"
                    error={errors.name?.type}
                    style={{
                      marginBottom: '16px',
                    }}
                  >
                    <InputBase
                      sx={{
                        mt: 0,
                        backgroundColor: 'var(--gray-300, #E2E8F0)',
                        height: '40px',
                        paddingX: '10px',
                        borderRadius: '4px',
                      }}
                      value={value}
                      startAdornment={
                        <InputAdornment position="start">
                          <Image src="/images/twitterNew.png" alt="twitter" width="24" height="24" />
                        </InputAdornment>
                      }
                      onChange={(e: any) => {
                        setConfig((pre) => ({
                          ...pre,
                          name: e.target.value,
                        }));
                        onChange(e);
                      }}
                      placeholder="set your twitter account"
                    />
                  </FormInput>
                );
              }}
            />

            <Controller
              name={'telegram'}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <FormInput title="" error={errors.name?.type}>
                    <InputBase
                      sx={{
                        mt: 0,
                        backgroundColor: 'var(--gray-300, #E2E8F0)',
                        height: '40px',
                        paddingX: '10px',
                        borderRadius: '4px',
                      }}
                      startAdornment={
                        <InputAdornment position="start">
                          <Image src="/images/telegram.png" alt="telegram" width="24" height="24" />
                        </InputAdornment>
                      }
                      value={value}
                      onChange={(e: any) => {
                        setConfig((pre) => ({
                          ...pre,
                          name: e.target.value,
                        }));
                        onChange(e);
                      }}
                      placeholder="set your telegram account"
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
                        backgroundColor: 'var(--gray-300, #E2E8F0)',
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
          </Card>

          <div
            style={{
              marginBottom: '18px',
            }}
          >
            <Donate3Btn onClick={() => {}} variant="contained">
              Confirm
            </Donate3Btn>
            <div
              style={{
                fontSize: '14px',
                lineHeight: '26px',
                color: 'rgba(100, 116, 139, 1)',
                paddingTop: '16px',
              }}
            >
              Code and link will be generated below.
            </div>
          </div>
        </Box>
        <Box sx={{ position: 'relative', minWidth: { xs: '280px', sm: '400px' }, height: { xs: '490px', sm: '700px' } }} flex={1}>
          <Box
            component="iframe"
            sx={{
              top: { xs: '-105px', sm: 0 },
              left: { xs: '-60px', sm: '79px' },
              border: '2px solid var(--gray-300, #E2E8F0);',
              mx: 'auto',
              minWidth: '400px',
              height: '800px',
              borderRadius: '22px',
              position: 'absolute',
              scale: { xs: '0.7', sm: '1' },
            }}
            srcDoc={`<html><head></head><body style="padding-top: 30px;"><div 
          data-donate3-demo="true"
          data-donate3-type="${config.type ? 'embed' : 'float'}" data-donate3-color="${config.color}" data-donate3-title="${config.name}" data-donate3-to-address="${config.address}" data-donate3-avatar="${avatar}"></div><script src="${DONATE_SDK_URL}"></script></body></html>`}
          ></Box>
          <Preview />
        </Box>
      </Box>

      {/* code */}
      <CodeRegion />
    </>
  );
}
