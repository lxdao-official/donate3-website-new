import Container from '@mui/material/Container';
import Link from '@mui/material/Link/Link';
import Stack from '@mui/material/Stack/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
// import './style.css';

const theme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                maxWidthMd: {
                    maxWidth: 320,
                },
                maxWidthLg: {
                    maxWidth: 500,
                },
            },
        },
    },
});

export default function Test() {
    return (
        <ThemeProvider theme={theme}>
            {/* Customize component's width directly */}
            <Container
                maxWidth={false}
                sx={{ maxWidth: '200px', border: '1px solid' }}
            >
                <Stack spacing={2} direction="row">
                    <Link>Home</Link>
                    <Link>About</Link>
                    <Link>Contact</Link>
                </Stack>
            </Container>

            {/* Use built-in maxWidth options with theme customization */}
            <Container maxWidth="md" sx={{ border: '1px solid' }}>
                <Stack spacing={2} direction="row">
                    <Link>Home</Link>
                    <Link>About</Link>
                    <Link>Contact</Link>
                </Stack>
            </Container>
            <Container maxWidth="lg" sx={{ border: '1px solid' }}>
                <Stack spacing={2} direction="row">
                    <Link>Home</Link>
                    <Link>About</Link>
                    <Link>Contact</Link>
                </Stack>
            </Container>
        </ThemeProvider>
    );
}
