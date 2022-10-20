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
exports.Diretorios = void 0;
const fs_extra_1 = require("fs-extra");
const utils_1 = require("../utils/utils");
class Diretorios {
    static criar(nome, path, type) {
        let novoNome = `${path}${nome}`;
        if (this.verificaExistencia(novoNome)) {
            utils_1.Utils.MostraMensagemInfo(`Diretório já existe`);
            return;
        }
        else {
            (0, fs_extra_1.mkdir)(`${novoNome}`, { recursive: true }, (err) => {
                if (err) {
                    utils_1.Utils.MostraMensagemErro(`Não foi possível criar o diretório ${novoNome}. motivo: ${err}`);
                    return;
                }
                utils_1.Utils.MostraMensagemInfo(`diretório de ${type}: ${nome} criado com sucesso`);
                return;
            });
        }
    }
    static copiaPasta(copiar, destino) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.MostraMensagemInfo(`Aguarde: Copiando arquivos de - ${copiar}`);
            (0, fs_extra_1.copy)(copiar, destino, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    utils_1.Utils.MostraMensagemErro(`erro ao copiar o diretório: Arquivo não encontrado no servidor - ${err}`);
                }
                else {
                    utils_1.Utils.MostraMensagemInfo("arquivos copiados com sucesso");
                }
            }));
        });
    }
    static copiaArquivo(copiar, destino) {
        let fileSize = (0, fs_extra_1.statSync)(copiar).size;
        let write = (0, fs_extra_1.createWriteStream)(destino);
        let read = (0, fs_extra_1.createReadStream)(copiar);
        let bytesCopiados = 0;
        if (this.verificaExistencia(copiar)) {
            new Promise(function (resolve, reject) {
                read.on("data", function (buffer) {
                    bytesCopiados += buffer.length;
                    let porcentagem = ((bytesCopiados / fileSize) * 100).toFixed(2);
                    utils_1.Utils.MostraMensagemStatusBar(`$(desktop-download) Copiando arquivos ${porcentagem}%`);
                });
                read.on('error', reject);
                write.on('error', reject);
                write.on('finish', resolve);
                read.pipe(write);
            }).then(() => {
                utils_1.Utils.MostraMensagemInfo("Arquivos copiados com sucesso", true);
            }).catch((err) => {
                utils_1.Utils.MostraMensagemErro(err);
                read.destroy();
                write.end();
            });
        }
    }
    static verificaExistencia(nomeDiretorio) {
        if ((0, fs_extra_1.existsSync)(nomeDiretorio)) {
            return true;
        }
        else {
            return false;
        }
    }
    salvarArquivo(rpo, values) {
    }
}
exports.Diretorios = Diretorios;
//# sourceMappingURL=diretorios.js.map