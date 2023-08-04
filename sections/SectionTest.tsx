import React from 'react';
import { Box } from '@mui/system';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';

export function SectionTest() {
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
            component="body"
        >
            <RadioGroup value={selectedValue} onChange={handleChange}>
                <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                <FormControlLabel value="option3" control={<Radio  checked color="#ff0000" />} label="Option 3" />
            </RadioGroup>


            {/*<style>
                {`
        *, *::before, *::after {
          box-sizing: border-box;
        }

        @keyframes rotate {
          100% {
            transform: rotate(1turn);
          }
        }

        .rainbow {
          position: relative;
          z-index: 0;
          width: 400px;
          height: 300px;
          border-radius: 10px;
          overflow: hidden;
          padding: 2rem;

          &::before {
            content: '';
            position: absolute;
            z-index: -2;
            left: -50%;
            top: -50%;
            width: 200%;
            height: 200%;
            background-color: #399953;
            background-repeat: no-repeat;
            background-size: 50% 50%, 50% 50%;
            background-position: 0 0, 100% 0, 100% 100%, 0 100%;
            background-image: linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5);
            animation: rotate 4s linear infinite;
          }

          &::after {
            content: '';
            position: absolute;
            z-index: -1;
            left: 6px;
            top: 6px;
            width: calc(100% - 12px);
            height: calc(100% - 12px);
            background: white;
            border-radius: 5px;
            animation: opacityChange 3s infinite alternate;
          }
        }

        @keyframes opacityChange {np
          50% {
            opacity: 1;
          }
          100% {
            opacity: .5;
          }
        }
      `}
            </style>*/}

            <Box className="rainbow" />
        </Box>
    );
};


