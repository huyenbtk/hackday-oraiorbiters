import { ExpandMoreRounded } from '@mui/icons-material';
import { Box, Button, Modal, Typography } from '@mui/material';
import IconAndName from '../IconAndName/IconAndName';
import { TTokenSwapInfo } from 'src/views/Swap/context/type';
import { formatNumber } from 'src/utils/format';
import { useModalContext } from 'src/contexts/modal-context/modal-context';
import ModalListToken from './ModalListToken/ModalListToken';

export default function ButtonSelectToken({ token, isFromToken }: { token: TTokenSwapInfo; isFromToken: boolean }) {
    const { openModal } = useModalContext();
    const handleOpenModal = () => {
        openModal('Select a Token', <ModalListToken isFromToken={isFromToken} />);
    };

    return (
        <Box>
            <Button variant="contained" onClick={handleOpenModal} endIcon={<ExpandMoreRounded />} sx={{ color: '#000000', '&:hover': { color: '#868E96' }, mb: 1 }}>
                <IconAndName nameToken={token.name} />
            </Button>
            <Typography variant="body3" color={'#787E7E'} sx={{ textAlign: 'right' }}>
                Balance: {formatNumber(token.balance, { fractionDigits: 6 })}
            </Typography>
        </Box>
    );
}
