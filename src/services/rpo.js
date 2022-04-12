const vscode = require('vscode');
const fs = require('fs');

// const {dadosServices} = require('./index');

// const dados = new dadosServices();

const repositorio = null


class rpo {

    async adicionaRpo(rpo) {
        let nomeRpo = null
        let CaminhoRpo = null
        let data = fs.readFileSync(rpo, 'utf-8');
        let values = JSON.parse(data)
        let rpoValue = values.rpo_rede

        nomeRpo = await vscode.window.showInputBox({ prompt: 'Insira o nome do RPO ', placeHolder: '1.0.0', ignoreFocusOut: true });
        CaminhoRpo = await vscode.window.showInputBox({ prompt: 'Insira o caminho aonde está localizado o rpo ', placeHolder: 'C:/...', ignoreFocusOut: true });
        if (nomeRpo == null || CaminhoRpo == null || CaminhoRpo == '' || nomeRpo == '') {
            vscode.window.showErrorMessage('Não foi possível adicionar o RPO').then(1);
            return false
        } else {
            let result = CaminhoRpo.includes('.rpo');
            if (!result) {
                console.log(result);
                vscode.window.showErrorMessage('É necessário que o diretório termine com o nome do arquivo .rpo').then(1)
                return false
            }
            rpoValue.push({
                folder: CaminhoRpo,
                name: nomeRpo
            })
            values.rpo_rede = rpoValue
            let saveValue = JSON.stringify(values)
            fs.writeFileSync(rpo, saveValue, 'utf-8');
            vscode.window.showInformationMessage('RPO Adicionado com sucesso').then(1);
            return true

        }
    }

    async deletaRpo(rpo) {
        
        let options = [];
        let selecionado = null
        let data = fs.readFileSync(rpo, 'utf-8');
        let values = JSON.parse(data)
        let rpoValue = values.rpo_rede
        let rpoC = []

        repositorio.rpo_rede.forEach((elemento) => {
            options.push(elemento.name)
        })

        selecionado = await dados.selecionaDados(options, 'Selecione a opção que deseja excluir')
        if (selecionado != null || selecionado == '') {
            repositorio.rpo_rede.forEach((elemento) => {
                if (elemento.name == selecionado) {
                    rpoValue.forEach(element => {
                        if (element.name != selecionado) {
                            rpoC.push(element);
                        }
                    });
                    values.rpo_rede = rpoC
                    let saveValue = JSON.stringify(values)
                    fs.writeFileSync(rpo, saveValue, 'utf-8');
                    vscode.window.showInformationMessage('RPO deletado com sucesso').then(1);
                    return true
                }
            })
        } else {
            vscode.window.showErrorMessage('Não foi possível deletadar o RPO').then(1);
            return false
        }
    }


}

module.exports = rpo;