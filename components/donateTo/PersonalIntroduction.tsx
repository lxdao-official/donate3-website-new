import React from 'react';
import { Box } from '@mui/material';
import { ICustomWidget } from '../CustomWidget';

interface IPersonalIntroductionProps {
  info: Pick<ICustomWidget, 'description'>;
}

const PersonalIntroduction = ({ info }: IPersonalIntroductionProps) => {
  return info?.description ? (
    <Box
      sx={{
        paddingTop: '40px',
        width: '100%',
      }}
      dangerouslySetInnerHTML={{ __html: info?.description }}
    ></Box>
  ) : (
    <></>
  );
};
export default React.memo(PersonalIntroduction);
