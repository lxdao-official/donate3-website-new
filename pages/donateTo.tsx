import type {NextPage} from 'next';
import React, {useEffect, useState} from 'react';
import {Backdrop, Box, InputBase, Typography} from '@mui/material';
import {Layout} from '@/components/Layout';
import {useRouter} from 'next/router';
import {useLottie} from 'lottie-react';

import DonatedCard from '@/components/donateTo/DonatedCard';
import PersonalDetails from '@/components/donateTo/PersonalDetails';
import PersonalIntroduction from '@/components/donateTo/PersonalIntroduction';
import {getFasterIpfsLink} from '@/utils/ipfsTools';
import {ICustomWidget} from '@/components/CustomWidget';
import loadingAnimation from '../public/loading/donate3Loading.json';
import API from "@/common/API";
import DonatedCardWithProgress from "@/components/donateTo/DonatedCardWithProgress";
import dayjs from "dayjs";


const DonateTo: NextPage = () => {
    const router = useRouter();
    const cid = router.query?.cid as string;
    const [info, setInfo] = useState<Partial<ICustomWidget>>();
    const [loading, setLoading] = useState<boolean>(true);


    const options = {
        animationData: loadingAnimation,
        loop: true,
    };
    const {View} = useLottie(options, {
        width: '80px',
        height: '80px',
    });

    const [showProgress, setShowProgress] = useState(1);
    // If specified, use the gateway
    const getInfoFromIpfs = async (cid: string) => {
        try {
            const info = await getFasterIpfsLink({
                ipfs: `https://nftstorage.link/ipfs/${cid}`,
                timeout: 4000,
            });
            setInfo(info);
            info && setLoading(false);
            /*设置progress卡片渲染*/
            if (info && 'progressType' in info) {
                setShowProgress(info.progressType as number);
            }
            //console.log(info?.progressType);
        } catch (error) {
            console.error('error', 'getFasterIpfsLink-error');
        }
    };


    useEffect(() => {
        cid && getInfoFromIpfs(cid);
    }, [cid]);

    const handleDonateBtn = () => {
        window.location.href = `${window.location.origin}/demo?cid=${cid}`;
    };

    return (

        <Layout

            style={{
                backgroundColor: '#f9fafc',
                //backgroundColor: '#ffffff',
                zIndex:1,
                maxWidth:'1512px'
            }}

        >


            <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={loading}>
                {View}
            </Backdrop>


            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '45px 200px',
                    zIndex: 0,
                    mt:{xs:'0%',md:'0%'},
                }}
            >
                <Box sx={{
                    position: "absolute",
                    display:'inline-block',
                    width: '100%',
                    top:0,
                    //right:'10%',
                    //mt:{xs:'-15%',md:'-7%'},
                    zIndex: 0,
                    pointerEvents:'none'
                }} component={'img'} src='/images/donateToBackground.png'/>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', sm: 'column', md: 'row',},
                        justifyContent: {xs: '', md: 'space-between',},
                        alignItems: 'center',
                        width: '100%',
                    }}
                >

                    <PersonalDetails
                        info={{
                            name: info?.name!,
                            avatar: info?.avatar!,
                            twitter: info?.twitter!,
                            telegram: info?.telegram!,
                        }}
                        onDonate={handleDonateBtn}
                    />


                    {showProgress === 0 ? (
                        <DonatedCardWithProgress
                            info={{
                                address: info?.address!,
                                safeAccounts: info?.safeAccounts!,
                                accountType: info?.accountType!,
                                fundsGoal: info?.fundsGoal!,
                                startTime: info?.startTime!,
                                endTime: info?.endTime!,
                                reason: info?.reason!
                            }}
                        />
                    ) : (
                        <DonatedCard
                            info={{
                                address: info?.address!,
                                safeAccounts: info?.safeAccounts!,
                                accountType: info?.accountType!,
                            }}
                        />
                    )}

                </Box>

                <PersonalIntroduction
                    info={{
                        description: info?.description!,
                    }}
                />


            </Box>

        </Layout>
    );
};

export default DonateTo;
