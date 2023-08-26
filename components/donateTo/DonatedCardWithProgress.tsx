import React, {use, useCallback, useEffect, useMemo, useState} from 'react';
import {Box, Typography} from '@mui/material';
import {useAccount, useNetwork} from 'wagmi';

import API from '@/common/API';
import Avatars from './Avatars';
import {ICustomWidget} from '../CustomWidget';
import {AccountType} from '@/utils/const';
import dayjs, {Dayjs} from 'dayjs';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
const MAX_COUNT = 10;

interface IRankingItem {
    address: `0x${string}`;
}

interface IRankingParams {
    chainId: number;
    address: `0x${string}`;
}

interface IDonatedCardProps {
    info: Pick<ICustomWidget, 'address' | 'safeAccounts' | 'accountType' | 'fundsGoal' | 'startTime' | 'endTime' | 'reason'>;
}

interface DonateTotalMoney {
    token: string;
    totalMoney: number;
    price: string;
    num: number;
}

interface DonateData {
    [key: string]: DonateTotalMoney;
}


const DonatedCard = ({info}: IDonatedCardProps) => {
    const {chain} = useNetwork();
    const {isConnected} = useAccount();
    const [ranking, setRanking] = useState<IRankingItem[]>([]);

    const [totalMoney, setTotalMoney] = useState(0);
    const [goalMoney, setGoalMoney] = useState(0);
    const [remainingTime, setRemainingTime] = useState<string | null>(null);
    const [progressValue, setProgressValue] = useState(0);
    const [reason, setReason] = useState<String>();

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        marginTop:'16px',
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#0F172A' : '#0F172A',
        },
    }));
    require('dayjs/locale/en');
    const startTime = dayjs(info?.startTime).format('DD/MM/YYYY');

    const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))({
        [`& .${tooltipClasses.tooltip}`]: {
            maxWidth: 312,
        },
    });
    /*拿到目前资金以及设置进度*/
    const queryDonatesSetRaised = async (params: IRankingItem) => {
        let sum: number;

        const data = await API.get('/donates/total-donation-sum', {
            params: {
                address: params.address!,

            },
            /*测试环境,提交需注意*/
            baseURL: process.env.NEXT_PUBLIC_BACKEND_API_REMOTE,
        });
        //console.log(sum);
        sum = await data?.data?.data;
        if (params) {
            setTotalMoney(sum);
            let goal: number = info?.fundsGoal!;
            setGoalMoney(goal);
            if(goal>0){
                const progress = (sum / goal * 100);
                if (progress < 100) {
                    setProgressValue(progress);
                } else {
                    setProgressValue(100);
                }
            }else{
                setProgressValue(100);
            }

        }
        const reasonFromInfo =info?.reason
        setReason(reasonFromInfo);

    };
    const remainDateInit = () => {
        const endTime = info?.endTime;
        if (endTime) {
            const remainingMilliseconds = endTime - dayjs().valueOf();
            if (remainingMilliseconds > 0) {
                const remainingDays = Math.ceil(remainingMilliseconds / (1000 * 60 * 60 * 24));
                const remainingYears = Math.floor(remainingDays / 365);
                const remainingMonths = Math.floor((remainingDays % 365) / 30);
                const remainingDay = remainingDays % 30;
                if (remainingYears > 0) {

                    setRemainingTime(`${remainingYears}Y ${remainingMonths}M ${remainingDay}D remaining`);
                } else {
                    if (remainingMonths > 0) {
                        setRemainingTime(` ${remainingMonths}M ${remainingDay}D remaining`);

                    } else {
                        setRemainingTime(`${remainingDay}D remaining`);
                    }

                }

            } else {
                setRemainingTime(" ")
            }

        }

        return null;
    };


    const queryDonatesRanking = (params: IRankingParams) => {
        API.get('/donates/ranking', {
            params,
            baseURL: process.env.NEXT_PUBLIC_BACKEND_API_REMOTE,
            headers: {'Content-Type': 'application/json'},
        }).then((res) => {
            console.log(res?.data?.data);
            setRanking(res?.data?.data || []);
        });
    };

    const genDonatesRankingParamsCB = useCallback((): IRankingParams | null => {
        const currentChainId = chain?.id!;

        if (info?.accountType == AccountType.safeAccount) {
            // safeAccount
            // safeAccount账户需要取当前网络的链ID对应的safeAccount，如果没有则返回null
            const selectedSafeAccount = info?.safeAccounts?.filter((item) => item?.networkId == currentChainId)?.[0];

            if (selectedSafeAccount?.address) {
                return {
                    chainId: currentChainId,
                    address: selectedSafeAccount?.address as `0x${string}`,
                };
            } else {
                return null;
            }
        } else {
            // EOA
            // EOA账户直接取
            return {
                chainId: currentChainId,
                address: info?.address! as `0x${string}`,
            };
        }
    }, [chain, info]);

    const getRankingListCallBack = useCallback(() => {
        const params = genDonatesRankingParamsCB();
        if (params?.address && params?.chainId) {
            queryDonatesRanking(params!);

            queryDonatesSetRaised(params!);
            remainDateInit();
        }
    }, [genDonatesRankingParamsCB]);


    useEffect(() => {
        if (isConnected && info) {

            getRankingListCallBack();
        }
    }, [getRankingListCallBack, isConnected, info]);

    const memoLeastTenList = useMemo(() => {
        let finalRankings = ranking;
        //ranking.length = 15;
        const length = ranking?.length || 0;

        if (length > MAX_COUNT) {
            finalRankings = ranking?.slice(0, MAX_COUNT);
        }
        //finalRankings =11;
        return finalRankings!.map(({address}) => address);
    }, [ranking]);

    const memoUnDisplayCount = useMemo(() => {
        const count = (ranking || [])?.length || 0;
        return count <= MAX_COUNT ? 0 : count - MAX_COUNT;
    }, [ranking]);
    return (
        <Box
            sx={{
                position: 'relative',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',

                mt:{xs:'30px'}
            }}
        >
            <Box
                sx={{

                    borderRadius: '8px',
                    width: '360px',
                    boxSizing: 'border-box',
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/*进度条*/}
                <Box sx={{backgroundColor: '#F8FAFC', borderRadius: '8px',border:'2px solid white'}}>

                    <Box sx={{margin: '28px 40px 0px 40px', paddingBottom: '12px'}}>
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Typography
                                        sx={{
                                            fontSize: '16px',
                                            lineHeight: '28px',
                                            fontWeight: 'bold'
                                        }}>Progress</Typography>
                            <Typography
                                        sx={{color: '#64748B', fontSize: '14px', lineHeight: '26px', fontWeight: 400}}>
                                {remainingTime}
                            </Typography>
                        </Box>
                        <BorderLinearProgress variant="determinate" value={progressValue} />
                      {/*  <LinearProgress variant="determinate" value={progressValue} color='inherit'
                                        sx={{mt: '16px', borderRadius: '8px', height: '12px', width: '100%'}}/>*/}

                        <Box sx={{mt: '16px', display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                            <Box>
                                <Typography variant="body1"
                                            sx={{
                                                fontSize: '14px',
                                                lineHeight: '26px',
                                                fontWeight: 600,
                                                color: '#64748B'
                                            }}>
                                    Funds raised
                                </Typography>
                                <Typography variant="h3"sx={{
                                    fontSize: '28px',
                                    lineHeight: '36px',
                                    fontWeight: 600,
                                    color: '#0F172A'
                                }}>{Math.floor(totalMoney)}U</Typography>
                            </Box>

                            <Box>
                                <Typography variant="body1"
                                            sx={{
                                                fontSize: '14px',
                                                lineHeight: '26px',
                                                fontWeight: 600,
                                                color: '#64748B'
                                            }}>
                                    Funds goal
                                </Typography>
                                <Typography variant="h3"sx={{
                                    fontSize: '28px',
                                    lineHeight: '36px',
                                    fontWeight: 600,
                                    color: '#0F172A'
                                }}>
                                    {goalMoney}U
                                </Typography>
                            </Box>

                        </Box>


                        <Typography variant="body2" sx={{
                            mt: '16px',
                            md: '16px',
                            textAlign: 'left',
                            fontSize: '14px',
                            lineHeight: '26px',
                            fontWeight: 500,
                            color: '#64748B'
                        }}>Start time: {startTime}</Typography>
                    </Box>

                </Box>


                <Box sx={{padding: '0px 34px 14px 34px'}}>
                    <Box sx={{mt:'10px'}}>
                        <Avatars list={memoLeastTenList} unDisplayCount={memoUnDisplayCount}/>
                    </Box>
                    <Typography variant="body2"
                                sx={{
                                    mt: '16px',
                                    fontSize: '14px',
                                    lineHeight: '26px',
                                    fontWeight: 400,
                                    color: '#64748B'
                                }}>
                        {ranking?.length} people have donated
                    </Typography>


                    <Box
                    sx={{mt:'16px',maxHeight:'40px'}}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '14px',
                                lineHeight: '20px',
                                fontWeight: 400,
                                color: '#64748B',
                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxHeight: '40px',
                                wordWrap: 'break-word',
                                textAlign: 'center',
                            }}
                        >
                            {reason}
                        </Typography>
                    </Box>
                    <CustomWidthTooltip title={reason}>
                        {/*<Button  sx={{  m: 1,textTransform:"none" }}>More</Button>*/}
                        <Typography
                            sx={{
                                height: '40px',
                                textAlign: 'right',
                                fontSize: '14px',
                                lineHeight: '20px',
                                color:'#437EF7'
                            }}>More</Typography>
                    </CustomWidthTooltip>

                </Box>


            </Box>
            {/* mask */}
            <Box
                sx={{
                    width: '92%',
                    height: '92%',
                    backgroundColor: '#CCFF00',
                    borderRadius: '8px',
                    position: 'absolute',
                    bottom: '-10px',
                    right: '-10px',
                    zIndex: 0,
                }}
            ></Box>
        </Box>);
    /*return (ranking || [])?.length > 0 ? (

    ) : (
        <></>
    );*/
};
export default React.memo(DonatedCard);
