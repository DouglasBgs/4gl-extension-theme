"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebviewFile = void 0;
const fs_1 = require("fs");
const vscode_1 = require("vscode");
const config_1 = require("../models/config");
class WebviewFile {
    static open(pathToConfig, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.webviewPanel) {
                this.webviewPanel.reveal();
            }
            else {
                this.webviewPanel = vscode_1.window.createWebviewPanel("configDiretorios", "Configurar diretórios", vscode_1.ViewColumn.One, {
                    enableScripts: true,
                    enableForms: true,
                });
                this.webviewPanel.webview.html = yield this.getWebviewContent(context.extensionPath);
                this.webviewPanel.webview.onDidReceiveMessage((message) => { this.verifyMessage(message, pathToConfig); });
            }
            this.webviewPanel.onDidDispose(() => {
                this.webviewPanel = undefined;
            }, null, context.subscriptions);
        });
    }
    static getWebviewContent(extensionUri) {
        return __awaiter(this, void 0, void 0, function* () {
            const toolkitUri = this.webviewPanel.webview.asWebviewUri(vscode_1.Uri.file(`${extensionUri}\\node_modules\\@vscode\\webview-ui-toolkit\\dist\\toolkit.js`));
            const scripts = this.webviewPanel.webview.asWebviewUri(vscode_1.Uri.file(`${extensionUri}\\public\\index.js`));
            const body = (0, fs_1.readFileSync)(`${extensionUri}\\app\\views\\index.html`).toString();
            return `
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
        });
    }
    static verifyMessage(message, pathToConfig) {
        let config = new config_1.ConfigModel(pathToConfig);
        switch (message.command) {
            case 'selectFolder':
                this.selecionarPasta(message.elementName);
                break;
            case 'onload':
                this.Onload(config);
        }
    }
    static Onload(config) {
        this.webviewPanel.webview.postMessage({
            command: "SelectedPath",
            config: config.data,
        });
    }
    static selecionarPasta(elementId) {
        const options = {
            canSelectMany: false,
            canSelectFolders: true,
            openLabel: 'Selecionar',
        };
        vscode_1.window.showOpenDialog(options).then(fileUri => {
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
exports.WebviewFile = WebviewFile;
//# sourceMappingURL=webview.js.map