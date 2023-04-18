import { Uri, commands, window } from 'vscode'
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
    this.startCommand(tss, nameTss)
    this.startCommand(dbAcessTss, nameDbAccess)
  }

  public static async openTomcatDatasul(pathToTomcat: string) {

    
    let tomcat: string =`
     ${pathToTomcat}scripts\\inicia.lnk
     exit`
    let nameTomcat: string = 'TOMCAT'
    this.startCommand(tomcat, nameTomcat)
    
  }

  public static async selectBuild () {
    const options = [Build.b32, Build.b64]
    const build: any = await Utils.selecionaDados(
      options,
      'Selecione o Build para executar o comando'
    )

    return build
  }

  private static async startCommand(command: string, name: string) {
    let terminals = window.terminals
    let terminal = terminals.findIndex((terminal) => terminal.name == name)
    if (terminal < 0) {
      window.createTerminal(name, 'C:\\Windows\\system32\\cmd.exe')
      window.terminals.findIndex((terminal) => {
        if (terminal.name == name) {
          terminal.sendText(`${command} -console`)
        }
      })
      Utils.MostraMensagemInfo(`${name} aberto com sucesso`)
    } else {
      terminals.findIndex((terminal) => terminal.show())
      Utils.MostraMensagemInfo(`${name} Já está aberto no terminal`)
    }
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
