import { ExpandMoreRounded } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import IconAndName from '../IconAndName/IconAndName';
import { TTokenSwapInfo } from 'src/views/Swap/context/type';
import { formatNumber } from 'src/utils/format';

export default function ButtonSelectToken({ token }: { token: TTokenSwapInfo }) {
    return (
        <Box>
            <Button variant="contained" sx={{ color: '#000000', '&:hover': { color: '#868E96' }, mb: 1 }}>
                <IconAndName nameToken={token.name} />
            </Button>
            <Typography variant="body3" color={'#787E7E'} sx={{ textAlign: 'right' }}>
                Balance: {formatNumber(token.balance, { fractionDigits: 6 })}
            </Typography>
        </Box>
    );
}
