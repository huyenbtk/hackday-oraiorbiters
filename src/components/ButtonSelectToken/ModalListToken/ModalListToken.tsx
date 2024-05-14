import { Box, Button, Typography } from '@mui/material';
import { TAppDenom } from 'src/constants';
import { mapTokenToIcon } from 'src/constants/mapTokenToIcon';
import { useModalContext } from 'src/contexts/modal-context/modal-context';
import { useSwapContext } from 'src/views/Swap/context/swap-context';

export default function ModalListToken({ isFromToken }: { isFromToken: boolean }) {
    const { fromToken, setFromToken, toToken, setToToken } = useSwapContext();
    const onSetName = (name: TAppDenom) => {
        if (isFromToken) {
            if (name === toToken.name) {
                setToToken((prev) => {
                    return { ...prev, name: fromToken.name };
                });
            }
            setFromToken((prev) => {
                return { ...prev, name };
            });
        } else {
            if (name === fromToken.name) {
                setFromToken((prev) => {
                    return { ...prev, name: toToken.name };
                });
            }
            setToToken((prev) => {
                return { ...prev, name };
            });
        }
    };
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
