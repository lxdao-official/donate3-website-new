import { Box, FormControl, Typography } from '@mui/material';

const FormInput = ({ title, desc, error, children }: any) => {
  return (
    <FormControl variant="standard" fullWidth>
      <Box mb="12px">
        <Typography
          sx={{
            position: 'inherit',
            fontWeight: '600',
            fontSize: '14px',
            lineHeight: '17px',
            px: '5px',
            color: '#3e4343',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontWeight: '500',
            fontSize: '12px',
            lineHeight: '15px',
            px: '5px',
            mr: '3px',
            color: '#929f9e',
          }}
        >
          {desc}
        </Typography>
        <Typography
          sx={{
            fontWeight: '500',
            fontSize: '12px',
            lineHeight: '15px',
            px: '5px',
            mr: '3px',
            color: '#DC0202',
          }}
        >
          {error}
        </Typography>
      </Box>
      {children}
      {/* <InputBase sx={{ mt: 0 }} /> */}
    </FormControl>
  );
};

export default FormInput;