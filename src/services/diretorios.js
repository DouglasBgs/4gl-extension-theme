const fs = require('fs');
const fs2 = require('fs-extra');
const vscode = require('vscode');


class diretorios {
    
    criaDiretorio(nomeDiretorio) {
        let today = new Date();
        let NovoNovo = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'-'+nomeDiretorio
        fs.mkdir(NovoNovo, (err) => {
            if (err) {
                vscode.window.showErrorMessage('Não foi possível criar os arquivos:' + err).then(1);
            }
        });
    }

    salvaArquivo(rpo, values) {
        let saveValue = []
        let data = fs.readFileSync(rpo, 'utf-8');
        let beforeData = JSON.parse(data)
        let rpoRede = beforeData.rpo_rede
        saveValue = values
        saveValue.rpo_rede = rpoRede
        fs.writeFileSync(rpo, JSON.stringify(saveValue), 'utf-8');
    
    }

    verificaExistencia(nomeDiretorio) {

        if (fs.existsSync(nomeDiretorio)) {
            return true
        }
        else {
            return false
        }
    }

    async copiaDiretorio(copiar, destino, tipo) {

        switch (tipo) {
            case 'arquivo':
                let rd = fs.createReadStream(copiar);
                let wr = fs.createWriteStream(destino);
                let file = fs.statSync(copiar);
                let filesize = file.size;
                let bytesCopiados = 0;
                let i = 0;
                if (this.verificaExistencia(copiar)) {
                    new Promise(function (resolve, reject) {
                        rd.on('data', function (buffer) {
                            bytesCopiados += buffer.length
                            let porcentagem = ((bytesCopiados / filesize) * 100).toFixed(2)
                            let intPorcentagem = parseInt(porcentagem);
                            if (intPorcentagem > i) {
                                vscode.window.setStatusBarMessage(`$(desktop-download) Copiando arquivos ${porcentagem}%`, 10000)
                                i + 1
                            }
                        })
                        rd.on('error', reject);
                        wr.on('error', reject);
                        wr.on('finish', resolve);
                        rd.pipe(wr);
                    }).then(function () {
                        vscode.window.showInformationMessage('Arquivos copiados com sucesso').then(1);
                    }).catch(function (error) {
                        rd.destroy();
                        wr.end()
                        vscode.window.showErrorMessage('Não foi possível copiar os arquivos:' + error).then(1);
    
                    })
                } else {
                    vscode.window.showErrorMessage('Arquivos para copiar não encontrado em: ' + copiar).then(1);
                }
                break
    
            case 'pasta':
                if (this.verificaExistencia(copiar)) {
                    vscode.window.withProgress({
                        location: vscode.ProgressLocation.Notification,
                        title: "Aguarde",
                        cancellable: false
                    }, async (progress, token) => {
                        setTimeout(() => {
                            progress.report({  message: "copiando arquivos de: " + copiar });
                        }, 0);
    
                        await fs2.copy(copiar, destino, err => {
                            if (err) {
                                return vscode.window.showErrorMessage('erro ao copiar o diretório: Arquivo não encontrado no servidor -' + err).then(1);
                            } else {
                                vscode.window.showInformationMessage('arquivos copiados com sucesso').then(1);
                            }
    
                        })
                        const pause = new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                            }, 10000);
                        });
                        return pause
    
                    })
                } else {
                    vscode.window.showErrorMessage('Pasta para copiar não encontrado em: ' + copiar).then(1);
                }
                break;
            default:
                break;
        }
    
    }
}

module.exports = diretorios;