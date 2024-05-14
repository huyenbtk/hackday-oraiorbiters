import { IconETH, SvgComponent, IconUSDT, IconBUSD, IconBSC, IconUSDC, IconBNB, IconDAI, IconOrai } from 'src/assets/icon';

export type TAppDenom = 'USDT' | 'ORAI';

export const mapTokenToIcon: { [key in TAppDenom]: SvgComponent } = {
    ORAI: IconOrai,
    USDT: IconUSDT,
};
