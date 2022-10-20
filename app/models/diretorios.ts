import { mkdir, existsSync, createReadStream, createWriteStream, statSync, copy } from "fs-extra";
import { Utils } from "../utils/utils";
import { ConfigModel } from "./config";



export class Diretorios {

  public static criar(nome: string, path: string, type: string) {
    let novoNome = `${path}${nome}`;
    if (this.verificaExistencia(novoNome)) {
      Utils.MostraMensagemInfo(`Diretório já existe`);
      return;
    } else {
      mkdir(`${novoNome}`, { recursive: true }, (err) => {
        if (err) {
          Utils.MostraMensagemErro(`Não foi possível criar o diretório ${novoNome}. motivo: ${err}`);
          return;
        }
        Utils.MostraMensagemInfo(`diretório de ${type}: ${nome} criado com sucesso`);
        return;
      });
    }
  }

  public static async copiaPasta(copiar: string, destino: string) {

    Utils.MostraMensagemInfo(`Aguarde: Copiando arquivos de - ${copiar}`)
    copy(copiar, destino, async (err) => {
      if (err) {
        Utils.MostraMensagemErro(`erro ao copiar o diretório: Arquivo não encontrado no servidor - ${err}`)
      } else {
        Utils.MostraMensagemInfo("arquivos copiados com sucesso")
      }
    });
  }



  public static copiaArquivo(copiar: string, destino: string) {
    let fileSize = statSync(copiar).size;
    let write = createWriteStream(destino);
    let read = createReadStream(copiar);
    let bytesCopiados = 0;
    if (this.verificaExistencia(copiar)) {
      new Promise(function (resolve, reject) {
        read.on("data", function (buffer) {
          bytesCopiados += buffer.length;
          let porcentagem = ((bytesCopiados / fileSize) * 100).toFixed(2);
          Utils.MostraMensagemStatusBar(`$(desktop-download) Copiando arquivos ${porcentagem}%`);
        })

        read.on('error', reject)

        write.on('error', reject)

        write.on('finish', resolve)

        read.pipe(write);
      }).then(() => {
        Utils.MostraMensagemInfo("Arquivos copiados com sucesso", true);
      }).catch((err) => {
        Utils.MostraMensagemErro(err);
        read.destroy();
        write.end();
      })
    }
  }



  private static verificaExistencia(nomeDiretorio: string) {
    if (existsSync(nomeDiretorio)) {
      return true;
    } else {
      return false;
    }
  }


  public salvarArquivo(rpo: any, values: ConfigModel) {
    // writeFile('myjsonfile.json', json, 'utf8');

  }
}
