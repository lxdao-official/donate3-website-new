import React from 'react';
import IPFSAvatar from '../IPFSAvatar/IPFSAvatar';
import { Box } from '@mui/material';

interface IAvatarsProps {
  list: `0x${string}`[];
  unDisplayCount: number;
}

const Avatars = ({ list, unDisplayCount }: IAvatarsProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {list.map((item, index) => (
        <IPFSAvatar
          address={item}
          key={item}
          style={{
            width: '36px',
            height: '36px',
            marginRight: '8px',
            border: '1px solid rgba(248, 250, 252, 1)',
            background: 'rgba(248, 250, 252, 1)',
            marginBottom: '8px',
          }}
        />
      ))}
      {unDisplayCount ? (
        <Box
          sx={{
            width: '34px',
            height: '34px',
            marginRight: '8px',
            border: '1px solid rgba(248, 250, 252, 1)',
            background: '#334155',
            borderRadius: '130px',
            lineHeight: '34px',
            fontSize: '12px',
            fontWeight: '500',
            marginBottom: '8px',
            color: '#F8FAFC',
            textAlign: 'center',
          }}
        >
          +{unDisplayCount}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};
export default React.memo(Avatars);
