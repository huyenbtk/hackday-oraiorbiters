import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { TAppDenom, mapTokenToIcon } from 'src/constants/mapTokenToIcon';
import { useModalContext } from 'src/contexts/modal-context/modal-context';

export default function ModalListToken({ onSetName, token }: { onSetName: (name: TAppDenom) => void; token: TAppDenom }) {
    const { closeModal } = useModalContext();
    return Object.keys(mapTokenToIcon).map((key: string, index: number) => {
        const IconToken = mapTokenToIcon[key as TAppDenom];
        return (
            <Button
                key={index}
                variant="contained"
                size="small"
                sx={{ color: '#000000', '&:hover': { colors: '#868E96' } }}
                onClick={() => {
                    onSetName(key as TAppDenom);
                    closeModal();
                }}
            >
                <Box sx={{ display: 'flex', placeItems: 'center', alignItems: 'flex-end', columnGap: 1 }}>
                    <IconToken sx={{ fontSize: '24px' }} />
                    <Typography component={'span'} fontWeight={600}>
                        {key}
                    </Typography>
                </Box>
            </Button>
        );
    });
}
