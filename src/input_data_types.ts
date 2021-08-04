'use strict';

import * as converters from './converters';
import * as utils from './utils';

export type MapFormToFunction = { 
    [name: string]: (bytes: Uint8Array) => string
};

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
            return utils.addBytesSeparator(converters.bytesToBin(bytes));
        },
        'chars'       : converters.bytesToStr,
        'decimal'     : function(bytes: Uint8Array) {
            let asUnsigned = utils.addThousandsSeparator(converters.bytesToUnsignedDec(bytes));
            let asSigned = utils.addThousandsSeparator(converters.bytesToSignedDec(bytes));
            return asUnsigned + (asSigned != asUnsigned ? ' / ' + asSigned : '');
        },
        'float16'     : converters.bytesToFloat16,
        'float32'     : converters.bytesToFloat32,
        'float64'     : converters.bytesToFloat64,
        'hexadecimal' : converters.bytesToHex,
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
