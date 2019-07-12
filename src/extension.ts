'use strict';

import * as vscode from 'vscode';
import * as converters from './converters';
import * as utils from './utils';

function parseHex(str: string, regexes: Array<string>) {
    for (let regex of regexes) {
        let re = new RegExp('^' + regex + '$');
        let match = re.exec(str);
        if (match) {
            return match[1];
        }
    }
    return undefined;
}

export function activate(context: vscode.ExtensionContext) {
    var hover = vscode.languages.registerHoverProvider({scheme: '*', language: '*'}, {
        provideHover(document, position, token) {
            var word = document.getText(document.getWordRangeAtPosition(position));

            let littleEndian: boolean = vscode.workspace.getConfiguration('hexinspector').get('endianness');

            let regexes = [
                '0x([0-9a-fA-F]+)(?:[uU])?(?:[lL])?(?:[lL])?',
                '#([0-9a-fA-F]+)'
            ];
            let bytes = converters.hexToBytes(parseHex(word, regexes), littleEndian);
            if (bytes) {
                let length = bytes.length;
                let asUnsigned = utils.addThousandsSeparator(converters.bytesToUnsignedDec(bytes));
                let asSigned = utils.addThousandsSeparator(converters.bytesToSignedDec(bytes));
                let asDecimal = asUnsigned + (asSigned != asUnsigned ? ' / ' + asSigned : '');
                let asBinary = utils.addBytesSeparator(converters.bytesToBin(bytes));
                let asFloat16 = converters.bytesToFloat16(bytes);
                let asFloat32 = converters.bytesToFloat32(bytes);
                let asFloat64 = converters.bytesToFloat64(bytes);
                let asCharSequence = converters.bytesToStr(bytes);
                let asSize = converters.bytesToSize(bytes);

                let endianness = (littleEndian ? 'Little' : 'Big') + ' Endian';

                let message =
                    'HexInspector: ' + word + ' (' + length + 'B)'      + '\n' +
                    ''                                                  + '\n' +
                    'Decimal:  ' + asDecimal                            + '\n' +
                    'Size:     ' + asSize                               + '\n' +
                    'Binary:   ' + asBinary                             + '\n' +
                    'Float16:  ' + (asFloat16 == '' ? '-' : asFloat16)  + '\n' +
                    'Float32:  ' + (asFloat32 == '' ? '-' : asFloat32)  + '\n' +
                    'Float64:  ' + (asFloat64 == '' ? '-' : asFloat64)  + '\n' +
                    'Chars:    ' + asCharSequence                       + '\n' +
                    ''                                                  + '\n' +
                    endianness                                          + '\n' +
                    '';

                return new vscode.Hover({language: 'hexinspector', value: message});
            }
        }
    });

    context.subscriptions.push(hover);
}

export function deactivate() {}
