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
    if (!build) { return }
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


}