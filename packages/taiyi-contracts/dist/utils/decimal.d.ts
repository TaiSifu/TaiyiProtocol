import { BigNumber } from 'ethers';
export default class Decimal {
    static new(value: number): {
        value: BigNumber;
    };
    static raw(value: number): {
        value: BigNumber;
    };
}
