'use strict';

export function addSeparatorToNumber(str: string, sep: string, n: number) {
    var result = '';
    for (let i = 0; i < str.length; i++) {
        if (i > 0 && i % n == 0 && str[str.length - 1 - i] != '-') {
            result = sep + result;
        }
        result = str[str.length - 1 - i] + result;
    }
    return result;
}

export function reverseString(str: string) {
    return str.split('').reverse().join('');
}

export function switchEndian(bytes: Uint8Array) {
    var result = new Uint8Array(bytes.length);
    for (let i = 0; i < result.length; i++) {
        result[i] = bytes[bytes.length - 1 - i];
    }
    return result;
}


export function countBits(bytes: Uint8Array) {
    let i = bytes.length - 1;
    while (i >= 0 && bytes[i] == 0) {
       i--;
    }
    if (i == -1) {
       return 0;
    }
    return i * 8 + Math.trunc(Math.log2(bytes[i]) + 1);
 }
 
export function shiftBytes(bytes: Uint8Array, shift: number) {
    if (!Number.isInteger(shift) || shift < 0) {
        return undefined;
    }

    var result = new Uint8Array(bytes.length);

    let bits = shift % 8;
    for (let i = 0, j = Math.trunc(shift / 8); j < bytes.length; ++i, ++j) {
        result[i] = bytes[j] >> bits;
        if (j + 1 < bytes.length) {
            result[i] += bytes[j + 1] << (8 - bits);
        }
    }

    return result;
}