import { Button, styled } from '@mui/material';
export default function Donate3Btn({ children, variant, sx, onClick,disabled, ...rest }: any) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || false}
      sx={{
        background: variant == 'contained' ? '#CCFF00' : 'transparent',
        border: '1px solid #283231',
        borderRadius: '5px',
        boxShadow: variant == 'contained' ? '4px 4px 0px rgba(186, 206, 204, 0.9);' : ' 4px 4px 0px rgba(211, 255, 37, 0.9);',
        color: '#44443F',
        fontWeight: '600',
        textTransform: 'capitalize',
        width: 'full',
        ...sx,
      }}
      fullWidth
      {...rest}
    >
      {children}
    </Button>
  );
}
