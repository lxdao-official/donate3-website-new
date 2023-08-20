import { Box } from '@mui/material';
import React from 'react';

import Preview from './Preview';

interface IPreviewRegionProps {
  srcDoc: string;
}

const PreviewRegion = ({ srcDoc }: IPreviewRegionProps) => {
  return (
    <Box sx={{ position: 'relative', minWidth: { xs: '280px', sm: '400px' }, height: { xs: '490px', sm: '700px' } }} flex={1}>
      <Box
        component="iframe"
        sx={{
          top: { xs: '-105px', sm: 0 },
          left: { xs: '-60px', sm: '79px' },
          border: '2px solid var(--gray-300, #E2E8F0);',
          mx: 'auto',
          minWidth: '400px',
          height: '800px',
          borderRadius: '22px',
          position: {
            xs: 'static',
            sm: 'static',
            md: 'absolute',
          },
          scale: { xs: '0.7', sm: '1' },
        }}
        srcDoc={srcDoc}
      />
      <Preview />
    </Box>
  );
};
export default PreviewRegion;
