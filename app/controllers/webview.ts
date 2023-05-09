


import { WebviewPanel, window, ViewColumn, Uri, OpenDialogOptions, Disposable, Webview } from 'vscode'
import { IConfig, SelectFile } from '../interfaces/config'
import { ConfigModel } from '../models/config'
import { RpoModel } from '../models/rpo'
import { Utils } from '../utils/utils'

export class ConfigWebviewPanel {
  public static currentPanel: ConfigWebviewPanel | undefined;
  private readonly _panel: WebviewPanel;
  private _disposables: Disposable[] = [];
  private configModel: ConfigModel;
  public configData: IConfig;
  public static webviewPanel: WebviewPanel;

  private constructor(panel: WebviewPanel, extensionUri: Uri,  pathToConfig: string) { 
    this.configModel =  new ConfigModel(pathToConfig)
    this.configData = this.configModel.data;
    console.log("construtor"+this.configData);
    this._panel = panel;
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.webview.html = this.getWebviewContent(this._panel.webview, extensionUri);
    this._setWebviewMessageListener(this._panel.webview );
    this.Onload(this._panel.webview);
  }

  public static render(pathToConfig: string, extensionUri: Uri) { 
   
    if(ConfigWebviewPanel.currentPanel) {
      ConfigWebviewPanel.currentPanel._panel.reveal(ViewColumn.One);
    }else {
      const panel = window.createWebviewPanel(
        'configDiretorios',
        'Configurar diretórios',
        ViewColumn.One, {
        enableScripts: true,
        localResourceRoots: [Uri.joinPath(extensionUri, 'dist'), Uri.joinPath(extensionUri, "webview-ui/build")]
      });
      ConfigWebviewPanel.currentPanel = new ConfigWebviewPanel(panel, extensionUri, pathToConfig);
     
    }
  }

  public dispose() {  
   ConfigWebviewPanel.currentPanel = undefined;
    this._panel.dispose();
    while(this._disposables.length) { 
      const disposable = this._disposables.pop();
      if(disposable) {
        disposable.dispose();
      }
    }
  }

  private getUri(webview: Webview, extensionUri: Uri, pathList: string[]) {
    return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
  }

  private getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  

  public getWebviewContent(webview: Webview, extensionUri: Uri) {
    const stylesUri = this.getUri(webview, extensionUri, ["webview-ui", "build", "styles.css"]);
    
    const runtimeUri = this.getUri(webview, extensionUri, ["webview-ui", "build", "runtime.js"]);
    const polyfillsUri = this.getUri(webview, extensionUri, ["webview-ui", "build", "polyfills.js"]);
    const scriptUri = this.getUri(webview, extensionUri, ["webview-ui", "build", "main.js"]);

    const nonce = this.getNonce();

    return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
        <link rel="stylesheet" type="text/css" href="${stylesUri}">
        <title>Hello World</title>
      </head>
      <body>
        <app-root></app-root>
        <script type="module" nonce="${nonce}" src="${runtimeUri}"></script>
        <script type="module" nonce="${nonce}" src="${polyfillsUri}"></script>
        <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
      </body>
    </html>
  `;
  }

  private _setWebviewMessageListener(webview: Webview) { 
  
    webview.onDidReceiveMessage((message: any) => {
      const command = message.command;
      switch (command) {
        case 'selectFolder':
          this.selecionarPasta(message.elementName)
          break
        case 'selectFile':
          this.selecionarArquivo(message)
          break

        // case 'addRpo':
        //   RpoModel.AdicionaRpo(config.data, message.rpoVersion, this.pathToConfig)
        //   break
        // case 'removeRpo':
        //   RpoModel.removeRpo(config.data, message.rpoVersion, this.pathToConfig)
        //   break
        case 'save':
          const dados = message.data
          this.Reload(dados, webview)
          Utils.MostraMensagemInfo(' Salvo com sucesso!')
          if (message.close) {
            this._panel.dispose()
          }
          break
      }
    }, undefined, this._disposables)
    

  }
  

  public  verifyMessage(message: any, pathToConfig: string) {
    const config = new ConfigModel(pathToConfig)
    
  }

  public  Reload(config: IConfig, webview: Webview) {
    webview.postMessage({
      command: 'SelectedPath',
      config
    })
  }

  public  Onload( webview: Webview ) {
    webview.postMessage({
      command: 'SelectedPath',
      config: this.configData
    })
  }

  public  selecionarPasta(elementId: string) {
    const options: OpenDialogOptions = {
      canSelectMany: false,
      canSelectFolders: true,
      openLabel: 'Selecionar'

    }

    window.showOpenDialog(options).then((fileUri: any)=> {
      if (fileUri && fileUri[0]) {
        this._panel.webview.postMessage({
          command: 'SelectedFolder',
          folder: `${fileUri[0].fsPath}\\`,
          elementId
        })
      }
    })
  }

  public  selecionarArquivo(message: SelectFile) {
    const options: OpenDialogOptions = {
      canSelectMany: false,
      canSelectFiles: true,
      openLabel: 'Selecionar',
      filters: {
        Arquivos: message.type
      }

    }

    window.showOpenDialog(options).then((fileUri: any) => {
      if (fileUri && fileUri[0]) {
        this._panel.webview.postMessage({
          command: 'SelectedFile',
          file: fileUri[0].fsPath,
          elementId: message.elementName
        })
      }
    })
  }
}
