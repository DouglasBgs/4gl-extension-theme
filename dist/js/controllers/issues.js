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
exports.Issues = void 0;
const etapa_enum_js_1 = require("../enums/etapa.enum.js");
const utils_js_1 = require("../utils/utils.js");
const diretorios_js_1 = require("../models/diretorios.js");
const config_js_1 = require("../models/config.js");
class Issues {
    static create(pathToConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = new config_js_1.ConfigModel(pathToConfig);
            const nome_issue = yield utils_js_1.Utils.selecionaNomes('Insira o nome da issue ', 'Nome issue (exemplo: TSS-1234)');
            if (!nome_issue || !(yield utils_js_1.Utils.validaDadosInformados(nome_issue))) {
                utils_js_1.Utils.MostraMensagemErro(` ${nome_issue}, Não é um nome válido`);
            }
            else {
                const selecionado = yield this.selectStatus(nome_issue);
                switch (selecionado) {
                    case etapa_enum_js_1.Etapa.Codificacao:
                        diretorios_js_1.Diretorios.criar(nome_issue, config.data.issue_codificacao, etapa_enum_js_1.Etapa.Codificacao);
                        break;
                    case etapa_enum_js_1.Etapa.TesteUnitario:
                        diretorios_js_1.Diretorios.criar(nome_issue, config.data.issue_tu, etapa_enum_js_1.Etapa.TesteUnitario);
                        diretorios_js_1.Diretorios.copiaPasta(config.data.arquivos_romana + nome_issue, config.data.issue_tu + nome_issue);
                        break;
                    case etapa_enum_js_1.Etapa.TesteIntegrado:
                        diretorios_js_1.Diretorios.criar(nome_issue, config.data.issue_ti, etapa_enum_js_1.Etapa.TesteIntegrado);
                        diretorios_js_1.Diretorios.copiaPasta(config.data.arquivos_romana + nome_issue, config.data.issue_ti + nome_issue);
                        break;
                    default:
                        break;
                }
            }
        });
    }
    static selectStatus(nome_issue) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = [etapa_enum_js_1.Etapa.Codificacao, etapa_enum_js_1.Etapa.TesteUnitario, etapa_enum_js_1.Etapa.TesteIntegrado];
            const placeHolder = `selecione a etapa atual do desenvolvimento da issue ${nome_issue}`;
            const selecionado = yield utils_js_1.Utils.selecionaDados(options, placeHolder);
            return selecionado;
        });
    }
}
exports.Issues = Issues;
//# sourceMappingURL=issues.js.map