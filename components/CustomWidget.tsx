import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import { CroppedFile, SelectedFile, UploadFile, UploadResult, Uploader3 } from '@lxdao/uploader3';
import { Icon } from '@iconify/react';
import { Box, InputBase, InputAdornment, Radio, Typography, RadioGroup, FormControlLabel, Select, MenuItem } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import { ChromePicker } from 'react-color';
import Image from 'next/image';
import { NFTStorage, Blob } from 'nft.storage';

import Donate3Btn from './Donate3Btn';
import PreviewFile from './PreviewFile';
import PreviewWrapper from './PreviewWrapper';
import { DEFAULT_CREATE_ADDRESS, DEFAULT_CREATE_CONFIG, DONATE_SDK_URL, AccountType, SafeAccount, EType, AccountProgressType } from '@/utils/const';
import CreateTitle from './create/Title';
import { getDonatePreviewSrcDoc, getDonateUrl, getDynamicDonateUrl, throttle } from '@/utils/common';
import FormInput from './create/FormInput';
import RadioBox from './create/RadioBox';
import Card from './create/Card';
import CodeRegion from './create/CodeRegion';
import DescEditor from './create/DescEditor';
import PreviewRegion from './create/PreviewRegion';

import Delete from '../public/icons/delete.svg';
import Arbitrum from '../public/icons/networks/arbitrum.svg';
import Ethereum from '../public/icons/networks/ethereum.svg';
import Goerli from '../public/icons/networks/goerli.svg';
import Linea from '../public/icons/networks/linea.svg';
import Optimism from '../public/icons/networks/optimism.svg';
// import Pgn from '../public/icons/networks/pgn.svg';
import Polygon from '../public/icons/networks/polygon.svg';

import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface ICustomWidget {
  type: number;
  color: string;
  name: string;
  accountType: AccountType;
  progressType: AccountProgressType;
  address?: string;
  safeAccounts?: SafeAccount[];
  avatar: string;
  description: string;
  twitter: string;
  telegram: string;
  fundsGoal?: number;
  startTime?: number;
  endTime?: number;
  reason?: string;
}

export default function CustomWidget() {
  const { address } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<UploadResult | CroppedFile | UploadFile | SelectedFile | null>();
  const [donationsCode, setDonationsCode] = useState<string>('');
  const [donationsLink, setDonationsLink] = useState<string>('');
  const [previewSrcDoc, setPreviewSrcDoc] = useState<string>('');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState<number>();
  const [selectedEndDate, setSelectedEndDate] = useState<number>();
  const [expanded, setExpanded] = useState<string | false>(false);
  //const [showSetProgress, setShowSetProgress] = useState(false);

  //设置是否有进度
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
    //1默认表示没有进度条
    let progressType = 1;
    if (isExpanded) {
      progressType = 0;
    } else {
      progressType = 1;
    }
    //设置是否带进度条
    setConfig((pre) => ({
      ...pre,
      progressType: progressType,
    }));
  };

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

  const networks = [
    { id: 1, network: 'Ethereum', icon: Ethereum },
    { id: 5, network: 'Goerli', icon: Goerli },
    { id: 10, network: 'Optimism', icon: Optimism },
    { id: 42161, network: 'Arbitrum', icon: Arbitrum },
    { id: 137, network: 'Polygon', icon: Polygon },
    { id: 59144, network: 'Linea', icon: Linea },
    { id: 420, network: 'Optimism Goerli', icon: Optimism },
    // { id: 424, network: 'PGN', icon: Pgn },
  ];

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
    setDonationsLink(`https://donate3.xyz/donateTo?cid=${cid}`);
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
      console.log(error);
    }
  };

  const handleClickConfirmBtn = () => {
    const isAddress = (str: string) => /^0x[0-9a-fA-F]{40}$/.test(str);
    const newSafeAccounts = config.safeAccounts ? [...config.safeAccounts] : [];
    if (config.accountType === 0) {
      if (!(config.address && isAddress(config.address))) {
        setError('address', { type: 'not address or too long or too short' });
        return;
      }
    } else {
      if (!(newSafeAccounts.length && newSafeAccounts.every((item) => item.address && isAddress(item.address)))) {
        setError('safeAccounts', { type: 'not address or too long or too short' });
        return;
      }
    }
    setLoading(true);
    const newConfig = { ...config };
    if (newConfig.accountType) {
      delete newConfig.address;
    } else {
      delete newConfig.safeAccounts;
    }
    storeInfoToNFTStorage(newConfig);
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

  const addAccountItem = () => {
    const newSafeAccounts = config.safeAccounts ? [...config.safeAccounts] : [];
    const lastItemAddress = newSafeAccounts[newSafeAccounts.length - 1].address;
    if (!(lastItemAddress && lastItemAddress.startsWith('0x') && lastItemAddress.length === 42)) {
      setError('safeAccounts', { type: 'not address or too long or too short' });
      return;
    }
    if (!newSafeAccounts[newSafeAccounts.length - 1].address) {
      return;
    }
    setConfig((pre) => {
      newSafeAccounts.push({ networkId: networks[0].id, address: undefined });
      return { ...pre, safeAccounts: newSafeAccounts };
    });
  };

  const handleDelete = (index: number) => {
    if (index) {
      const newSafeAccounts = config.safeAccounts?.filter((item, i) => i !== index);
      setConfig((pre) => {
        return { ...pre, safeAccounts: newSafeAccounts };
      });
    }
  };

  return (
    <>
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
              render={({ field: { onChange, value } }) => (
                <FormInput title="Primary color" error={errors.color?.type}>
                  <InputBase
                    startAdornment={
                      <>
                        <Box sx={{ width: '24px', height: '24px', cursor: 'pointer', borderRadius: '3px', backgroundColor: value, marginRight: '10px' }} onClick={handleOpen} />

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
                          <Image src="/icons/twitter-new.svg" alt="twitter" width="24" height="24" />
                        </InputAdornment>
                      }
                      onChange={(e: any) => {
                        let twitter = e.target.value;
                        setError('twitter', {});
                        if (!twitter.startsWith('@')) {
                          setError('twitter', { type: 'invalid twitter, must starts with @, like @donate3' });
                          return;
                        }
                        setConfig((pre) => ({
                          ...pre,
                          twitter: `https://twitter.com/${e.target.value.slice(1)}`,
                        }));
                        onChange(e);
                      }}
                      placeholder="Enter your twitter account：@xxxx"
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
                        let telegram = e.target.value;
                        setError('telegram', {});
                        if (!telegram.startsWith('@')) {
                          setError('telegram', { type: 'invalid telegram, must starts with @, like @donate3' });
                          return;
                        }
                        setConfig((pre) => ({
                          ...pre,
                          telegram: `https://t.me/${e.target.value.slice(1)}`,
                        }));
                        onChange(e);
                      }}
                      placeholder="Enter your telegram account：@xxxx"
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
                        /*   if (account==1){
                               setShowSetProgress(true)
                           }else {
                               setShowSetProgress(false);
                           }*/
                        onChange(e);
                      }}
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        sx={{ border: '1px solid #0F172A', borderRadius: '4px', background: ' #FFF', marginLeft: 0, marginRight: 0, padding: '16px 10px', marginBottom: '16px', paddingBottom: 5.25 }}
                        value={0}
                        control={<Radio color="default" />}
                        label={
                          <Box height={30}>
                            <Typography variant="body1" lineHeight="28px" fontWeight={600} color="#0F172A" mb={1}>
                              EOA
                            </Typography>
                            <Typography variant="body2" lineHeight="26px" color="#64748B">
                              Receive donation from any chain with same address.
                            </Typography>
                          </Box>
                        }
                      />
                      <FormControlLabel
                        sx={{ border: '1px solid #0F172A', borderRadius: '4px', background: ' #FFF', marginLeft: 0, marginRight: 0, padding: '16px 10px', paddingBottom: 5.25 }}
                        value={1}
                        control={<Radio color="default" />}
                        label={
                          <Box height={30}>
                            <Typography variant="body1" lineHeight="28px" fontWeight={600} color="#0F172A" mb={1}>
                              Safe Account
                            </Typography>
                            <Typography variant="body2" lineHeight="26px" color="#64748B">
                              Receive donation from any chain with different address.
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
                    <span style={{ cursor: 'pointer' }} onClick={addAccountItem}>
                      + Add
                    </span>
                  </span>
                </Typography>

                {!!errors.safeAccounts?.type && (
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
                    {errors.safeAccounts.type}
                  </Typography>
                )}

                {!!config.safeAccounts?.length &&
                  config.safeAccounts.map((item, index) => (
                    <Box display={'flex'} key={'list' + index} mb={1}>
                      <Box width={165} mr={1.5}>
                        <Select
                          fullWidth
                          variant="standard"
                          sx={{
                            height: '40px',
                            borderRadius: '4px',
                            textIndent: '10px',
                            backgroundColor: 'var(--gray-300, #E2E8F0)',
                            '& svg': { verticalAlign: 'middle' },
                          }}
                          value={item.networkId || 1}
                          onChange={(e) => {
                            setConfig((pre) => {
                              const newSafeAccounts = pre.safeAccounts ? [...pre.safeAccounts] : [];
                              newSafeAccounts[index].networkId = ~~e.target.value;
                              return { ...pre, safeAccounts: newSafeAccounts };
                            });
                          }}
                        >
                          {networks.map((item: { id: number; network: string; icon: any }) => (
                            <MenuItem value={item.id} key={item.id}>
                              <SvgIcon sx={{ mr: 1.25 }} component={item.icon} />
                              {item.network}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                      <Box flex={1}>
                        <InputBase
                          sx={{
                            mt: 0,
                            width: '100%',
                            backgroundColor: 'var(--gray-300, #E2E8F0)',
                            height: '40px',
                            paddingX: '10px',
                            borderRadius: '4px',
                          }}
                          endAdornment={
                            <InputAdornment sx={{ cursor: 'pointer' }} position="start">
                              <SvgIcon sx={{ cursor: 'pointer' }} onClick={() => handleDelete(index)} component={Delete} inheritViewBox />
                            </InputAdornment>
                          }
                          value={item.address}
                          onChange={(e: any) => {
                            setError('safeAccounts', { type: '' });
                            setConfig((pre) => {
                              const newSafeAccounts = pre.safeAccounts ? [...pre.safeAccounts] : [];
                              newSafeAccounts[index].address = e.target.value;
                              return { ...pre, safeAccounts: newSafeAccounts };
                            });
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
              </Box>
            )}

            {/*{config.accountType === 0 ? (


              /* ) : (
                  <></>
              )}
              */}
            <Box>
              <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                  <Typography sx={{ width: '100%', flexShrink: 0 }}>Do you need to set a donation progress?</Typography>
                  {/*<Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>*/}
                </AccordionSummary>
                <AccordionDetails>
                  {/*期望得到的goal*/}
                  <Box>
                    <Controller
                      name={'fundsGoal'}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <FormInput title="Expected funds goal ( USDT-based)" /*error={errors.name?.type}*/>
                            <InputBase
                              sx={{
                                mt: 0,
                                backgroundColor: 'var(--gray-300, #E2E8F0)',
                                height: '40px',
                                paddingX: '10px',
                                borderRadius: '4px',
                              }}
                              type="number"
                              value={value}
                              onChange={(e: any) => {
                                let goal = e.target.value;
                                setConfig((pre) => ({
                                  ...pre,
                                  fundsGoal: goal,
                                }));
                                onChange(e);
                              }}
                            />
                          </FormInput>
                        );
                      }}
                    />
                    <Controller
                      name={'startTime'}
                      control={control}
                      rules={{ required: true }}
                      render={({}) => {
                        return (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Select Start Date"
                              value={selectedStartDate}
                              onChange={(newValue) => {
                                let startTime = dayjs(newValue).valueOf();
                                console.log(startTime);

                                setSelectedStartDate(startTime);

                                setConfig((pre) => ({
                                  ...pre,
                                  startTime: startTime,
                                }));
                              }}
                            />
                          </LocalizationProvider>
                        );
                      }}
                    />
                    <Controller
                      name={'endTime'}
                      control={control}
                      rules={{ required: true }}
                      render={({}) => {
                        return (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              sx={{ marginLeft: '40px' }}
                              label="Select End Date"
                              value={selectedEndDate}
                              onChange={(newValue) => {
                                let endTime = dayjs(newValue).valueOf(); // 使用新的选定日期值

                                if (endTime < selectedStartDate!) {
                                  alert('End Date Should Bigger Than Start Date');
                                  setSelectedEndDate(selectedEndDate); // 恢复之前的结束日期值
                                } else {
                                  setSelectedEndDate(endTime);
                                  setConfig((pre) => ({
                                    ...pre,
                                    endTime: endTime,
                                  }));
                                }
                              }}
                            />
                          </LocalizationProvider>
                        );
                      }}
                    />
                    <Controller
                      name={'reason'}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: {} }) => {
                        return (
                          <FormInput title="Challenges I am facing" /*error={errors.name?.type}*/>
                            <TextField
                              id="standard-multiline-static"
                              //label="Multiline"
                              multiline
                              rows={4}
                              //defaultValue="Default Value"
                              variant="standard"
                              onChange={(e: any) => {
                                let fundsReason = e.target.value;
                                setConfig((pre) => ({
                                  ...pre,
                                  reason: fundsReason,
                                }));
                                //onChange(e);
                              }}
                            />
                          </FormInput>
                        );
                      }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
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
