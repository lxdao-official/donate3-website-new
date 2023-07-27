import React from 'react';

interface IStatusProps {
  children: React.ReactNode;
}

export const Status = ({ children }: IStatusProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
      }}
    >
      {children}
    </div>
  );
};
