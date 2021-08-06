'use strict';

import * as vscode from 'vscode';
import * as input_data_types from './input_data_types';

export function activate(context: vscode.ExtensionContext) {
    var hover = vscode.languages.registerHoverProvider({scheme: '*', language: '*'}, {
        provideHover(document, position, token) {
            var word = document.getText(document.getWordRangeAtPosition(position));

            let inputDataTypes: string[] = vscode.workspace.getConfiguration('hexinspector').get('inputDataTypes');
            let forms: string[] = vscode.workspace.getConfiguration('hexinspector').get('hoverContent');
            let littleEndian: boolean = vscode.workspace.getConfiguration('hexinspector').get('endianness');

            let bytes: Uint8Array;
            let formsMap : input_data_types.MapFormToFunction;

            for (let inputDataType of inputDataTypes) {
                let parsed = input_data_types.createInputDataTypeHandler(inputDataType).parse(word);
                if (!parsed)
                    continue;

                bytes = input_data_types.createInputDataTypeHandler(inputDataType).convert(parsed);
                formsMap = input_data_types.createInputDataTypeHandler(inputDataType).getFormsMap();
            }

            let formMaxLength = 0;
            for (let form of forms) {
                if (form in formsMap)
                    formMaxLength = Math.max(formMaxLength, form.length);
            }

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
