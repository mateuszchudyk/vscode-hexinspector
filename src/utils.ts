'use strict';

export function addSeparatorToNumber(str: string, sep: string, n: number) {
    var result = '';
    for (let i = 0; i < str.length; i++) {
        if (i > 0 && i % n == 0) {
            result = sep + result;
        }
        result = str[str.length - 1 - i] + result;
    }
    return result;
}
