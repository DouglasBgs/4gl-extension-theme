
import { readFileSync } from 'fs'

import { WebviewPanel, window, ViewColumn, Uri, OpenDialogOptions } from 'vscode'
import { IConfig, SelectFile } from '../interfaces/config'
import { ConfigModel } from '../models/config'
import { RpoModel } from '../models/rpo'
import { Utils } from '../utils/utils'
import { comamnds } from '../enums/comands.enum'

export class WebviewFile {
  public static webviewPanel: WebviewPanel

  static async open(pathToConfig: string, context: any) {
    if (this.webviewPanel) {
      this.webviewPanel.reveal()
    } else {
      this.webviewPanel = window.createWebviewPanel(
        'configDiretorios',
        'Configurar diretórios',
        ViewColumn.One, {
        enableScripts: true,
        enableForms: true
      })
      this.webviewPanel.webview.html = await this.getWebviewContent(context.extensionPath)
      this.webviewPanel.webview.onDidReceiveMessage((message) => { this.verifyMessage(message, pathToConfig) })
    }
    this.webviewPanel.onDidDispose(
      () => {
        this.webviewPanel = undefined
      },
      null,
      context.subscriptions
    )
  }

  public static async getWebviewContent(extensionUri: Uri) {
    const toolkitUri = this.webviewPanel.webview.asWebviewUri(Uri.file(`${extensionUri}\\node_modules\\@vscode\\webview-ui-toolkit\\dist\\toolkit.js`))
    const scripts = this.webviewPanel.webview.asWebviewUri(Uri.file(`${extensionUri}\\public\\index.js`))
    const styles = this.webviewPanel.webview.asWebviewUri(Uri.file(`${extensionUri}\\public\\index.css`))
    const body = readFileSync(`${extensionUri}\\public\\views\\index.html`).toString()

    return /* html */ `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <link href="${styles}" rel="stylesheet">
            <script type="module" src="${toolkitUri}"></script>
            <title>Hello World!</title>
          </head>
          <body>
            ${body}
            <script src="${scripts}"></script>
          </body>
        </html>
      `
  }

  public static verifyMessage(message: any, pathToConfig: string) {
    const config = new ConfigModel(pathToConfig)
    switch (message.command) {
      case comamnds.selectFolder:
        this.selecionarPasta(message.elementName)
        break
      case comamnds.selectFile:
        this.selecionarArquivo(message)
        break
      case comamnds.onload:
        this.Onload(config)
        break
      case comamnds.addRpo:
        RpoModel.AdicionaRpo(config.data, message.rpoVersion, pathToConfig)
        break
      case comamnds.removeRpo:
        RpoModel.removeRpo(config.data, message.rpoVersion, pathToConfig)
        break
      case comamnds.save:
        const dados = config.save(message.data)
        this.Reload(dados)
        Utils.MostraMensagemInfo(' Salvo com sucesso!')
        if (message.close) {
          this.webviewPanel.dispose()
        }
        break
    }
  }

  public static Reload(config: IConfig) {
    this.webviewPanel.webview.postMessage({
      command: comamnds.SelectedPath,
      config
    })
  }

  public static Onload(config: ConfigModel) {
    this.webviewPanel.webview.postMessage({
      command: comamnds.SelectedPath,
      config: config.data
    })
  }

  public static selecionarPasta(elementId: string) {
    const options: OpenDialogOptions = {
      canSelectMany: false,
      canSelectFolders: true,
      openLabel: 'Selecionar'

    }

    window.showOpenDialog(options).then(fileUri => {
      if (fileUri && fileUri[0]) {
        this.webviewPanel.webview.postMessage({
          command: comamnds.SelectedFolder,
          folder: `${fileUri[0].fsPath}\\`,
          elementId
        })
      }
    })
  }

  public static selecionarArquivo(message: SelectFile) {
    const options: OpenDialogOptions = {
      canSelectMany: false,
      canSelectFiles: true,
      openLabel: 'Selecionar',
      filters: {
        Arquivos: message.type
      }

    }

    window.showOpenDialog(options).then(fileUri => {
      if (fileUri && fileUri[0]) {
        this.webviewPanel.webview.postMessage({
          command: comamnds.SelectedFile,
          file: fileUri[0].fsPath,
          elementId: message.elementName
        })
      }
    })
  }
}
