import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import { CroppedFile, SelectedFile, UploadFile, UploadResult, Uploader3 } from '@lxdao/uploader3';
import { Icon } from '@iconify/react';
import { Box, FormControl, InputBase, InputAdornment, Radio, Tooltip, Typography, styled, RadioGroup, FormControlLabel, Select, MenuItem } from '@mui/material';
// import { ChromePicker } from 'react-color';

import { MuiColorInput, matchIsValidColor } from 'mui-color-input';
import Image from 'next/image';
import { NFTStorage, Blob } from 'nft.storage';

import Donate3Btn from './Donate3Btn';
import PreviewFile from './PreviewFile';
import PreviewWrapper from './PreviewWrapper';
import { DEFAULT_CREATE_ADDRESS, DEFAULT_CREATE_CONFIG, DONATE_SDK_URL } from '@/utils/const';
import CreateTitle from './create/Title';
import { throttle } from '@/utils/common';
import FormInput from './create/FormInput';
import RadioBox from './create/RadioBox';
import Card from './create/Card';
import CodeRegion from './create/CodeRegion';
import DescEditor from './create/DescEditor';
import PreviewRegion from './create/PreviewRegion';

interface ICustomWidget {
  type: number;
  color: string;
  name: string;
  address: string;
  avatar: string;
  description: string;
  twitter: string;
  telegram: string;
}

export default function CustomWidget() {
  const { address } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<UploadResult | CroppedFile | UploadFile | SelectedFile | null>();
  const [donationsCode, setDonationsCode] = useState<string>('');
  const [donationsLink, setDonationsLink] = useState<string>('');
  const [previewSrcDoc, setPreviewSrcDoc] = useState<string>('');

  const {
    control,
    formState: { errors },
    setValue,
    setError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: DEFAULT_CREATE_CONFIG,
  });
  const [config, setConfig] = useState<Partial<ICustomWidget>>(DEFAULT_CREATE_CONFIG);

  const setColorThrottle = throttle((color) => {
    setConfig((pre) => ({ ...pre, color: color }));
  }, 300);

  useEffect(() => {
    setValue('address', address as string);
    setConfig((pre) => ({
      ...pre,
      address: address || DEFAULT_CREATE_ADDRESS,
    }));
  }, [address, setValue]);

  const confirmBtnDisabled = useMemo(() => {
    return !config.color || !config.name || !config.address;
  }, [config]);

  const genDonationsCode = (code: string) => {
    setDonationsCode(code);
  };

  const genDonationsLink = (cid: string) => {
    setDonationsLink(`https://donate3.xyz/donateTo?cid=${cid}`);
  };

  const genPreviewSrcDoc = (l: string) => {
    let doc = `<html><head></head><body style="padding-top: 30px;">${l}</body></html>`;
    console.info(doc, '🍑🍑doc🍑🍑');
    setPreviewSrcDoc(doc);
  };

  const genUrl = (cid: string, isSrcDoc?: boolean) => {
    const url = `<div data-donate3-cid="${cid}" ${isSrcDoc ? 'data-donate3-demo="true"' : ''}></div><script src="${DONATE_SDK_URL}"></script>`;
    return url;
  };

  const genInfoByCid = (cid: string) => {
    setLoading(false);
    genDonationsCode(genUrl(cid));
    genDonationsLink(cid);
    genPreviewSrcDoc(genUrl(cid, true));
  };

  const storeInfoToNFTStorage = async (data: Partial<ICustomWidget>) => {
    const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN || '' });
    const blobData = new Blob([JSON.stringify(data)], {
      type: 'application/json',
    });
    const cid = await client.storeBlob(blobData);
    console.info(cid, '🐻🐻cid🐻🐻');
    genInfoByCid(cid);
  };

  const handleClickConfirmBtn = () => {
    setLoading(true);
    storeInfoToNFTStorage(config);
  };

  const setAvatarToConfig = (avatar: string) => {
    setConfig((pre) => ({
      ...pre,
      avatar,
    }));
  };

  const handleDescEditorChange = (content: string) => {
    setConfig((pre) => ({
      ...pre,
      description: content,
    }));
  };

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
                        setError('color', {});
                        if (!e.target.value) {
                          setError('color', { type: 'invalid color' });
                        }
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
                      <PreviewWrapper style={{ height: '98px', width: '98px' }}>{file ? <PreviewFile file={file} setAvatar={setAvatarToConfig} /> : <Icon icon={'material-symbols:cloud-upload'} color={'#65a2fa'} fontSize={60} />}</PreviewWrapper>
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
                        let name = e.target.value;
                        setError('name', {});
                        if (!name) {
                          setError('name', { type: 'invalid name' });
                        }
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
                  <FormInput title="About me" error={errors.description?.type}>
                    <DescEditor onChange={handleDescEditorChange} />
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
                    error={errors.twitter?.type}
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
                          twitter: e.target.value,
                        }));
                        onChange(e);
                      }}
                      placeholder="Enter your twitter account"
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
                  <FormInput title="" error={errors.telegram?.type}>
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
                          telegram: e.target.value,
                        }));
                        onChange(e);
                      }}
                      placeholder="Enter your telegram account"
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
            <Donate3Btn loadingButton loading={loading} onClick={handleClickConfirmBtn} variant="contained" disabled={confirmBtnDisabled}>
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
        <PreviewRegion srcDoc={previewSrcDoc} />
      </Box>

      {/* code */}
      <CodeRegion code={donationsCode} link={donationsLink} />
    </>
  );
}
