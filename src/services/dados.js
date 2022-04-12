const vscode = require('vscode');


class dados {

    constructor() {
        
    }
    async selecionaDados(options, placeholder) {
        let dadoSelecionado = await vscode.window.showQuickPick(options, {
            placeHolder: placeholder,
            ignoreFocusOut: true
        });
        return dadoSelecionado;
    }

    validaDadosInformados(texto) {
        return !!texto.match(/[A-Za-z].+\-.+[0-9]/);
    }
    

}

module.exports = dados;