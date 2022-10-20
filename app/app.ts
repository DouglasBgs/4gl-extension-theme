"use strict";

import { commands } from "vscode";
import { join } from "path";
import { Servers } from "./controllers/servers";
import { Issues } from "./controllers/issues";
import { RpoController } from "./controllers/rpo";

function activate(context: any) {
  let pathToDist = join(context.extensionPath);
  let pathToConfig = join(pathToDist, "config.json");

  commands.registerCommand("extension.open.appserver", function () {
    Servers.openAppServer(pathToConfig);
  });
  commands.registerCommand("extension.open.tss", function () {
    Servers.openTss(pathToConfig);
  });
  commands.registerCommand("extension.create.issue", function () {
    Issues.create(pathToConfig);
  });
  commands.registerCommand("extension.open.arquivo_log", function () {
    Servers.openLogFile(pathToConfig);
  });
  commands.registerCommand("extension.download.rpo", function () {
    RpoController.download(pathToConfig);
  });
  commands.registerCommand("extension.open.Webview", function () {
    RpoController.download(pathToConfig);
  });
}

function deactivate() { }

module.exports = {
  activate,
  deactivate,
};
