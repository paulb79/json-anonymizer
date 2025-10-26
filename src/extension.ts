import * as vscode from 'vscode';
import { JSONAnonymizer } from './json-anonymizer';

export function activate(context: vscode.ExtensionContext) {
    console.log('JSON Anonymizer extension is now active!');

    // Register the anonymize command
    let anonymizeCommand = vscode.commands.registerCommand('json-anonymizer.anonymize', () => {
        vscode.window.showInformationMessage('JSON Anonymizer is ready!');
    });

    context.subscriptions.push(anonymizeCommand);
}

export function deactivate() {}