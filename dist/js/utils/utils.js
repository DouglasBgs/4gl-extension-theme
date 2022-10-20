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
exports.Utils = void 0;
const vscode_1 = require("vscode");
class Utils {
    static MostraMensagemErro(error) {
        vscode_1.window.showErrorMessage("erro:" + error);
    }
    static MostraMensagemInfo(message, modal = false) {
        vscode_1.window.showInformationMessage(message, { modal: modal });
    }
    static MostraMensagemStatusBar(message, time = 10000) {
        vscode_1.window.setStatusBarMessage(message, time);
    }
    static selecionaDados(options, placeholder) {
        return __awaiter(this, void 0, void 0, function* () {
            let dadoSelecionado = yield vscode_1.window.showQuickPick(options, {
                placeHolder: placeholder,
                ignoreFocusOut: true,
            });
            return dadoSelecionado;
        });
    }
    static selecionaNomes(prompt, placeHolder, ignoreFocusOut = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let nome = yield vscode_1.window.showInputBox({
                prompt: prompt,
                placeHolder: placeHolder,
                ignoreFocusOut: ignoreFocusOut,
            });
            return nome;
        });
    }
    static validaDadosInformados(texto) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!texto.match(/[A-Za-z].+\-.+[0-9]/);
        });
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map