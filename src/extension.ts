import * as vscode from 'vscode';
import { JSONAnonymizer, AnonymizerOptions } from './json-anonymizer';
import * as path from 'path';

/**
 * Extension activation
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('JSON Anonymizer extension is now active!');

    // Register command: Anonymize JSON (replace current file)
    const anonymizeCommand = vscode.commands.registerCommand(
        'json-anonymizer.anonymize',
        () => anonymizeCurrentFile(false)
    );

    // Register command: Anonymize JSON to New File
    const anonymizeToNewFileCommand = vscode.commands.registerCommand(
        'json-anonymizer.anonymizeToNewFile',
        () => anonymizeCurrentFile(true)
    );

    // Register command: Anonymize with Seed (prompts for seed)
    const anonymizeWithSeedCommand = vscode.commands.registerCommand(
        'json-anonymizer.anonymizeWithSeed',
        () => anonymizeWithSeed()
    );

    // Register command: Anonymize Selection
    const anonymizeSelectionCommand = vscode.commands.registerCommand(
        'json-anonymizer.anonymizeSelection',
        () => anonymizeSelection()
    );

    context.subscriptions.push(
        anonymizeCommand,
        anonymizeToNewFileCommand,
        anonymizeWithSeedCommand,
        anonymizeSelectionCommand
    );

    // Register status bar item for JSON files
    const statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100
    );
    statusBarItem.command = 'json-anonymizer.anonymize';
    statusBarItem.text = '$(shield) Anonymize';
    statusBarItem.tooltip = 'Click to anonymize this JSON file';
    
    // Show/hide based on active editor
    const updateStatusBar = () => {
        const editor = vscode.window.activeTextEditor;
        if (editor && editor.document.languageId === 'json') {
            statusBarItem.show();
        } else {
            statusBarItem.hide();
        }
    };

    // Update on editor change
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(updateStatusBar),
        statusBarItem
    );
    
    updateStatusBar();
}

/**
 * Get configuration options from VSCode settings
 */
function getAnonymizerOptions(): AnonymizerOptions {
    const config = vscode.workspace.getConfiguration('jsonAnonymizer');
    return {
        preserveTypes: config.get<boolean>('preserveTypes', true),
        preserveKeys: config.get<boolean>('preserveKeys', true),
        preserveArrayLength: config.get<boolean>('preserveArrayLength', true),
        seed: config.get<number | undefined>('defaultSeed', undefined)
    };
}

/**
 * Main anonymization function
 */
async function anonymizeCurrentFile(createNewFile: boolean) {
    const editor = vscode.window.activeTextEditor;
    
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found. Please open a JSON file.');
        return;
    }

    const document = editor.document;
    
    // Check if it's a JSON file
    if (document.languageId !== 'json' && !document.fileName.endsWith('.json')) {
        const proceed = await vscode.window.showWarningMessage(
            'This doesn\'t appear to be a JSON file. Proceed anyway?',
            'Yes',
            'No'
        );
        if (proceed !== 'Yes') {
            return;
        }
    }

    const content = document.getText();
    
    if (!content.trim()) {
        vscode.window.showWarningMessage('The document is empty.');
        return;
    }

    try {
        // Validate JSON
        const validation = JSONAnonymizer.validateJSON(content);
        if (!validation.valid) {
            vscode.window.showErrorMessage(`Invalid JSON: ${validation.error}`);
            return;
        }

        // Show progress
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Anonymizing JSON...",
            cancellable: false
        }, async (progress) => {
            progress.report({ increment: 30 });
            
            // Get options and create anonymizer
            const options = getAnonymizerOptions();
            const anonymizer = new JSONAnonymizer(options);
            
            progress.report({ increment: 30, message: "Processing..." });
            
            // Anonymize the JSON
            const anonymizedContent = anonymizer.anonymizeJSON(content, 2);
            
            progress.report({ increment: 30, message: "Applying changes..." });
            
            if (createNewFile) {
                // Create new file with anonymized content
                await createNewAnonymizedFile(document, anonymizedContent);
            } else {
                // Check if we should create backup
                const config = vscode.workspace.getConfiguration('jsonAnonymizer');
                const createBackup = config.get<boolean>('createBackup', false);
                
                if (createBackup) {
                    await createBackupFile(document);
                }
                
                // Replace content in current file
                await replaceContent(editor, anonymizedContent);
            }
            
            progress.report({ increment: 10, message: "Complete!" });
        });

        // Show success message
        const fileName = path.basename(document.fileName);
        if (createNewFile) {
            vscode.window.showInformationMessage(
                `✅ Created anonymized copy of ${fileName}`
            );
        } else {
            vscode.window.showInformationMessage(
                `✅ Successfully anonymized ${fileName}`
            );
        }

    } catch (error: any) {
        vscode.window.showErrorMessage(
            `Failed to anonymize: ${error.message}`
        );
        console.error('Anonymization error:', error);
    }
}

/**
 * Anonymize with user-provided seed
 */
async function anonymizeWithSeed() {
    const seedInput = await vscode.window.showInputBox({
        prompt: 'Enter a seed number for reproducible anonymization',
        placeHolder: 'e.g., 12345',
        validateInput: (value:any) => {
            if (!value.trim()) {
                return 'Please enter a seed number';
            }
            if (!/^\d+$/.test(value.trim())) {
                return 'Please enter a valid number';
            }
            return null;
        }
    });

    if (!seedInput) {
        return;
    }

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found.');
        return;
    }

    const content = editor.document.getText();
    
    try {
        // Validate JSON
        const validation = JSONAnonymizer.validateJSON(content);
        if (!validation.valid) {
            vscode.window.showErrorMessage(`Invalid JSON: ${validation.error}`);
            return;
        }

        // Create anonymizer with seed
        const options = getAnonymizerOptions();
        options.seed = parseInt(seedInput);
        
        const anonymizer = new JSONAnonymizer(options);
        const anonymizedContent = anonymizer.anonymizeJSON(content, 2);
        
        // Ask user what to do with result
        const action = await vscode.window.showQuickPick([
            'Replace current file',
            'Create new file',
            'Copy to clipboard'
        ], {
            placeHolder: 'What would you like to do with the anonymized JSON?'
        });

        if (action === 'Replace current file') {
            await replaceContent(editor, anonymizedContent);
        } else if (action === 'Create new file') {
            await createNewAnonymizedFile(editor.document, anonymizedContent);
        } else if (action === 'Copy to clipboard') {
            await vscode.env.clipboard.writeText(anonymizedContent);
            vscode.window.showInformationMessage('✅ Anonymized JSON copied to clipboard');
        }

    } catch (error: any) {
        vscode.window.showErrorMessage(`Failed to anonymize: ${error.message}`);
    }
}

/**
 * Anonymize only the selected text
 */
async function anonymizeSelection() {
    const editor = vscode.window.activeTextEditor;
    
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found.');
        return;
    }

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);
    
    if (!selectedText.trim()) {
        vscode.window.showInformationMessage('Please select some JSON text to anonymize.');
        return;
    }

    try {
        // Validate selected JSON
        const validation = JSONAnonymizer.validateJSON(selectedText);
        if (!validation.valid) {
            vscode.window.showErrorMessage(`Invalid JSON selection: ${validation.error}`);
            return;
        }

        // Anonymize
        const options = getAnonymizerOptions();
        const anonymizer = new JSONAnonymizer(options);
        const anonymizedContent = anonymizer.anonymizeJSON(selectedText, 2);
        
        // Replace selection
        await editor.edit(editBuilder => {
            editBuilder.replace(selection, anonymizedContent);
        });
        
        vscode.window.showInformationMessage('✅ Selection anonymized successfully');
        
    } catch (error: any) {
        vscode.window.showErrorMessage(`Failed to anonymize selection: ${error.message}`);
    }
}

/**
 * Replace content in the current editor
 */
async function replaceContent(editor: vscode.TextEditor, newContent: string) {
    const document = editor.document;
    const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(document.getText().length)
    );
    
    await editor.edit(editBuilder => {
        editBuilder.replace(fullRange, newContent);
    });
}

/**
 * Create a new file with anonymized content
 */
async function createNewAnonymizedFile(document: vscode.TextDocument, content: string) {
    const originalPath = document.fileName;
    const dir = path.dirname(originalPath);
    const ext = path.extname(originalPath);
    const baseName = path.basename(originalPath, ext);
    
    // Create new filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const newFileName = `${baseName}_anonymized_${timestamp}${ext}`;
    const newPath = path.join(dir, newFileName);
    
    // Create new document
    const newDoc = await vscode.workspace.openTextDocument({
        content: content,
        language: 'json'
    });
    
    // Show the new document
    await vscode.window.showTextDocument(newDoc);
    
    // Save it
    const uri = vscode.Uri.file(newPath);
    await vscode.workspace.fs.writeFile(uri, Buffer.from(content));
}

/**
 * Create a backup of the original file
 */
async function createBackupFile(document: vscode.TextDocument) {
    const originalPath = document.fileName;
    const dir = path.dirname(originalPath);
    const ext = path.extname(originalPath);
    const baseName = path.basename(originalPath, ext);
    
    // Create backup filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const backupFileName = `${baseName}_backup_${timestamp}${ext}`;
    const backupPath = path.join(dir, backupFileName);
    
    // Copy original content to backup
    const content = document.getText();
    const uri = vscode.Uri.file(backupPath);
    await vscode.workspace.fs.writeFile(uri, Buffer.from(content));
    
    console.log(`Backup created: ${backupPath}`);
}

/**
 * Extension deactivation
 */
export function deactivate() {
    console.log('JSON Anonymizer extension is now deactivated.');
}
