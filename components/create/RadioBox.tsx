import { Box } from '@mui/material';
import BpRadio from './BpRadio';

interface IRadioBoxProps {}

const RadioBox = ({ onChange, value, title, imgurl, current }: any) => {
  return (
    <Box
      onClick={() => {
        onChange(value);
      }}
      sx={{
        padding: '12px',
        bgcolor: 'background.paper',
        width: 200,
        height: 160,
        marginRight: '10px',
        marginBottom: '10px',
        border: value == current ? '3px solid #CCFF00' : '',
        borderRadius: '5px',
        cursor: 'pointer',
        color: value == current ? '#A9D300' : '#3E4343',
      }}
    >
      <BpRadio checked={value == current} size="small" />
      <span>{title}</span>
      <Box component={'img'} src={imgurl} sx={{ borderRadius: 2 }} />
    </Box>
  );
};

export default RadioBox;
