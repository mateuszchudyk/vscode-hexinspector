'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    var hover = vscode.languages.registerHoverProvider({scheme: '*', language: '*'}, {
        provideHover(document, position, token) {
            var word = document.getText(document.getWordRangeAtPosition(position));
            let message = 'HexInspector: ' + word;
            return new vscode.Hover(message);
        }
    });

    context.subscriptions.push(hover);
}

export function deactivate() {}
