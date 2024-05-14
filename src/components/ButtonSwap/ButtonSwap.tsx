import React from 'react';
import { useWalletContext } from 'src/contexts/wallet-context/wallet-context';
import ButtonConnectWallet, { ConnectingButton, NotconnectedButton } from 'src/components/ButtonConnectWallet/ButtonConnectWallet';
import { Button } from '@mui/material';

export default function ButtonSwap({ disabled }: { disabled: boolean }) {
    const { isConnecting, oraichain } = useWalletContext();
    if (isConnecting) {
        return <ConnectingButton />;
    }
    if (oraichain.address) {
        return (
            <Button variant="gradient" sx={{ height: '52px', mt: 2, fontSize: '22px' }} disabled={disabled}>
                Swap
            </Button>
        );
    }
    return <NotconnectedButton />;
}
