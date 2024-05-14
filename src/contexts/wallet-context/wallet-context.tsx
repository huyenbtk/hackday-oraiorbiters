import { ReactNode, createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { IContextReturnData, StateConnectWallet, TInputQueryContract } from './types';
import { BaseContextProps, TNet } from 'src/global.config';
import { AssetInfo, Chainconnected, LocalStorageKey, WalletConnected, tokenInfo } from 'src/constants';
import { imagePath } from 'src/constants/imagePath';
import ModalSelectConnectWallet, { TDataModalSelectWallet } from 'src/components/ModalSelectConnectWallet/ModalSelectConnectWallet';
import { LocalStorage } from './utils';
import { TWallet } from './types';
import { chainInfo } from 'src/constants/chain-info';
import { toast } from 'react-toastify';
import useConnectChain from './hooks/useConnectChain';
import { error } from 'console';
import { BN, decodeBase64 } from 'src/utils';
import { contractAddress } from 'src/constants/contract-address/ContractAddress';

const TheContext = createContext({} as IContextReturnData);

export const infoChainConnecting: { [k in Chainconnected]: { walletSupport: WalletConnected[] } } = {
    [Chainconnected.Oraichain]: {
        walletSupport: [WalletConnected.Keplr, WalletConnected.Owallet, WalletConnected.Leap],
    },
};

export const infoWalletConnecting: { [k in WalletConnected]: { logoWallet: string; name: string } } = {
    [WalletConnected.Keplr]: { logoWallet: imagePath.Logo_Keplr, name: 'Keplr Wallet' },
    [WalletConnected.Owallet]: { logoWallet: imagePath.Logo_Owallet, name: 'Owallet' },
    [WalletConnected.Leap]: { logoWallet: imagePath.Logo_Leap, name: 'Leap Wallet' },
    [WalletConnected.NoWallet]: { logoWallet: imagePath.Logo_UnknownWallet, name: 'No Wallet Selected' },
};

export const walletSupportedInApp: WalletConnected[] = [WalletConnected.Keplr, WalletConnected.Leap, WalletConnected.Owallet];

export function WalletProvider({ children }: BaseContextProps) {
    const [walletConnected, _setWalletConnected] = useState<WalletConnected>(WalletConnected.Keplr);
    const oraichain = useConnectChain({ chainInfo: chainInfo.Oraichain });
    const [isConnecting, setIsConnecting] = useState<boolean>(true);
    const [modal, setModal] = useState<TDataModalSelectWallet>({ open: false, chain: Chainconnected.Oraichain });

    function setWalletConnected(wallet: WalletConnected) {
        localStorage.setItem(LocalStorageKey.WalletConnected, wallet);
        _setWalletConnected(wallet);
    }

    function revokeConnected() {
        setWalletConnected(WalletConnected.NoWallet);
    }

    function disconnectWallet() {
        revokeConnected();
        window.location.reload();
    }

    // TODO: function for modal select network =====================================================================
    function openModalSelectWallet(chain: Chainconnected) {
        setModal((prev) => {
            return {
                ...prev,
                open: true,
                chain: chain,
            };
        });
    }
    function closeModalSelectWallet() {
        setModal((prev) => {
            return {
                ...prev,
                open: false,
            };
        });
    }
    async function selectWalletOnModal(chain: Chainconnected, wallet: WalletConnected) {
        const response = await connectChainAndWallet(chain, wallet);
        if (response == StateConnectWallet.SUCCESS) {
            closeModalSelectWallet();
        }
    }
    //! end TODO=======================================================================================================================

    async function connectChainAndWallet(chain: Chainconnected, wallet: WalletConnected): Promise<StateConnectWallet> {
        setIsConnecting(true);
        let stateResult;
        if (!infoChainConnecting[chain]?.walletSupport.includes(wallet)) {
            stateResult = StateConnectWallet.PENDING;
            return stateResult;
        }

        switch (chain) {
            case Chainconnected.Oraichain:
                const success = await oraichain.connect(wallet as TWallet);
                if (success) {
                    setWalletConnected(wallet);
                    stateResult = StateConnectWallet.SUCCESS;
                } else {
                    console.log('Connect oraichain error: ', oraichain.error);
                    toast.error('Error connecting to Oraichain');
                    stateResult = StateConnectWallet.FAIL;
                }
                break;
            default:
                stateResult = StateConnectWallet.PENDING;
        }
        setIsConnecting(false);

        return stateResult;
    }
    async function query(queryFunction: TInputQueryContract): Promise<{ data: any; success: boolean }> {
        if (oraichain.client) {
            try {
                const res = await oraichain.client.queryContractSmart(queryFunction.address, {
                    ...decodeBase64(queryFunction.data),
                });

                return {
                    success: true,
                    data: res,
                };
            } catch (err) {
                console.log(queryFunction, err);
                return {
                    data: { mess: (err as Error).message },
                    success: false,
                };
            }
        }
        return {
            data: { mess: 'Client is not ready!' },
            success: false,
        };
    }
    async function userQuery(queryFunction: TInputQueryContract): Promise<{ data: any; success: boolean }> {
        if (oraichain.userClient) {
            try {
                const res = await oraichain.userClient.queryContractSmart(queryFunction.address, {
                    ...decodeBase64(queryFunction.data),
                });

                return {
                    success: true,
                    data: res,
                };
            } catch (err) {
                console.log(err);
                return {
                    data: { mess: (err as Error).message },
                    success: false,
                };
            }
        }
        return {
            data: { mess: 'You have not connect your wallet yet!' },
            success: false,
        };
    }
    async function queryMulti(queryList: TInputQueryContract[]): Promise<{ data: any; success: boolean }[]> {
        if (oraichain.client) {
            try {
                const res = await oraichain.client.queryContractSmart(contractAddress.MULTICALL, {
                    aggregate: {
                        queries: queryList,
                    },
                });
                return res.return_data.map((response: { data: string; success: boolean }) => {
                    return {
                        data: decodeBase64(response.data),
                        success: response.success,
                    };
                });
            } catch (err) {
                console.log(err);
            }
        }
        return [];
    }

    async function userQueryMulti(queryList: TInputQueryContract[]): Promise<{ data: any; success: boolean }[]> {
        if (oraichain.userClient) {
            try {
                const res = await oraichain.userClient.queryContractSmart(contractAddress.MULTICALL, {
                    aggregate: {
                        queries: queryList,
                    },
                });
                return res.return_data.map((response: { data: string; success: boolean }) => {
                    return {
                        data: decodeBase64(response.data),
                        success: response.success,
                    };
                });
            } catch (err) {
                console.log(err);
            }
        }
        return [];
    }

    async function getUserBalance(assetToken: AssetInfo) {
        try {
            if (oraichain.address && oraichain.userClient) {
                if ('token' in assetToken) {
                    const balance = await oraichain.userClient.queryContractSmart(assetToken.token.contract_addr, {
                        balance: { address: oraichain.address },
                    });
                    // console.log(balance);
                    return BN(balance.balance);
                } else {
                    const balance = await oraichain.userClient.getBalance(oraichain.address, assetToken.native_token.denom);
                    // console.log(balance);
                    return BN(balance.amount);
                }
            }
        } catch (err) {
            console.log(err);
        }
        return BN(0);
    }

    async function getPrice(assetToken: AssetInfo) {
        try {
            if (oraichain.address && oraichain.userClient) {
                const price = await oraichain.userClient.queryContractSmart(contractAddress.ORACLE, {
                    price: {
                        base: { token: { contract_addr: contractAddress.USDT } },
                        quote: assetToken,
                    },
                });
                return BN(price.rate);
            }
        } catch (err) {
            console.log(err);
        }
        return BN(1);
    }

    // TODO: function for init web app load =====================================================================
    async function initWebConnect() {
        let chain = Chainconnected.Oraichain;
        let wallet = LocalStorage.getWalletConnected();

        if (wallet == null || !walletSupportedInApp.includes(wallet)) {
            localStorage.setItem(LocalStorageKey.WalletConnected, WalletConnected.NoWallet);
            wallet = WalletConnected.NoWallet;
            setWalletConnected(wallet);
        } else {
            const connectState = await connectChainAndWallet(chain, wallet);
            if (connectState == StateConnectWallet.PENDING) {
                setWalletConnected(WalletConnected.NoWallet);
            }
        }

        setIsConnecting(false);
    }

    useLayoutEffect(() => {
        initWebConnect();
    }, []);

    return (
        <TheContext.Provider
            value={{
                oraichain,
                walletConnected,
                disconnectWallet,
                isConnecting,
                revokeConnected,
                modal,
                query,
                queryMulti,
                userQuery,
                userQueryMulti,
                getPrice,
                getUserBalance,
                openModalSelectWallet,
                connectChainAndWallet,
            }}
        >
            <ModalSelectConnectWallet {...modal} closeModal={closeModalSelectWallet} selectWalletToConnect={selectWalletOnModal} />
            {children}
        </TheContext.Provider>
    );
}

export const useWalletContext = () => useContext(TheContext);
