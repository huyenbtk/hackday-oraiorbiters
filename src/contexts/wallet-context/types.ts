import { CosmWasmClient, SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { TDataModalSelectWallet } from 'src/components/ModalSelectConnectWallet/ModalSelectConnectWallet';
import { AssetInfo, Chainconnected, WalletConnected } from 'src/constants';
import { TDataReturnConnectChain } from './hooks/useConnectChain';
import BigNumber from 'bignumber.js';

export type TWallet = WalletConnected.Keplr | WalletConnected.Owallet | WalletConnected.Leap | WalletConnected.NoWallet;

export interface IDataChainConnected {
    address: string;
    userClient: SigningCosmWasmClient | null;
    client: CosmWasmClient | null;
}

export interface IContextReturnData {
    oraichain: TDataReturnConnectChain;
    walletConnected: WalletConnected;
    disconnectWallet: () => void;
    isConnecting: boolean;
    revokeConnected: () => void;
    modal: TDataModalSelectWallet;
    query: (queryFunction: TInputQueryContract) => Promise<{
        data: any;
        success: boolean;
    }>;
    userQuery: (queryFunction: TInputQueryContract) => Promise<{
        data: any;
        success: boolean;
    }>;
    queryMulti: (queryList: TInputQueryContract[]) => Promise<
        {
            data: any;
            success: boolean;
        }[]
    >;
    userQueryMulti: (queryList: TInputQueryContract[]) => Promise<
        {
            data: any;
            success: boolean;
        }[]
    >;
    getPrice(assetToken: AssetInfo): Promise<any> | undefined;
    getUserBalance: (assetToken: AssetInfo) => Promise<BigNumber>;
    openModalSelectWallet: (chain: Chainconnected, isChangeSelectNetwork?: boolean) => void;
    connectChainAndWallet: (chain: Chainconnected, wallet: WalletConnected) => Promise<StateConnectWallet>;
}

export type TInputQueryContract = {
    address: string;
    data: string;
};

export enum StateConnectWallet {
    SUCCESS,
    FAIL,
    PENDING,
}
