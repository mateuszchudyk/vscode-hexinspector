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

            let forms: string[] = vscode.workspace.getConfiguration('hexinspector').get('hoverContent');
            let littleEndian: boolean = vscode.workspace.getConfiguration('hexinspector').get('endianness');

            let formsMap = {
                'binary'  : function(bytes: Uint8Array) {
                    return utils.addBytesSeparator(converters.bytesToBin(bytes));
                },
                'chars'   : converters.bytesToStr,
                'decimal' : function(bytes: Uint8Array) {
                    let asUnsigned = utils.addThousandsSeparator(converters.bytesToUnsignedDec(bytes));
                    let asSigned = utils.addThousandsSeparator(converters.bytesToSignedDec(bytes));
                    return asUnsigned + (asSigned != asUnsigned ? ' / ' + asSigned : '');
                },
                'float16' : converters.bytesToFloat16,
                'float32' : converters.bytesToFloat32,
                'float64' : converters.bytesToFloat64,
                'size'    : converters.bytesToSize,
            };

            let formMaxLength = 0;
            for (let form of forms) {
                if (form in formsMap)
                    formMaxLength = Math.max(formMaxLength, form.length);
            }

            let regexes = [
                '0x([0-9a-fA-F]+)(?:[uU])?(?:[lL])?(?:[lL])?',
                '#([0-9a-fA-F]+)'
            ];
            let bytes = converters.hexToBytes(parseHex(word, regexes), littleEndian);

            if (bytes) {
                let length = bytes.length;
                let endianness = (littleEndian ? 'Little' : 'Big') + ' Endian';

                let message = 'HexInspector: ' + word + ' (' + length + 'B)\n\n';
                for (let form of forms) {
                    if (!(form in formsMap))
                        continue;

                    let result = formsMap[form](bytes);
                    if (result == '')
                        continue;

                    message += form.charAt(0).toUpperCase() + form.slice(1) + ':  ';
                    message += ' '.repeat(formMaxLength - form.length) + result + '\n';
                }
                message += '\n' + endianness;

                return new vscode.Hover({language: 'hexinspector', value: message});
            }
        }
    });

    context.subscriptions.push(hover);
}

export function deactivate() {}
