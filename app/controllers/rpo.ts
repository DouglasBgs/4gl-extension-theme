import { Build } from "../enums/build.enum";
import { rpo } from "../interfaces/config";
import { ConfigModel } from "../models/config";
import { Diretorios } from "../models/diretorios";
import { Utils } from "../utils/utils";
import { Servers } from "./servers";


const fs = require("fs");


export class RpoController {

  public static async download(pathToRpo: string) {
    let config = new ConfigModel(pathToRpo);
    let build: string = await Servers.selectBuild();
    let rpoRede: rpo[];
    let rpoLocal: string;
    let options: string[] = [];
    if (build == Build.b64) {
      rpoRede = config.data.rpo_rede_64;
      rpoLocal = config.data.rpo_local_64;

    } else {
      rpoRede = config.data.rpo_rede;
      rpoLocal = config.data.rpo_local;
    }
    rpoRede.map(option => {
      options.push(option.name)
    })
    let selecionado = await Utils.selecionaDados(options, "Selecione a versão do Rpo que deseja fazer o download");
    let download = rpoRede.find(one => one.name == selecionado)
    Diretorios.copiaArquivo(download.folder, rpoLocal);

  }

  //   async adiciona(): Promise<boolean> {
  //     let values: any = JSON.parse(fs.readFileSync(this.rpo, "utf-8"));
  //     let rpoValue: any = values.rpo_rede;
  //     let nomeRpo = await Utils.selecionaNomes("Informe o nome do RPO", "Nome do RPO");
  //     let caminhoRpo = await Utils.selecionaNomes("Insira o caminho aonde está localizado o rpo ", "C:/...");

  //     if (!verificaValorInformado(nomeRpo, caminhoRpo)) {
  //       return false;
  //     };
  //     rpoValue.push({
  //       folder: caminhoRpo,
  //       name: nomeRpo,
  //     });

  //     values.rpo_rede = rpoValue;
  //     let saveValue = JSON.stringify(values);
  //     fs.writeFileSync(this.rpo, saveValue, "utf-8");
  //     Utils.MostraMensagemInfo("RPO adicionado com sucesso");
  //     return true;
  //   }
  // }

  // function verificaValorInformado(nomeRpo: string, caminhoRpo: string): boolean {
  //   if (
  //     nomeRpo ||
  //     caminhoRpo
  //   ) {
  //     Utils.MostraMensagemErro("Não foi possível adicionar o RPO");
  //     return false;
  //   } else {
  //     let result = caminhoRpo.includes(".rpo");
  //     if (!result) {
  //       Utils.MostraMensagemErro("É necessário que o diretório termine com o nome do arquivo .rpo");
  //       return false;
  //     }
  //     return true;
  //   }
  //   // async deletaRpo() {
  //   //   let repositorioController = new RepositorioController(
  //   //     this.path + "repositorios.json"
  //   //   );
  //   //   let repositorio: any = repositorioController.values;
  //   //   let options: Array<string> = [];
  //   //   let selecionado: string[] = null;
  //   //   let data = fs.readFileSync(this.rpo, "utf-8");
  //   //   let values = JSON.parse(data);
  //   //   let rpoValue = values.rpo_rede;
  //   //   let rpoC: Array<string> = [];

  //   //   repositorio.rpo_rede.forEach((elemento: any) => {
  //   //     options.push(elemento.name);
  //   //   });

  //   //   selecionado = await DadosController.selecionaDados(
  //   //     options,
  //   //     "Selecione a opção que deseja excluir"
  //   //   );
  //   //   if (selecionado != null) {
  //   //     repositorio.rpo_rede.forEach((elemento: Array<any>) => {
  //   //       if (elemento.name == selecionado) {
  //   //         rpoValue.forEach((elemento: any) => {
  //   //           if (elemento.name != selecionado) {
  //   //             rpoC.push(elemento);
  //   //           }
  //   //         });
  //   //         values.rpo_rede = rpoC;
  //   //         let saveValue = JSON.stringify(values);
  //   //         fs.writeFileSync(this.rpo, saveValue, "utf-8");
  //   //         vscode.window
  //   //           .showInformationMessage("RPO deletado com sucesso")
  //   //           .then(function close() {});
  //   //         return true;
  //   //       }
  //   //     });
  //   //   } else {
  //   //     vscode.window
  //   //       .showErrorMessage("Não foi possível deletadar o RPO")
  //   //       .then(function close() {});
  //   //     return false;
  //   //   }
  //   // }
  // }
}