'use strict';

import * as converters from './converters';

function addSeparatorToNumber(str: string, sep: string, n: number) {
    var result = '';
    for (let i = 0; i < str.length; i++) {
        if (i > 0 && i % n == 0) {
            result = sep + result;
        }
        result = str[str.length - 1 - i] + result;
    }
    return result;
 }

function createFormsMap(forms: string[]) {
    let availableFormsMap = {
        'binary'      : function(bytes: Uint8Array) {
            return addSeparatorToNumber(converters.bytesToBin(bytes), ' ', 8);
        },
        'chars'       : converters.bytesToStr,
        'decimal'     : function(bytes: Uint8Array) {
            let asUnsigned = addSeparatorToNumber(converters.bytesToUnsignedDec(bytes), ',', 3);
            let asSigned = addSeparatorToNumber(converters.bytesToSignedDec(bytes),  ',', 3);
            return asUnsigned + (asSigned != asUnsigned ? ' / ' + asSigned : '');
        },
        'float16'     : converters.bytesToFloat16,
        'float32'     : converters.bytesToFloat32,
        'float64'     : converters.bytesToFloat64,
        'hexadecimal' : function(bytes: Uint8Array) {
            return addSeparatorToNumber(converters.bytesToHex(bytes), ' ', 2);
        },
        'size'        : converters.bytesToSize,
    };

    let result = {};
    for (const form of forms) {
        if (!(form in availableFormsMap))
            continue;
        result[form] = availableFormsMap[form];
    }
    return result;
}

export type MapFormToFunction = {
    [name: string]: (bytes: Uint8Array) => string
};

export abstract class InputDataType {
    abstract parse(str: string) : string;
    abstract convert(str: string) : Uint8Array;
    abstract getFormsMap() : MapFormToFunction;
}

export class InputDataTypeHex extends InputDataType {
    parse(str: string) {
        let regexes = [
            '0x([0-9a-fA-F]+)(?:[uU])?(?:[lL])?(?:[lL])?',
            '#([0-9a-fA-F]+)'
        ];

        for (let regex of regexes) {
            let re = new RegExp('^' + regex + '$');
            let match = re.exec(str);
            if (match) {
                return match[1];
            }
        }
    }

    convert(str: string) {
        return converters.hexToBytes(str);
    }

    getFormsMap() {
        return createFormsMap([
            'binary',
            'chars',
            'decimal',
            'float16',
            'float32',
            'float64',
            'size',
        ]);
    }
}

export class InputDataTypeBin extends InputDataType {
    parse(str: string) {
        let regexes = [
            '0b([0-1]+)',
        ];

        for (let regex of regexes) {
            let re = new RegExp('^' + regex + '$');
            let match = re.exec(str);
            if (match) {
                return match[1];
            }
        }
    }

    convert(str: string) {
        return converters.binToBytes(str);
    }

    getFormsMap() {
        return createFormsMap([
            'chars',
            'decimal',
            'float16',
            'float32',
            'float64',
            'hexadecimal',
            'size',
        ]);
    }
}

export class InputDataTypeDec extends InputDataType {
    parse(str: string) {
        let regexes = [
            '([0-9]+)(?:[uU])?(?:[lL])?(?:[lL])?',
        ];

        for (let regex of regexes) {
            let re = new RegExp('^' + regex + '$');
            let match = re.exec(str);
            if (match) {
                return match[1];
            }
        }
    }

    convert(str: string) {
        return converters.decToBytes(str);
    }

    getFormsMap() {
        return createFormsMap([
            'binary',
            'chars',
            'float16',
            'float32',
            'float64',
            'hexadecimal',
            'size',
        ]);
    }
}
