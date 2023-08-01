import { styled } from '@mui/material';
import BpIcon from './BpIcon';

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#CCFF00',
  '&:before': {
    display: 'block',
    width: 18,
    height: 18,
    // backgroundImage: 'radial-gradient(#fff,#fff 33%,transparent 33%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#a5ce00',
  },
});

export default BpCheckedIcon;