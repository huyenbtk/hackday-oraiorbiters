import exp from 'constants';
import { IconOrai, IconOraiX, IconOsmo, IconUSDC, IconUSDT, SvgComponent } from 'src/assets/icon';

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
export type TAppDenom = 'USDT' | 'ORAI' | 'USDC' | 'ORAIX';

export type AssetInfo = { native_token: { denom: string } } | { token: { contract_addr: string } };

export type TTokenInfo = {
    assetInfo: AssetInfo;
    icon: SvgComponent;
    decimal: number;
};

//mainnet
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
    ORAIX: {
        assetInfo: { token: { contract_addr: 'orai1lus0f0rhx8s03gdllx2n6vhkmf0536dv57wfge' } },
        icon: IconOraiX,
        decimal: 6,
    },
    USDC: {
        assetInfo: { token: { contract_addr: 'orai15un8msx3n5zf9ahlxmfeqd2kwa5wm0nrpxer304m9nd5q6qq0g6sku5pdd' } },
        icon: IconUSDC,
        decimal: 6,
    },
};

//testnet
// export const tokenInfo: { [k in TAppDenom]: TTokenInfo } = {
//     USDT: {
//         assetInfo: { token: { contract_addr: 'orai1sycp9ahrukkl378lkcjlxjepwyuydxqkpp79ws' } },
//         icon: IconUSDT,
//         decimal: 6,
//     },
//     ORAI: {
//         assetInfo: { native_token: { denom: 'orai' } },
//         icon: IconOrai,
//         decimal: 6,
//     },
//     ORAIX: {
//         assetInfo: { token: { contract_addr: 'orai1lus0f0rhx8s03gdllx2n6vhkmf0536dv57wfge' } },
//         icon: IconOraiX,
//         decimal: 6,
//     },
//     USDC: {
//         assetInfo: { token: { contract_addr: 'orai15un8msx3n5zf9ahlxmfeqd2kwa5wm0nrpxer304m9nd5q6qq0g6sku5pdd' } },
//         icon: IconUSDC,
//         decimal: 6,
//     },
// };
