'use strict';

import * as vscode from 'vscode';
import * as converters from './converters';
import * as utils from './utils';

export function activate(context: vscode.ExtensionContext) {
    var hover = vscode.languages.registerHoverProvider({scheme: '*', language: '*'}, {
        provideHover(document, position, token) {
            var word = document.getText(document.getWordRangeAtPosition(position));

            let littleEndian: boolean = vscode.workspace.getConfiguration('hexinspector').get('endianness');
            let bytes = converters.hexToBytes(word, littleEndian);
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
                    'Binary:   ' + asBinary                             + '\n' +
                    'Float16:  ' + (asFloat16 == '' ? '-' : asFloat16)  + '\n' +
                    'Float32:  ' + (asFloat32 == '' ? '-' : asFloat32)  + '\n' +
                    'Float64:  ' + (asFloat64 == '' ? '-' : asFloat64)  + '\n' +
                    'Chars:    ' + asCharSequence                       + '\n' +
                    'Size:     ' + asSize                               + '\n' +
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
