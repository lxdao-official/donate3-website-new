import React, {use, useCallback, useEffect, useMemo, useState} from 'react';
import {Box, Typography} from '@mui/material';
import {useAccount, useNetwork} from 'wagmi';
import {LinearProgress, CircularProgress} from '@mui/material';
import API from '@/common/API';
import Avatars from './Avatars';
import {ICustomWidget} from '../CustomWidget';
import {AccountType} from '@/utils/const';
import {fontColor} from "suneditor/src/plugins";
//import {Dayjs}  from 'dayjs';
import dayjs, {Dayjs} from 'dayjs';

const MAX_COUNT = 10;

interface IRankingItem {
    address: `0x${string}`;
}

interface IRankingParams {
    chainId: number;
    address: `0x${string}`;
}

interface IDonatedCardProps {
    info: Pick<ICustomWidget, 'address' | 'safeAccounts' | 'accountType' | 'fundsGoal' | 'startTime' | 'endTime'>;
}

interface DonateTotalMoney {
    token: string;
    totalMoney: number;
    price: string;
    num: number;
}

interface DonateData {
    [key: string]: DonateTotalMoney[];
}


const DonatedCard = ({info}: IDonatedCardProps) => {
    const {chain} = useNetwork();
    const {isConnected} = useAccount();
    const [ranking, setRanking] = useState<IRankingItem[]>([]);
    const [donatePeopleCount, setDonatePeopleCount] = useState(0);
    const [totalMoney, setTotalMoney] = useState(0);
    const [goalMoney, setGoalMoney] = useState(1);
    const remainingTime = '8M 25D remaining';
    const [progressValue, setProgressValue] = useState(0);
    const descriptionContent = 'This is the reason and introduction. This is bla a reason and this is my blabla bla...';

    require('dayjs/locale/en');
    //const dateStr = "2023-08-12T16:00:00.000Z";
    const startTime = dayjs(info?.startTime).format('DD/MM/YYYY');

    /*拿到目前资金以及设置进度*/
    const queryDonatesSetRaised = async (params: IRankingItem) => {
        let sum = 0;

        const data = await API.get('/donates/donation-amount', {
            params: {
                address: '0xe395B9bA2F93236489ac953146485C435D1A267B',
                //params,
                //address: info?.address
            },
            /*本地测试环境,提交需注意*/
            baseURL: process.env.NEXT_PUBLIC_BACKEND_API_LOCAL,
        });

        const donateTotalMony: DonateData = await data?.data?.data;

        if (donateTotalMony) {
            for (const key in donateTotalMony) {
                //console.log(parseFloat(donateTotalMony[key][0].totalMoney));
                const totalMoney = donateTotalMony[key][0].totalMoney;
                sum += totalMoney;
            }
        }

        //setGoalMoney(info?.fundsGoal);
        if (params) {
            setTotalMoney(sum);
            let goal: number = info?.fundsGoal!;
            setGoalMoney(goal);
            /*  setGoalMoney(prevState => {


                  if (typeof info?.fundsGoal === 'number') {
                      return prevState + info.fundsGoal;
                  }

                  const defaultValue = 0;
                  return prevState + defaultValue;
                  //console.log()

              } );*/
            const progress = (sum / goal * 100);
            /* console.log(goal)
             console.log(sum)
             console.log(progress)*/
            //console.log(goalMoney)

            if (progress < 100) {
                setProgressValue(progress);
            } else {
                setProgressValue(100);
            }
        }


    };
    /*拿到目前捐赠人数*/
    const queryDonatesSetPeople = async (params: IRankingItem) => {

        const data = await API.get('/donates/donationsCount', {
            params: {
                address: '0xe395B9bA2F93236489ac953146485C435D1A267B',
                //address: info?.address
            },
            /*本地测试环境,提交需注意*/
            baseURL: process.env.NEXT_PUBLIC_BACKEND_API_LOCAL,
        });

        /*   const tmp = res.map((value) => {
               const formated = formatData(`${value?.chainId}`, 0, value?.timestamp as unknown as number[], value?.from, `${value?.id}`, value?.message, 1, value?.to, [], '0', '', Number(value?.money) / 1000000000000000000, value?.transactionHash);
               return formated;
           });*/

        const donateCount: number = await data?.data?.data?.data;

        setDonatePeopleCount(donateCount);

    };

    useEffect(() => {
        if (isConnected && info) {
            const item: IRankingItem = {
                address: `0x123456789abcdef`,
            };
            queryDonatesSetRaised(item);
            queryDonatesSetPeople(item);
        }
    }, [isConnected, info]);


    /*
    定义了一个名为 queryDonatesRanking 的函数，该函数用于向后端 API 发起获取捐赠排行榜数据的请求。

  具体来说，queryDonatesRanking 函数使用 API.get() 方法发送 GET 请求到 /donates/ranking 路径，并传递一个包含以下内容的配置对象作为参数：

  params: 由调用者提供的 IRankingParams 对象，包含了请求排行榜所需的参数。
  baseURL: 这里使用了 process.env.NEXT_PUBLIC_BACKEND_API_NEW 变量作为请求的基础 URL。
  headers: 设置请求头，指定为 'Content-Type': 'application/json'，表示请求的数据类型为 JSON 格式。
  在请求成功后，通过 .then() 方法处理响应结果 res，并将 res?.data?.data（如果存在）赋值给 setRanking() 函数，用于更新排行榜数据。

  总结起来，这段代码定义了一个函数 queryDonatesRanking，用于向后端 API 发起获取捐赠排行榜数据的请求，并根据响应结果更新排行榜数据。
    * */
    const queryDonatesRanking = (params: IRankingParams) => {
        API.get('/donates/ranking', {
            params,
            baseURL: process.env.NEXT_PUBLIC_BACKEND_API_NEW,
            headers: {'Content-Type': 'application/json'},
        }).then((res) => {
            setRanking(res?.data?.data || []);
        });
    };

    /*函数主要逻辑如下：

  通过 chain?.id! 获取当前网络的链ID，并将其赋值给 currentChainId 变量。
  根据 info?.accountType 判断账户类型是 AccountType.safeAccount 还是其他类型。
  如果账户类型是 AccountType.safeAccount，则从 info?.safeAccounts 中筛选出网络ID与 currentChainId 相同的安全账户对象，并取第一个匹配项赋值给 selectedSafeAccount 变量。
  如果 selectedSafeAccount?.address 存在，则返回包含当前链ID和安全账户地址的对象。
  如果没有符合条件的安全账户，则返回 null。
  如果账户类型不是安全账户（即 EOA 账户），直接使用当前链ID和 info?.address 生成并返回对象。*/
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
    /*
    * 通过将 genDonatesRankingParamsCB 添加到依赖项数组中，
    * 可以确保当 genDonatesRankingParamsCB 发生变化时，
    * useCallback() 将重新创建并返回一个新的记忆化的回调函数。
    * 这样可以避免在没有必要时重复创建回调函数，
    * 提高性能，并且确保只有在依赖项改变时才会重新创建回调函数。*/
    const getRankingListCallBack = useCallback(() => {
        const params = genDonatesRankingParamsCB();
        if (params?.address && params?.chainId) {
            queryDonatesRanking(params!);
        }
    }, [genDonatesRankingParamsCB]);

    /*当连接状态发生改变且账户信息可用时，
    useEffect() 将自动调用 getRankingListCallBack() 来获取捐赠排行榜数据。这
    样可以确保在连接成功且相关信息可用时，及时获取和更新排行榜数据。*/

    useEffect(() => {
        if (isConnected && info) {
            getRankingListCallBack();
        }
    }, [getRankingListCallBack, isConnected, info]);

    /*通过将 ranking 添加到依赖项数组中，
    可以确保当 ranking 发生变化时，useMemo() 将重新运行，
    并返回更新后的计算结果。这样可以避免在没有必要时重复计算，
    提高性能，并且确保只有在依赖项改变时才会重新计算并返回新的结果。*/
    const memoLeastTenList = useMemo(() => {
        let finalRankings = ranking;
        const length = ranking?.length || 0;
        if (length > MAX_COUNT) {
            finalRankings = ranking?.slice(0, MAX_COUNT);
        }
        return finalRankings!.map(({address}) => address);
    }, [ranking]);
    /*通过将 ranking 添加到依赖项数组中，
    可以确保当 ranking 发生变化时，useMemo() 将重新运行，
    并返回更新后的计算结果。这样可以避免在没有必要时重复计算，提高性能，
    并且确保只有在依赖项改变时才会重新计算并返回新的结果。*/
    const memoUnDisplayCount = useMemo(() => {
        const count = (ranking || [])?.length || 0;
        return count <= MAX_COUNT ? 0 : count - MAX_COUNT;
    }, [ranking]);
    return (<Box
        sx={{
            position: 'relative',
        }}
    >
        <Box
            sx={{
                padding: '28px 40px 40px 40px',
                borderRadius: '8px',
                width: '380px',
                boxSizing: 'border-box',
                textAlign: 'center',
                backgroundColor: '#fff',
                position: 'relative',
                zIndex: 1,
            }}
        >
            {/*进度条*/}
            <Box sx={{}}>

                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="body2"
                                sx={{fontSize: '16px', lineHeight: '28px', fontWeight: 600}}>Progress</Typography>
                    <Typography variant="body2"
                                sx={{color: '#64748B', fontSize: '14px', lineHeight: '26px', fontWeight: 400}}>
                        {remainingTime}
                    </Typography>
                </Box>

                {/*          <progress max="2500" value="1300" style={{height:'32px',width: '100%'}}></progress>*/}

                <LinearProgress variant="determinate" value={progressValue} color='inherit'
                                sx={{mt: '16px', borderRadius: '8px', height: '12px', width: '100%'}}/>

                <Box sx={{mt: '16px', display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                    <Box>
                        <Typography variant="body1"
                                    sx={{fontSize: '14px', lineHeight: '26px', fontWeight: 600, color: '#64748B'}}>
                            Funds Raised
                        </Typography>
                        <Typography variant="body1">{Math.floor(totalMoney)}U</Typography>
                    </Box>

                    <Box>
                        <Typography variant="body1"
                                    sx={{fontSize: '14px', lineHeight: '26px', fontWeight: 600, color: '#64748B'}}>
                            Funds Goal
                        </Typography>
                        <Typography variant="body1">
                            {/*   {fundsGoal}*/}
                            {goalMoney}U
                        </Typography>
                    </Box>

                </Box>


                <Typography variant="body2" sx={{
                    mt: '16px',
                    textAlign: 'left',
                    fontSize: '14px',
                    lineHeight: '26px',
                    fontWeight: 400,
                    color: '#64748B'
                }}>
                    {/* Start time: {startTime}*/}

                    Start time: {startTime}

                </Typography>

                <Typography variant="body2"
                            sx={{mt: '16px', fontSize: '14px', lineHeight: '26px', fontWeight: 400, color: '#64748B'}}>
                    {/*  Start time: {startTime}*/}
                    {donatePeopleCount} people have donated
                </Typography>

                <Typography variant="body2" sx={{mt: '16px',}}>{descriptionContent}</Typography>
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
