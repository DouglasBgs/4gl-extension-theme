import { mkdir} from 'fs-extra'
import { Utils } from '../utils/utils'
import { execSync } from 'child_process';
import { Terminals } from '../utils/terminals';
import { parse } from 'path';

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

  public static async copiaPasta(copiar: string, destino: string, fechar = false) {
    Utils.MostraMensagemInfo(`Aguarde: Copiando arquivos de - ${copiar}`)
    let commands = `robocopy "${copiar}" "${destino}" /E /COPYALL `
    Terminals.executaComando('Copiando Pasta', commands, fechar)
     
  }
  public static async BuscaArquivos(folder: string) {
    let exists = await this.verificaExistencia(folder).then(value => {
      return value
    })
    return exists;
  }

  public static async copiaArquivo(copiar: string, destino: string) {
    let copiarFile = parse(copiar).base
    let destinoFile = parse(destino).base
    let destinoDir = parse(destino).dir
    
    Utils.MostraMensagemInfo(`Aguarde: Copiando arquivos de - ${copiar}`)
    let commands = [`robocopy "${parse(copiar).dir}" "${destinoDir}" /is ${copiarFile}`, `cd ${destinoDir}`, `rename ${copiarFile} ${destinoFile}`]

    Terminals.executaComando('Copiando arquivos', commands, true)
  }

  private static async verificaExistencia(nomeDiretorio: string) {
    let exists = JSON.parse(await execSync(`IF exist ${nomeDiretorio} (echo true) ELSE (echo false)`).toLocaleString());
    return exists;
  }

}
