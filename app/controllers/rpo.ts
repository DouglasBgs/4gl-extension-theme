import { Build } from '../enums/build.enum'
import { rpo } from '../interfaces/config'
import { ConfigModel } from '../models/config'
import { Diretorios } from '../models/diretorios'
import { Utils } from '../utils/utils'
import { Servers } from './servers'

export class RpoController {
  public static async download(pathToRpo: string) {
    const config = new ConfigModel(pathToRpo)
    const build: string = await Servers.selectBuild()
    if (!build) { return }
    let rpoRede: rpo[]
    let rpoLocal: string
    const options: string[] = []
    if (build == Build.b64) {
      rpoRede = config.data.rpo_rede_64
      rpoLocal = config.data.rpo_local_64
    } else {
      rpoRede = config.data.rpo_rede
      rpoLocal = config.data.rpo_local
    }
    rpoRede.map(option => {
      options.push(option.name)
    })
    const selecionado = await Utils.selecionaDados(options, 'Selecione a versão do Rpo que deseja fazer o download')
    const download = rpoRede.find(one => one.name == selecionado)
    Diretorios.copiaArquivo(download.folder, rpoLocal)
  }
}
