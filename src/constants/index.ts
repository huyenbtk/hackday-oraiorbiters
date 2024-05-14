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
    // AIRI: {
    //     assetInfo: { token: { contract_addr: 'orai10ldgzued6zjp0mkqwsv2mux3ml50l97c74x8sg' } },
    //     icon: IconUSDC,
    //     decimal: 6,
    // },
    // OSMO: {
    //     assetInfo: { native_token: { denom: 'ibc/9C4DCD21B48231D0BC2AC3D1B74A864746B37E4292694C93C617324250D002FC' } },
    //     icon: IconOsmo,
    //     decimal: 6,
    // },
};
