
import { readFileSync } from "fs";

import { WebviewPanel, window, ViewColumn, Uri, Webview, OpenDialogOptions } from "vscode";
import { ConfigModel } from "../models/config";



export class WebviewFile {

    public static webviewPanel: WebviewPanel;

    static async open(pathToConfig: string, context: any) {
        if (this.webviewPanel) {
            this.webviewPanel.reveal();
        } else {
            this.webviewPanel = window.createWebviewPanel(
                "configDiretorios",
                "Configurar diretórios",
                ViewColumn.One, {
                enableScripts: true,
                enableForms: true,
            })
            this.webviewPanel.webview.html = await this.getWebviewContent(context.extensionPath)
            this.webviewPanel.webview.onDidReceiveMessage((message) => { this.verifyMessage(message, pathToConfig) })
        }
        this.webviewPanel.onDidDispose(
            () => {
                this.webviewPanel = undefined;
            },
            null,
            context.subscriptions
        );
    }
    public static async getWebviewContent(extensionUri: Uri) {
        const toolkitUri = this.webviewPanel.webview.asWebviewUri(Uri.file(`${extensionUri}\\node_modules\\@vscode\\webview-ui-toolkit\\dist\\toolkit.js`))
        const scripts = this.webviewPanel.webview.asWebviewUri(Uri.file(`${extensionUri}\\public\\index.js`))
        const body = readFileSync(`${extensionUri}\\app\\views\\index.html`).toString()

        return /*html*/ `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <script type="module" src="${scripts}"></script>
            <script type="module" src="${toolkitUri}"></script>
            <title>Hello World!</title>
          </head>
          <body>
            ${body}
          </body>
        </html>
      `;
    }

    public static verifyMessage(message: any, pathToConfig: string) {
        let config = new ConfigModel(pathToConfig);
        switch (message.command) {
            case 'selectFolder':
                this.selecionarPasta(message.elementName);
                break
            case 'onload':
                this.Onload(config);

        }


    }

    public static Onload(config: ConfigModel) {
        this.webviewPanel.webview.postMessage({
            command: "SelectedPath",
            config: config.data,
        });
    }

    public static selecionarPasta(elementId: string) {
        const options: OpenDialogOptions = {
            canSelectMany: false,
            canSelectFolders: true,
            openLabel: 'Selecionar',

        };

        window.showOpenDialog(options).then(fileUri => {
            if (fileUri && fileUri[0]) {
                this.webviewPanel.webview.postMessage({
                    command: "SelectedFolder",
                    folder: fileUri[0].fsPath,
                    elementId: elementId
                });
            }
        });
    }

}