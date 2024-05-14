import { ClearRounded } from '@mui/icons-material';
import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { IconSpinLoading } from 'src/assets/icon';
import { Chainconnected, WalletConnected } from 'src/constants';
import { infoChainConnecting, infoWalletConnecting, useWalletContext } from 'src/contexts/wallet-context/wallet-context';

export type TDataModalSelectWallet = {
    open: boolean;
    chain: Chainconnected;
};
type Props = TDataModalSelectWallet & {
    closeModal: () => void;
    selectWalletToConnect(chain: Chainconnected, wallet: WalletConnected): Promise<void>;
};

export default function ModalSelectConnectWallet({ open, chain, closeModal, selectWalletToConnect }: Props) {
    const { connectChainAndWallet, isConnecting } = useWalletContext();

    const infoChain = infoChainConnecting[chain];

    function onExit() {
        closeModal();
    }

    return (
        <Dialog open={open} fullWidth maxWidth={'xs'}>
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5">Choose Wallet</Typography>
                    <ClearRounded sx={{ color: 'text.secondary', fontSize: '26px', cursor: 'pointer' }} onClick={onExit} />
                </Box>
            </DialogTitle>
            <DialogContent>
                {isConnecting ? (
                    <Box py={5}>
                        <IconSpinLoading sx={{ fontSize: '120px' }} />
                    </Box>
                ) : (
                    <>
                        <Box mt={2} mb={4}>
                            {infoChain.walletSupport.map((wallet, index) => {
                                const walletInfo = infoWalletConnecting[wallet];
                                return (
                                    <Box
                                        key={wallet + index}
                                        sx={{
                                            borderRadius: '8px',
                                            bgcolor: 'primary.light',
                                            px: 2.5,
                                            display: 'flex',
                                            gap: 1.5,
                                            py: 1,
                                            mb: 1,
                                            placeItems: 'center',
                                            cursor: 'pointer',
                                            '&:hover': { '& > .wallet-name': { color: 'primary.main' } },
                                        }}
                                        onClick={() => selectWalletToConnect(chain, wallet)}
                                    >
                                        <img src={walletInfo.logoWallet} alt={`logo wallet ${walletInfo.name}`} style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
                                        <Typography className="wallet-name" variant="body2" fontWeight={600} sx={{ transition: 'color 0.2s' }}>
                                            {walletInfo.name}
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
