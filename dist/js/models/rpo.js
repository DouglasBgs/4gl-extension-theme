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
exports.RpoModel = void 0;
const vscode_1 = require("vscode");
const webview_1 = require("../controllers/webview");
const utils_1 = require("../utils/utils");
const config_1 = require("./config");
class RpoModel {
    static removeRpo(dados, versao, pathToConfig) {
        if (versao == '32') {
            this.remove32(dados, pathToConfig);
        }
        else {
            this.remove64(dados, pathToConfig);
        }
    }
    static AdicionaRpo(dados, versao, pathToConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = new config_1.ConfigModel(pathToConfig);
            const nome = yield utils_1.Utils.selecionaNomes('Nome do RPO ', 'Ex: 12.1.2209');
            const pasta = yield this.selecionarArquivo(`Caminho onde se encontra o rpo ${versao} no servidor`);
            const rpovalues = {
                folder: pasta,
                name: nome
            };
            if (this.validacaminhoRpo(pasta)) {
                if (versao == '32') {
                    dados.rpo_rede.push(rpovalues);
                }
                else {
                    dados.rpo_rede_64.push(rpovalues);
                }
                dados = config.save(dados);
                webview_1.WebviewFile.Reload(dados);
            }
            ;
        });
    }
    static remove32(dados, pathToConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = new config_1.ConfigModel(pathToConfig);
            const options = [];
            let selecionado;
            const placeHolder = 'Selecione o RPO 32 bits para remover';
            dados.rpo_rede.map((element) => {
                options.push(element.name);
            });
            selecionado = yield utils_1.Utils.selecionaDados(options, placeHolder);
            dados.rpo_rede.splice(dados.rpo_rede.indexOf(selecionado, 0));
            dados = config.save(dados);
            webview_1.WebviewFile.Reload(dados);
        });
    }
    static remove64(dados, pathToConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = new config_1.ConfigModel(pathToConfig);
            const options = [];
            let selecionado;
            const placeHolder = 'Selecione o RPO 64 bits para remover';
            dados.rpo_rede_64.map((element) => {
                options.push(element.name);
            });
            selecionado = yield utils_1.Utils.selecionaDados(options, placeHolder);
            dados.rpo_rede_64.splice(dados.rpo_rede_64.indexOf(selecionado, 0));
            dados = config.save(dados);
            webview_1.WebviewFile.Reload(dados);
        });
    }
    static validacaminhoRpo(pasta) {
        if (!pasta.match('.rpo')) {
            utils_1.Utils.MostraMensagemErro(' Caminho precisa conter o arquivo .RPO');
            return false;
        }
        return true;
    }
    static selecionarArquivo(message) {
        return __awaiter(this, void 0, void 0, function* () {
            let file;
            const options = {
                canSelectMany: false,
                canSelectFiles: true,
                openLabel: message,
                filters: {
                    rpo: ['rpo']
                }
            };
            yield vscode_1.window.showOpenDialog(options).then(fileUri => {
                if (fileUri && fileUri[0]) {
                    file = fileUri[0].fsPath;
                }
                else {
                    file = null;
                }
            });
            return file;
        });
    }
}
exports.RpoModel = RpoModel;
//# sourceMappingURL=rpo.js.map