import { Box, Container } from '@mui/material';
import React from 'react';
import ButtonConnectWallet from 'src/components/ButtonConnectWallet/ButtonConnectWallet';

export default function Header() {
    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    position: 'sticky',
                    zIndex: '1000',
                    width: '100%',
                    top: 0,
                    left: 0,
                    maxHeight: '72px',
                    justifyContent: 'flex-end',
                    py: 2,
                }}
            >
                <ButtonConnectWallet />
            </Box>
        </Container>
    );
}
