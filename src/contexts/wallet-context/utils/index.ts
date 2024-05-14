import { LocalStorageKey, WalletConnected } from 'src/constants';
import { TWallet } from '../types';
import { sleep } from 'src/utils';

export async function getConnector(wallet?: TWallet) {
    let counter = 0;
    while (true) {
        if (window) {
            const walletConnected = wallet ? wallet : window.localStorage.getItem(LocalStorageKey.WalletConnected);
            if (walletConnected == WalletConnected.NoWallet) {
                return undefined;
            }
            if (walletConnected == WalletConnected.Keplr) {
                if (window.keplr) {
                    return window.keplr;
                } else {
                    if (counter == 5) {
                        throw Error('Keplr is not installed!');
                    }
                }
            }
            if (walletConnected == WalletConnected.Owallet) {
                if (window.owallet) {
                    return window.owallet;
                } else {
                    if (counter == 5) {
                        throw Error('Owallet is not installed!');
                    }
                }
            }
            if (walletConnected == WalletConnected.Leap) {
                if (window.leap) {
                    return window.leap;
                } else {
                    if (counter == 5) {
                        throw Error('Leap is not installed!');
                    }
                }
            }
        }
        counter++;
        if (counter == 10) {
            return undefined;
        }
        await sleep(60);
    }
}

export const LocalStorage = {
    getWalletConnected() {
        const data = localStorage.getItem(LocalStorageKey.WalletConnected);
        if (data) {
            return data as WalletConnected;
        }
        return null;
    },
};
