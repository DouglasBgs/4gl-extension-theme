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
exports.RpoController = void 0;
const build_enum_1 = require("../enums/build.enum");
const config_1 = require("../models/config");
const diretorios_1 = require("../models/diretorios");
const utils_1 = require("../utils/utils");
const servers_1 = require("./servers");
const fs = require("fs");
class RpoController {
    static download(pathToRpo) {
        return __awaiter(this, void 0, void 0, function* () {
            let config = new config_1.ConfigModel(pathToRpo);
            let build = yield servers_1.Servers.selectBuild();
            if (!build) {
                return;
            }
            let rpoRede;
            let rpoLocal;
            let options = [];
            if (build == build_enum_1.Build.b64) {
                rpoRede = config.data.rpo_rede_64;
                rpoLocal = config.data.rpo_local_64;
            }
            else {
                rpoRede = config.data.rpo_rede;
                rpoLocal = config.data.rpo_local;
            }
            rpoRede.map(option => {
                options.push(option.name);
            });
            let selecionado = yield utils_1.Utils.selecionaDados(options, "Selecione a versão do Rpo que deseja fazer o download");
            let download = rpoRede.find(one => one.name == selecionado);
            diretorios_1.Diretorios.copiaArquivo(download.folder, rpoLocal);
        });
    }
}
exports.RpoController = RpoController;
//# sourceMappingURL=rpo.js.map