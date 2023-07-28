import React, { ReactNode } from 'react';

interface ICardProps {
  title: string;
  children: ReactNode;
  style?: React.CSSProperties;
  hasBorder?: boolean;
}

const Card = ({ title, children, style, hasBorder = true }: ICardProps) => {
  const borderStyle = hasBorder
    ? {
        borderBottom: '1px solid var(--gray-400, #CBD5E1);',
      }
    : {};

  return (
    <div
      style={{
        paddingBottom: '10px',
        ...borderStyle,
        ...style,
      }}
    >
      <div style={{ fontSize: '20px', fontWeight: '600', lineHeight: '28px', color: 'rgba(15, 23, 42, 1)', marginBottom: '22px', gap: 0 }}>{title}</div>
      {children}
    </div>
  );
};
export default Card;
