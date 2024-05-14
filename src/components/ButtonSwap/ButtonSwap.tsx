import React, { useEffect } from 'react';
import { useWalletContext } from 'src/contexts/wallet-context/wallet-context';
import ButtonConnectWallet, { ConnectingButton, NotconnectedButton } from 'src/components/ButtonConnectWallet/ButtonConnectWallet';
import { Button } from '@mui/material';
import { BN } from 'src/utils';
import { useSwapContext } from 'src/views/Swap/context/swap-context';

export default function ButtonSwap() {
    const { fromToken, buttonSwapDisabled, setButtonSwapDisabled } = useSwapContext();

    useEffect(() => {
        const amount = BN(fromToken.amountInput);
        const isButtonDisabled = amount.isGreaterThan(fromToken.balance);
        setButtonSwapDisabled(isButtonDisabled);
    }, [fromToken.amountInput]);

    const { isConnecting, oraichain } = useWalletContext();
    if (isConnecting) {
        return <ConnectingButton />;
    }
    if (oraichain.address) {
        if (buttonSwapDisabled) {
            return (
                <Button variant="gradient" sx={{ height: '52px', mt: 2, fontSize: '22px' }} disabled={buttonSwapDisabled}>
                    Insufficient {fromToken.name} balance
                </Button>
            );
        }
        if (BN(fromToken.amountInput).isLessThanOrEqualTo(0) || BN(fromToken.amountInput).isNaN()) {
            return (
                <Button variant="gradient" sx={{ height: '52px', mt: 2, fontSize: '22px' }} disabled={true}>
                    Enter an amount
                </Button>
            );
        }
        return (
            <Button variant="gradient" sx={{ height: '52px', mt: 2, fontSize: '22px' }}>
                Swap
            </Button>
        );
    }
    return <NotconnectedButton />;
}
