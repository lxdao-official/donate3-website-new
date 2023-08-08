import { Img3 } from '@lxdao/img3';
import classNames from 'classnames/bind';
import React, { useMemo } from 'react';
import Image from 'next/image';

import { ZERO_ADDRESS } from '../../utils/const';
import { getNounsBase64 } from '../../utils/common';
import styles from './IPFSAvatar.module.css';

export type TIPFSSrc = `https://nftstorage.link/ipfs/${string}`;

export interface IIPFSAvatarProps {
  children?: React.ReactNode;
  className?: string;
  ipfsSrc?: TIPFSSrc;
  address?: `0x${string}`;
  style?: React.CSSProperties;
}

// avatar for ipfs
// ipfs src >> base64 >> default img
const IPFSAvatar = ({ className, ipfsSrc, address, style }: IIPFSAvatarProps) => {
  let cx = classNames.bind(styles);

  const base64Hash = address?.length === 42 ? getNounsBase64(address || ZERO_ADDRESS) : null;

  const memoImgNodes = useMemo(() => {
    const DEFAULT_AVATAR = 'https://nftstorage.link/ipfs/bafkreidu3tvlrtolnaxdfvofgduisb45mepd3n6ndebdfjoezc3ue6r7vy';
    const ALT = base64Hash ? 'avatarBase64Hash' : 'avatarDefault';
    const SRC = base64Hash ? `data:image/svg+xml;base64,${base64Hash}` : DEFAULT_AVATAR;

    return ipfsSrc ? (
      <Img3 className={cx(styles.avatar, className)} src={ipfsSrc} alt="Avatar" style={style} />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={ALT} src={SRC} className={cx(styles.avatar, className)} style={style} />
    );
  }, [base64Hash, className, cx, ipfsSrc, style]);

  return <>{memoImgNodes}</>;
};

export default React.memo(IPFSAvatar);
