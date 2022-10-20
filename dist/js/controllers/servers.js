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
exports.Servers = void 0;
const vscode_1 = require("vscode");
const child_process_1 = require("child_process");
const config_1 = require("../models/config");
const utils_js_1 = require("../utils/utils.js");
const build_enum_1 = require("../enums/build.enum");
class Servers {
    static openAppServer(pathToAppServer) {
        return __awaiter(this, void 0, void 0, function* () {
            let config = new config_1.ConfigModel(pathToAppServer);
            let build = yield this.selectBuild();
            let appserver;
            if (build == build_enum_1.Build.b64) {
                appserver = config.data.appserver_64;
            }
            else {
                appserver = config.data.appserver;
            }
            this.startCommand(appserver, "AppServer");
        });
    }
    static openTss(pathToTss) {
        return __awaiter(this, void 0, void 0, function* () {
            let config = new config_1.ConfigModel(pathToTss);
            let build = yield this.selectBuild();
            let tss;
            let dbAcessTss;
            if (build == build_enum_1.Build.b64) {
                tss = config.data.tss;
                dbAcessTss = config.data.dbacess_tss;
            }
            else {
                tss = config.data.tss_64;
                dbAcessTss = config.data.dbacess_tss_64;
            }
            this.startCommand(tss, "TSS");
            this.startCommand(dbAcessTss, "DBAcess TSS");
        });
    }
    static selectBuild() {
        return __awaiter(this, void 0, void 0, function* () {
            let options = [build_enum_1.Build.b32, build_enum_1.Build.b64];
            let build = yield utils_js_1.Utils.selecionaDados(options, "Selecione o Build para executar o comando");
            return build;
        });
    }
    static startCommand(command, name) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, child_process_1.exec)(`start ${command}`, function (error) {
                if (error) {
                    utils_js_1.Utils.MostraMensagemErro(error);
                }
                else {
                    utils_js_1.Utils.MostraMensagemInfo(`${name} aberto com sucesso`);
                }
            });
        });
    }
    static openLogFile(pathToLogFile) {
        return __awaiter(this, void 0, void 0, function* () {
            let repositorio = new config_1.ConfigModel(pathToLogFile);
            let build = yield this.selectBuild();
            let uri;
            if (build == build_enum_1.Build.b64) {
                uri = vscode_1.Uri.file(repositorio.data.arquivo_log_appserver_64);
            }
            else {
                uri = vscode_1.Uri.file(repositorio.data.arquivo_log_appserver);
            }
            yield vscode_1.commands.executeCommand("vscode.open", uri);
        });
    }
}
exports.Servers = Servers;
//# sourceMappingURL=servers.js.map