import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import { CroppedFile, SelectedFile, UploadFile, UploadResult, Uploader3 } from '@lxdao/uploader3';
import { Icon } from '@iconify/react';
import { Box, InputBase, InputAdornment, Radio, Typography, RadioGroup, FormControlLabel, Select, MenuItem, TextareaAutosize, Backdrop } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import { ChromePicker } from 'react-color';
import Image from 'next/image';
import { NFTStorage, Blob } from 'nft.storage';

import Donate3Btn from './Donate3Btn';
import PreviewFile from './PreviewFile';
import PreviewWrapper from './PreviewWrapper';
import { DEFAULT_CREATE_ADDRESS, DEFAULT_CREATE_CONFIG, DONATE_SDK_URL, AccountType, EType, AccountProgressType, DEFAULT_PREVIOUS_LINK, PRODUCTION_URL } from '@/utils/const';
import CreateTitle from './create/Title';
import { getDonatePreviewSrcDoc, getDonateUrl, getDynamicDonateUrl, throttle } from '@/utils/common';
import FormInput from './create/FormInput';
import RadioBox from './create/RadioBox';
import Card from './create/Card';
import CodeRegion from './create/CodeRegion';
import DescEditor from './create/DescEditor';
import PreviewRegion from './create/PreviewRegion';

import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLottie } from 'lottie-react';
import loadingAnimation from '../public/loading/donate3Loading.json';
import { getFasterIpfsLink } from '@/utils/ipfsTools';
import { Img3 } from '@lxdao/img3';

export interface ICustomWidget {
  type: number;
  color: string;
  name: string;
  accountType: AccountType;
  progressType: AccountProgressType;
  address?: string;
  // safeAccounts?: SafeAccount[];
  avatar: string;
  description: string;
  twitter: string;
  telegram: string;
  fundsGoal?: number;
  startTime?: number;
  endTime?: number;
  reason?: string;
  previousCid?: string;
}

export default function CustomWidget() {
  const { address } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<UploadResult | CroppedFile | UploadFile | SelectedFile | null>();
  const [donationsCode, setDonationsCode] = useState<string>('');
  const [donationsLink, setDonationsLink] = useState<string>('');
  const [previewSrcDoc, setPreviewSrcDoc] = useState<string>('');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  // const [selectedStartDate, setSelectedStartDate] = useState<number>();
  // const [selectedEndDate, setSelectedEndDate] = useState<number>();
  // const [expanded, setExpanded] = useState<string | false>(false);
  const [commonLoading, setCommonLoading] = useState<boolean>(false);

  const options = {
    animationData: loadingAnimation,
    loop: true,
  };
  const { View } = useLottie(options, {
    width: '80px',
    height: '80px',
  });

  //设置是否有进度
  // const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
  //   setExpanded(isExpanded ? panel : false);
  //   //1默认表示没有进度条
  //   let progressType = 1;
  //   if (isExpanded) {
  //     progressType = 0;
  //   } else {
  //     alert('you have cancled set raised account with raised progress');
  //     progressType = 1;
  //   }
  //   //设置是否带进度条
  //   setConfig((pre) => ({
  //     ...pre,
  //     progressType: progressType,
  //   }));
  // };

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

  // const networks = [
  //   { id: 1, network: 'Ethereum', icon: Ethereum },
  //   { id: 5, network: 'Goerli', icon: Goerli },
  //   { id: 10, network: 'Optimism', icon: Optimism },
  //   { id: 42161, network: 'Arbitrum', icon: Arbitrum },
  //   { id: 137, network: 'Polygon', icon: Polygon },
  //   { id: 59144, network: 'Linea', icon: Linea },
  //   { id: 420, network: 'Optimism Goerli', icon: Optimism },
  //   // { id: 424, network: 'PGN', icon: Pgn },
  // ];

  const handleOpen = () => {
    setDisplayColorPicker(true);
  };
  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const genDonationsCode = (code: string) => {
    setDonationsCode(code);
  };

  const genDonationsLink = (cid: string) => {
    setDonationsLink(`${window.location.origin}/donateTo?cid=${cid}`);
  };

  const genPreviewSrcDoc = (l: string) => {
    setPreviewSrcDoc(getDonatePreviewSrcDoc(l));
  };

  const genUrl = (cid: string, isSrcDoc?: boolean) => {
    return getDonateUrl(cid, isSrcDoc);
  };

  const genInfoByCid = (cid: string) => {
    setLoading(false);
    genDonationsCode(genUrl(cid));
    genDonationsLink(cid);
  };

  useEffect(() => {
    genPreviewSrcDoc(getDynamicDonateUrl(config));
  }, [config]);

  const storeInfoToNFTStorage = async (data: Partial<ICustomWidget>) => {
    const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN || '' });
    const blobData = new Blob(
      [
        JSON.stringify({
          ...data,
          type: EType[data?.type!],
        }),
      ],
      {
        type: 'application/json',
      }
    );

    try {
      const cid = await client.storeBlob(blobData);
      console.info(cid, '🐻🐻cid🐻🐻');
      genInfoByCid(cid);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleClickConfirmBtn = () => {
  //   const newSafeAccounts = config.safeAccounts ? [...config.safeAccounts] : [];
  //   if (config.accountType === 0) {
  //     if (!config.address) {
  //       setError('address', { type: 'not address or too long or too short' });
  //       return;
  //     }
  //   } else {
  //     if (!(newSafeAccounts.length && newSafeAccounts.every((item) => item.address))) {
  //       setError('safeAccounts', { type: 'not address or too long or too short' });
  //       return;
  //     }
  //   }
  //   setLoading(true);
  //   const newConfig = { ...config };
  //   if (newConfig.accountType) {
  //     delete newConfig.address;
  //   } else {
  //     delete newConfig.safeAccounts;
  //   }
  //   storeInfoToNFTStorage(newConfig);
  // };

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

  // const addAccountItem = () => {
  //   const newSafeAccounts = config.safeAccounts ? [...config.safeAccounts] : [];
  //   const lastItemAddress = newSafeAccounts[newSafeAccounts.length - 1].address;
  //   if (!(lastItemAddress && lastItemAddress.startsWith('0x') && lastItemAddress.length === 42)) {
  //     setError('safeAccounts', { type: 'not address or too long or too short' });
  //     return;
  //   }
  //   if (!newSafeAccounts[newSafeAccounts.length - 1].address) {
  //     return;
  //   }
  //   setConfig((pre) => {
  //     newSafeAccounts.push({ networkId: networks[0].id, address: undefined });
  //     return { ...pre, safeAccounts: newSafeAccounts };
  //   });
  // };

  const handleDelete = (index: number) => {
    if (index) {
      const newSafeAccounts = config.safeAccounts?.filter((item, i) => i !== index);
      setConfig((pre) => {
        return { ...pre, safeAccounts: newSafeAccounts };
      });
    }
  };

  const setFormValue = (i: Partial<ICustomWidget>) => {
    // EType
    for (let key in i) {
      // @ts-ignore
      let value = i[key];
      if (key == 'type') {
        value = EType[value];
      }
      if (key == 'startTime') {
        setSelectedStartDate(dayjs(value) as unknown as number);
      }
      if (key == 'endTime') {
        setSelectedEndDate(dayjs(value) as unknown as number);
      }
      // @ts-ignore
      setValue(key, value);
    }
  };

  const genSocialMedia = (i: Partial<ICustomWidget>) => {
    let temp = { ...i };
    if (temp?.twitter) {
      temp.twitter = temp.twitter.replace('https://twitter.com/', '');
    }
    if (temp?.telegram) {
      temp.telegram = temp.telegram.replace('https://t.me/', '');
    }
    return { ...temp };
  };

  const setConfigAndForm = (i: Partial<ICustomWidget>) => {
    let newVal = genSocialMedia(i);
    setConfig((pre) => ({ ...pre, ...newVal }));
    setFormValue(newVal);
  };

  // If specified, use the gateway
  const getInfoFromIpfs = async (cid: string) => {
    try {
      setCommonLoading(true);
      const info = await getFasterIpfsLink({
        ipfs: `https://nftstorage.link/ipfs/${cid}`,
        timeout: 4000,
      });
      setConfigAndForm(info);
      info && setCommonLoading(false);
    } catch (error) {
      console.error('error', 'getFasterIpfsLink-error');
    }
  };

  const handleClickModifyBtn = () => {
    getInfoFromIpfs(config?.previousCid!);
  };

  return (
    <>
      {/* loading */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={commonLoading}>
        {View}
      </Backdrop>

      {/* title */}
      <CreateTitle />

      {/* center info */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: { xs: 'center', md: 'space-between' },
          alignItems: { xs: 'center', md: 'start' },
          gap: 4,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '50%' }} flex={1}>
          {/* Previous Configuration */}
          <Card title="Previous Configuration">
            <Controller
              name={'previousCid'}
              control={control}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <FormInput title="Previous link" error={errors.previousCid?.type}>
                  <TextareaAutosize
                    minRows={3}
                    placeholder={`Enter your previous link and click the 'modify' button, for example: ${DEFAULT_PREVIOUS_LINK}XXX.`}
                    style={{
                      backgroundColor: 'var(--gray-300, #E2E8F0)',
                      height: '140px',
                      padding: '10px',
                      borderRadius: '4px',
                    }}
                    value={value}
                    onChange={(e: any) => {
                      setError('previousCid', {});
                      if (!e.target.value.startsWith('http')) {
                        setError('previousCid', { type: 'invalid previousLink' });
                      }
                      setConfig((pre) => ({
                        ...pre,
                        previousCid: new URLSearchParams(e.target.value.split('?')[1]).get('cid') || '',
                      }));
                      onChange(e);
                    }}
                  />
                </FormInput>
              )}
            />
            <div
              style={{
                marginBottom: '18px',
              }}
            >
              <Donate3Btn loadingButton onClick={handleClickModifyBtn} variant="contained" disabled={!config?.previousCid}>
                Modify the previous configuration
              </Donate3Btn>
              <div
                style={{
                  fontSize: '14px',
                  lineHeight: '26px',
                  color: 'rgba(100, 116, 139, 1)',
                  paddingTop: '16px',
                }}
              >
                Your original configuration will appear in the table below.
              </div>
            </div>
          </Card>

          {/* Style in your website */}
          <Card
            title="Style in your website"
            style={{
              paddingTop: '24px',
            }}
          >
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
              render={({ field: { onChange, value } }) => (
                <FormInput title="Primary color" error={errors.color?.type}>
                  <InputBase
                    startAdornment={
                      <>
                        <Box
                          sx={{
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                            borderRadius: '3px',
                            backgroundColor: value,
                            marginRight: '10px',
                          }}
                          onClick={handleOpen}
                        />

                        {displayColorPicker ? (
                          <div
                            style={{
                              position: 'absolute',
                              zIndex: 2,
                            }}
                          >
                            <div
                              style={{
                                position: 'fixed',
                                top: '0px',
                                right: '0px',
                                bottom: '0px',
                                left: '0px',
                              }}
                              onClick={handleClose}
                            />
                            <ChromePicker
                              color={config.color}
                              onChange={(color) => {
                                setConfig((pre) => ({
                                  ...pre,
                                  color: color.hex,
                                }));
                                onChange({ target: { value: color.hex } });
                              }}
                            />
                          </div>
                        ) : null}
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
              )}
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
                        setConfig((pre) => ({ ...pre, previousCid: '' }));
                      }}
                      onCropCancel={(file) => {
                        setFile(null);
                      }}
                      onCropEnd={(file) => {
                        setFile(file);
                      }}
                    >
                      {config?.previousCid ? (
                        <Img3 style={{ height: '98px', width: '98px' }} src={config?.avatar!} alt="previousCid" />
                      ) : (
                        <PreviewWrapper style={{ height: '98px', width: '98px' }}>{file ? <PreviewFile file={file} setAvatar={setAvatarToConfig} /> : <Icon icon={'material-symbols:cloud-upload'} color={'#65a2fa'} fontSize={60} />}</PreviewWrapper>
                      )}
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
                    <DescEditor onChange={handleDescEditorChange} previousValue={config?.description} />
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
                          <Image src="/icons/twitter-new.svg" alt="twitter" width="24" height="24" />
                        </InputAdornment>
                      }
                      onChange={(e: any) => {
                        setError('twitter', {});
                        setConfig((pre) => ({
                          ...pre,
                          twitter: `https://twitter.com/${e.target.value}`,
                        }));
                        onChange(e);
                      }}
                      placeholder="Enter your twitter account, like: donate3official"
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
                          <Image src="/icons/telegram-new.svg" alt="telegram" width="24" height="24" />
                        </InputAdornment>
                      }
                      value={value}
                      onChange={(e: any) => {
                        setError('telegram', {});
                        setConfig((pre) => ({
                          ...pre,
                          telegram: `https://t.me/${e.target.value}`,
                        }));
                        onChange(e);
                      }}
                      placeholder="Enter your telegram account, like: donate3official"
                    />
                  </FormInput>
                );
              }}
            />
            <Controller
              name={'accountType'}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <FormInput title="Account" error={errors.accountType?.type}>
                    <RadioGroup
                      defaultValue="0"
                      value={value}
                      onChange={(e) => {
                        let account = Number(e.target.value);
                        setError('accountType', {});
                        setConfig((pre) => ({
                          ...pre,
                          accountType: account,
                        }));
                        onChange(e);
                      }}
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value={0}
                        sx={{
                          border: value == 1 ? '1px solid  #E2E8F0' : '1px solid #0F172A',
                          borderRadius: '4px',
                          background: ' #FFF',
                          marginLeft: 0,
                          marginRight: 0,
                          padding: '16px 10px',
                          marginBottom: '16px',
                          paddingBottom: 5.25,
                        }}
                        control={<Radio color="default" />}
                        label={
                          <Box height={30}>
                            <Typography variant="body1" sx={{ mt: { sm: '-30px', xs: '-30px', md: '0px' } }} lineHeight="28px" fontWeight={600} color="#0F172A" mb={1}>
                              Solana Account
                            </Typography>
                            <Typography variant="body2" sx={{ lineHeight: '26px' }} color="#64748B">
                              Receive donation from Solana network with same address.
                            </Typography>
                          </Box>
                        }
                      />
                    </RadioGroup>
                  </FormInput>
                );
              }}
            />
            {config.accountType === 0 ? (
              <Controller
                name={'address'}
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => {
                  return (
                    <FormInput title="Receive address" error={errors.address?.type}>
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

                          if (!address.startsWith('0x')) {
                            setError('address', { type: 'not address' });
                          }
                          if (address.length !== 42) {
                            setError('address', { type: 'too long or too short' });
                          }
                          onChange(e);
                        }}
                      />
                    </FormInput>
                  );
                }}
              />
            ) : (
              <Box>
                <Typography
                  sx={{
                    position: 'inherit',
                    fontSize: '14px',
                    fontWeight: 600,
                    lineHeight: '26px',
                    marginBottom: '10px',
                  }}
                >
                  <span style={{ display: 'flex' }}>
                    <span style={{ flex: 1 }}>Receive address</span>
                  </span>
                </Typography>
              </Box>
            )}
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
