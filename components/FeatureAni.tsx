import { Box, Fade } from "@mui/material";

export default function Donate3Btn({ show }: { show: boolean }) {
    return <Fade in={show}>
        <Box
            component={'img'}
            width={"175px"}
            height={"140px"}
            src={'/images/donate-black-logo.svg'}
            sx={{
                opacity: 0,
                position: 'absolute',
                right: '2px',
                top: '2px',
                zIndex: "10",

            }}
        />
    </Fade>
}