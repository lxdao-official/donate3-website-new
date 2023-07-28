import { Box } from '@mui/material';
import BpRadio from './BpRadio';

interface IRadioBoxProps {}

const RadioBox = ({ onChange, value, title, imgUrl, current }: any) => {
  return (
    <Box
      onClick={() => {
        onChange(value);
      }}
      sx={{
        padding: '12px',
        bgcolor: 'rgba(255, 255, 255, 0.90);',
        width: 200,
        height: 160,
        marginRight: '10px',
        marginBottom: '10px',
        border: value == current ? '1px solid var(--gray-1000, #0F172A)' : '1px solid var(--gray-300, #E2E8F0);',
        borderRadius: '5px',
        cursor: 'pointer',
        color: 'var(--gray-1000, #0F172A)',
      }}
    >
      <BpRadio checked={value == current} size="small" />
      <span>{title}</span>
      <Box component={'img'} src={imgUrl} sx={{ borderRadius: 2 }} />
    </Box>
  );
};

export default RadioBox;
