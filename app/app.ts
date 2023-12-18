import { commands } from 'vscode'
import { join } from 'path'
import { Servers } from './controllers/servers'
import { Issues } from './controllers/issues'
import { RpoController } from './controllers/rpo'
import { WebviewFile } from './controllers/webview'
import {ExtensionContext}  from 'vscode'
import { buildManual } from './controllers/buildManual'
import { Repositorio } from "./enums/repositorio.enum";
import { Compiler } from "./controllers/compiler";

function activate(context: ExtensionContext) {
    const pathToDist = join(context.extensionPath);
    const pathToConfig = join(pathToDist, ".config.json");

    commands.registerCommand("MTAux.open.appserver", function () {
        Servers.openAppServer(pathToConfig);
    });
    commands.registerCommand("MTAux.open.tss", function () {
        Servers.openTss(pathToConfig);
    });
    commands.registerCommand("MTAux.create.issue", function () {
        Issues.createLogix(pathToConfig);
    });
    commands.registerCommand("MTAux.open.arquivo_log", function () {
        Servers.openLogFile(pathToConfig);
    });
    commands.registerCommand("MTAux.download.rpo", function () {
        RpoController.download(pathToConfig);
    });
    commands.registerCommand("MTAux.open.Webview", function () {
        WebviewFile.open(pathToConfig, context);
    });
    commands.registerCommand("MTAux.issue.datasul", function () {
        Issues.createDatasul(pathToConfig);
    });

    commands.registerCommand("MTAux.buildManual", function () {
        buildManual.novo(pathToConfig);
    });

    commands.registerCommand("MTAux.tomcat", function () {
        Servers.openTomcat(pathToConfig);
    });
    commands.registerCommand("MTAux.server.ems2", function () {
        Issues.createDatasul(pathToConfig, Repositorio.Ems2);
    });

    commands.registerCommand("MTAux.compiler", function () {
        Compiler.compile();
    });
}

function deactivate() { }

module.exports = {
  activate,
  deactivate
}
