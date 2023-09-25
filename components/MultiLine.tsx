import { Box } from '@mui/material';
export default function MultiLine({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <Box
        sx={{
          position: 'absolute',
          //display:'inline-block',
          bottom: '-30%',
          width: '100%',
          zIndex: -1,
        }}
        component={'img'}
        src="/images/Vector.png"
      />
    </Box>
  );
}
