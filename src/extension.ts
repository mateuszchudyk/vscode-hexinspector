'use strict';

import * as vscode from 'vscode';
import * as converters from './converters';

export function activate(context: vscode.ExtensionContext) {
    var hover = vscode.languages.registerHoverProvider({scheme: '*', language: '*'}, {
        provideHover(document, position, token) {
            var word = document.getText(document.getWordRangeAtPosition(position));

            let bytes = converters.hexToBytes(word);
            if (bytes) {
                let message =
                    'Hex Inspector: ' + word                         + '\n' +
                    ''                                               + '\n' +
                    'Decimal:  ' + converters.bytesToDec(bytes)      + '\n' +
                    'Binary:   ' + converters.bytesToBin(bytes)      + '\n' +
                    'Float32:  ' + converters.bytesToFloat32(bytes)  + '\n' +
                    'Float64:  ' + converters.bytesToFloat64(bytes)  + '\n' +
                    'Chars:    ' + converters.bytesToStr(bytes)      + '\n' +
                    '';

                return new vscode.Hover({language: 'hexinspector', value: message});
            }
        }
    });

    context.subscriptions.push(hover);
}

export function deactivate() {}
