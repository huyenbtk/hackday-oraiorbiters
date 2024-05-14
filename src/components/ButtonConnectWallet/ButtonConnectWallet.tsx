import { CopyAll, ExpandMoreRounded, HourglassEmpty } from '@mui/icons-material';
import { Box, Button, ClickAwayListener, Divider, MenuItem, SxProps, Typography } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import { rotateInfinity } from 'src/assets/animations/rotate';
import { IconWallet } from 'src/assets/icon';
import { Chainconnected } from 'src/constants';
import { useThemeContext } from 'src/contexts/theme-context';
import { infoWalletConnecting, useWalletContext } from 'src/contexts/wallet-context/wallet-context';
import { copyTextToClipboard } from 'src/utils';
import { formatAddress } from 'src/utils/format';

export default function ButtonConnectWallet() {
    const { isConnecting, oraichain } = useWalletContext();
    if (isConnecting) {
        return <ConnectingButton />;
    }
    if (oraichain.address) {
        return <ConnectedButton address={oraichain.address} />;
    }
    return <NotconnectedButton />;
}

export function NotconnectedButton({ sx }: { sx?: SxProps }) {
    const { openModalSelectWallet } = useWalletContext();
    async function onClickConnect() {
        openModalSelectWallet(Chainconnected.Oraichain);
    }
    return (
        <Button variant="gradient" onClick={onClickConnect} sx={{ ...sx }}>
            Connect wallet
        </Button>
    );
}

export function ConnectingButton() {
    // const { mobilePoint } = useThemeContext();
    return (
        <>
            <Button
                variant="gradient"
                disabled
                startIcon={
                    <HourglassEmpty
                        sx={{
                            fontSize: '17px',
                            animation: rotateInfinity,
                        }}
                    />
                }
            >
                Connecting...
            </Button>
        </>
    );
}

function ConnectedButton({ address }: { address: string }) {
    // const { mobilePoint } = useThemeContext();
    const [open, setOpen] = React.useState(false);
    const { walletConnected, disconnectWallet } = useWalletContext();

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    function _copyText(_address: string) {
        copyTextToClipboard(_address);
        toast.success('Copied to clipboard');
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative', width: 'fit-content' }}>
                <Button variant="gradient" onClick={handleClick} sx={{ textTransform: 'none', px: 1 }}>
                    <img src={infoWalletConnecting[walletConnected].logoWallet} alt="logo wallet" style={{ width: '20px', height: '20px', borderRadius: '4px', marginRight: '4px' }} />
                    {formatAddress(address, 5, 4)}
                    <ExpandMoreRounded />
                </Button>
                {open ? (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '40px',
                            right: 0,
                            width: 'fit-content',
                            bgcolor: 'background.paper',
                            minWidth: '180px',
                            borderRadius: '16px',
                            boxShadow: 4,
                            py: 2,
                        }}
                    >
                        <Box sx={{ display: 'flex', placeItems: 'center', px: 2, mt: 1 }}>
                            <Box mr={'auto'} textAlign={'left'}>
                                <Typography variant="body3" color={'text.secondary'}>
                                    Wallet
                                </Typography>
                                <Typography variant="body2" fontWeight={600}>
                                    {infoWalletConnecting[walletConnected].name}
                                </Typography>
                            </Box>

                            <img src={infoWalletConnecting[walletConnected].logoWallet} alt="logo wallet" style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
                        </Box>

                        <MenuItem sx={{ mt: 1, flexDirection: 'column', placeItems: 'start' }} onClick={() => _copyText(address)}>
                            <Typography variant="body3" color={'text.secondary'}>
                                Account address
                            </Typography>
                            <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
                                <Typography variant="body2" fontWeight={600}>
                                    {formatAddress(address, 5, 4)}
                                </Typography>
                                <CopyAll sx={{ fontSize: '20px' }} />
                            </Box>
                        </MenuItem>
                        <MenuItem sx={{ mt: 1 }} onClick={disconnectWallet}>
                            <Typography variant="body2" color={'text.secondary'} fontWeight={500}>
                                Disconnect
                            </Typography>
                        </MenuItem>
                    </Box>
                ) : null}
            </Box>
        </ClickAwayListener>
    );
}
