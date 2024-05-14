import React from 'react';
import { ModalProvider } from './modal-context/modal-context';
import { ThemeCustomProvider } from './theme-context';
import { WalletProvider } from './wallet-context/wallet-context';
import SwapProvider from 'src/views/Swap/context/swap-context';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeCustomProvider>
            <WalletProvider>
                <SwapProvider>
                    <ModalProvider>{children}</ModalProvider>
                </SwapProvider>
            </WalletProvider>
        </ThemeCustomProvider>
    );
}
