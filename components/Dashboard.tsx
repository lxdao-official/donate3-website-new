'use client';

import type { NextPage } from 'next';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Donate3Btn from './Donate3Btn';
import xlsx, { IJsonSheet } from 'json-as-xlsx';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Box, Grid, Paper, Stack, TableFooter, TablePagination, Tooltip, Link, Typography, styled, Backdrop, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';

import API from '../common/API';
import { json } from 'stream/consumers';

const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_EHTERSCAN_API_KEY;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f1f0f5',
    color: '#B5B5C3',
    fontSize: '12px',
    fontWeight: 700,
    padding: 0,
    border: 'none',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function formatData(chainType: string = '1', coinType: number = 0, createTime: number[] = [], fromAddress: string, id: string, message: string = '0', status: number = 1, toAddress: string, updateTime: number[] = [], usdValue: string = '0', userId: string = '', value: number = 0, hash: string = '') {
  return {
    chainType,
    coinType,
    createTime,
    fromAddress,
    id,
    message,
    status,
    toAddress,
    updateTime,
    usdValue,
    userId,
    value,
    hash,
  };
}

function TablePaginationActions(props: any) {
  const theme = useTheme();
  const [pagei, setPagei] = useState(1);
  const { count, page, rowsPerPage, onPageChange } = props;

  const handlePageInput = (event: any) => {
    setPagei(event.target.value - 1);
  };

  const handlePageInputConfirm = (event: any) => {
    if (event.key == 'Enter') {
      let max = Math.ceil(count / rowsPerPage);
      if (parseInt(event.target.value) > max) {
        onPageChange(event, max - 1);
        return;
      }
      setPagei(max - 1);
      onPageChange(event, pagei);
      return;
    }
  };

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  useEffect(() => {
    setPagei(page);
  }, [page]);

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <input style={{ width: '2rem', textAlign: 'center' }} value={pagei + 1} onChange={handlePageInput} onKeyDown={handlePageInputConfirm}></input>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>

      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

interface Coin {
  name: string;
  icon: string;
  explorer: string;
}

interface CoinList {
  [key: number]: Coin;
}

interface Chain {
  name: string;
  icon: string;
  coin: CoinList;
}

interface ChainList {
  [key: string]: Chain;
}

interface DonateDetail {
  chainType: string;
  coinType: number;
  createTime: number[];
  fromAddress: string;
  id: string;
  message: string | undefined;
  status: number | undefined;
  toAddress: string;
  updateTime: number[];
  usdValue: string | undefined;
  userId: string | undefined;
  value: number;
  hash: string;
}

interface TotalList {
  [key: string]: number;
}

function convertToTimestamp(dateArray: number[]): number {
  const [year, month, day, hours, minutes, seconds, milliseconds] = dateArray;
  const date = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
  return date.getTime();
}
function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export default function Dashboard() {
  const { address } = useAccount();
  const [addressStr, setAddressStr] = useState<string>('');
  useEffect(() => {
    setAddressStr(address as string);
  }, [address]);

  const coinType: ChainList = {
    '80001': {
      name: 'Polygon Mubai',
      icon: '/icons/support/polygon.svg',
      coin: {
        0: {
          name: 'MATIC',
          icon: '/icons/support/polygon.svg',
          explorer: 'https://mumbai.polygonscan.com/tx/',
        },
      },
    },
    '137': {
      name: 'Polygon',
      icon: '/icons/support/polygon.svg',
      coin: {
        0: {
          name: 'MATIC',
          icon: '/icons/support/polygon.svg',
          explorer: 'https://polygonscan.com/tx/',
        },
      },
    },
    '5': {
      name: 'ETH Goerli',
      icon: '/icons/support/ethereum.svg',
      coin: {
        0: {
          name: 'MATIC',
          icon: '/icons/support/ethereum.svg',
          explorer: 'https://goerli.etherscan.io/tx/',
        },
      },
    },
  };

  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState<TotalList>({
    '80001': 0.0,
    '137': 0.0,
    '5': 0.0,
  });
  const [perPage, setPerPage] = useState(25);
  const [price, setPrice] = useState(0.0);
  const [pagination, setPagination] = useState<number>(25);
  const [rows, setRows] = useState<DonateDetail[]>([]);
  // let rows: any[] = [];

  const emptyRows = page >= 0 ? Math.max(0, (1 + page) * perPage - rows.length) : 0;
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangePerPage = (event: any) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //get params from url

  useEffect(() => {
    const readData = async () => {
      const data = await API.get(`/api/v1/donate/queryDonateDetailsByParam?pageNo=${page}&pageSize=${perPage}&toAddress=${address}`);
      const res: DonateDetail[] = data?.data?.result?.records;
      const tmp = res.map((value) => {
        const formated = formatData(value?.chainType, value?.coinType, value?.createTime, value?.fromAddress, value?.id, value?.message, value?.status, value?.toAddress, value?.updateTime, value?.usdValue, value?.userId, value?.value, value?.hash);
        return formated;
      });
      return tmp;
    };

    (async () => {
      if (!address) {
        return;
      }
      setOpen(true);
      const tmp = await readData();
      setOpen(false);
      setRows(tmp);
      setPagination(tmp?.length);
    })();
  }, [address, perPage, page]);

  useEffect(() => {
    (async () => {
      const initialTotalList: TotalList = {
        '80001': 0.0,
        '137': 0.0,
        '5': 0.0,
      };
      const totalc = rows.reduce((pre, cur) => {
        if (!Object.keys(initialTotalList).includes(cur.chainType)) {
          return pre;
        }
        pre[cur.chainType] = pre[cur.chainType] || 0 + cur.value;
        return pre;
      }, initialTotalList);
      setTotal(totalc);
    })();
  }, [rows]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ETHERSCAN_API_KEY}`, {
          method: 'GET',
        });
        const data = await res.json();
        setPrice(data.result.ethusd);
      } catch (error) {
        console.log(error);
      }
    })();
  });
  const downloadFile = () => {
    let data = [
      {
        sheet: 'DonationDetail',
        columns: [
          { label: 'chainId', value: 'chainType' },
          { label: 'chain', value: (row: any) => coinType[row.chainType].name },
          { label: 'symbol', value: (row: any) => coinType[row.chainType].coin[0].name },
          { label: 'createTime', value: (row: any) => formatTimestamp(convertToTimestamp(row.createTime)) },
          { label: 'message', value: 'message' },
          { label: 'tx', value: 'hash' },
          { label: 'from', value: 'fromAddress' }, // Top level data
        ],
        content: rows,
      },
      {
        sheet: 'Children',
        columns: [
          { label: 'User', value: 'user' }, // Top level data
          { label: 'Age', value: 'age', format: '# "years"' }, // Custom format
          { label: 'Phone', value: (row: any) => row?.more?.phone ?? '' }, // Run functions
        ],
        content: [
          { user: 'Manuel', age: 16, more: { phone: '99999999' } },
          { user: 'Ana', age: 17, more: { phone: '87654321' } },
        ],
      },
    ];
    let settings = {
      fileName: 'MySpreadsheet',
    };
    xlsx(data as IJsonSheet[], settings);
  };

  return (
    <Grid item xs={8} mb="40px">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack mt="30px">
        <Typography variant="h4" color="#44443F">
          Cumulative Donation
        </Typography>
        <Stack direction={'row'}>
          <Typography
            variant="body2"
            color="#858686"
            sx={{
              wordBreak: 'break-all',
              display: 'flex',
            }}
          >
            {addressStr}
            <Box sx={{ display: 'inline-block', ml: '10px' }} component="img" src="/icons/copy2.svg" />
          </Typography>
        </Stack>
        {Object.keys(total).map((key, index) => {
          return (
            <Stack key={index} direction="row" mt="10px" alignItems="center">
              <Box component="img" src={coinType[key]?.icon} height="24px" mr="6px" />
              <Typography fontSize="28px" fontWeight="600" lineHeight="34px">
                {total[key].toFixed(4)}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
      <Stack mt="60px">
        <Stack justifyContent="space-between" alignItems="center" direction="row" mb="26px">
          <Typography color="#3E4343" fontWeight="600">
            Details
          </Typography>
          <Donate3Btn
            sx={{
              width: '100px',
            }}
            onClick={downloadFile}
          >
            Export
          </Donate3Btn>
        </Stack>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead sx={{ backgroundColor: '#f1f0f5', height: '38px' }}>
              <TableRow>
                <StyledTableCell align="center">WHO</StyledTableCell>
                <StyledTableCell align="center">Time</StyledTableCell>
                <StyledTableCell align="center">Token</StyledTableCell>
                <StyledTableCell align="center">Blockchain</StyledTableCell>
                <StyledTableCell align="center">Message</StyledTableCell>
                <StyledTableCell align="center">Hash</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(perPage > 0
                ? rows
                    .filter((row) => {
                      const chainIds = Object.keys(coinType);
                      if (chainIds.includes(row?.chainType)) {
                        return row;
                      }
                    })
                    .sort((a, b) => {
                      return (sort ? 1 : -1) * (convertToTimestamp(a.createTime) - convertToTimestamp(b.createTime));
                    })
                    .slice(page * perPage, page * perPage + perPage)
                : rows
              ).map((row: DonateDetail, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#fbffdc',
                    },
                  }}
                >
                  <StyledTableCell align="center" component="th" scope="row">
                    <Stack direction="row" justifyContent="center" alignItems="center" gap={1.5}>
                      {/* <Box width={40} component="img" src={row?.avatar} /> */}
                      <Tooltip title={row?.fromAddress} placement="bottom">
                        <Link underline="none" href={coinType[row?.chainType as string]?.coin[0].explorer + row?.fromAddress} target="_blank">
                          <Typography>{row?.fromAddress.slice(0, 6) + '...' + row?.fromAddress.slice(-5, -1)}</Typography>
                        </Link>
                      </Tooltip>
                    </Stack>
                  </StyledTableCell>

                  <StyledTableCell align="center" component="th" scope="row">
                    <Stack direction="row" justifyContent="center" alignItems="center" gap={1.5}>
                      <Typography>{formatTimestamp(convertToTimestamp(row?.createTime))}</Typography>
                    </Stack>
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Stack direction={'column'} alignItems="center">
                      <Typography whiteSpace="pre" align="right" lineHeight={'14px'}>
                        {`${row?.value} ${coinType[row?.chainType as string]?.coin[row?.coinType as number]?.name}\n`}
                      </Typography>
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Stack direction="row" gap={1.5} justifyContent="center">
                      <Box width="24px" component={'img'} src={coinType[row?.chainType as string]?.icon} />
                      <Typography>{coinType[row?.chainType as string]?.name}</Typography>
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Stack direction={'column'} alignItems="center">
                      <Typography whiteSpace="pre" align="right" lineHeight={'14px'}>
                        {row?.message}
                      </Typography>
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Stack direction={'column'} alignItems="center">
                      <Typography whiteSpace="pre" align="right" lineHeight={'14px'}>
                        <Link underline="none" href={coinType[row?.chainType as string]?.coin[0].explorer + row?.hash} target="_blank">
                          {row?.hash.slice(0, 5) + '...' + row?.hash.slice(-5, -1)}
                        </Link>
                      </Typography>
                    </Stack>
                  </StyledTableCell>
                </TableRow>
              ))}
              {/* {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  count={pagination}
                  rowsPerPage={perPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangePerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Stack>
    </Grid>
  );
}
