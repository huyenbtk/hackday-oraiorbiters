import { TNet } from 'src/global.config';
import { TAddressContract } from './types';

export const contractAddress: { [key in TNet]: TAddressContract } = {
    mainnet: {
        MULTICALL: 'orai1q7x644gmf7h8u8y6y8t9z9nnwl8djkmspypr6mxavsk9ual7dj0sxpmgwd',
        ORACLE: 'orai1y25327rs0xgmu9dsvxz0mysqsm3797wqsdlpkxqhcasesqe0g0wqdcaky5',
        USDT: 'orai12hzjxfh77wl572gdzct2fxv2arxcwh6gykc7qh',
    },
    // testnet: {
    //     MULTICALL: 'orai1t4stn00rka9u2c34549s750cd8zjd3ra6tc20vqmrwlnmrvq5plq9jcexm',
    //     ORACLE: 'orai1y25327rs0xgmu9dsvxz0mysqsm3797wqsdlpkxqhcasesqe0g0wqdcaky5',
    //     USDT: 'orai12hzjxfh77wl572gdzct2fxv2arxcwh6gykc7qh',
    // },
};
