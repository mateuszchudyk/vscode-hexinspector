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
                let endianness = (littleEndian ? 'Little' : 'Big') + ' Endian'
                let unsigned = utils.addThousandsSeparator(converters.bytesToUnsignedDec(bytes));
                let signed = utils.addThousandsSeparator(converters.bytesToSignedDec(bytes));
                let decimal = unsigned + (signed != unsigned ? ' / ' + signed : '');

                let binary = utils.addBytesSeparator(converters.bytesToBin(bytes));

                let float32 = converters.bytesToFloat32(bytes);
                if (float32 == '') {
                    float32 = '-';
                }

                let float64 = converters.bytesToFloat64(bytes);
                if (float64 == '') {
                    float64 = '-';
                }

                let message =
                    'HexInspector: ' + word                          + '\n' +
                    ''                                               + '\n' +
                    'Decimal:  ' + decimal                           + '\n' +
                    'Binary:   ' + binary                            + '\n' +
                    'Float32:  ' + float32                           + '\n' +
                    'Float64:  ' + float64                           + '\n' +
                    'Chars:    ' + converters.bytesToStr(bytes)      + '\n' +
                    ''                                               + '\n' +
                    endianness                                       + '\n' +
                    '';

                return new vscode.Hover({language: 'hexinspector', value: message});
            }
        }
    });

    context.subscriptions.push(hover);
}

export function deactivate() {}
