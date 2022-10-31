import { Uri, commands } from 'vscode'
import { exec } from 'child_process'
import { ConfigModel } from '../models/config'
import { Utils } from '../utils/utils.js'
import { Build } from '../enums/build.enum'

export class Servers {
  public static async openAppServer (pathToAppServer: string) {
    const config = new ConfigModel(pathToAppServer)
    const build: string = await this.selectBuild()
    if (!build) { return }
    let appserver: string

    if (build == Build.b64) {
      appserver = config.data.appserver_64
    } else {
      appserver = config.data.appserver
    }
    this.startCommand(appserver, 'AppServer')
  }

  public static async openTss (pathToTss: string) {
    const config = new ConfigModel(pathToTss)
    const build: string = await this.selectBuild()
    if (!build) { return }
    let tss: string
    let dbAcessTss: string
    if (build == Build.b64) {
      tss = config.data.tss
      dbAcessTss = config.data.dbacess_tss
    } else {
      tss = config.data.tss_64
      dbAcessTss = config.data.dbacess_tss_64
    }
    this.startCommand(tss, 'TSS')
    this.startCommand(dbAcessTss, 'DBAcess TSS')
  }

  public static async selectBuild () {
    const options = [Build.b32, Build.b64]
    const build: any = await Utils.selecionaDados(
      options,
      'Selecione o Build para executar o comando'
    )

    return build
  }

  private static async startCommand (command: string, name: string) {
    exec(`start ${command}`, function (error: any) {
      if (error) {
        Utils.MostraMensagemErro(error)
      } else {
        Utils.MostraMensagemInfo(`${name} aberto com sucesso`)
      }
    })
  }

  public static async openLogFile (pathToLogFile: string) {
    const repositorio = new ConfigModel(pathToLogFile)
    const build: string = await this.selectBuild()
    if (!build) { return }
    let uri: Uri
    if (build == Build.b64) {
      uri = Uri.file(repositorio.data.arquivo_log_appserver_64)
    } else {
      uri = Uri.file(repositorio.data.arquivo_log_appserver)
    }
    await commands.executeCommand('vscode.open', uri)
  }
}
