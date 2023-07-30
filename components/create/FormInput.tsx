import { Box, FormControl, Typography } from '@mui/material';

const FormInput = ({ title, desc, error, children,style }: any) => {
  return (
    <FormControl
      variant="standard"
      fullWidth
      style={{
        marginBottom: '30px',
        ...style
      }}
    >
      <Box>
        {title ? (
          <Typography
            sx={{
              position: 'inherit',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '26px',
              marginBottom: '10px',
            }}
          >
            {title}
          </Typography>
        ) : (
          <></>
        )}

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
