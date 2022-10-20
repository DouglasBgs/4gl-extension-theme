"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const path_1 = require("path");
const servers_1 = require("./controllers/servers");
const issues_1 = require("./controllers/issues");
const rpo_1 = require("./controllers/rpo");
function activate(context) {
    let pathToDist = (0, path_1.join)(context.extensionPath);
    let pathToConfig = (0, path_1.join)(pathToDist, "config.json");
    vscode_1.commands.registerCommand("extension.open.appserver", function () {
        servers_1.Servers.openAppServer(pathToConfig);
    });
    vscode_1.commands.registerCommand("extension.open.tss", function () {
        servers_1.Servers.openTss(pathToConfig);
    });
    vscode_1.commands.registerCommand("extension.create.issue", function () {
        issues_1.Issues.create(pathToConfig);
    });
    vscode_1.commands.registerCommand("extension.open.arquivo_log", function () {
        servers_1.Servers.openLogFile(pathToConfig);
    });
    vscode_1.commands.registerCommand("extension.download.rpo", function () {
        rpo_1.RpoController.download(pathToConfig);
    });
    vscode_1.commands.registerCommand("extension.open.Webview", function () {
        rpo_1.RpoController.download(pathToConfig);
    });
}
function deactivate() { }
module.exports = {
    activate,
    deactivate,
};
//# sourceMappingURL=app.js.map