import exp from 'constants';
import { IconOrai, IconOraiX, IconUSDT, SvgComponent } from 'src/assets/icon';

export enum LocalStorageKey {
    WalletConnected = 'walletConnected',
}

export enum Chainconnected {
    'Oraichain' = 'Oraichain',
}

export enum WalletConnected {
    'Keplr' = 'Keplr',
    'Owallet' = 'Owallet',
    'Leap' = 'Leap',
    'NoWallet' = 'NoWalletConnected',
}
export type TAppDenom = 'USDT' | 'ORAI';

export type AssetInfo = { native_token: { denom: string } } | { token: { contract_addr: string } };

export type TTokenInfo = {
    assetInfo: AssetInfo;
    icon: SvgComponent;
    decimal: number;
};

export const tokenInfo: { [k in TAppDenom]: TTokenInfo } = {
    USDT: {
        assetInfo: { token: { contract_addr: 'orai12hzjxfh77wl572gdzct2fxv2arxcwh6gykc7qh' } },
        icon: IconUSDT,
        decimal: 6,
    },
    ORAI: {
        assetInfo: { native_token: { denom: 'orai' } },
        icon: IconOrai,
        decimal: 6,
    },
};
