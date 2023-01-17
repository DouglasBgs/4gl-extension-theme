import { commands } from "vscode";
import { join } from "path";
import { Servers } from "./controllers/servers";
import { Issues } from "./controllers/issues";
import { RpoController } from "./controllers/rpo";
import { WebviewFilePanel } from "./controllers/webview";
import { Utils } from "./utils/utils";

function activate(context: any) {
  const pathToDist = join(context.extensionPath);
  const pathToConfig = join(pathToDist, ".config.json");

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
    WebviewFilePanel.render(context.extensionPath, context);
  });
  commands.registerCommand("extension.messagedev", function () {
    Utils.MostraMensagemInfo(
      "Infelizmente essa opção ainda não está disponível"
    );
  });
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
