import type { TCandle, TDomain } from './types';
export declare function getDomain(rows: TCandle[]): [min: number, max: number];
export declare function getY({ value, domain, maxHeight, }: {
    value: number;
    domain: TDomain;
    maxHeight: number;
}): number;
export declare function getHeight({ value, domain, maxHeight, }: {
    value: number;
    domain: TDomain;
    maxHeight: number;
}): number;
export declare function getPrice({ y, domain, maxHeight, }: {
    y: number;
    domain: TDomain;
    maxHeight: number;
}): number;
