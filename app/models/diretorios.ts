import { mkdir, createReadStream, createWriteStream, statSync } from 'fs-extra'
import { Utils } from '../utils/utils'
import  { exec, execSync }from 'child_process';

export class Diretorios {
  public static async criar(nome: string, path: string, type: string) {
    const novoNome = `${path}${nome}`
    if (await this.verificaExistencia(novoNome)) {
      Utils.MostraMensagemInfo('Diretório já existe')
    } else {
      mkdir(`${novoNome}`, { recursive: true }, (err) => {
        if (err) {
          Utils.MostraMensagemErro(`Não foi possível criar o diretório ${novoNome}. motivo: ${err}`)
          return
        }
        Utils.MostraMensagemInfo(`diretório de ${type}: ${nome} criado com sucesso`)
      })
    }
  }

  public static async copiaPasta(copiar: string, destino: string) {
    Utils.MostraMensagemInfo(`Aguarde: Copiando arquivos de - ${copiar}`)
    
    exec(`xcopy /E /I "${copiar}" "${destino}"`,  (err) => {
      if (err) {
        Utils.MostraMensagemErro(`erro ao copiar o diretório: Arquivo não encontrado no servidor - ${err}`)
      } else {
        Utils.MostraMensagemInfo('arquivos copiados com sucesso')
      }
    })
  }
  public static async BuscaArquivosWar(folder: string) {
    let exists = await this.verificaExistencia(folder).then(value => {
      return value
    })
    return exists;
  }

  public static async copiaArquivo(copiar: string, destino: string) {
    const fileSize = statSync(copiar).size
    const write = createWriteStream(destino)
    const read = createReadStream(copiar)
    let bytesCopiados = 0
    if (await this.verificaExistencia(copiar)) {
      new Promise(function (resolve, reject) {
        read.on('data', function (buffer) {
          bytesCopiados += buffer.length
          const porcentagem = ((bytesCopiados / fileSize) * 100).toFixed(2)
          Utils.MostraMensagemStatusBar(`$(desktop-download) Copiando arquivos ${porcentagem}%`)
        })

        read.on('error', reject)

        write.on('error', reject)

        write.on('finish', resolve)

        read.pipe(write)
      }).then(() => {
        Utils.MostraMensagemInfo('Arquivos copiados com sucesso', true)
      }).catch((err) => {
        Utils.MostraMensagemErro(err)
        read.destroy()
        write.end()
      })
    }
  }

  private static async verificaExistencia(nomeDiretorio: string) {

    let exists = await execSync(`IF exist ${nomeDiretorio} (echo true) ELSE (echo false)`).toLocaleString();
    let result = JSON.parse(exists)
    return result;
  }

}
