import { Radio } from '@mui/material';
import BpIcon from './BpIcon';
import BpCheckedIcon from './BpCheckedIcon';

// Inspired by blueprintjs
const BpRadio = (props: any) => {
  return <Radio disableRipple color="default" checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} {...props} />;
};

export default BpRadio;