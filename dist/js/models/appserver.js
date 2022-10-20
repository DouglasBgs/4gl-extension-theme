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
exports.Appserver = void 0;
const child_process_1 = require("child_process");
const repositorios_1 = require("./repositorios");
const utils_js_1 = require("../utils/utils.js");
class Appserver {
    static open(pathToRpo) {
        return __awaiter(this, void 0, void 0, function* () {
            let repositorio = new repositorios_1.RepositorioModel(pathToRpo);
            let options = ["Build 64", "Build 32"];
            let build = yield utils_js_1.Utils.selecionaDados(options, "Selecione o Build para executar o comando");
            let appserver;
            if (build == "Build 64") {
                appserver = repositorio.data.appserver_64;
            }
            else {
                appserver = repositorio.data.appserver;
            }
            (0, child_process_1.exec)(`start ${appserver}`, function (error) {
                if (error) {
                    utils_js_1.Utils.MostraMensagemErro(error);
                }
                else {
                    utils_js_1.Utils.MostraMensagemInfo(" Appserver aberto com sucesso");
                }
            });
        });
    }
}
exports.Appserver = Appserver;
//# sourceMappingURL=appserver.js.map