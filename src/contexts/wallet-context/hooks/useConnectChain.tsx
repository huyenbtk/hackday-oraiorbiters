import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { Decimal } from '@cosmjs/math';
import { useLayoutEffect, useState } from 'react';
import { BN } from 'src/utils';
import BigNumber from 'bignumber.js';
import { IDataChainConnected, TWallet } from '../types';
import { ChainInfo, OfflineAminoSigner } from '@keplr-wallet/types';
import { getConnector } from '../utils';
import { WalletExtensionError } from '../WalletExtensionError';

type Props = {
    chainInfo: ChainInfo;
};

export default function useConnectChain({ chainInfo }: Props) {
    const [isConnecting, setConnecting] = useState<boolean>(false);
    const [data, setData] = useState<IDataChainConnected>({ address: '', userClient: null, client: null });
    const [error, setError] = useState<Error | undefined>();

    async function connectPublicClient() {
        try {
            const _client = await SigningCosmWasmClient.connect(chainInfo.rpc);
            setData((prev) => ({
                ...prev,
                client: _client,
            }));
        } catch (err) {
            console.log(err);
        }
    }

    async function connect(wallet?: TWallet) {
        setConnecting(true);
        setError(undefined);
        let checkConnectSuccess = false;
        try {
            const provider = await getConnector(wallet);
            if (!provider) {
            } else {
                try {
                    await provider.enable(chainInfo.chainId);
                } catch (err) {
                    console.log((err as Error).message);
                    if ((err as Error).message === WalletExtensionError.Keplr_Rejected || (err as Error).message === WalletExtensionError.Owallet_Rejected) {
                        throw new Error('Request rejected');
                    } else {
                        await provider.experimentalSuggestChain(chainInfo as any);
                    }
                }

                const offlineSigner = provider.getOfflineSignerOnlyAmino(chainInfo.chainId);
                const accounts = await offlineSigner.getAccounts();

                const coswasmStageGate = await SigningCosmWasmClient.connectWithSigner(chainInfo.rpc, offlineSigner as OfflineAminoSigner, {
                    gasPrice: { amount: Decimal.fromUserInput('0', 0), denom: chainInfo.currencies[0].coinDenom },
                });

                setData((prev) => ({
                    ...prev,
                    address: accounts[0].address,
                    userClient: coswasmStageGate,
                }));
                checkConnectSuccess = true;
            }
        } catch (err) {
            console.log(err as Error);
            setError(err as Error);
            setData((prev) => ({
                ...prev,
                address: '',
                userClient: null,
            }));
        }
        setConnecting(false);
        return checkConnectSuccess;
    }

    useLayoutEffect(() => {
        connectPublicClient();
    }, []);

    function disconnectWallet() {
        setData((prev) => ({
            ...prev,
            address: '',
            userClient: null,
        }));
    }

    return {
        isConnecting,
        chainInfo,
        error,
        connect,
        connectPublicClient,
        disconnectWallet,
        ...data,
    };
}

export type TDataReturnConnectChain = ReturnType<typeof useConnectChain>;
