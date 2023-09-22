import { commands } from 'vscode'
import { join } from 'path'
import { Servers } from './controllers/servers'
import { Issues } from './controllers/issues'
import { RpoController } from './controllers/rpo'
import { WebviewFile } from './controllers/webview'
import {ExtensionContext}  from 'vscode'
import { buildManual } from './controllers/buildManual'

function activate(context: ExtensionContext) {
  const pathToDist = join(context.extensionPath)
  const pathToConfig = join(pathToDist, '.config.json')

  commands.registerCommand('extension.open.appserver', function () {
    Servers.openAppServer(pathToConfig)
  })
  commands.registerCommand('extension.open.tss', function () {
    Servers.openTss(pathToConfig)
  })
  commands.registerCommand('extension.create.issue', function () {
    Issues.createLogix(pathToConfig)
  })
  commands.registerCommand('extension.open.arquivo_log', function () {
    Servers.openLogFile(pathToConfig)
  })
  commands.registerCommand('extension.download.rpo', function () {
    RpoController.download(pathToConfig)
  })
  commands.registerCommand('extension.open.Webview', function () {
    WebviewFile.open(pathToConfig, context)
  })
  commands.registerCommand('extension.issue.datasul', function () {
    Issues.createDatasul(pathToConfig)
  })

  commands.registerCommand('extension.buildManual', function () {
    buildManual.novo(pathToConfig)
  })
}

function deactivate() { }

module.exports = {
  activate,
  deactivate
}
