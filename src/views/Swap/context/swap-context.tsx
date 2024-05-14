import BigNumber from 'bignumber.js';
import { set } from 'date-fns';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AssetInfo, TAppDenom, TTokenInfo, tokenInfo } from 'src/constants';
import { useWalletContext } from 'src/contexts/wallet-context/wallet-context';
import { BaseContextProps } from 'src/global.config';
import { BN } from 'src/utils';
import { TTokenSwapInfo } from './type';

export type TSwapData = {
    getBalance(token: TAppDenom, type: 'token1' | 'token2'): Promise<void>;
    getTokenPrice(assetToken: AssetInfo, type: 'token1' | 'token2'): Promise<void>;
    fromToken: TTokenSwapInfo;
    setFromToken: React.Dispatch<React.SetStateAction<TTokenSwapInfo>>;
    toToken: TTokenSwapInfo;
    setToToken: React.Dispatch<React.SetStateAction<TTokenSwapInfo>>;
    buttonSwapDisabled: boolean;
    setButtonSwapDisabled(disabled: boolean): void;
};

// export const SwapSelection: { [k in TAppDenom]: { name: string; token: TTokenInfo; canChangeTo: TAppDenom[] } } = {
//     USDT: { name: 'USDT', token: tokenInfo.USDT, canChangeTo: [] },
//     ORAI: { name: 'ORAI', token: tokenInfo.ORAI, canChangeTo: [] },
//     ORAIX: { name: 'ORAIX', token: tokenInfo.ORAIX, canChangeTo: [] },
// };

const SwapContext = createContext({} as TSwapData);
export default function SwapProvider({ children }: BaseContextProps) {
    const [fromToken, setFromToken] = useState<TTokenSwapInfo>({ name: 'ORAI', balance: BN(0), price: BN(1), amountInput: '0' });
    const [toToken, setToToken] = useState<TTokenSwapInfo>({ name: 'USDT', balance: BN(0), price: BN(1), amountInput: '0' });
    const [buttonSwapDisabled, setButtonSwapDisabled] = useState(false);
    const { getUserBalance, getPrice, oraichain } = useWalletContext();

    async function getBalance(token: TAppDenom, type: 'token1' | 'token2') {
        const balance = await getUserBalance(tokenInfo[token].assetInfo);
        if (type === 'token1') {
            setFromToken((prev) => {
                return { ...prev, balance: balance.div(BN(10).pow(tokenInfo[token].decimal)) };
            });
        }
        if (type === 'token2') {
            setToToken((prev) => {
                return { ...prev, balance: balance.div(BN(10).pow(tokenInfo[token].decimal)) };
            });
        }
    }
    async function getTokenPrice(assetToken: AssetInfo, type: 'token1' | 'token2') {
        const price = await getPrice(assetToken);
        if (type === 'token1') {
            setFromToken((prev) => {
                return { ...prev, price };
            });
        }
        if (type === 'token2') {
            setToToken((prev) => {
                return { ...prev, price };
            });
        }
    }

    useEffect(() => {
        getBalance(fromToken.name, 'token1');
        getTokenPrice(tokenInfo[fromToken.name].assetInfo, 'token1');
    }, [fromToken.name, oraichain.address, oraichain.userClient]);

    useEffect(() => {
        getBalance(toToken.name, 'token2');
        getTokenPrice(tokenInfo[toToken.name].assetInfo, 'token2');
    }, [toToken.name, oraichain.address, oraichain.userClient]);

    return (
        <SwapContext.Provider
            value={{
                getBalance,
                getTokenPrice,
                fromToken,
                setFromToken,
                toToken,
                setToToken,
                buttonSwapDisabled,
                setButtonSwapDisabled,
            }}
        >
            {children}
        </SwapContext.Provider>
    );
}
export const useSwapContext = () => useContext(SwapContext);
