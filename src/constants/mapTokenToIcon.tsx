import { IconETH, SvgComponent, IconUSDT, IconBUSD, IconBSC, IconUSDC, IconBNB, IconDAI, IconOrai, IconAiri, IconOraiX, IconOsmo } from 'src/assets/icon';
import { TAppDenom } from '.';

export const mapTokenToIcon: { [key in TAppDenom]: SvgComponent } = {
    ORAI: IconOrai,
    USDT: IconUSDT,
    USDC: IconUSDC,
    ORAIX: IconOraiX,
};
