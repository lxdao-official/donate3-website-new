import { Radio } from '@mui/material';
import Image from 'next/image';

// Inspired by blueprintjs
const BpRadio = (props: any) => {
  const iconUrl = '/images/RadioButtonUncheckedFilled.svg';
  const checkedIconUrl = '/images/RadioButtonCheckedFilled.svg';

  const icon = <Image src={iconUrl} alt={'checkedIcon'} width={24} height={24} />;
  const checkedIcon = <Image src={checkedIconUrl} alt={'checkedIcon'} width={24} height={24} />;

  return <Radio disableRipple color="default" checkedIcon={checkedIcon} icon={icon} {...props} />;
};

export default BpRadio;
