'use strict';

import * as converters from './converters';
import * as utils from './utils';

function createFormsMap(forms: string[]) {
    let availableFormsMap = {
        'binary'      : function(bytes: Uint8Array) {
            return utils.addSeparatorToNumber(converters.toBinary(bytes), ' ', 8);
        },
        'ascii'       : converters.toAscii,
        'decimal'     : function(bytes: Uint8Array) {
            let asUnsigned = utils.addSeparatorToNumber(converters.toDecimalUnsigned(bytes), ',', 3);
            let asSigned = utils.addSeparatorToNumber(converters.toDecimalSigned(bytes),  ',', 3);
            return asUnsigned + (asSigned != asUnsigned ? ' / ' + asSigned : '');
        },
        'float16'     : converters.toFloat16,
        'float32'     : converters.toFloat32,
        'float64'     : converters.toFloat64,
        'hexadecimal' : function(bytes: Uint8Array) {
            return utils.addSeparatorToNumber(converters.toHexadecimal(bytes), ' ', 2);
        },
        'size'        : converters.toSize,
        'bits set'      : converters.toBitSet,
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

abstract class InputHandler {
    abstract parse(str: string) : string;
    abstract convert(str: string, isLittleEndian : boolean) : Uint8Array;
    abstract getFormsMap() : MapFormToFunction;
}

class InputHandlerBinary extends InputHandler {
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

    convert(str: string, isLittleEndian : boolean) {
        return converters.fromBinary(str, isLittleEndian);
    }

    getFormsMap() {
        return createFormsMap([
            'ascii',
            'decimal',
            'float16',
            'float32',
            'float64',
            'hexadecimal',
            'size',
            'bits set',
        ]);
    }
}

class InputHandlerDecimal extends InputHandler {
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

    convert(str: string, isLittleEndian : boolean) {
        return converters.fromDecimal(str, isLittleEndian);
    }

    getFormsMap() {
        return createFormsMap([
            'ascii',
            'binary',
            'float16',
            'float32',
            'float64',
            'hexadecimal',
            'size',
            'bits set',
        ]);
    }
}

class InputHandlerHexadecimal extends InputHandler {
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

    convert(str: string, isLittleEndian : boolean) {
        return converters.fromHexadecimal(str, isLittleEndian);
    }

    getFormsMap() {
        return createFormsMap([
            'ascii',
            'binary',
            'decimal',
            'float16',
            'float32',
            'float64',
            'size',
            'bits set',
        ]);
    }
}

export function createInputHandler(name: string) {
    let map = {
        'binary'      : new InputHandlerBinary,
        'decimal'     : new InputHandlerDecimal,
        'hexadecimal' : new InputHandlerHexadecimal,
    };

    return map[name];
}
