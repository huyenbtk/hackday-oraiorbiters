import BigNumber from 'bignumber.js';
import { TAppDenom, TTokenInfo } from 'src/constants';

type TokenState = {
    // price: BigNumber;
    rate: BigNumber;
    // userBalance: BigNumber;
};

export type TInputState = {
    token1Info: TTokenInfo & TokenState;
    token2Info: TTokenInfo & TokenState;
    amount1Input: string;
    amount2Input: string;
};

export type TTokenSwapInfo = {
    name: TAppDenom;
    balance: BigNumber;
    price: BigNumber;
    amountInput: string;
};
