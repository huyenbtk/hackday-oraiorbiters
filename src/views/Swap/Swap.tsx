import { ExpandMoreRounded } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import ButtonSelectToken from 'src/components/ButtonSelectToken/ButtonSelectToken';
import ButtonSwap from 'src/components/ButtonSwap/ButtonSwap';
import InputCustom from 'src/components/InputCustom/InputCustom';
import NavigationMenu from 'src/components/NavigationMenu/NavigationMenu';
import { BN } from 'src/utils';
import { useSwapContext } from './context/swap-context';
import { formatNumber } from 'src/utils/format';

export default function Swap() {
    const { fromToken, setFromToken, toToken, setToToken } = useSwapContext();

    const handleSwap = () => {
        const tempToken = { ...fromToken };
        setFromToken((prev) => {
            return { ...prev, ...toToken };
        });
        setToToken((prev) => {
            return { ...prev, ...tempToken };
        });
    };

    const handleFromValueChange = (value: string) => {
        setFromToken((prev) => {
            return { ...prev, amountInput: value };
        });

        setToToken((prev) => {
            return { ...prev, amountInput: BN(value).times(fromToken.price).div(toToken.price).toFixed(6) };
        });
    };

    const handleToValueChange = (value: string) => {
        setToToken((prev) => {
            return { ...prev, amountInput: value };
        });

        setFromToken((prev) => {
            return { ...prev, amountInput: BN(value).div(fromToken.price).times(toToken.price).toFixed(6) };
        });
    };

    return (
        <Container>
            <Box sx={{ display: 'grid', alignItems: 'center', justifyContent: 'center', mt: 10, position: 'relative' }}>
                <NavigationMenu />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <InputCustom
                        subTitle="You pay"
                        endElement={<ButtonSelectToken token={fromToken} />}
                        value={fromToken.amountInput}
                        onChange={handleFromValueChange}
                        subValue={`~$${formatNumber(fromToken.price.times(fromToken.amountInput), { fractionDigits: 6 })}`}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            backgroundColor: '#EFF2F8',
                            width: '40px',
                            height: '40px',
                            border: '4px solid #f6fafe',
                            borderRadius: '12px',
                            top: '42%',
                            zIndex: 2,
                            cursor: 'pointer',
                        }}
                        onClick={handleSwap}
                    >
                        <ExpandMoreRounded sx={{ fontSize: '32px' }} />
                    </Box>
                    <InputCustom
                        subTitle="You receive"
                        endElement={<ButtonSelectToken token={toToken} />}
                        value={toToken.amountInput}
                        onChange={handleToValueChange}
                        subValue={`~$${formatNumber(toToken.price.times(toToken.amountInput), { fractionDigits: 6 })}`}
                    />
                </Box>
                <ButtonSwap />
            </Box>
        </Container>
    );
}
