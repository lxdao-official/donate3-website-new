import React from 'react';

interface PreviewWrapperProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const PreviewWrapper = ({ children, style }: PreviewWrapperProps) => {
  return (
    <div
      style={{
        width: 200,
        height: 200 * 0.75, // 4:3
        backgroundColor: '#f2f4f6',
        color: '#333',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #fff',
        position: 'relative',
        marginRight: 10,
        marginBottom: 10,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default React.memo(PreviewWrapper);
