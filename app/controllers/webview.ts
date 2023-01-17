import { readFileSync } from "fs";

import {
  WebviewPanel,
  window,
  ViewColumn,
  Uri,
  OpenDialogOptions,
  Disposable,
  Webview,
} from "vscode";
import { IConfig, SelectFile } from "../interfaces/config";
import { ConfigModel } from "../models/config";
import { RpoModel } from "../models/rpo";
import { Utils } from "../utils/utils";
import { join } from "path";

export class WebviewFilePanel {
  public static currentPanel: WebviewFilePanel | undefined;
  private readonly _panel: WebviewPanel;
  private _disposables: Disposable[] = [];
  private _configPath: string;

  private constructor(
    panel: WebviewPanel,
    extensionUri: Uri,
    configPath: string
  ) {
    this._panel = panel;
    this._configPath = configPath;
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.webview.html = this._getWebviewContent(
      this._panel.webview,
      this._configPath
    );
    this._setWebviewMessageListener(this._panel.webview, this._configPath);
  }
  private _setWebviewMessageListener(webview: Webview, pathToConfig: string) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const command = message.command;
        const text = message.text;
        const config = new ConfigModel(join(pathToConfig, ".config.json"));

        switch (command) {
          case "selectFolder":
            WebviewFilePanel.currentPanel.selecionarPasta(message.elementName);
            break;
          case "selectFile":
            WebviewFilePanel.currentPanel.selecionarArquivo(message);
            break;
          case "onload":
            WebviewFilePanel.currentPanel.Onload(config);
            break;
          case "addRpo":
            RpoModel.AdicionaRpo(config.data, message.rpoVersion, pathToConfig);
            break;
          case "removeRpo":
            RpoModel.removeRpo(config.data, message.rpoVersion, pathToConfig);
            break;
          case "save":
            const dados = config.save(message.data);
            this.Reload(dados);
            Utils.MostraMensagemInfo(" Salvo com sucesso!");
            if (message.close) {
              WebviewFilePanel.currentPanel.dispose();
            }
            break;
        }
      },
      undefined,
      this._disposables
    );
  }
  private _getWebviewContent(webview: Webview, extensionUri: string): string {
    const stylesUri = this._panel.webview.asWebviewUri(
      Uri.file(`${extensionUri}\\webview-ui\\build\\styles.css`)
    );
    const runtimeUri = this._panel.webview.asWebviewUri(
      Uri.file(`${extensionUri}\\webview-ui\\build\\runtime.js`)
    );
    const polyfillsUri = this._panel.webview.asWebviewUri(
      Uri.file(`${extensionUri}\\webview-ui\\build\\polyfills.js`)
    );
    const scriptUri = this._panel.webview.asWebviewUri(
      Uri.file(`${extensionUri}\\webview-ui\\build\\main.js`)
    );

    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" href="${stylesUri}">
        <title>Hello World</title>
      </head>
      <body>
        <app-root></app-root>
        <script type="module" src="${runtimeUri}"></script>
        <script type="module" src="${polyfillsUri}"></script>
        <script type="module" src="${scriptUri}"></script>
      </body>
    </html>
  `;
  }
  dispose(): any {
    WebviewFilePanel.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  public static render(pathToConfig: string, extensionUri: Uri) {
    if (WebviewFilePanel.currentPanel) {
      WebviewFilePanel.currentPanel._panel.reveal(ViewColumn.One);
    } else {
      const panel = window.createWebviewPanel(
        "configDiretorios",
        "Configurar diretórios",
        ViewColumn.One,
        {
          enableScripts: true,
        }
      );
      WebviewFilePanel.currentPanel = new WebviewFilePanel(
        panel,
        extensionUri,
        pathToConfig
      );
    }
  }

  public verifyMessage(message: any, pathToConfig: string) {
    const config = new ConfigModel(pathToConfig);
    switch (message.command) {
      case "selectFolder":
        WebviewFilePanel.currentPanel.selecionarPasta(message.elementName);
        break;
      case "selectFile":
        WebviewFilePanel.currentPanel.selecionarArquivo(message);
        break;
      case "onload":
        WebviewFilePanel.currentPanel.Onload(config);
        break;
      case "addRpo":
        RpoModel.AdicionaRpo(config.data, message.rpoVersion, pathToConfig);
        break;
      case "removeRpo":
        RpoModel.removeRpo(config.data, message.rpoVersion, pathToConfig);
        break;
      case "save":
        const dados = config.save(message.data);
        this.Reload(dados);
        Utils.MostraMensagemInfo(" Salvo com sucesso!");
        if (message.close) {
          WebviewFilePanel.currentPanel.dispose();
        }
        break;
    }
  }

  public Reload(config: IConfig) {
    this._panel.webview.postMessage({
      command: "SelectedPath",
      config,
    });
  }

  public Onload(config: ConfigModel) {
    this._panel.webview.postMessage({
      command: "SelectedPath",
      config: config.data,
    });
  }

  public selecionarPasta(elementId: string) {
    const options: OpenDialogOptions = {
      canSelectMany: false,
      canSelectFolders: true,
      openLabel: "Selecionar",
    };

    window.showOpenDialog(options).then((fileUri) => {
      if (fileUri && fileUri[0]) {
        this._panel.webview.postMessage({
          command: "SelectedFolder",
          folder: `${fileUri[0].fsPath}\\`,
          elementId,
        });
      }
    });
  }

  public selecionarArquivo(message: SelectFile) {
    const options: OpenDialogOptions = {
      canSelectMany: false,
      canSelectFiles: true,
      openLabel: "Selecionar",
      filters: {
        Arquivos: message.type,
      },
    };

    window.showOpenDialog(options).then((fileUri) => {
      if (fileUri && fileUri[0]) {
        this._panel.webview.postMessage({
          command: "SelectedFile",
          file: fileUri[0].fsPath,
          elementId: message.elementName,
        });
      }
    });
  }
}
